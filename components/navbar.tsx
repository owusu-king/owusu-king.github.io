"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import { nav, profile } from "@/lib/data";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((n) => document.querySelector(n.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        className={`glass flex w-full max-w-3xl items-center justify-between rounded-full px-3 py-2 transition-shadow ${
          scrolled ? "shadow-[0_8px_30px_rgba(0,0,0,0.25)]" : ""
        }`}
      >
        <a
          href="#top"
          className="flex items-center gap-2 rounded-full px-2 py-1.5 font-display text-sm font-medium tracking-tight text-text"
        >
          <motion.span
            whileTap={{ scale: 0.85, rotate: -8 }}
            className="flex h-6 w-6 items-center justify-center rounded-md bg-signal-soft text-signal"
          >
            <Terminal size={13} />
          </motion.span>
          {profile.initials}
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              whileTap={{ scale: 0.92 }}
              className={`relative rounded-full px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                active === item.href
                  ? "text-signal"
                  : "text-text-muted hover:text-text"
              }`}
            >
              {item.label}
              {active === item.href && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 rounded-full bg-signal-soft"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <motion.button
            type="button"
            onClick={() => setOpen((v) => !v)}
            whileTap={{ scale: 0.88 }}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-muted md:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="glass absolute inset-x-4 top-16 flex flex-col gap-1 rounded-3xl p-3 md:hidden"
          >
            {nav.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                whileTap={{ scale: 0.96 }}
                className="rounded-2xl px-4 py-3 font-mono text-sm uppercase tracking-wider text-text-muted transition-colors hover:bg-panel-2 hover:text-text"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
