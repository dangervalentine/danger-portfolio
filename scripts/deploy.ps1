<#
.SYNOPSIS
    Deploys danger-portfolio on the production box: pull, build, restart.

.DESCRIPTION
    Windows PowerShell 5.1 compatible (the prod box has no pwsh), so no
    &&/||, no ternary, no null-coalescing.

    The portfolio is a single Next.js app with no backend, so this is the
    web half of density-fitness's deploy.ps1 and nothing else.

    Run over SSH:
        ssh admin@server "powershell -NoProfile -ExecutionPolicy Bypass -File C:\Users\admin\danger-portfolio\scripts\deploy.ps1"

.PARAMETER Force
    Discard local changes on the deploy checkout (git reset --hard origin/<branch>).
    Without it, a dirty working tree aborts the deploy rather than guessing.

.PARAMETER WebPort
    Must match the cloudflared ingress for dangervalentine.com. The script
    warns if it doesn't. 3000 is Density's web, so the portfolio sits on 3100.
#>
[CmdletBinding()]
param(
    [string] $RepoDir = "C:\Users\admin\danger-portfolio",
    [string] $Branch  = "main",
    [string] $LogDir  = "C:\apps\logs",
    [int]    $WebPort = 3100,
    [switch] $Force,
    [switch] $SkipInstall
)

$ErrorActionPreference = "Stop"
$ProgressPreference    = "SilentlyContinue"

# The systemprofile copy is the one the Cloudflared service actually reads (see
# the header of that file). The user-profile copies are checked only to warn
# when they drift.
$CloudflaredConfigs = @(
    "C:\Windows\System32\config\systemprofile\.cloudflared\config.yml",
    "C:\Users\admin\.cloudflared\config.yml",
    "C:\Users\Administrator\.cloudflared\config.yml"
)

# Boot service. When present it owns the web process, and the deploy drives it
# through the SCM rather than killing PIDs. Created by install-service.ps1.
$WebService = "PortfolioWeb"
$WebUrl     = "http://127.0.0.1:$WebPort"

# --------------------------------------------------------------------------
# Helpers
# --------------------------------------------------------------------------

function Write-Step {
    param([string] $Message)
    Write-Host ""
    Write-Host "==> $Message" -ForegroundColor Cyan
}

function Write-Warn {
    param([string] $Message)
    Write-Host "  ! $Message" -ForegroundColor Yellow
}

function Write-Ok {
    param([string] $Message)
    Write-Host "  + $Message" -ForegroundColor Green
}

function Invoke-Checked {
    <#  Runs a native command and throws on a non-zero exit code.
        PowerShell does not do this on its own, so a failed build would
        otherwise "succeed" and the script would restart a stale build. #>
    param(
        [string]   $Exe,
        [string[]] $CmdArgs,
        [string]   $WorkDir,
        [string]   $What
    )
    Push-Location $WorkDir
    try {
        & $Exe @CmdArgs
        if ($LASTEXITCODE -ne 0) {
            throw "$What failed (exit $LASTEXITCODE): $Exe $($CmdArgs -join ' ')"
        }
    } finally {
        Pop-Location
    }
}

function Get-ListenerPid {
    <#  PID listening on a port. netstat rather than Get-NetTCPConnection,
        which needs a CIM session this account cannot open. #>
    param([int] $Port)
    $rows = netstat -ano | Select-String -Pattern (":$Port\s") | Select-String -Pattern "LISTENING"
    foreach ($row in $rows) {
        $fields = ($row.ToString().Trim() -split "\s+")
        $found  = $fields[$fields.Length - 1]
        if ($found -match "^\d+$") { return [int] $found }
    }
    return 0
}

function Stop-Listener {
    param([int] $Port, [string] $Label)
    $procId = Get-ListenerPid -Port $Port
    if ($procId -eq 0) {
        Write-Host "  - $Label`: nothing listening on $Port"
        return
    }
    $proc = Get-Process -Id $procId -ErrorAction SilentlyContinue
    $name = "pid $procId"
    if ($proc) { $name = "$($proc.ProcessName) (pid $procId)" }
    Write-Host "  - $Label`: stopping $name on port $Port"
    Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue

    for ($i = 0; $i -lt 20; $i++) {
        Start-Sleep -Milliseconds 500
        if (-not (Get-Process -Id $procId -ErrorAction SilentlyContinue)) { return }
    }
    Write-Warn "$Label (pid $procId) did not exit within 10s"
}

function Wait-Http {
    param([string] $Url, [int] $TimeoutSec)
    $deadline = (Get-Date).AddSeconds($TimeoutSec)
    while ((Get-Date) -lt $deadline) {
        try {
            $resp = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 5
            if ($resp.StatusCode -ge 200 -and $resp.StatusCode -lt 500) { return $true }
        } catch {
            # Not up yet. Keep waiting until the deadline.
        }
        Start-Sleep -Seconds 2
    }
    return $false
}

function Get-IngressPort {
    <#  The loopback port a cloudflared ingress rule sends a hostname to, or 0
        if the hostname has no rule. Accepts both the 127.0.0.1 and localhost
        spellings. The (?m)^ anchor keeps "dangervalentine.com" from matching
        the tail of a subdomain rule like "density.dangervalentine.com". #>
    param([string] $Yaml, [string] $HostName)
    $escaped = [regex]::Escape($HostName)
    $pattern = "(?m)^\s*-?\s*hostname:\s*$escaped\s*[\r\n]+\s*service:\s*https?://(?:127\.0\.0\.1|localhost):(\d+)"
    if ($Yaml -match $pattern) { return [int] $Matches[1] }
    return 0
}

function Test-TunnelRoute {
    param([string] $ConfigPath, [string] $HostName, [int] $ExpectedPort)
    $yaml = Get-Content $ConfigPath -Raw
    $found = Get-IngressPort -Yaml $yaml -HostName $HostName
    $short = Split-Path (Split-Path $ConfigPath -Parent) -Parent | Split-Path -Leaf
    if ($found -eq 0) {
        Write-Warn "[$short] no ingress rule for $HostName -- it will hit the 404 catch-all"
    } elseif ($found -ne $ExpectedPort) {
        Write-Warn "[$short] $HostName routes to port $found, but this deploy binds $ExpectedPort -- unreachable from outside"
    } else {
        Write-Ok "[$short] $HostName -> $ExpectedPort"
    }
}

function Get-FileHashOrEmpty {
    param([string] $Path)
    if (-not (Test-Path $Path)) { return "" }
    return (Get-FileHash -Path $Path -Algorithm SHA256).Hash
}

# --------------------------------------------------------------------------
# 0. Preflight
# --------------------------------------------------------------------------

Write-Step "Preflight"

if (-not (Test-Path $RepoDir)) { throw "Repo not found at $RepoDir" }

foreach ($tool in @("git", "npm")) {
    if (-not (Get-Command $tool -ErrorAction SilentlyContinue)) {
        throw "Required tool '$tool' is not on PATH"
    }
}
Write-Ok "git / npm present"

New-Item -ItemType Directory -Path $LogDir -Force | Out-Null

$checkedAnyConfig = $false
foreach ($cfgPath in $CloudflaredConfigs) {
    if (-not (Test-Path $cfgPath)) { continue }
    $checkedAnyConfig = $true
    Test-TunnelRoute -ConfigPath $cfgPath -HostName "dangervalentine.com" -ExpectedPort $WebPort
}
if (-not $checkedAnyConfig) {
    Write-Warn "No cloudflared config found -- skipping the tunnel port check"
}
Write-Host "  - note: cloudflared must be restarted (elevated) for any config change to take effect"

# --------------------------------------------------------------------------
# 1. Fetch + pull
# --------------------------------------------------------------------------

Write-Step "Fetching $Branch"

$lockBefore = Get-FileHashOrEmpty (Join-Path $RepoDir "package-lock.json")

Invoke-Checked -Exe "git" -CmdArgs @("fetch", "origin", $Branch, "--prune") -WorkDir $RepoDir -What "git fetch"

Push-Location $RepoDir
try {
    $dirty = git status --porcelain
    if ($dirty -and -not $Force) {
        Write-Host ""
        Write-Host $dirty
        throw "Working tree at $RepoDir has local changes. Re-run with -Force to discard them, or resolve them by hand."
    }

    if ($Force) {
        Write-Warn "-Force: discarding local changes"
        Invoke-Checked -Exe "git" -CmdArgs @("reset", "--hard", "origin/$Branch") -WorkDir $RepoDir -What "git reset"
    } else {
        Invoke-Checked -Exe "git" -CmdArgs @("checkout", $Branch) -WorkDir $RepoDir -What "git checkout"
        Invoke-Checked -Exe "git" -CmdArgs @("merge", "--ff-only", "origin/$Branch") -WorkDir $RepoDir -What "git merge --ff-only"
    }

    $head = git rev-parse --short HEAD
    $subject = git log -1 --pretty=%s
    Write-Ok "at $head -- $subject"
} finally {
    Pop-Location
}

# --------------------------------------------------------------------------
# 2. npm dependencies -- only when the lockfile actually moved
# --------------------------------------------------------------------------

Write-Step "Dependencies"

$lockAfter   = Get-FileHashOrEmpty (Join-Path $RepoDir "package-lock.json")
$needInstall = ($lockBefore -ne $lockAfter) -or (-not (Test-Path (Join-Path $RepoDir "node_modules")))

if ($SkipInstall) {
    Write-Host "  - -SkipInstall: leaving node_modules alone"
} elseif ($needInstall) {
    Write-Host "  - lockfile changed (or node_modules missing) -- running npm ci"
    Invoke-Checked -Exe "npm.cmd" -CmdArgs @("ci") -WorkDir $RepoDir -What "npm ci"
    Write-Ok "dependencies installed"
} else {
    Write-Ok "lockfile unchanged -- skipping npm ci"
}

# --------------------------------------------------------------------------
# 3. Stop the running site
#
# Before building, not after: next build rewrites .next underneath a running
# next start, which can serve a half-written build. The downtime window opens
# here.
# --------------------------------------------------------------------------

Write-Step "Stopping site"

# Stop through the SCM, not by killing the listening PID: NSSM restarts the app
# when it exits, so a killed process comes straight back on the old build.
$webSvc = Get-Service $WebService -ErrorAction SilentlyContinue
if ($webSvc) {
    if ($webSvc.Status -eq "Stopped") {
        Write-Host "  - service $WebService already stopped"
    } else {
        Write-Host "  - stopping service $WebService"
        Stop-Service -Name $WebService -Force
        try {
            (Get-Service $WebService).WaitForStatus("Stopped", [TimeSpan]::FromSeconds(60))
        } catch {
            throw "Service $WebService did not stop within 60s; aborting before the build."
        }
    }
}

# Belt and braces: clears anything the service does not own, e.g. a hand-started
# instance from before the service existed.
Stop-Listener -Port $WebPort -Label "web"

# --------------------------------------------------------------------------
# 4. Build
# --------------------------------------------------------------------------

Write-Step "Building (production)"

# Clear stale build output. .next/dev/types/ is generated by `next dev` and
# type-checked by `next build`; a leftover from a deleted route fails the
# build on perfectly good source. .next/cache is kept -- it is an
# optimisation, not an artifact.
$nextDir = Join-Path $RepoDir ".next"
if (Test-Path $nextDir) {
    Get-ChildItem $nextDir -Force | Where-Object { $_.Name -ne "cache" } | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "  - cleared stale .next output (kept .next/cache)"
}
$env:NODE_ENV = "production"
$env:PORT     = "$WebPort"

Invoke-Checked -Exe "npm.cmd" -CmdArgs @("run", "build") -WorkDir $RepoDir -What "next build"
Write-Ok "built"

# --------------------------------------------------------------------------
# 5. Start
# --------------------------------------------------------------------------

Write-Step "Starting site on $WebUrl"

$webOut = Join-Path $LogDir "portfolio.out.log"
$webErr = Join-Path $LogDir "portfolio.err.log"
if ($webSvc) {
    Write-Host "  - starting service $WebService"
    Start-Service -Name $WebService
    $webWhere = "service $WebService"
} else {
    $webProc = Start-Process -FilePath "npm.cmd" -ArgumentList @("run", "start", "--", "-p", "$WebPort", "-H", "127.0.0.1") `
        -WorkingDirectory $RepoDir `
        -RedirectStandardOutput $webOut `
        -RedirectStandardError  $webErr `
        -WindowStyle Hidden -PassThru
    $webWhere = "pid $($webProc.Id)"
}

if (-not (Wait-Http -Url $WebUrl -TimeoutSec 120)) {
    Write-Host ""
    Write-Host "--- portfolio.err.log (tail) ---"
    Get-Content $webErr -Tail 40 -ErrorAction SilentlyContinue
    throw "Site did not answer $WebUrl within 120s. Logs: $webOut / $webErr"
}
Write-Ok "serving ($webWhere), logs in $LogDir"

Write-Host ""
Write-Host "Deploy complete." -ForegroundColor Green
Write-Host "  Web   $WebUrl        ($webWhere)"
Write-Host "  Logs  $LogDir"
Write-Host ""
if ($webSvc) {
    Write-Host "Runs under the SCM ($WebService): it auto-starts at boot and NSSM"
    Write-Host "restarts it if it crashes."
} else {
    Write-Host "The process is detached and outlives this SSH session, but it does NOT"
    Write-Host "survive a reboot. Run scripts\install-service.ps1 (elevated) for that."
}
