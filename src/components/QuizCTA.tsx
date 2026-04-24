"use client";

import { motion } from "framer-motion";

export default function QuizCTA({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="relative py-14 md:py-20 px-5 md:px-12" style={{ background: "#faf8f4" }}>
      {/* Banner card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-2xl"
        style={{
          maxWidth: 900,
          margin: "0 auto",
          background: "#161616",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Red glow inside banner */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% 110%, rgba(240,13,12,0.14) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: "linear-gradient(to right, transparent, rgba(240,13,12,0.35), transparent)" }}
        />

        <div className="relative z-10 py-16 md:py-20 px-8 md:px-16 text-center">
          <h2 className="font-accent italic text-[clamp(2.2rem,6.5vw,3.8rem)] text-white leading-[1.05] mb-5">
            Which runway icon
            <br className="hidden sm:block" /> lives{" "}
            <span style={{ color: "var(--color-red)" }}>inside</span> you?
          </h2>

          <p
            className="text-white/35 text-sm leading-[1.85] max-w-sm mx-auto mb-10"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Six questions. Two choices each. One alter ego that&apos;s been
            waiting in your wardrobe all along.
          </p>

          <button
            onClick={onOpen}
            className="group inline-flex items-center gap-3 px-10 py-4 text-white tracking-[0.18em] uppercase text-[0.68rem] cursor-pointer transition-colors duration-300 rounded-sm"
            style={{ fontFamily: "var(--font-body)", background: "var(--color-red)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--color-deep-red)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--color-red)")}
          >
            Take the Quiz
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className="group-hover:translate-x-1.5 transition-transform duration-300">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
