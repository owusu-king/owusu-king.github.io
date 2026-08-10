"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, ImageIcon } from "lucide-react";
import { profile } from "@/lib/data";

/**
 * Hero portrait — one object with two faces.
 *
 * INTERACTION: clicking or tapping the frame rotates it around its vertical
 * axis to reveal the photograph on the reverse of the illustration. The two
 * states are genuinely the front and back of the same card rather than two
 * images being crossfaded into each other.
 *
 * The rotation carries a slight scale dip at the midpoint. That is what sells
 * the depth: a pure rotateY reads as a flat squash, because nothing about the
 * object appears to move toward or away from the viewer. Perspective is set
 * long (1400px) — a shorter value exaggerates the near edge and makes the
 * flip feel cheap at this size.
 *
 * LAYOUT: the mode switch now sits in normal flow beneath the frame on
 * tablet and mobile, and keeps its original absolute placement from `lg` up
 * so the desktop composition is unchanged. Previously it was absolutely
 * positioned at every width, hanging outside the frame's own bounds, inside
 * an ancestor with `overflow-hidden`, on an element carrying `animate-float`
 * — so it could be clipped and could collide with the scroll indicator.
 *
 * PHOTOGRAPH: drop a file at `public/portrait.jpg`. Base-path prefixing and
 * the missing-file state are both handled below; nothing else to change.
 */

const PHOTO_SRC = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/photo.png`;

const FACE =
  "absolute inset-0 overflow-hidden rounded-[2rem] border border-border-strong bg-panel";

export function Portrait() {
  const [mode, setMode] = useState<"illustration" | "photo">("illustration");
  const [photoFailed, setPhotoFailed] = useState(false);
  const prefersReduced = useReducedMotion() ?? false;
  const statusId = useId();

  const showingPhoto = mode === "photo";
  const flip = () => setMode((m) => (m === "photo" ? "illustration" : "photo"));

  return (
    <div className="relative">
      {/* The frame itself is the control, so tap and click both work and
          keyboard users get the interaction for free from a real <button>. */}
      <button
        type="button"
        onClick={flip}
        aria-pressed={showingPhoto}
        aria-describedby={statusId}
        aria-label={
          showingPhoto
            ? `Portrait of ${profile.name}, showing the photograph. Activate to flip back to the illustration.`
            : `Portrait of ${profile.name}, showing the illustration. Activate to flip to the photograph.`
        }
        style={{ perspective: 1400 }}
        className="block w-full cursor-pointer [-webkit-tap-highlight-color:transparent]"
      >
        <motion.div
          initial={false}
          animate={
            prefersReduced
              ? { rotateY: 0 }
              : { rotateY: showingPhoto ? 180 : 0, scale: [1, 0.93, 1] }
          }
          transition={
            prefersReduced
              ? { duration: 0.01 }
              : {
                  rotateY: { duration: 0.72, ease: [0.65, 0, 0.35, 1] },
                  scale: {
                    duration: 0.72,
                    times: [0, 0.5, 1],
                    ease: "easeInOut",
                  },
                }
          }
          style={{ transformStyle: "preserve-3d" }}
          className="relative aspect-[4/5] w-full"
        >
          {/* ---- Front face: illustration ---- */}
          <div
            style={
              prefersReduced
                ? undefined
                : {
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }
            }
            className={FACE}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/illustrated.png`}
              alt={`Illustrated portrait of ${profile.name}`}
              width={800}
              height={1000}
              decoding="async"
              className="h-full w-full object-cover"
            />
            {/* scan sweep accent */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]">
              <div className="animate-scan absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-signal/10 to-transparent" />
            </div>
          </div>

          {/* ---- Back face: photograph ----
              Under reduced motion the card never rotates, so the back face
              stacks on top and crossfades instead. */}
          <div
            style={
              prefersReduced
                ? { opacity: showingPhoto ? 1 : 0, transition: "opacity 120ms linear" }
                : {
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }
            }
            className={FACE}
          >
            {photoFailed ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-panel-2 px-6 text-center">
                <ImageIcon size={28} className="text-text-faint" />
                <p className="max-w-[14rem] font-mono text-xs text-text-faint">
                  portrait.jpg not found — drop a headshot in /public and it
                  will appear here automatically
                </p>
              </div>
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={PHOTO_SRC}
                alt=""
                width={800}
                height={1000}
                decoding="async"
                onError={() => setPhotoFailed(true)}
                className="h-full w-full object-cover"
              />
            )}
            {/* scan sweep accent */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]">
              <div className="animate-scan absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-signal/10 to-transparent" />
            </div>
          </div>
        </motion.div>
      </button>

      {/* Mode switch — identical design to before. In flow below the frame up
          to `lg`, original absolute placement from `lg` up. */}
      <div className="mx-auto mt-6 flex w-fit items-center gap-1 rounded-full border border-border-strong bg-panel p-1 shadow-lg lg:absolute lg:-bottom-5 lg:left-1/2 lg:mt-0 lg:-translate-x-1/2">
        <button
          type="button"
          onClick={() => setMode("illustration")}
          aria-pressed={!showingPhoto}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
            mode === "illustration"
              ? "bg-signal-soft text-signal"
              : "text-text-faint hover:text-text-muted"
          }`}
        >
          <Sparkles size={12} /> Illustrated
        </button>
        <button
          type="button"
          onClick={() => setMode("photo")}
          aria-pressed={showingPhoto}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
            mode === "photo"
              ? "bg-signal-soft text-signal"
              : "text-text-faint hover:text-text-muted"
          }`}
        >
          <ImageIcon size={12} /> Photo
        </button>
      </div>

      {/* Announce the change without moving focus. */}
      <span id={statusId} aria-live="polite" className="sr-only">
        {showingPhoto ? "Showing photograph" : "Showing illustrated portrait"}
      </span>
    </div>
  );
}

function VectorPortrait() {
  return (
    <svg
      viewBox="0 0 400 500"
      className="h-full w-full"
      role="img"
      aria-label={`Editorial illustrated portrait of ${profile.name}`}
    >
      <defs>
        <linearGradient id="bg-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#171c27" />
          <stop offset="100%" stopColor="#0d1117" />
        </linearGradient>
        <linearGradient id="bust-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3ed6b8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1c8f7a" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="face-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a313e" />
          <stop offset="100%" stopColor="#1a1f28" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#3ed6b8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#3ed6b8" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="500" fill="url(#bg-grad)" />
      <circle cx="200" cy="160" r="220" fill="url(#glow)" />

      {/* circuit grid accents */}
      <g stroke="#3ed6b8" strokeOpacity="0.12" strokeWidth="1">
        <line x1="0" y1="80" x2="400" y2="80" />
        <line x1="0" y1="420" x2="400" y2="420" />
        <line x1="60" y1="0" x2="60" y2="500" />
        <line x1="340" y1="0" x2="340" y2="500" />
      </g>
      <g fill="#3ed6b8" fillOpacity="0.5">
        <circle cx="60" cy="80" r="3" />
        <circle cx="340" cy="80" r="3" />
        <circle cx="60" cy="420" r="3" />
        <circle cx="340" cy="420" r="3" />
      </g>

      {/* shoulders / bust */}
      <path
        d="M60 500 C 60 380, 120 340, 200 340 C 280 340, 340 380, 340 500 Z"
        fill="url(#bust-grad)"
      />
      <path
        d="M60 500 C 60 380, 120 340, 200 340 C 280 340, 340 380, 340 500 Z"
        fill="none"
        stroke="#0a0d12"
        strokeOpacity="0.15"
        strokeWidth="2"
      />

      {/* collar / shirt detail */}
      <path
        d="M170 355 L200 400 L230 355"
        fill="none"
        stroke="#0d1117"
        strokeOpacity="0.35"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* neck */}
      <rect x="178" y="300" width="44" height="60" rx="14" fill="#232a35" />

      {/* head */}
      <ellipse cx="200" cy="230" rx="78" ry="92" fill="url(#face-grad)" />

      {/* geometric facial planes for premium vector-portrait feel */}
      <path d="M122 230 L200 200 L200 300 L130 290 Z" fill="#20262f" fillOpacity="0.6" />
      <path d="M278 230 L200 200 L200 300 L270 290 Z" fill="#161b22" fillOpacity="0.6" />

      {/* hairline / hairstyle silhouette */}
      <path
        d="M122 210 C 130 150, 165 138, 200 138 C 235 138, 270 150, 278 210 C 278 190, 250 160, 200 160 C 150 160, 122 190, 122 210 Z"
        fill="#12161f"
      />
      <path
        d="M118 205 C 112 175, 122 150, 150 140 C 130 158, 124 182, 128 208 Z"
        fill="#0d1117"
      />
      <path
        d="M282 205 C 288 175, 278 150, 250 140 C 270 158, 276 182, 272 208 Z"
        fill="#0d1117"
      />

      {/* subtle brow + eye + nose marks — abstracted, not literal */}
      <g stroke="#3ed6b8" strokeOpacity="0.7" strokeWidth="2.5" strokeLinecap="round">
        <line x1="168" y1="222" x2="188" y2="220" />
        <line x1="212" y1="220" x2="232" y2="222" />
      </g>
      <path
        d="M200 226 L196 258 L206 262"
        fill="none"
        stroke="#0a0d12"
        strokeOpacity="0.3"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M178 278 C 190 286, 210 286, 222 278"
        fill="none"
        stroke="#3ed6b8"
        strokeOpacity="0.55"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* jaw / cheekbone highlight lines for editorial shading */}
      <path
        d="M138 250 C 145 275, 160 295, 180 302"
        fill="none"
        stroke="#3ed6b8"
        strokeOpacity="0.2"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M262 250 C 255 275, 240 295, 220 302"
        fill="none"
        stroke="#0a0d12"
        strokeOpacity="0.25"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}
