"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight, ShieldCheck, Download } from "lucide-react";
import { profile } from "@/lib/data";
import { Portrait } from "@/components/portrait";
import { useRipple } from "@/components/ripple";

function useTypedRoles(roles: string[]) {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = deleting ? 35 : 55;
    const pause = 1400;

    const timeout = setTimeout(
      () => {
        if (!deleting) {
          const next = current.slice(0, text.length + 1);
          setText(next);
          if (next === current) {
            setTimeout(() => setDeleting(true), pause);
          }
        } else {
          const next = current.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDeleting(false);
            setRoleIndex((i) => (i + 1) % roles.length);
          }
        }
      },
      text === current && !deleting ? pause : speed
    );

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, deleting, roleIndex]);

  return text;
}

function MagneticButton({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });
  const { addRipple, RippleLayer } = useRipple();

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.94 }}
      onClick={addRipple}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={`relative ${className ?? ""}`}
    >
      {children}
      {RippleLayer}
    </motion.a>
  );
}

export function Hero() {
  const typed = useTypedRoles(profile.roles);

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-28 lg:pb-0">
      <div className="grid-field absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-signal/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-40 h-[380px] w-[420px] rounded-full bg-violet/10 blur-[110px]" />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-strong bg-panel/60 px-3 py-1.5"
          >
            <span className="animate-pulse-dot h-2 w-2 rounded-full bg-signal" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-signal">
              status: secure &amp; available
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-balance font-display text-5xl font-medium leading-[1.05] tracking-tight text-text sm:text-6xl lg:text-7xl"
          >
            {profile.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 flex h-8 items-center font-mono text-lg text-signal sm:text-xl"
          >
            <span className="mr-2 text-text-faint">&gt;</span>
            <span>{typed}</span>
            <span className="ml-0.5 inline-block h-5 w-[2px] animate-pulse bg-signal" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-text-muted"
          >
            {profile.tagline} Based in {profile.location} — originally from{" "}
            {profile.origin}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 font-medium text-bg transition-shadow hover:shadow-[0_0_40px_-8px_var(--color-signal)]"
            >
              View projects <ArrowUpRight size={16} />
            </MagneticButton>
            <MagneticButton
              href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/${profile.resumeFile}`}
              className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3 font-medium text-text transition-colors hover:border-signal/50 hover:text-signal"
            >
              Download résumé <Download size={16} />
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-12 flex items-center gap-2 font-mono text-xs text-text-faint"
          >
            <ShieldCheck size={14} className="text-signal" />
            GIAC · CompTIA Security+ · SkillsUSA TX State Champion
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="animate-float mx-auto w-full max-w-sm"
        >
          <Portrait />
        </motion.div>

        {/* Small-screen scroll cue. A normal grid row after the portrait, so
            it sits clear of both the image and the mode switch, cannot be
            clipped, and cannot leave the viewport. Removed at `lg`, where the
            absolutely positioned one below takes over. */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col items-center gap-2 pt-2 text-text-faint lg:hidden"
          aria-label="Scroll to About section"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest">
            scroll
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            <ArrowDown size={14} />
          </motion.span>
        </motion.a>
      </div>

      {/* Desktop scroll cue — unchanged. Hidden below `lg`, where it used to
          land on top of the portrait: the section is `min-h-screen`, but once
          the grid stacks to one column the content grows taller than the
          viewport, so "bottom of the section" stops meaning "bottom of the
          screen". The small-screen cue is a flow element inside the grid
          instead. */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-text-faint lg:flex"
        aria-label="Scroll to About section"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <ArrowDown size={14} />
        </motion.span>
      </motion.a>
    </section>
  );
}
