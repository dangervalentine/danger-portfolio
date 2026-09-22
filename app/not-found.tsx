import Link from "next/link";

import { controlClass } from "@/components/controls";

/**
 * Every 404 in the app lands here: an unmatched URL, and the `notFound()` the
 * case-study page throws for a slug that is not one of the two built ones
 * (`dynamicParams = false` in app/products/[slug]/page.tsx turns the rest into
 * this). There is no designed 404 page yet, and the Next.js default is a bare
 * white "404 | This page could not be found" that shares nothing with the
 * site, so for now a miss goes home.
 *
 * The redirect is a `<meta http-equiv="refresh">` rather than `redirect("/")`.
 * `redirect()` from a not-found is not an HTTP redirect: Next.js still answers
 * 404 — correctly, the resource really is missing — and a `Location` header on
 * a 404 is ignored by every browser, so the move happens only once the client
 * router has booted. That leaves a reader without JavaScript on a blank page,
 * which is worse than the default this file exists to replace. A meta refresh
 * is understood before any script runs, and the markup underneath it is a real
 * page with a real link home for anything that ignores the refresh.
 *
 * React 19 hoists the `<meta>` into `<head>` from here, so this does not need
 * a `metadata` export — which not-found.tsx does not support anyway.
 *
 * Worth knowing before this becomes permanent: sending every 404 to the home
 * page is a soft 404 as far as a crawler is concerned. Google follows the
 * refresh, finds a 200 at `/` with content that does not match what it asked
 * for, and reports the original URL as an error regardless. The honest version
 * is this page without the refresh. This is the placeholder until then.
 */
export default function NotFound() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/" />
      <main className="flex flex-1 items-center justify-center px-6 py-24">
        <div className="w-full max-w-md text-center">
          <p className="font-mono text-xs tracking-wide text-muted uppercase">
            404
          </p>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-heading">
            That page does not exist
          </h1>
          <p className="mt-3 text-sm text-foreground">
            Taking you back to the home page.
          </p>
          {/* The fallback for anything the refresh does not reach, and the
              reason this renders markup at all instead of an empty document. */}
          <Link href="/" className={controlClass("md", "mt-8")}>
            Go home now
          </Link>
        </div>
      </main>
    </>
  );
}
