import { site } from "@/content/site";

export function Contact() {
  return (
    <section id="contact" className="mx-auto w-full max-w-5xl px-6 py-16">
      <h2 className="mb-8 text-3xl font-bold tracking-tight text-zinc-50">
        Contact
      </h2>
      <ul className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-lg">
        <li>
          <a href={`mailto:${site.email}`} className="text-accent hover:underline">
            {site.email}
          </a>
        </li>
        {site.contact.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-300 hover:text-accent"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
