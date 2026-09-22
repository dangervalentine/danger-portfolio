import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** One sentence, reused as the meta description and both social cards. Written
 * to name the stack rather than the job title: "Senior Software Developer" is
 * what every other portfolio says, and it is the technologies that a recruiter
 * search, an applicant tracking system and a link preview all key on.
 *
 * It describes the engineer, not this site's project list. It used to name
 * only the four technologies the two featured applications are built with,
 * which quietly made the showcase the ceiling on the claim: Angular, Node.js,
 * .NET MAUI and four SQL engines are nine years of employment and appeared
 * nowhere a crawler would find them.
 *
 * It runs long, 230 characters against the ~160 Google renders in a result
 * and the ~200 a link preview shows, and that is the deliberate trade: the
 * whole string is indexed and read by an ATS, only the display is cut. So the
 * order is what matters. Everything that survives the shortest cut is the
 * strongest half, and the terms most likely to be someone's exact search sit
 * before the ones a reader would assume anyway. */
const DESCRIPTION =
  "Senior software developer, nine years building production systems end " +
  "to end: .NET and Node.js backends across four SQL engines, React, " +
  "Angular and Next.js clients, React Native and .NET MAUI apps on the " +
  "App Store and Google Play.";

const TITLE = `${site.name} · Senior Software Developer`;

export const metadata: Metadata = {
  /** What resolves every relative URL below, and the relative Open Graph image
   * URL in particular — without it the card silently renders with no image. */
  metadataBase: new URL(site.url),
  title: TITLE,
  description: DESCRIPTION,
  /* Grouped by layer in source order (backend, web, mobile, data, platform,
     role) so that adding one lands beside its peers rather than at the end.
     The professional half of the stack was missing outright: Angular, Node.js,
     .NET MAUI, and the three engines that are not PostgreSQL. */
  keywords: [
    ".NET",
    "C#",
    "ASP.NET Core",
    "Node.js",
    "TypeScript",
    "React",
    "Next.js",
    "Angular",
    "React Native",
    "Expo",
    ".NET MAUI",
    "PostgreSQL",
    "SQL Server",
    "Oracle",
    "Elasticsearch",
    "Docker",
    "Azure",
    "AWS",
    "senior software developer",
    "full-stack developer",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

/** Paints the mobile browser chrome the same colour as the page, so the site
 * does not sit in a white bar on iOS Safari and Chrome for Android. */
export const viewport: Viewport = {
  themeColor: "#011627",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    /* No `data-scroll-behavior` here: it is the opt-in that asks Next to
       force `scroll-behavior: auto` around its own scrolling, and there is
       no longer any smooth behaviour for it to override. See globals.css. */
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
