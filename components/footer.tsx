import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 font-mono text-xs text-text-faint sm:flex-row">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Built with Next.js, Tailwind, and Framer Motion</span>
      </div>
    </footer>
  );
}
