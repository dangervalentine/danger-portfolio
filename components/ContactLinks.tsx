import { ContactButton } from "@/components/ContactButton";
import { contactLinks } from "@/content/site";

/** The hero's row of contact buttons.
 *
 * These were bare icons with `sr-only` labels, on the theory that up here the
 * name and the tagline are the point. But an unlabelled mark asks the reader
 * to recognise it before they can act on it, and the row had no way to offer
 * the thing most people actually come for — an address to write to. Labelled
 * buttons say what they are, and the contact section at the foot of the page
 * now reads as the same row seen twice rather than as two different
 * treatments of the same links. */
export function ContactLinks({ className }: { className?: string }) {
  return (
    // One per row below sm, as in the contact section: buttons of different
    // widths wrapped into a ragged block, which read as an accident rather
    // than a set.
    <ul
      className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center ${
        className ?? ""
      }`}
    >
      {contactLinks.map((link) => (
        <li key={link.label}>
          <ContactButton link={link} />
        </li>
      ))}
    </ul>
  );
}
