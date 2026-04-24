"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const STATS = [
  { label: "STYLES",  value: "30"    },
  { label: "MOOD",    value: "Power" },
  { label: "DROPS",   value: "1 May" },
];

export default function DevilApprovedSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center">

          {/* Left on desktop, below on mobile */}
          <motion.div
            className="relative flex items-center justify-center order-2"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease }}
          >
            <motion.div
              className="relative z-10 w-[65%] md:w-[55%] lg:w-[70%] mx-auto"
              style={{ y: imageY }}
            >
              <Image
                src="/images/miranda.png"
                alt="Miranda Priestly — Devil Approved"
                width={600}
                height={700}
                className="w-full h-auto drop-shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
              />
            </motion.div>

          </motion.div>

          {/* Right on desktop, above on mobile */}
          <motion.div
            className="order-1"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease }}
          >
            <h2 className="editorial-heading text-[clamp(2rem,5.5vw,3rem)] text-white mb-6 md:mb-8">
              Nothing satisfies
              <br />
              like a <em>stamp</em>
              <br />
              of approval.
            </h2>

            <div className="space-y-4 mb-8 md:mb-10">
              <p
                className="text-white/40 text-sm leading-[1.75] max-w-md"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Every piece in this capsule has been judged — not by the market,
                not by committee, but by the only eye that matters. If it made the
                cut, there&apos;s a reason.
              </p>
              <p
                className="text-white/40 text-sm leading-[1.75] max-w-md"
                style={{ fontFamily: "var(--font-body)" }}
              >
                The Devil Approved seal isn&apos;t a badge. It&apos;s a verdict.
              </p>
            </div>

            {/* Stats bar */}
            <motion.div
              className="mb-10 md:mb-14 pt-7 md:pt-9 border-t border-white/10"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease }}
            >
              <div className="grid grid-cols-3 gap-3 sm:gap-10">
                {STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 14 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.4 + i * 0.09, ease }}
                  >
                    <div className="tracking-editorial text-white/30 text-[0.52rem] mb-2">
                      {stat.label}
                    </div>
                    <div
                      className="font-accent text-[1.6rem] sm:text-[2rem] md:text-[2.6rem] lg:text-[3rem] text-white leading-none"
                      style={{ fontStyle: stat.label === "DROPS" ? "italic" : "normal" }}
                    >
                      {stat.value}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>


          </motion.div>

        </div>
      </div>
    </section>
  );
}
