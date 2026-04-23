"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const BOOK_COVER = "/images/book-cover.png";

// Spread 1: revealed when cover opens
const S1_LEFT =
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop&crop=top";
const S1_RIGHT =
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop&crop=top";

// Spread 2: revealed when page flips
const S2_LEFT =
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=1000&fit=crop&crop=top";
const S2_RIGHT =
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&h=1000&fit=crop&crop=top";

export default function MagazineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // ── FLIP 1: Cover slides then flips via two-clip technique (0.12 → 0.40) ──
  const coverSlideX = useTransform(scrollYProgress, [0.12, 0.25], ["-25%", "0%"]);

  const FLIP1_START = 0.25;
  const FLIP1_END = 0.40;
  const FLIP1_MID = (FLIP1_START + FLIP1_END) / 2;

  // Right clip: cover front, eased rotation (slow start, fast middle, slow end)
  const flip1FrontRotate = useTransform(
    scrollYProgress,
    [FLIP1_START, FLIP1_START + 0.03, FLIP1_MID, FLIP1_END - 0.03, FLIP1_END],
    [0, -15, -90, -165, -180]
  );
  const flip1FrontOpacity = useTransform(scrollYProgress, [FLIP1_MID - 0.005, FLIP1_MID + 0.005], [1, 0]);

  // Left clip: page 1 (S1_LEFT), eased rotation
  const flip1BackRotate = useTransform(
    scrollYProgress,
    [FLIP1_START, FLIP1_START + 0.03, FLIP1_MID, FLIP1_END - 0.03, FLIP1_END],
    [180, 165, 90, 15, 0]
  );
  const flip1BackOpacity = useTransform(scrollYProgress, [FLIP1_MID - 0.005, FLIP1_MID + 0.005], [0, 1]);

  // Realism: scale lift, foreshortening, Z-lift, curl shadow
  const flip1Scale = useTransform(scrollYProgress, [FLIP1_START, FLIP1_MID, FLIP1_END], [1, 1.04, 1]);
  const flip1ScaleX = useTransform(scrollYProgress, [FLIP1_START, FLIP1_MID, FLIP1_END], [1, 0.92, 1]);
  const flip1Z = useTransform(scrollYProgress, [FLIP1_START, FLIP1_MID, FLIP1_END], [0, 60, 0]);
  const flip1SkewY = useTransform(scrollYProgress, [FLIP1_START, FLIP1_MID, FLIP1_END], [0, 2, 0]);
  const flip1ShadowOpacity = useTransform(scrollYProgress, [FLIP1_START, FLIP1_MID, FLIP1_END], [0, 0.35, 0]);

  // Flipper appears when slide ends, fades out when flip lands
  const flip1Show = useTransform(scrollYProgress, [0.24, 0.25, 0.38, 0.41], [0, 1, 1, 0]);

  // Sliding cover — only during slide phase, gone before flip starts
  const slidingCoverOpacity = useTransform(scrollYProgress, [0.24, 0.25], [1, 0]);

  // Spread 1 right page: under the cover, reveals as flip starts
  const s1RightOpacity = useTransform(scrollYProgress, [0.24, 0.27], [0, 1]);
  // Spread 1 left page: static, fades in as the flipper lands
  const s1LeftOpacity = useTransform(scrollYProgress, [0.38, 0.40], [0, 1]);
  const spine1Opacity = useTransform(scrollYProgress, [0.32, 0.34], [0, 1]);

  // ── FLIP 2: Right page lifts and flips to reveal spread 2 (0.45 → 0.65) ──
  const FLIP2_START = 0.45;
  const FLIP2_END = 0.65;
  const FLIP2_MID = (FLIP2_START + FLIP2_END) / 2;

  const flip2FrontRotate = useTransform(
    scrollYProgress,
    [FLIP2_START, FLIP2_START + 0.04, FLIP2_MID, FLIP2_END - 0.04, FLIP2_END],
    [0, -15, -90, -165, -180]
  );
  const flip2BackRotate = useTransform(
    scrollYProgress,
    [FLIP2_START, FLIP2_START + 0.04, FLIP2_MID, FLIP2_END - 0.04, FLIP2_END],
    [180, 165, 90, 15, 0]
  );
  const flip2FrontOpacity = useTransform(scrollYProgress, [FLIP2_MID - 0.005, FLIP2_MID + 0.005], [1, 0]);
  const flip2BackOpacity = useTransform(scrollYProgress, [FLIP2_MID - 0.005, FLIP2_MID + 0.005], [0, 1]);

  const flip2Scale = useTransform(scrollYProgress, [FLIP2_START, FLIP2_MID, FLIP2_END], [1, 1.04, 1]);
  const flip2ScaleX = useTransform(scrollYProgress, [FLIP2_START, FLIP2_MID, FLIP2_END], [1, 0.92, 1]);
  const flip2Z = useTransform(scrollYProgress, [FLIP2_START, FLIP2_MID, FLIP2_END], [0, 60, 0]);
  const flip2SkewY = useTransform(scrollYProgress, [FLIP2_START, FLIP2_MID, FLIP2_END], [0, 2, 0]);
  const flip2ShadowOpacity = useTransform(scrollYProgress, [FLIP2_START, FLIP2_MID, FLIP2_END], [0, 0.35, 0]);
  const flip2Show = useTransform(scrollYProgress, [0.41, 0.43, 0.63, 0.66], [0, 1, 1, 0]);

  const s2RightOpacity = useTransform(scrollYProgress, [0.44, 0.47], [0, 1]);
  const s2LeftOpacity = useTransform(scrollYProgress, [0.62, 0.65], [0, 1]);

  const s1RightHide = useTransform(scrollYProgress, [0.44, 0.47], [1, 0]);
  const s1LeftHide = useTransform(scrollYProgress, [0.62, 0.65], [1, 0]);


  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ background: "var(--color-cream)" }}
    >
      <div className="sticky top-0 z-10 flex flex-col items-center pt-[6vh] md:pt-[8vh] pb-[6vh]">
        <div className="w-full px-4 md:px-[60px]" style={{ maxWidth: 1100 }}>
          <div className="w-full mx-auto" style={{ maxWidth: 768 }}>
            <div
              className="relative w-full select-none aspect-[5/4]"
              style={{ perspective: 2500 }}
            >
              {/* ── SPREAD 1 ── */}

              <motion.div
                className="absolute top-0 right-0 w-1/2 h-full rounded-r-sm overflow-hidden"
                style={{ opacity: s1RightOpacity }}
              >
                <motion.div className="absolute inset-0" style={{ opacity: s1RightHide }}>
                  <Image src={S1_RIGHT} alt="Spread 1 right" fill className="object-cover" sizes="(max-width:768px) 50vw,384px" />
                </motion.div>
              </motion.div>

              <motion.div
                className="absolute top-0 left-0 w-1/2 h-full rounded-l-sm overflow-hidden"
                style={{ opacity: s1LeftOpacity }}
              >
                <motion.div className="absolute inset-0" style={{ opacity: s1LeftHide }}>
                  <Image src={S1_LEFT} alt="Spread 1 left" fill className="object-cover" sizes="(max-width:768px) 50vw,384px" />
                </motion.div>
              </motion.div>

              {/* ── SPREAD 2 ── */}

              <motion.div
                className="absolute top-0 right-0 w-1/2 h-full rounded-r-sm overflow-hidden"
                style={{ opacity: s2RightOpacity }}
              >
                <Image src={S2_RIGHT} alt="Spread 2 right" fill className="object-cover" sizes="(max-width:768px) 50vw,384px" />
              </motion.div>

              <motion.div
                className="absolute top-0 left-0 w-1/2 h-full rounded-l-sm overflow-hidden z-[6]"
                style={{ opacity: s2LeftOpacity }}
              >
                <Image src={S2_LEFT} alt="Spread 2 left" fill className="object-cover" sizes="(max-width:768px) 50vw,384px" />
              </motion.div>

              {/* ── SPINE ── */}
              <motion.div
                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] z-[50] pointer-events-none"
                style={{
                  background: "linear-gradient(to right, rgba(0,0,0,0.03), rgba(0,0,0,0.08), rgba(0,0,0,0.03))",
                  opacity: spine1Opacity,
                }}
              />

              {/* ── FLIP 1: right-clip (front = BOOK_COVER) ── */}
              <motion.div
                className="absolute top-0 left-1/2 w-1/2 h-full z-[30]"
                style={{ opacity: flip1Show, perspective: 2500, clipPath: "inset(0)", transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    rotateY: flip1FrontRotate,
                    transformOrigin: "left center",
                    backfaceVisibility: "hidden",
                    opacity: flip1FrontOpacity,
                    scale: flip1Scale,
                    scaleX: flip1ScaleX,
                    z: flip1Z,
                    skewY: flip1SkewY,
                  }}
                >
                  <Image src={BOOK_COVER} alt="Cover front" fill className="object-cover" sizes="(max-width:768px) 50vw,384px" />
                  {/* Page edge highlight */}
                  <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-white/40" />
                  {/* Curl shadow */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      opacity: flip1ShadowOpacity,
                      background: "linear-gradient(to right, rgba(0,0,0,0.25) 0%, transparent 40%)",
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* ── FLIP 1: left-clip (back = S1_LEFT / page 1) ── */}
              <motion.div
                className="absolute top-0 left-0 w-1/2 h-full z-[30]"
                style={{ opacity: flip1Show, perspective: 2500, clipPath: "inset(0)", transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    rotateY: flip1BackRotate,
                    transformOrigin: "right center",
                    backfaceVisibility: "hidden",
                    opacity: flip1BackOpacity,
                    scale: flip1Scale,
                    scaleX: flip1ScaleX,
                    z: flip1Z,
                    skewY: flip1SkewY,
                  }}
                >
                  <Image src={S1_LEFT} alt="Page 1" fill className="object-cover" sizes="(max-width:768px) 50vw,384px" />
                  {/* Backface paper tint */}
                  <div className="absolute inset-0 bg-amber-50/10 pointer-events-none" />
                  {/* Page edge highlight */}
                  <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-white/40" />
                  {/* Curl shadow */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      opacity: flip1ShadowOpacity,
                      background: "linear-gradient(to left, rgba(0,0,0,0.2) 0%, transparent 35%)",
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* ── FLIP 2: right-clip (front = S1_RIGHT) ── */}
              <motion.div
                className="absolute top-0 left-1/2 w-1/2 h-full z-[20]"
                style={{ opacity: flip2Show, perspective: 2500, clipPath: "inset(0)", transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    rotateY: flip2FrontRotate,
                    transformOrigin: "left center",
                    backfaceVisibility: "hidden",
                    opacity: flip2FrontOpacity,
                    scale: flip2Scale,
                    scaleX: flip2ScaleX,
                    z: flip2Z,
                    skewY: flip2SkewY,
                  }}
                >
                  <Image src={S1_RIGHT} alt="Flip 2 front" fill className="object-cover" sizes="(max-width:768px) 50vw,384px" />
                  <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-white/40" />
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      opacity: flip2ShadowOpacity,
                      background: "linear-gradient(to right, rgba(0,0,0,0.25) 0%, transparent 40%)",
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* ── FLIP 2: left-clip (back = S2_LEFT) ── */}
              <motion.div
                className="absolute top-0 left-0 w-1/2 h-full z-[20]"
                style={{ opacity: flip2Show, perspective: 2500, clipPath: "inset(0)", transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    rotateY: flip2BackRotate,
                    transformOrigin: "right center",
                    backfaceVisibility: "hidden",
                    opacity: flip2BackOpacity,
                    scale: flip2Scale,
                    scaleX: flip2ScaleX,
                    z: flip2Z,
                    skewY: flip2SkewY,
                  }}
                >
                  <Image src={S2_LEFT} alt="Flip 2 back" fill className="object-cover" sizes="(max-width:768px) 50vw,384px" />
                  <div className="absolute inset-0 bg-amber-50/10 pointer-events-none" />
                  <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-white/40" />
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      opacity: flip2ShadowOpacity,
                      background: "linear-gradient(to left, rgba(0,0,0,0.2) 0%, transparent 35%)",
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* ── SLIDING COVER (slide phase only) ── */}
              <motion.div
                className="absolute top-0 left-1/2 w-1/2 h-full z-[60] rounded-sm overflow-hidden"
                style={{
                  x: coverSlideX,
                  opacity: slidingCoverOpacity,
                  pointerEvents: "none",
                }}
              >
                <Image src={BOOK_COVER} alt="Book cover" fill className="object-cover" sizes="(max-width:768px) 50vw,384px" priority />
              </motion.div>

              {/* Keep scrolling hint */}
              <div className="absolute -bottom-16 md:-bottom-20 left-0 right-0 flex flex-col items-center gap-2 z-[70]">
                <span className="tracking-editorial text-[var(--color-gray)] text-[0.55rem] md:text-[0.6rem]">
                  KEEP SCROLLING
                </span>
                <div className="flex items-center gap-3">
                  {[0, 0.15, 0.3].map((delay) => (
                    <motion.svg
                      key={delay}
                      width="16" height="16" viewBox="0 0 16 16"
                      fill="none" stroke="var(--color-gray)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                      animate={{ y: [4, -2, 4] }}
                      transition={{ duration: 1.5, delay, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <path d="M8 12V4" />
                      <path d="M4 6l4-4 4 4" />
                    </motion.svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: "28vh" }} aria-hidden />
    </section>
  );
}
