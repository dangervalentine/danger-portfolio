"use client";

import { useEffect, useSyncExternalStore } from "react";

/**
 * The last boundary. app/error.tsx sits *inside* the root layout, so it cannot
 * catch a throw from the root layout itself — this does, and in doing so it
 * replaces the whole document. That is also why everything here is inline: a
 * global error renders without the root layout, which means without
 * globals.css and without the Geist variables, so the tokens are restated as
 * literals. Keep them in step with the `:root` block in app/globals.css.
 *
 * It ships no Tailwind classes for the same reason — there is no stylesheet
 * here for them to resolve against.
 */
const BACKGROUND = "#011627";
const HEADING = "#ffffff";
const FOREGROUND = "#d6deeb";
const MUTED = "#8badc1";
const RAISED = "#122a3d";
const EDGE = "#2c4f6b";

const MONO =
  'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';
const SANS =
  'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif';

/** `useSyncExternalStore` requires a subscribe function, and there is nothing
 * here to subscribe to. Hoisted to module scope so it is referentially stable
 * across renders rather than resubscribing on every one. */
const NO_SUBSCRIBE = () => () => {};

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  /* Read straight off `window.location` rather than from `usePathname`: this
   * component has replaced the root layout, and leaning on router context from
   * underneath a crashed tree is exactly the assumption that got us here.
   *
   * `useSyncExternalStore` rather than state set from an effect, so the value
   * is available on the first client render instead of one paint later. The
   * subscribe callback is a no-op because the location cannot change under us
   * without a document load taking this component with it. The server snapshot
   * says "home", which is the branch that renders the retry panel — the safe
   * thing to have shown if script never arrives. */
  const atHome = useSyncExternalStore(
    NO_SUBSCRIBE,
    () => window.location.pathname === "/",
    () => true,
  );
  const redirecting = !atHome;

  useEffect(() => {
    console.error(error);
  }, [error]);

  useEffect(() => {
    /* Same loop guard as app/error.tsx: `/` is the destination, so a failure
     * at `/` has to stay put and offer a retry instead. */
    if (!redirecting) return;
    /* A full document load, not a client navigation. The React tree is the
     * thing that just failed, so the router is not the tool to escape with. */
    window.location.replace("/");
  }, [redirecting]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "96px 24px",
          background: BACKGROUND,
          color: FOREGROUND,
          fontFamily: SANS,
        }}
      >
        <title>Something went wrong</title>
        <div style={{ maxWidth: 420, textAlign: "center" }}>
          <p
            style={{
              margin: 0,
              fontFamily: MONO,
              fontSize: 12,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            Something went wrong
          </p>
          <h1
            style={{
              margin: "16px 0 0",
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: HEADING,
            }}
          >
            {redirecting ? "Taking you back home" : "This page failed to load"}
          </h1>
          <p style={{ margin: "12px 0 0", fontSize: 14, lineHeight: 1.6 }}>
            {redirecting
              ? "That page could not be rendered, so you are being sent to the home page."
              : "The home page could not be rendered. Trying again may be enough."}
          </p>

          {redirecting ? null : (
            <button
              type="button"
              onClick={() => retry()}
              style={{
                marginTop: 32,
                padding: "12px 14px",
                borderRadius: 6,
                border: `1px solid ${EDGE}`,
                background: RAISED,
                color: HEADING,
                fontFamily: MONO,
                fontSize: 13,
                lineHeight: "20px",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
          )}

          {error.digest ? (
            <p
              style={{
                margin: "32px 0 0",
                fontFamily: MONO,
                fontSize: 11,
                color: MUTED,
              }}
            >
              Reference: {error.digest}
            </p>
          ) : null}
        </div>
      </body>
    </html>
  );
}
