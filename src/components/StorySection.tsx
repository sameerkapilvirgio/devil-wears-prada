"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const STATS = [
  { label: "STYLES",   value: "30"    },
  { label: "ATELIERS", value: "04"    },
  { label: "DROPS",    value: "1 May" },
  { label: "CHAPTER",  value: "II"    },
];

export default function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ background: "linear-gradient(to bottom, var(--color-beige), var(--color-cream))" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-20 md:pt-28 lg:pt-36 pb-16 md:pb-32 lg:pb-44">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-start">

          {/* Left — copy */}
          <div className="order-1">

            {/* Eyebrow label */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease }}
              className="flex items-center gap-3 mb-6 md:mb-10"
            >
              <div className="w-6 h-px bg-[var(--color-red)]" />
              <span className="tracking-editorial text-[var(--color-gray)] text-[0.6rem]">
                DEVIL WEARS PRADA COLLECTION
              </span>
            </motion.div>

            <motion.h2
              className="editorial-heading text-[clamp(2.6rem,7.5vw,3.4rem)] text-[var(--color-dark)] mb-8 md:mb-10"
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            >
              A wardrobe
              <br />
              for the{" "}
              <em>second</em>
              <br />
              chapter.
            </motion.h2>

            {/* Body text */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8 mb-10 md:mb-14"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              <p className="text-[var(--color-dark)]/70 text-[0.82rem] leading-[1.75]" style={{ fontFamily: "var(--font-body)" }}>
                The capsule begins where the film ended — with the slow,
                deliberate walk away from a job that fit too tightly. It outfits
                the woman who returned, twenty years later, to find that the
                industry had changed everything except itself.
              </p>
              <p className="text-[var(--color-dark)]/70 text-[0.82rem] leading-[1.75]" style={{ fontFamily: "var(--font-body)" }}>
                Twelve pieces. Three silhouettes. One philosophy: that a dress
                is, at its best, a sentence you can wear. None of them ask
                permission.
              </p>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              className="mb-10 md:mb-14 pt-7 md:pt-9 border-t border-[var(--color-dark)]/10"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease }}
            >
              <div className="grid grid-cols-4 gap-3 sm:gap-10">
                {STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 14 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.4 + i * 0.09, ease }}
                  >
                    <div className="tracking-editorial text-[var(--color-gray)] text-[0.52rem] mb-2">
                      {stat.label}
                    </div>
                    <div
                      className="font-accent text-[1.6rem] sm:text-[2rem] md:text-[2.6rem] lg:text-[3rem] text-[var(--color-dark)] leading-none"
                      style={{ fontStyle: stat.label === "DROPS" ? "italic" : "normal" }}
                    >
                      {stat.value}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.55, ease }}
            >
              <button className="group inline-flex items-center gap-3 border border-[var(--color-dark)]/25 px-8 py-3.5 text-[var(--color-dark)] text-xs tracking-[0.15em] uppercase cursor-pointer hover:bg-[var(--color-dark)] hover:text-white hover:border-[var(--color-dark)] transition-all duration-400 rounded-sm">
                Get notified when it drops
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className="group-hover:translate-x-1 transition-transform duration-300">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>

          </div>

          {/* Right — Miranda image */}
          <motion.div
            className="relative w-full max-w-[260px] md:max-w-[400px] lg:max-w-none mx-auto lg:mx-0 flex items-end justify-center order-2 hidden md:flex"
            initial={{ opacity: 0, scale: 0.93 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.25, ease }}
          >
            <motion.div className="relative z-10 w-[72%] mt-4 lg:mt-16" style={{ y: imageY }}>
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
