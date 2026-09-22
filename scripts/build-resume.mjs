// Renders /resume/print to public/resume.pdf.
//
// Deliberately not part of `next build`. The artifact lives in public/, so it
// is generated, committed, and served by the following deploy — wiring it
// into the build would ask the server to produce a file the server is already
// serving.
//
// Chrome's print pipeline is doing three things here that a hand-designed PDF
// did not: it emits a text layer with correct Unicode mapping (the old
// résumé's fi/fl ligatures extracted as "Conict" and "ltering"), it preserves
// <a href> as real PDF link annotations, and it linearizes a single-column
// DOM in exactly one reading order, which is what applicant tracking systems
// actually parse.

import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
// CommonJS, and Node's ESM loader finds no named exports on it — hence the
// default import and the unpacking below rather than `import { … }`.
import nextEnv from "@next/env";
import { chromium } from "playwright";

import { RESUME_PDF_FILENAME } from "../content/resume-file.mjs";

// .env.local is where the number lives, and this script is now its only
// reader — the server spawned below neither needs it nor is given a way to
// use it. Loading it with Next's own loader rather than parsing the file
// here keeps one notion of what .env.local means.
nextEnv.loadEnvConfig(process.cwd());
const hasPhone = Boolean(process.env.RESUME_PHONE);

const PORT = 3123;
const ORIGIN = `http://127.0.0.1:${PORT}`;
const PROBE = `${ORIGIN}/resume/print`;

// One page, rendered twice: once as loaded, and once with the phone number
// written into the slot the contact line leaves for it.
//
// The public file is linked from /resume and served at a guessable static
// path, so it carries no number. Withholding it from the web page but
// leaving it in the downloadable file made the number private to the medium
// and not to the artifact: a PDF under public/ is fetched, and its text
// layer indexed, like any other page. The private file is the copy attached
// to an application — a different document, reaching one reader who expects
// to find a number on it. It is written outside public/ and gitignored, so
// neither the deploy nor a later `git add -A` can turn it into the one the
// site serves.
//
// The number is injected here rather than rendered by the route, and this
// is the second attempt at that boundary. The first passed it to the
// component behind a `?phone=1` search param, which leaked: Next's route
// cache keys on the pathname and ignores the query string, so the
// phone-bearing render came back for a later plain request to
// /resume/print. Injecting into the loaded DOM means no server in any
// environment can be asked for the value, because no server has it.
// The two files are named by opposite rules, which is why only one of them
// reads from content/resume-file.mjs.
//
// The public one is addressed before it is saved: its path is a URL, linked
// from the site and typed by people, so it stays short and the good name is
// attached to it in transit — by the `download` attribute on the résumé
// button and by the Content-Disposition header in next.config.
//
// The private one is never addressed at all. It is picked out of a folder and
// attached to an application by hand, so the only name it will ever have is
// the one on disk, and it is already sitting under the name a recruiter will
// see. Nothing renames it downstream; there is no downstream.
const PUBLIC_OUT = "public/resume.pdf";
const PRIVATE_OUT = `private/${RESUME_PDF_FILENAME}`;

// The slot the contact line renders empty and hidden. See ResumeHeader.
const PHONE_SLOT = "[data-phone-slot]";

/** Identical for both files: the two differ by a line of contact text, not
 * by how the paper is set. */
const PDF_OPTIONS = {
  format: "Letter",
  // Without this the PDF is the right shape and entirely white.
  printBackground: true,
  // 0.70in, not 0.5in. The page box is the document's only margin — the
  // print scope zeroes the wrapper's own padding, since applying both cost
  // ~80px of column width and pushed every line into extra wrapping.
  //
  // Half an inch is the tight end of the range and reads as content shoved
  // against the paper edge. Seven tenths sits in the normal band for a
  // résumé and is what makes this a two-page document.
  //
  // That last part is not a rounding preference, so do not nudge it back to
  // 0.75in without re-measuring. The content is ~1768px tall and two pages
  // hold ~1824px, so it fits — but the role opening below ImageTrend cannot
  // split, and pushing it whole onto page two costs ~58px. At 0.75in that
  // lands the document 2px over the budget, and because the education block
  // cannot split either, those 2px send all 83px of it to a third page.
  //
  // The band where the document is two pages *and* ImageTrend still leads
  // page two is 0.66in–0.74in, measured a hundredth at a time. Below 0.66in
  // ImageTrend's opening fits at the foot of page one and strands its
  // company name there with the bullets overleaf — the defect the
  // unsplittable opening block exists to prevent. 0.70in is the middle of
  // that band, which is the whole reason for the odd-looking number: it is
  // the value with the most room on either side before the layout flips.
  //
  // The phone number sits in a wrapping contact row, so dropping it can only
  // shorten the document; both files were re-measured at this margin after
  // the split and both come out at two pages with ImageTrend leading the
  // second.
  margin: {
    top: "0.70in",
    bottom: "0.70in",
    left: "0.70in",
    right: "0.70in",
  },
};

/** One probe. Used both to detect a server that is already up and, in a
 * loop, to wait for one this script started. */
async function isServerUp(url) {
  try {
    const res = await fetch(url);
    return res.ok;
  } catch {
    return false;
  }
}

/** Polls the server until it answers, rather than sleeping a guessed number
 * of seconds. */
async function waitForServer(url, timeoutMs = 60_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await isServerUp(url)) return;
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`Server did not start within ${timeoutMs}ms`);
}

/** `server.kill()` reaches the wrapper this was spawned through, not always
 * the Next process under it: on Windows `shell: true` puts cmd.exe in
 * between, so the port stays held by an orphan after this script exits. The
 * next run then finds the port taken, and the run after that renders against
 * a build that is however many edits stale. Kill the tree instead. */
function stopServer(child) {
  if (process.platform === "win32") {
    spawn("taskkill", ["/pid", String(child.pid), "/T", "/F"], {
      stdio: "ignore",
    });
    return;
  }
  child.kill();
}

// A server already on the port is used as-is rather than fought with. The
// alternative is what this script used to do: spawn regardless, let the new
// process die of EADDRINUSE, and then render against whatever the survivor
// is serving without ever saying so. Reuse is the same outcome, stated.
//
// The warning is the point. A reused server is serving the build it started
// with, which is not necessarily the one just compiled, so the line below is
// the reader's only clue when the PDF comes out a version behind.
const reusing = await isServerUp(PROBE);
let server = null;

if (reusing) {
  console.log(
    `Reusing the server already listening on ${PORT}. It is serving whatever ` +
      `build it started with; re-run \`npm run build\` and stop that process ` +
      `if the PDF needs to reflect edits made since.`,
  );
} else {
  server = spawn("npx", ["next", "start", "--port", String(PORT)], {
    stdio: "inherit",
    shell: process.platform === "win32",
  });
}

try {
  await waitForServer(PROBE);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(`${ORIGIN}/resume/print`, { waitUntil: "networkidle" });

  await mkdir(dirname(PUBLIC_OUT), { recursive: true });
  await page.pdf({ path: PUBLIC_OUT, ...PDF_OPTIONS });
  console.log(`Wrote ${PUBLIC_OUT}`);

  if (hasPhone) {
    // Fills the slot in the page already loaded, so the second PDF differs
    // from the first by one line of text and nothing else.
    await page.evaluate(
      ([selector, value]) => {
        const slot = document.querySelector(selector);
        if (!slot) throw new Error(`No ${selector} in the rendered document`);
        slot.textContent = value;
        slot.removeAttribute("hidden");
      },
      [PHONE_SLOT, process.env.RESUME_PHONE],
    );

    await mkdir(dirname(PRIVATE_OUT), { recursive: true });
    await page.pdf({ path: PRIVATE_OUT, ...PDF_OPTIONS });
    console.log(`Wrote ${PRIVATE_OUT}`);
  } else {
    console.warn(
      `Skipping ${PRIVATE_OUT}: RESUME_PHONE is not set. Put it in ` +
        `.env.local (see .env.example) and re-run if you need the copy ` +
        `that carries a number.`,
    );
  }

  await browser.close();
} finally {
  // Only what this script started. A server that was already up outlives the
  // run, the same way it outlived the one before it.
  if (server) stopServer(server);
}
