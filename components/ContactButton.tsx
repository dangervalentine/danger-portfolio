import {
  CONTROL_MARK,
  CONTROL_MARK_INERT,
  controlClass,
  inertControlClass,
} from "@/components/controls";
import { CONTACT_ICONS } from "@/components/icons";
import type { ContactLink } from "@/content/site";

/** One way to reach me, as a button with its mark: the hero and the contact
 * section both render a row of these, so the same destinations look the same
 * in both places.
 *
 * The hero row says "Email"; the contact row spells the address out, because
 * down there the address itself is the information. `text` is that override —
 * the `label` stays the accessible name and the key the icon is looked up by.
 *
 * `lg` is the widest of the three control sizes: these are the only buttons
 * on the page that are not attached to a card, so nothing around them sets
 * their scale and they have to carry it themselves.
 *
 * A mailto opens the reader's own mail client, so it is the one link here
 * that must not be sent to a new tab.
 *
 * A link with no `href` has nowhere to go yet and renders as a <span> rather
 * than an anchor — see below. */
export function ContactButton({
  link,
  text,
}: {
  link: ContactLink;
  text?: string;
}) {
  const path = CONTACT_ICONS[link.label];
  const pending = !link.href;

  const mark = path ? (
    <svg
      viewBox="0 0 24 24"
      className={`${pending ? CONTROL_MARK_INERT : CONTROL_MARK} h-4 w-4`}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={path} />
    </svg>
  ) : null;

  if (pending) {
    return (
      // Not an anchor: an <a> without an href is not a link, and one pointed
      // at a file that does not exist is worse — it looks live, takes the
      // keyboard, and spends the reader's click on a 404. A <span> is
      // honestly nothing, and the plate says the rest.
      //
      // The state is real text rather than a title or an aria-label, so it
      // survives everywhere: a screen reader announces "Résumé, coming soon",
      // exactly as it does for an unreleased store badge.
      //
      // A comma rather than the dash this used to carry. The dash was banned
      // from the site's prose on sight, but it was the wrong mark here for a
      // second reason: a comma is the one a screen reader actually renders,
      // as the pause the sentence needs, where a dash is read as nothing or
      // as the word.
      <span className={inertControlClass("lg", "w-full sm:w-auto")}>
        {mark}
        {text ?? link.label}
        <span className="sr-only">, coming soon</span>
      </span>
    );
  }

  // An internal route must not open a new tab, and a mailto must not either
  // — it hands off to the reader's own mail client. Testing for a protocol
  // rather than for "not mailto" means the next internal link added here is
  // correct without anyone having to remember this.
  const external = /^https?:\/\//.test(link.href ?? "");

  return (
    <a
      href={link.href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      // Full width while the rows are stacked; from sm up each takes only
      // the width its own text needs, so the spelled-out email address in
      // the contact section does not set the size of the two beside it.
      className={controlClass("lg", "w-full sm:w-auto")}
    >
      {mark}
      {text ?? link.label}
    </a>
  );
}
