import { Nav } from "@/components/Nav";
import { Header } from "@/components/Header";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { StructuredData } from "@/components/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData />
      <Nav />
      <main className="flex-1">
        <Header />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <footer className="mx-auto w-full max-w-6xl border-t border-edge px-6 py-8 font-mono text-xs text-muted">
        &copy; {new Date().getFullYear()} Victor Danger Valentine
      </footer>
    </>
  );
}
