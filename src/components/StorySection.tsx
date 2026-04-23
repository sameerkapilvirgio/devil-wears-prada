"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const STATS = [
  { label: "PIECES", value: "12" },
  { label: "ATELIERS", value: "04" },
  { label: "RELEASED", value: "A/W" },
  { label: "CHAPTER", value: "II" },
];

export default function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ background: "var(--color-cream)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-10 pb-4 md:py-32 lg:py-40">
        {/* ── Top: Headline + Collage ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12 lg:gap-16 items-start">
          {/* Left — Headline */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease }}
            >
              <div className="tracking-editorial text-[var(--color-gray)] text-[0.6rem] mb-6 md:mb-8">
                DEVIL WEARS PRADA COLLECTION
              </div>
              <h2
                className="editorial-heading text-[clamp(1.8rem,4vw,3.2rem)] text-[var(--color-dark)] mb-6 md:mb-8"
              >
                A wardrobe
                <br />
                for the{" "}
                <em>second</em>
                <br />
                chapter.
              </h2>
            </motion.div>

            {/* Body text — two columns */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-10 md:mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              <p
                className="text-[var(--color-dark)] text-[0.8rem] leading-[1.7]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                The capsule begins where the film ended — with the slow,
                deliberate walk away from a job that fit too tightly. It outfits
                the woman who returned, twenty years later, to find that the
                industry had changed everything except itself.
              </p>
              <p
                className="text-[var(--color-dark)] text-[0.8rem] leading-[1.7]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Twelve pieces. Three silhouettes. One philosophy: that a dress
                is, at its best, a sentence you can wear. None of them ask
                permission.
              </p>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              className="mb-10 md:mb-12 pt-8 border-t border-[var(--color-dark)]/10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35, ease }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12">
                {STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.45 + i * 0.1, ease }}
                  >
                    <div className="tracking-editorial text-[var(--color-gray)] text-[0.55rem] mb-3">
                      {stat.label}
                    </div>
                    <div
                      className="font-accent text-3xl md:text-4xl lg:text-5xl text-[var(--color-dark)]"
                      style={{ fontStyle: stat.label === "RELEASED" ? "italic" : "normal" }}
                    >
                      {stat.value}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Get Notified CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.55, ease }}
            >
              <button className="bg-[var(--color-dark)] px-10 py-4 rounded-xl text-white text-sm tracking-[0.1em] uppercase cursor-pointer hover:bg-black transition-colors">
                Get notified when it drops
              </button>
            </motion.div>
          </div>

          {/* Right — Miranda collage */}
          <motion.div
            className="relative w-full max-w-[300px] md:max-w-[500px] lg:max-w-none mx-auto lg:mx-0 lg:aspect-square"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease }}
          >
            {/* Ink splatter background element */}
            <div
              className="absolute inset-0 z-0"
              style={{
                background: "radial-gradient(ellipse at 60% 50%, rgba(26,26,26,0.04) 0%, transparent 70%)",
              }}
            />

            {/* Main Miranda image */}
            <motion.div
              className="relative z-10 w-[75%] mx-auto"
              style={{ y: imageY }}
            >
              <Image
                src="/images/devil-approved.png"
                alt="Miranda Priestly — Devil Approved"
                width={600}
                height={700}
                className="w-full h-auto drop-shadow-2xl"
              />
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
