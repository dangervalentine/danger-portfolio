import { site } from "@/content/site";

export function Contact() {
  return (
    <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-16">
      <h2 className="mb-8 text-3xl font-bold tracking-tight text-heading">
        Contact
      </h2>
      {/* The address gets the first row to itself — it is the long one, and
          wrapping it into the same row as the profile links left "LinkedIn"
          stranded on a line of its own. The profiles then split the row below
          it evenly, as a pair of buttons rather than two loose links. */}
      <ul className="flex flex-wrap items-center gap-3 sm:gap-x-4">
        <li className="w-full sm:w-auto sm:pr-4">
          <a
            href={`mailto:${site.email}`}
            className="text-lg text-accent underline-offset-4 transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {site.email}
          </a>
        </li>
        {site.contact.map((link) => (
          <li key={link.label} className="grow basis-0 sm:grow-0 sm:basis-auto">
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center rounded-md border border-edge-strong bg-raised px-4 py-2.5 font-mono text-sm text-accent-alt transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-5"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
