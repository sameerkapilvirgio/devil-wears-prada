"use client";

import { motion } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function WaitlistSection({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="relative py-20 md:py-28 px-6" style={{ background: "#0a0a0a" }}>
      <motion.div
        className="max-w-xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease }}
      >
        <h2 className="font-accent italic text-[clamp(1.8rem,5vw,2.8rem)] text-white leading-[1.1] mb-4">
          Be the first to wear
          <br />
          the <span className="text-[var(--color-red)]">second</span> chapter.
        </h2>
        <p
          className="text-white/35 text-sm leading-[1.75] max-w-sm mx-auto mb-10"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Drop one lands May 2026. Join the waitlist and we&apos;ll
          make sure you&apos;re dressed before everyone else.
        </p>

        <button
          onClick={onOpen}
          className="group inline-flex items-center gap-2.5 px-10 py-3.5 text-white text-[1rem] tracking-[0.18em] uppercase hover:bg-[var(--color-deep-red)] transition-all duration-300 cursor-pointer rounded-xl"
          style={{ background: "var(--color-red)", fontFamily: "var(--font-body)" }}
        >
          Join the Waitlist
        </button>
      </motion.div>
    </section>
  );
}
