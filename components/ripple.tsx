"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type RippleT = { id: number; x: number; y: number; size: number };

export function useRipple() {
  const [ripples, setRipples] = useState<RippleT[]>([]);

  const addRipple = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.8;
      const id = Date.now() + Math.random();
      const ripple: RippleT = {
        id,
        x: e.clientX - rect.left - size / 2,
        y: e.clientY - rect.top - size / 2,
        size,
      };
      setRipples((prev) => [...prev, ripple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 650);
    },
    []
  );

  const RippleLayer = (
    <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ opacity: 0.45, scale: 0 }}
            animate={{ opacity: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: r.x,
              top: r.y,
              width: r.size,
              height: r.size,
              borderRadius: "9999px",
              background:
                "radial-gradient(circle, var(--color-signal-2) 0%, transparent 70%)",
            }}
          />
        ))}
      </AnimatePresence>
    </span>
  );

  return { addRipple, RippleLayer };
}
