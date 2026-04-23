"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface ParallaxItem {
  src: string;
  alt: string;
  top: string;
  left: string;
  width: string;
  speed: 1 | 2 | 3 | 4 | 5;
  z: number;
  rotate?: number;
  mobileHide?: boolean;
  shadow?: boolean;
}

// Speed & z assigned by size: big → slow/back, small → fast/front
const ITEMS: ParallaxItem[] = [
  // ── Row 1 — top band (0–20%) ──
  {
    src: "/images/parallax/rqZQYH.tif.png",
    alt: "White trench coat",
    top: "1%",
    left: "0%",
    width: "clamp(120px, 14vw, 200px)",
    speed: 4,    // 200px → fast
    z: 7,
  },
  {
    src: "/images/parallax/HY9i8U.tif.png",
    alt: "Black evening dress",
    top: "0%",
    left: "10%",
    width: "clamp(120px, 14vw, 200px)",
    speed: 4,    // 200px → fast
    z: 7,
  },
  {
    src: "/images/parallax/Hd8MwF.tif.png",
    alt: "Florals for spring — groundbreaking",
    top: "3%",
    left: "26%",
    width: "clamp(140px, 18vw, 260px)",
    speed: 3,    // 260px → medium
    z: 5,
  },
  {
    src: "/images/parallax/ttcZ9q.tif.png",
    alt: "Green designer coat",
    top: "0%",
    left: "38%",
    width: "clamp(140px, 18vw, 260px)",
    speed: 3,    // 260px → medium
    z: 4,
    shadow: true,
  },
  {
    src: "/images/parallax/j9BBxz.tif.png",
    alt: "Vogue magazines",
    top: "2%",
    left: "52%",
    width: "clamp(140px, 18vw, 260px)",
    speed: 3,    // 260px → medium
    z: 5,
    rotate: 3,
  },
  {
    src: "/images/parallax/OdNyiS.tif.png",
    alt: "Red stiletto heel",
    top: "4%",
    left: "64%",
    width: "clamp(140px, 20vw, 280px)",
    speed: 2,    // 280px → slow-medium
    z: 4,
    rotate: -5,
  },
  {
    src: "/images/parallax/YsmW76.png",
    alt: "Fashion illustration",
    top: "0%",
    left: "76%",
    width: "clamp(180px, 24vw, 340px)",
    speed: 1,    // 340px → slowest
    z: 2,
  },

  // ── Row 2 — upper-middle band (22–42%) ──
  {
    src: "/images/parallax/pjlZpe.tif.png",
    alt: "Arc de Triomphe",
    top: "22%",
    left: "4%",
    width: "clamp(180px, 24vw, 320px)",
    speed: 1,    // 320px → slowest
    z: 1,
  },
  {
    src: "/images/parallax/fOUH83.tif.png",
    alt: "Miranda Priestly",
    top: "24%",
    left: "22%",
    width: "clamp(180px, 24vw, 320px)",
    speed: 2,    // 320px → slow
    z: 3,
    shadow: true,
  },
  {
    src: "/images/parallax/pcJlpD.tif.png",
    alt: "Pearl necklace",
    top: "26%",
    left: "44%",
    width: "clamp(100px, 14vw, 190px)",
    speed: 4,    // 190px → fast
    z: 7,
    rotate: 25,
    mobileHide: true,
  },
  {
    src: "/images/parallax/AAsSn1.tif.png",
    alt: "New York",
    top: "26%",
    left: "58%",
    width: "clamp(140px, 20vw, 280px)",
    speed: 2,    // 280px → slow-medium
    z: 3,
    rotate: -3,
  },
  {
    src: "/images/parallax/6D7JTb.tif.png",
    alt: "Fashion outfit",
    top: "28%",
    left: "78%",
    width: "clamp(100px, 16vw, 220px)",
    speed: 4,    // 220px → fast
    z: 6,
    mobileHide: true,
  },

  // ── Row 3 — lower-middle band (50–65%) ──
  {
    src: "/images/parallax/addNpi.tif.png",
    alt: "The Devil Wears Prada cast",
    top: "52%",
    left: "0%",
    width: "clamp(220px, 30vw, 400px)",
    speed: 1,    // 400px → slowest
    z: 1,
    shadow: true,
  },
  {
    src: "/images/parallax/XjR0wh.tif.png",
    alt: "Starbucks cup",
    top: "52%",
    left: "30%",
    width: "clamp(50px, 7vw, 90px)",
    speed: 5,    // 90px → fastest
    z: 9,
    rotate: -8,
    mobileHide: true,
  },
  {
    src: "/images/parallax/l8muz0.tif.png",
    alt: "YSL label",
    top: "54%",
    left: "36%",
    width: "clamp(220px, 30vw, 400px)",
    speed: 1,    // 400px → slowest
    z: 2,
    rotate: -4,
  },
  {
    src: "/images/parallax/tEZlR5.tif.png",
    alt: "Dramatic close-up",
    top: "56%",
    left: "62%",
    width: "clamp(140px, 20vw, 260px)",
    speed: 3,    // 260px → medium
    z: 5,
  },
  {
    src: "/images/parallax/5GqyoD.tif.png",
    alt: "Prada shoes",
    top: "50%",
    left: "76%",
    width: "clamp(120px, 16vw, 220px)",
    speed: 4,    // 220px → fast
    z: 8,
    rotate: -12,
    shadow: true,
  },
];

interface MoodboardSectionProps {
  onOpenQuiz?: () => void;
}

export default function MoodboardSection({
  onOpenQuiz,
}: MoodboardSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [140, -140]);
  const y4 = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const y5 = useTransform(scrollYProgress, [0, 1], [280, -280]);

  const yOffsets: Record<1 | 2 | 3 | 4 | 5, typeof y1> = {
    1: y1,
    2: y2,
    3: y3,
    4: y4,
    5: y5,
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "var(--color-cream)" }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Runway x Virgio heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex justify-center pt-6 md:pt-10"
          style={{ marginBottom: 8 }}
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

        {/* ── Parallax moodboard ── */}
        <div className="relative w-full h-[90vh] sm:h-[95vh] md:h-[105vh] lg:h-[115vh]">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.src}
              className={`absolute will-change-transform ${item.mobileHide ? "hidden md:block" : ""}`}
              style={{
                top: item.top,
                left: item.left,
                width: item.width,
                zIndex: item.z,
                y: yOffsets[item.speed],
                rotate: item.rotate ?? 0,
                filter: item.shadow
                  ? "drop-shadow(0 12px 32px rgba(0,0,0,0.15))"
                  : "drop-shadow(0 4px 12px rgba(0,0,0,0.06))",
              }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.035,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-auto select-none pointer-events-none"
                draggable={false}
              />
            </motion.div>
          ))}
        </div>

        {/* ── CTA block ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center text-center px-6 pb-10 md:pb-16"
        >
          <p className="font-accent italic text-lg sm:text-xl md:text-2xl lg:text-3xl leading-[1.5] text-[var(--color-dark)] max-w-xl mb-8">
            Sharp tailoring meets quiet menace. Twelve pieces you didn&apos;t
            know you needed — until now.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button className="bg-[var(--color-black)] px-8 py-4 rounded-full text-white text-sm md:text-base tracking-[0.06em] cursor-pointer hover:bg-black/80 transition-colors">
              Join the Waitlist
            </button>
            {onOpenQuiz && (
              <button
                onClick={onOpenQuiz}
                className="border-2 border-[var(--color-black)] px-8 py-4 rounded-full text-[var(--color-black)] text-sm md:text-base tracking-[0.06em] cursor-pointer hover:bg-[var(--color-black)] hover:text-white transition-all duration-300"
              >
                Take the Quiz
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
