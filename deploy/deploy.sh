#!/usr/bin/env bash
# Deploys the portfolio on the remote server: pull the branch, rebuild the container,
# check it answers. Run from anywhere with ssh access:
#   deploy/deploy.sh [branch] [root@91.99.62.133]
# The first run clones the repository. (scripts/deploy.ps1 is the old Windows host's
# deploy, kept until that host stops serving the site.)
set -euo pipefail

branch="${1:-main}"
host="${2:-root@91.99.62.133}"
repo=https://github.com/dangervalentine/danger-portfolio.git
dest=/opt/danger-portfolio

ssh "$host" bash -s -- "$branch" "$repo" "$dest" <<'EOF'
set -euo pipefail
branch="$1"; repo="$2"; dest="$3"
[ -d "$dest/.git" ] || git clone -q "$repo" "$dest"
cd "$dest"
git fetch -q origin
git checkout -q "$branch"
git reset -q --hard "origin/$branch"
docker compose -f deploy/docker-compose.yml up -d --build
for i in $(seq 1 40); do
	if curl -fsS -o /dev/null http://127.0.0.1:5100/; then echo "portfolio_web answers ($(git log --oneline -1))"; exit 0; fi
	sleep 1
done
echo "The site did not answer; docker logs portfolio_web says why." >&2
exit 1
EOF
