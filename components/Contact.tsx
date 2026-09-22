import { ContactButton } from "@/components/ContactButton";
import { contactLinks, site } from "@/content/site";

export function Contact() {
  return (
    <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-16">
      <h2 className="mb-8 text-3xl font-bold tracking-tight text-heading">
        Contact
      </h2>
      {/* Pulled back up under the heading with a negative margin rather than
          by shortening the heading's own `mb-8`: the two read as one block,
          and the 32px still belongs between that block and the buttons.

          Mono and muted, like the stack line in the hero — the same register,
          answering the same reader, at the other end of the page. */}
      <p className="-mt-4 mb-8 font-mono text-[13px] text-muted">
        {site.availability}
      </p>
      {/* One row of matching buttons, the same set the hero opens with.
          The address used to sit above them as a plain link on a line of its
          own — it is much the longest of the three, and as loose text beside
          two buttons it read as a caption for them rather than as the first
          thing to press.

          It still spells the address out rather than saying "Email": this is
          the contact section, and someone who wants to write from their own
          client needs to be able to read and copy it.

          Below sm each button takes the full width and the address stops
          having to compete for room; from sm up they sit side by side and
          take only the width their own text needs. */}
      <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
        {contactLinks.map((link) => (
          <li key={link.label}>
            <ContactButton
              link={link}
              text={link.label === "Email" ? site.email : undefined}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
