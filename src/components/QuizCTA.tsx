"use client";

import { motion } from "framer-motion";

export default function QuizCTA({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="relative bg-[#1a1a1a] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(155,27,48,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 py-20 md:py-28 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="tracking-editorial text-white/20 text-[0.6rem] mb-6">
            DISCOVER YOUR ALTER EGO
          </div>
          <h2 className="font-accent italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-5">
            Which runway icon
            <br className="hidden sm:block" /> lives inside you?
          </h2>
          <p className="text-white/30 text-sm md:text-base leading-relaxed max-w-md mx-auto mb-10">
            Six questions. Two choices each. One alter ego that&apos;s been
            waiting in your wardrobe all along.
          </p>
          <button
            onClick={onOpen}
            className="group inline-flex items-center gap-3 px-10 py-4 bg-[var(--color-red)] text-white tracking-[0.15em] uppercase text-xs md:text-sm cursor-pointer hover:bg-[var(--color-deep-red)] transition-all duration-300"
          >
            Take the Quiz
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="group-hover:translate-x-1 transition-transform duration-300"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
