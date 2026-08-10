"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { TiltCard } from "@/components/tilt-card";
import { Reveal } from "@/components/reveal";
import { useRipple } from "@/components/ripple";

const schema = z.object({
  name: z.string().min(2, "Enter your full name."),
  email: z.string().email("Enter a valid email address."),
  message: z.string().min(10, "Add a little more detail (10+ characters)."),
});

type FormValues = z.infer<typeof schema>;

export function Contact() {
  const [sent, setSent] = useState(false);
  const { addRipple, RippleLayer } = useRipple();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    // Static export has no server route — this opens a pre-filled email as
    // the default fallback. Swap for a form provider (Formspree, Resend,
    // etc.) endpoint if you want inbox delivery without a mail client.
    const subject = encodeURIComponent(`Portfolio inquiry from ${values.name}`);
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    await new Promise((r) => setTimeout(r, 500));
    setSent(true);
    reset();
  };

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-32">
      <SectionHeading
        eyebrow="06 — Contact"
        title="Let's build something that holds up."
        description="Open to IT support, cybersecurity analyst, and AI-adjacent roles in Houston or remote."
      />

      <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
        <TiltCard tilt={3} className="glass flex h-full flex-col justify-between rounded-3xl p-8">
          <div>
            <h3 className="font-display text-lg font-medium text-text">
              Direct channels
            </h3>
            <div className="mt-6 space-y-4">
              <a
                href={profile.socials.email}
                className="flex items-center gap-3 text-sm text-text-muted transition-colors hover:text-signal"
              >
                <Mail size={16} /> {profile.email}
              </a>
              <a
                href={profile.socials.github}
                className="flex items-center gap-3 text-sm text-text-muted transition-colors hover:text-signal"
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href={profile.socials.linkedin}
                className="flex items-center gap-3 text-sm text-text-muted transition-colors hover:text-signal"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>
          <p className="mt-10 font-mono text-xs text-text-faint">
            {profile.location} · responses typically within 24h
          </p>
        </TiltCard>
        </Reveal>

        <Reveal delay={0.1}>
        <TiltCard tilt={3} className="glass relative overflow-hidden rounded-3xl p-8">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full min-h-[320px] flex-col items-center justify-center gap-4 text-center"
              >
                <CheckCircle2 className="text-signal" size={40} />
                <h3 className="font-display text-xl font-medium text-text">
                  Message ready to send
                </h3>
                <p className="max-w-sm text-sm text-text-muted">
                  Your email client should have opened with the message pre-filled.
                  If it didn&apos;t, reach out directly at {profile.email}.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-2 font-mono text-xs uppercase tracking-widest text-signal"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
              >
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-wider text-text-faint">
                    Name
                  </label>
                  <input
                    {...register("name")}
                    className="mt-2 w-full rounded-xl border border-border-strong bg-panel-2/60 px-4 py-3 text-sm text-text outline-none transition-colors focus:border-signal/60"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-amber">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="font-mono text-[11px] uppercase tracking-wider text-text-faint">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    className="mt-2 w-full rounded-xl border border-border-strong bg-panel-2/60 px-4 py-3 text-sm text-text outline-none transition-colors focus:border-signal/60"
                    placeholder="you@company.com"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-amber">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="font-mono text-[11px] uppercase tracking-wider text-text-faint">
                    Message
                  </label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    className="mt-2 w-full resize-none rounded-xl border border-border-strong bg-panel-2/60 px-4 py-3 text-sm text-text outline-none transition-colors focus:border-signal/60"
                    placeholder="What are you working on?"
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-amber">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={addRipple}
                  className="relative mt-2 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-signal px-6 py-3 font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {isSubmitting ? "Sending…" : "Send message"} <Send size={15} />
                  {RippleLayer}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
