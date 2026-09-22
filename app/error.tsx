"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { controlClass } from "@/components/controls";

/**
 * The error boundary for everything below the root layout: the home page, the
 * case studies, both résumé routes. It catches a throw during render, which in
 * production is the only thing standing between a reader and the Next.js
 * default error screen.
 *
 * Like not-found.tsx, a failure sends the reader home — but only from a page
 * that is not already home. Redirecting to `/` because `/` just threw is a
 * loop, and a loop is a worse failure than the one it is papering over, so
 * when the error happened at `/` this renders a panel instead and offers the
 * one recovery that can actually work.
 */
export default function AppError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();

  /* `/` is the redirect target, so an error there has nowhere to go. */
  const canRedirect = pathname !== "/";

  useEffect(() => {
    /* There is no error reporting service wired up. The console is what a
     * `digest` can be matched against in the server logs by hand. */
    console.error(error);
  }, [error]);

  useEffect(() => {
    if (!canRedirect) return;
    /* `replace`, not `push`: the broken URL should not be a back-button
     * destination. Navigating also unmounts this boundary, which is what
     * clears the error. */
    router.replace("/");
  }, [canRedirect, router]);

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="w-full max-w-md text-center">
        <p className="font-mono text-xs tracking-wide text-muted uppercase">
          Something went wrong
        </p>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-heading">
          {canRedirect ? "Taking you back home" : "This page failed to load"}
        </h1>
        <p className="mt-3 text-sm text-foreground">
          {canRedirect
            ? "That page could not be rendered, so you are being sent to the home page."
            : "The home page could not be rendered. Trying again may be enough."}
        </p>

        {/* Only offered where the redirect is not already running: two
            recoveries racing each other is how a reader ends up somewhere
            neither of them intended. */}
        {canRedirect ? null : (
          <button
            type="button"
            onClick={() => retry()}
            className={controlClass("md", "mt-8")}
          >
            Try again
          </button>
        )}

        {/* The digest is the only handle on what actually happened: production
            strips the message, and this is what matches a line in the server
            log. Rendered quietly, for someone who is looking for it. */}
        {error.digest ? (
          <p className="mt-8 font-mono text-[11px] text-muted">
            Reference: {error.digest}
          </p>
        ) : null}
      </div>
    </main>
  );
}
