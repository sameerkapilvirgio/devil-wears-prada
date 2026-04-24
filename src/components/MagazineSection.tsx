"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, animate } from "framer-motion";

const BOOK_COVER = "/images/book-cover.png";
const S1_LEFT  = "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop&crop=top";
const S1_RIGHT = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop&crop=top";
const S2_LEFT  = "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=1000&fit=crop&crop=top";
const S2_RIGHT = "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&h=1000&fit=crop&crop=top";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FLIP_FWD: any  = { type: "tween", duration: 0.68, ease: [0.4, 0, 0.2, 1] };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FLIP_BACK: any = { type: "tween", duration: 0.68, ease: [0.4, 0, 0.2, 1] };

export default function MagazineSection({ onWaitlistOpen }: { onWaitlistOpen: () => void }) {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const stageRef      = useRef<0 | 1 | 2>(0);
  const coverShownRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Cover slides in once magazine is sticky (centered in viewport)
  const coverSlideX = useTransform(scrollYProgress, [0.36, 0.44], ["-28%", "0%"]);

  // Gradual background transition from dark to beige as user scrolls
  const sectionBg = useTransform(scrollYProgress, [0.4, 0.7], ["#0a0a0a", "#faf8f4"]);

  // All flip state as motion values
  const coverOpacity    = useMotionValue(0);

  const f1Visible       = useMotionValue(0);
  const f1FrontRot      = useMotionValue(0);
  const f1BackRot       = useMotionValue(180);
  const f1Scale         = useMotionValue(1);
  const f1Shadow        = useMotionValue(0);

  const s1RightOpacity  = useMotionValue(0);
  const s1LeftOpacity   = useMotionValue(0);
  const spineOpacity    = useMotionValue(0);

  const f2Visible       = useMotionValue(0);
  const f2FrontRot      = useMotionValue(0);
  const f2BackRot       = useMotionValue(180);
  const f2Scale         = useMotionValue(1);
  const f2Shadow        = useMotionValue(0);

  const s1RightHide     = useMotionValue(1);
  const s1LeftHide      = useMotionValue(1);
  const s2RightOpacity  = useMotionValue(0);
  const s2LeftOpacity   = useMotionValue(0);

  // Canvas shift: "-25%" centers the cover initially; "0%" reveals full spread
  const containerX      = useMotionValue("-25%");

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const stage = stageRef.current;

      // ── Cover entrance / exit — fires once magazine is sticky (centered) ──
      if (v > 0.36 && !coverShownRef.current && stage === 0) {
        coverShownRef.current = true;
        animate(coverOpacity, 1, { duration: 0.5, ease: "easeOut" });
      }
      if (v < 0.30 && coverShownRef.current) {
        coverShownRef.current = false;
        animate(coverOpacity, 0, { duration: 0.25 });
      }

      // ── Flip 1 forward: cover → spread 1 ──
      if (v > 0.46 && stage === 0) {
        stageRef.current = 1;
        animate(containerX, "0%", { type: "tween", duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] });
        animate(s1RightOpacity, 1, { duration: 0.15 });
        animate(f1Visible, 1, { duration: 0.05 });
        animate(coverOpacity, 0, { duration: 0.15 });
        animate(f1FrontRot, -180, FLIP_FWD);
        animate(f1BackRot,    0, FLIP_FWD);
        animate(f1Scale,  [1, 1.04, 1], { duration: 0.68, ease: "easeInOut" });
        animate(f1Shadow, [0, 0.35, 0], { duration: 0.68, ease: "easeInOut" });
        setTimeout(() => {
          animate(s1LeftOpacity, 1,  { duration: 0.35 });
          animate(spineOpacity,  1,  { duration: 0.4  });
          animate(f1Visible,     0,  { duration: 0.25 });
        }, 620);
      }

      // ── Flip 1 back: spread 1 → cover ──
      else if (v < 0.38 && stage === 1) {
        stageRef.current = 0;
        animate(containerX, "-25%", { type: "tween", duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] });
        animate(s1LeftOpacity, 0, { duration: 0.15 });
        animate(spineOpacity,  0, { duration: 0.15 });
        animate(f1Visible,     1, { duration: 0.05 });
        animate(f1FrontRot,    0, FLIP_BACK);
        animate(f1BackRot,   180, FLIP_BACK);
        animate(f1Scale,  [1, 1.04, 1], { duration: 0.68, ease: "easeInOut" });
        setTimeout(() => {
          animate(s1RightOpacity, 0, { duration: 0.2  });
          animate(f1Visible,      0, { duration: 0.2  });
          animate(coverOpacity,   1, { duration: 0.35 });
          coverShownRef.current = true;
        }, 620);
      }

      // ── Flip 2 forward: spread 1 → spread 2 (stays open) ──
      else if (v > 0.58 && stage === 1) {
        stageRef.current = 2;
        animate(s2RightOpacity, 1, { duration: 0.15 });
        animate(s1RightHide,    0, { duration: 0.15 });
        animate(f2Visible,      1, { duration: 0.05 });
        animate(f2FrontRot, -180, FLIP_FWD);
        animate(f2BackRot,     0, FLIP_FWD);
        animate(f2Scale,  [1, 1.04, 1], { duration: 0.68, ease: "easeInOut" });
        animate(f2Shadow, [0, 0.35, 0], { duration: 0.68, ease: "easeInOut" });
        setTimeout(() => {
          animate(s2LeftOpacity, 1, { duration: 0.2 });
          animate(s1LeftHide,    0, { duration: 0.2 });
        }, 500);
        setTimeout(() => {
          animate(f2Visible, 0, { duration: 0.15 });
        }, 720);
      }

      // ── Flip 2 back: spread 2 → spread 1 ──
      else if (v < 0.50 && stage === 2) {
        stageRef.current = 1;
        animate(s2LeftOpacity, 0, { duration: 0.15 });
        animate(s1LeftHide,    1, { duration: 0.25 });
        animate(s1RightHide,   1, { duration: 0.25 });
        animate(f2Visible,     1, { duration: 0.05 });
        animate(f2FrontRot,    0, FLIP_BACK);
        animate(f2BackRot,   180, FLIP_BACK);
        animate(f2Scale,  [1, 1.04, 1], { duration: 0.68, ease: "easeInOut" });
        setTimeout(() => {
          animate(s2RightOpacity, 0, { duration: 0.2 });
          animate(f2Visible,      0, { duration: 0.2 });
        }, 620);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollYProgress]);

  return (
    <motion.section
      ref={sectionRef}
      className="relative"
      style={{ background: sectionBg }}
    >
      <div className="sticky top-0 z-10 h-screen flex flex-col items-center justify-center py-[1vh]">
        {/* Keep scrolling hint — above the book */}
        <div className="flex flex-col items-center gap-2 mb-10 md:mb-14 z-[70]">
          <span className="tracking-editorial text-[var(--color-red)] text-[0.55rem] md:text-[0.6rem]">
            KEEP SCROLLING
          </span>
          <div className="flex items-center gap-3">
            {[0, 0.15, 0.3].map((delay) => (
              <motion.svg
                key={delay}
                width="16" height="16" viewBox="0 0 16 16"
                fill="none" stroke="var(--color-red)" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"
                animate={{ y: [4, -2, 4] }}
                transition={{ duration: 1.5, delay, repeat: Infinity, ease: "easeInOut" }}
              >
                <path d="M8 12V4" />
                <path d="M4 6l4-4 4 4" />
              </motion.svg>
            ))}
          </div>
        </div>

        <div className="w-full px-4 md:px-[60px]" style={{ maxWidth: 1100 }}>
          <div className="w-full mx-auto" style={{ maxWidth: 768 }}>
            <motion.div
              className="relative w-full select-none aspect-[5/4]"
              style={{ perspective: 2500, x: containerX }}
            >

              {/* ── SPREAD 2 (behind S1 in DOM order) ── */}
              <motion.div
                className="absolute top-0 right-0 w-1/2 h-full rounded-r-sm overflow-hidden"
                style={{ opacity: s2RightOpacity }}
              >
                <Image src={S2_RIGHT} alt="Spread 2 right" fill className="object-cover" sizes="(max-width:768px) 50vw,384px" />
              </motion.div>

              <motion.div
                className="absolute top-0 left-0 w-1/2 h-full rounded-l-sm overflow-hidden"
                style={{ opacity: s2LeftOpacity }}
              >
                <Image src={S2_LEFT} alt="Spread 2 left" fill className="object-cover" sizes="(max-width:768px) 50vw,384px" />
              </motion.div>

              {/* ── SPREAD 1 (on top of S2 in DOM order) ── */}
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

              {/* ── SPINE ── */}
              <motion.div
                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] z-[50] pointer-events-none"
                style={{
                  background: "linear-gradient(to right, rgba(0,0,0,0.03), rgba(0,0,0,0.08), rgba(0,0,0,0.03))",
                  opacity: spineOpacity,
                }}
              />

              {/* ── FLIP 1 right-clip: front = book cover ── */}
              <motion.div
                className="absolute top-0 left-1/2 w-1/2 h-full z-[30]"
                style={{ opacity: f1Visible, perspective: 2500, clipPath: "inset(0)", transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    rotateY: f1FrontRot,
                    transformOrigin: "left center",
                    backfaceVisibility: "hidden",
                    scale: f1Scale,
                  }}
                >
                  <Image src={BOOK_COVER} alt="Cover front" fill className="object-cover" sizes="(max-width:768px) 50vw,384px" />
                  <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-white/40" />
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ opacity: f1Shadow, background: "linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 40%)" }}
                  />
                </motion.div>
              </motion.div>

              {/* ── FLIP 1 left-clip: back = S1_LEFT ── */}
              <motion.div
                className="absolute top-0 left-0 w-1/2 h-full z-[30]"
                style={{ opacity: f1Visible, perspective: 2500, clipPath: "inset(0)", transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    rotateY: f1BackRot,
                    transformOrigin: "right center",
                    backfaceVisibility: "hidden",
                    scale: f1Scale,
                  }}
                >
                  <Image src={S1_LEFT} alt="Page 1" fill className="object-cover" sizes="(max-width:768px) 50vw,384px" />
                  <div className="absolute inset-0 bg-amber-50/10 pointer-events-none" />
                  <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-white/40" />
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ opacity: f1Shadow, background: "linear-gradient(to left, rgba(0,0,0,0.2) 0%, transparent 35%)" }}
                  />
                </motion.div>
              </motion.div>

              {/* ── FLIP 2 right-clip: front = S1_RIGHT ── */}
              <motion.div
                className="absolute top-0 left-1/2 w-1/2 h-full z-[20]"
                style={{ opacity: f2Visible, perspective: 2500, clipPath: "inset(0)", transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    rotateY: f2FrontRot,
                    transformOrigin: "left center",
                    backfaceVisibility: "hidden",
                    scale: f2Scale,
                  }}
                >
                  <Image src={S1_RIGHT} alt="Flip 2 front" fill className="object-cover" sizes="(max-width:768px) 50vw,384px" />
                  <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-white/40" />
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ opacity: f2Shadow, background: "linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 40%)" }}
                  />
                </motion.div>
              </motion.div>

              {/* ── FLIP 2 left-clip: back = S2_LEFT ── */}
              <motion.div
                className="absolute top-0 left-0 w-1/2 h-full z-[20]"
                style={{ opacity: f2Visible, perspective: 2500, clipPath: "inset(0)", transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    rotateY: f2BackRot,
                    transformOrigin: "right center",
                    backfaceVisibility: "hidden",
                    scale: f2Scale,
                  }}
                >
                  <Image src={S2_LEFT} alt="Flip 2 back" fill className="object-cover" sizes="(max-width:768px) 50vw,384px" />
                  <div className="absolute inset-0 bg-amber-50/10 pointer-events-none" />
                  <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-white/40" />
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ opacity: f2Shadow, background: "linear-gradient(to left, rgba(0,0,0,0.2) 0%, transparent 35%)" }}
                  />
                </motion.div>
              </motion.div>

              {/* ── SLIDING COVER (entrance + cover state) ── */}
              <motion.div
                className="absolute top-0 left-1/2 w-1/2 h-full z-[60] rounded-sm overflow-hidden"
                style={{ x: coverSlideX, pointerEvents: "none" }}
              >
                <motion.div className="absolute inset-0" style={{ opacity: coverOpacity }}>
                  <Image src={BOOK_COVER} alt="Book cover" fill className="object-cover" sizes="(max-width:768px) 50vw,384px" priority />
                </motion.div>
              </motion.div>


            </motion.div>
          </div>
        </div>

        {/* Small waitlist CTA under the book */}
        <div className="mt-6 md:mt-8 z-[70]">
          <button
            onClick={onWaitlistOpen}
            className="group inline-flex items-center gap-3 px-8 py-3 text-white text-[1rem] tracking-[0.15em] uppercase hover:bg-[var(--color-deep-red)] transition-all duration-300 cursor-pointer rounded-sm"
            style={{ background: "var(--color-red)", fontFamily: "var(--font-body)" }}
          >
            Join the waitlist
          </button>
        </div>

      </div>

      {/* Scroll runway — holds last page visible while bg transitions */}
      <div style={{ height: "80vh" }} aria-hidden />
    </motion.section>
  );
}
