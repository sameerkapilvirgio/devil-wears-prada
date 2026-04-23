"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

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
  mdTop?: string;
  mdLeft?: string;
  mdWidth?: string;
}

const ITEMS: ParallaxItem[] = [
  // ── Top band ──
  {
    src: "/images/parallax/rqZQYH.tif.png",
    alt: "White trench coat",
    top: "2%", left: "0%", width: "clamp(130px, 16vw, 230px)",
    mdTop: "0%", mdLeft: "2%",
    speed: 4, z: 7,
  },
  {
    src: "/images/parallax/HY9i8U.tif.png",
    alt: "Black evening dress",
    top: "4%", left: "14%", width: "clamp(130px, 16vw, 230px)",
    mdTop: "2%", mdLeft: "12%",
    speed: 4, z: 6,
  },
  {
    src: "/images/parallax/Hd8MwF.tif.png",
    alt: "Florals for spring — groundbreaking",
    top: "6%", left: "34%", width: "clamp(160px, 22vw, 300px)",
    mdTop: "8%", mdLeft: "24%",
    speed: 3, z: 9,
  },
  {
    src: "/images/parallax/OdNyiS.tif.png",
    alt: "Red stiletto heel",
    top: "0%", left: "62%", width: "clamp(90px, 13vw, 170px)",
    mdTop: "2%", mdLeft: "52%",
    speed: 5, z: 8, rotate: -5,
  },
  {
    src: "/images/parallax/YsmW76.png",
    alt: "Fashion illustration",
    top: "3%", left: "78%", width: "clamp(180px, 24vw, 340px)",
    mdTop: "0%", mdLeft: "74%",
    speed: 1, z: 2,
  },

  // ── Upper-middle band ──
  {
    src: "/images/parallax/pjlZpe.tif.png",
    alt: "Arc de Triomphe",
    top: "21%", left: "0%", width: "clamp(200px, 26vw, 360px)",
    mdTop: "22%", mdLeft: "4%",
    speed: 1, z: 1,
  },
  {
    src: "/images/parallax/fOUH83.tif.png",
    alt: "Miranda Priestly",
    top: "30%", left: "0%", width: "clamp(200px, 26vw, 360px)",
    mdTop: "28%", mdLeft: "20%",
    speed: 1, z: 3, shadow: true,
  },
  {
    src: "/images/parallax/ttcZ9q.tif.png",
    alt: "Green designer coat",
    top: "24%", left: "48%", width: "clamp(150px, 20vw, 280px)",
    mdTop: "18%", mdLeft: "42%",
    speed: 2, z: 6, shadow: true,
  },
  {
    src: "/images/parallax/j9BBxz.tif.png",
    alt: "Vogue magazines",
    top: "12%", left: "66%", width: "clamp(160px, 22vw, 300px)",
    mdTop: "14%", mdLeft: "58%",
    speed: 2, z: 5, rotate: 3,
  },
  {
    src: "/images/parallax/pcJlpD.tif.png",
    alt: "Pearl necklace",
    top: "28%", left: "44%", width: "clamp(120px, 16vw, 220px)",
    mdTop: "34%", mdLeft: "40%",
    speed: 5, z: 8, rotate: 25, mobileHide: true,
  },

  // ── Lower band ──
  {
    src: "/images/parallax/addNpi.tif.png",
    alt: "The Devil Wears Prada cast",
    top: "76%", left: "0%", width: "clamp(240px, 32vw, 440px)",
    mdTop: "62%", mdLeft: "0%",
    speed: 1, z: 1, shadow: true,
  },
  {
    src: "/images/parallax/AAsSn1.tif.png",
    alt: "New York",
    top: "34%", left: "76%", width: "clamp(160px, 22vw, 300px)",
    mdTop: "36%", mdLeft: "72%",
    speed: 2, z: 4, rotate: -3,
  },
  {
    src: "/images/parallax/6D7JTb.tif.png",
    alt: "Fashion outfit",
    top: "52%", left: "80%", width: "clamp(120px, 18vw, 250px)",
    mdTop: "54%", mdLeft: "82%",
    speed: 4, z: 6,
  },

  // ── Bottom band ──
  {
    src: "/images/parallax/l8muz0.tif.png",
    alt: "YSL label",
    top: "58%", left: "28%", width: "clamp(240px, 32vw, 440px)",
    mdTop: "52%", mdLeft: "30%",
    speed: 1, z: 5, rotate: -2,
  },
  {
    src: "/images/parallax/XjR0wh.tif.png",
    alt: "Starbucks cup",
    top: "62%", left: "8%", width: "clamp(80px, 10vw, 140px)",
    mdTop: "48%", mdLeft: "18%",
    speed: 5, z: 9, rotate: -8,
  },
  {
    src: "/images/parallax/tEZlR5.tif.png",
    alt: "Dramatic close-up",
    top: "70%", left: "60%", width: "clamp(160px, 22vw, 300px)",
    mdTop: "66%", mdLeft: "58%",
    speed: 3, z: 7, shadow: true,
  },
  {
    src: "/images/parallax/5GqyoD.tif.png",
    alt: "Prada shoes",
    top: "76%", left: "78%", width: "clamp(140px, 18vw, 250px)",
    mdTop: "72%", mdLeft: "76%",
    speed: 5, z: 10, rotate: -12, shadow: true,
  },
];

export default function MoodboardSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 200, damping: 50, mass: 0.3 };

  const y1raw = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const y2raw = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y3raw = useTransform(scrollYProgress, [0, 1], [140, -140]);
  const y4raw = useTransform(scrollYProgress, [0, 1], [180, -180]);
  const y5raw = useTransform(scrollYProgress, [0, 1], [220, -220]);

  const y1 = useSpring(y1raw, springConfig);
  const y2 = useSpring(y2raw, springConfig);
  const y3 = useSpring(y3raw, springConfig);
  const y4 = useSpring(y4raw, springConfig);
  const y5 = useSpring(y5raw, springConfig);

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
      {/* ── CTA block ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex flex-col items-center text-center px-6 pt-10 md:pt-16 pb-10 md:pb-14 relative z-10"
      >
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.2] text-[var(--color-dark)] max-w-lg mb-4" style={{ fontFamily: "var(--font-body)" }}>
          Get notified when it drops
        </h2>
        <p className="text-[var(--color-gray)] text-sm md:text-base leading-[1.6] max-w-md mb-8">
          Be the first to shop the collection when it goes live.
        </p>
        <button className="bg-black px-12 py-5 rounded-2xl text-white text-lg md:text-xl tracking-[0.02em] cursor-pointer hover:bg-black/85 transition-colors">
          Join the waitlist
        </button>
      </motion.div>

      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* ── Parallax moodboard ── */}
        <div className="relative w-full h-[80vh] sm:h-[85vh] md:h-[90vh] lg:h-[100vh]">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.src}
              data-p={i}
              className={`absolute will-change-transform ${item.mobileHide ? "hidden md:block" : ""}`}
              style={{
                top: "var(--p-top)" as string,
                left: "var(--p-left)" as string,
                width: "var(--p-width)" as string,
                // @ts-expect-error CSS custom properties
                "--p-top": item.top,
                "--p-left": item.left,
                "--p-width": item.width,
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
          <style>{`
            @media (min-width: 768px) {
              ${ITEMS.map((item, i) =>
                item.mdTop || item.mdLeft || item.mdWidth
                  ? `[data-p="${i}"] { ${item.mdTop ? `--p-top: ${item.mdTop};` : ""} ${item.mdLeft ? `--p-left: ${item.mdLeft};` : ""} ${item.mdWidth ? `--p-width: ${item.mdWidth};` : ""} }`
                  : ""
              ).filter(Boolean).join("\n              ")}
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
