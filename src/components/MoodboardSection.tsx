"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export default function MoodboardSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "var(--color-cream)", paddingTop: 24, paddingBottom: 24 }}
    >
      <div style={{ maxWidth: 1100, marginLeft: "auto", marginRight: "auto", paddingLeft: 0, paddingRight: 0 }}>
        {/* Header: Runway heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
          style={{ marginBottom: 16 }}
        >
          <div className="relative w-full max-w-2xl h-16 sm:h-20 md:h-28 lg:h-32">
            <Image
              src="/images/runway-heading.png"
              alt="Runway x Virgio"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Collage image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full overflow-hidden"
          style={{ marginBottom: 16 }}
        >
          <motion.div
            className="relative w-full aspect-[16/9] md:aspect-[2/1]"
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/images/runwayx-image.png"
              alt="Fashion moodboard collage"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </motion.div>
        </motion.div>

        {/* Text + Devil Approved — always 2-col grid */}
        <div
          className="grid items-center"
          style={{ gridTemplateColumns: "3fr 2fr", gap: 16 }}
        >
          {/* Left: body text + button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col justify-center items-start gap-5"
          >
            <p className="font-accent italic text-base sm:text-lg md:text-xl lg:text-2xl leading-[1.6] text-[var(--color-dark)] text-left w-full">
              Sharp tailoring meets quiet menace. Twelve pieces you didn&apos;t know
              you needed — until now.
            </p>
            <button className="bg-[var(--color-black)] px-8 py-4 rounded-2xl text-white text-sm md:text-base tracking-[0.02em] cursor-pointer hover:bg-black/80 transition-colors">
              Waitlist Now
            </button>
          </motion.div>

          {/* Right: Devil Approved image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative w-full max-w-[200px] md:max-w-[260px] aspect-[3/4] mx-auto overflow-hidden">
              <motion.div
                className="relative w-full h-full"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src="/images/devil-approved.png"
                  alt="Devil Approved"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 160px, 260px"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
