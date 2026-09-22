import { domainFrom } from "@/components/resume/domain";

/** The dash-and-domain that sits beside a company or product name.
 *
 * The name itself used to be the anchor. That put a link where a reader's
 * eye lands first on every entry in the document — a page of blue headings
 * in which the most prominent word in each role was styled as something to
 * click, and clicking it told you nothing the heading had not already said.
 * Worse, the destination was invisible: "Creed Interactive" as a link does
 * not tell you it goes to creedinteractive.com, so verifying an employer
 * meant leaving the page to find out where you had been sent.
 *
 * Naming the domain says both at once. The heading goes back to being a
 * heading, and the thing that is clickable is the thing being claimed — this
 * employer exists, at this address, go and look. In the PDF it is still a
 * real link annotation, and it now also survives being printed on paper,
 * which a bare styled name did not.
 *
 * The dash is `aria-hidden`: it is typography, and a screen reader that
 * announces it reads "Creed Interactive dash creedinteractive.com". */
export function SourceDomain({ href }: { href: string }) {
  return (
    <span className="font-mono text-xs text-muted">
      <span aria-hidden="true">&ndash;</span>{" "}
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-accent underline-offset-2 hover:underline"
      >
        {domainFrom(href)}
      </a>
    </span>
  );
}
