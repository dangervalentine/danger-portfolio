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
 * search, an applicant tracking system and a link preview all key on. */
const DESCRIPTION =
  "Senior software developer building products end to end with .NET and " +
  "PostgreSQL backends, Next.js web apps, and React Native mobile apps " +
  "shipped to the App Store and Google Play.";

const TITLE = `${site.name} · Senior Software Developer`;

export const metadata: Metadata = {
  /** What resolves every relative URL below, and the relative Open Graph image
   * URL in particular — without it the card silently renders with no image. */
  metadataBase: new URL(site.url),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    ".NET",
    "C#",
    "ASP.NET Core",
    "TypeScript",
    "React",
    "Next.js",
    "React Native",
    "Expo",
    "PostgreSQL",
    "Elasticsearch",
    "Docker",
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
