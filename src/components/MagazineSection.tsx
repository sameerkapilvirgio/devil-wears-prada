"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

/* ── Constants ───────────────────────────────────────── */

const SLIDE_DURATION = 0.6;
const FLIP_DURATION = 1;
const FLIP_EASE: [number, number, number, number] = [0.645, 0.045, 0.355, 1];

/* ── Image sources — swap these to change pages ──────── */

const BOOK_COVER = "/images/book-cover.png";
const PAGE_1 = "/images/page-1.png";
const PAGE_2 = "/images/magazine-spread.png";
const PAGE_2_POS = "object-right";
const PAGE_3 = "/images/cover-image.png";
const PAGE_4 = "/images/quiz-bg.png";

/* ── FlipBook ────────────────────────────────────────── */

type CoverPhase =
  | "closed"
  | "sliding-open"
  | "flipping-open"
  | "open"
  | "flipping-close"
  | "sliding-close";

type PagePhase =
  | "spread1"
  | "flipping-forward"
  | "spread2"
  | "flipping-backward";

function FlipBook() {
  const [coverPhase, setCoverPhase] = useState<CoverPhase>("closed");
  const [pagePhase, setPagePhase] = useState<PagePhase>("spread1");
  const [isAnimating, setIsAnimating] = useState(false);

  const isClosed = coverPhase === "closed";
  const isOpen = coverPhase === "open";
  const onSpread1 = pagePhase === "spread1";
  const onSpread2 = pagePhase === "spread2";

  const showBookContent =
    coverPhase === "flipping-open" ||
    isOpen ||
    coverPhase === "flipping-close";

  /* ── Cover handlers (identical to before) ── */

  const openBook = useCallback(() => {
    if (isClosed && !isAnimating) {
      setIsAnimating(true);
      setCoverPhase("sliding-open");
    }
  }, [isClosed, isAnimating]);

  const closeBook = useCallback(() => {
    if (isOpen && onSpread1 && !isAnimating) {
      setIsAnimating(true);
      setCoverPhase("flipping-close");
    }
  }, [isOpen, onSpread1, isAnimating]);

  const handleCoverAnimComplete = useCallback(() => {
    if (coverPhase === "sliding-open") setCoverPhase("flipping-open");
    else if (coverPhase === "flipping-open") {
      setCoverPhase("open");
      setIsAnimating(false);
    } else if (coverPhase === "flipping-close") setCoverPhase("sliding-close");
    else if (coverPhase === "sliding-close") {
      setCoverPhase("closed");
      setIsAnimating(false);
    }
  }, [coverPhase]);

  const getCoverAnimate = () => {
    switch (coverPhase) {
      case "closed":
      case "sliding-close":
        return { left: "25%", width: "50%", rotateY: 0 };
      case "sliding-open":
      case "flipping-close":
        return { left: "50%", width: "50%", rotateY: 0 };
      case "flipping-open":
      case "open":
        return { left: "50%", width: "50%", rotateY: -180 };
    }
  };

  const getCoverTransition = () => {
    if (coverPhase === "flipping-open" || coverPhase === "flipping-close") {
      return { duration: FLIP_DURATION, ease: FLIP_EASE };
    }
    return { duration: SLIDE_DURATION, ease: FLIP_EASE };
  };

  /* ── Page flip handlers (same state machine pattern as cover) ── */

  const flipPageForward = useCallback(() => {
    if (isOpen && onSpread1 && !isAnimating) {
      setIsAnimating(true);
      setPagePhase("flipping-forward");
    }
  }, [isOpen, onSpread1, isAnimating]);

  const flipPageBack = useCallback(() => {
    if (isOpen && onSpread2 && !isAnimating) {
      setIsAnimating(true);
      setPagePhase("flipping-backward");
    }
  }, [isOpen, onSpread2, isAnimating]);

  const handlePageFlipComplete = useCallback(() => {
    if (pagePhase === "flipping-forward") {
      setPagePhase("spread2");
      setIsAnimating(false);
    } else if (pagePhase === "flipping-backward") {
      setPagePhase("spread1");
      setIsAnimating(false);
    }
  }, [pagePhase]);

  /* ── Click handlers ── */

  const handleLeftClick = () => {
    if (onSpread2) flipPageBack();
    else closeBook();
  };

  const handleRightClick = () => {
    if (onSpread1) flipPageForward();
  };

  /* ── Base layer content ──
     The side being REVEALED updates instantly.
     The side being COVERED stays until the flip completes.

     Forward flip:  right → PAGE_4 (revealed), left stays PAGE_1 (covered by flipper)
     Backward flip: left → PAGE_1 (revealed), right stays PAGE_4 (covered by flipper)
  ── */

  const baseLeft = pagePhase === "spread2" ? PAGE_3 : PAGE_1;
  const baseRight = pagePhase === "spread1" ? PAGE_2 : PAGE_4;
  const baseRightPos = pagePhase === "spread1" ? PAGE_2_POS : "";

  const isFlipping =
    pagePhase === "flipping-forward" || pagePhase === "flipping-backward";

  return (
    <div className="relative select-none">
      <div
        className="relative w-full aspect-[3/2] md:aspect-[16/10]"
        style={{ perspective: "2500px" }}
      >
        {/* ── Base layer ── */}
        <div className="absolute inset-0 flex overflow-hidden rounded-sm">
          <div
            className="w-1/2 h-full relative overflow-hidden"
            style={{ opacity: isOpen ? 1 : 0 }}
          >
            <Image
              src={baseLeft}
              alt="Left page"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 400px"
            />
          </div>
          <div
            className="w-1/2 h-full relative overflow-hidden"
            style={{ opacity: showBookContent ? 1 : 0 }}
          >
            <Image
              src={baseRight}
              alt="Right page"
              fill
              className={`object-cover ${baseRightPos}`}
              sizes="(max-width: 768px) 50vw, 400px"
            />
          </div>
        </div>

        {/* ── Spine ── */}
        <div
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] z-[50] pointer-events-none transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.03), rgba(0,0,0,0.08), rgba(0,0,0,0.03))",
            opacity: showBookContent ? 1 : 0,
          }}
        />

        {/* ── Page flipper — mounts fresh per flip so initial rotation is explicit ── */}
        {isFlipping && (
          <motion.div
            key={pagePhase}
            className="absolute top-0 left-1/2 w-1/2 h-full z-[20]"
            initial={{ rotateY: pagePhase === "flipping-forward" ? 0 : -180 }}
            animate={{ rotateY: pagePhase === "flipping-forward" ? -180 : 0 }}
            transition={{ duration: FLIP_DURATION, ease: FLIP_EASE }}
            onAnimationComplete={handlePageFlipComplete}
            style={{
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            {/* Front — page 2 */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ backfaceVisibility: "hidden" }}
            >
              <Image
                src={PAGE_2}
                alt="Page 2"
                fill
                className={`object-cover ${PAGE_2_POS}`}
                sizes="(max-width: 768px) 50vw, 400px"
              />
            </div>
            {/* Back — page 3 */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <Image
                src={PAGE_3}
                alt="Page 3"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 400px"
              />
            </div>
          </motion.div>
        )}

        {/* ── Cover — slide + flip ── */}
        <motion.div
          className="absolute top-0 z-[60] rounded-sm"
          initial={false}
          animate={getCoverAnimate()}
          transition={getCoverTransition()}
          onAnimationComplete={handleCoverAnimComplete}
          onClick={isClosed ? openBook : undefined}
          style={{
            height: "100%",
            transformOrigin: "left center",
            transformStyle: "preserve-3d",
            cursor: isClosed ? "pointer" : "default",
            opacity: isOpen ? 0 : 1,
            visibility: isOpen ? "hidden" : "visible",
            pointerEvents: isClosed ? "auto" : "none",
          }}
        >
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            <Image
              src={BOOK_COVER}
              alt="Book cover"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <Image
              src={PAGE_1}
              alt="Page 1"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 400px"
            />
          </div>
        </motion.div>

        {/* ── Click zones ── */}
        {isOpen && (
          <>
            <div
              className="absolute top-0 left-0 w-1/2 h-full z-[200] cursor-pointer"
              onClick={handleLeftClick}
            />
            {onSpread1 && (
              <div
                className="absolute top-0 left-1/2 w-1/2 h-full z-[200] cursor-pointer"
                onClick={handleRightClick}
              />
            )}
          </>
        )}

      </div>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────── */

export default function MagazineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-6 md:py-12"
      style={{ background: "var(--color-cream)" }}
    >
      <div
        className="px-3 md:px-[60px]"
        style={{
          maxWidth: 1100,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 md:items-center"
          style={{ marginBottom: 16 }}
        >
          {/* Staggered heading */}
          <div className="text-[#1a1a1a] font-accent text-[22px] md:text-[42px] leading-[1.1] shrink-0">
            <div className="hidden md:flex flex-col items-start w-fit">
              <div className="flex flex-col items-center">
                <span>ABOUT</span>
                <span>THE</span>
              </div>
              <span className="italic font-medium">COLLECTION</span>
            </div>
            <span className="md:hidden text-center block">ABOUT THE <span className="italic font-medium">COLLECTION</span></span>
          </div>
          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-accent italic text-center text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#2d2926] leading-[1.5] mt-3 md:mt-0"
          >
            Twelve pieces. Three silhouettes. One satisfying surrender to power dressing — straight from the Runway.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          style={{ maxWidth: 768, marginLeft: "auto", marginRight: "auto" }}
        >
          <FlipBook />
        </motion.div>
      </div>
    </section>
  );
}
