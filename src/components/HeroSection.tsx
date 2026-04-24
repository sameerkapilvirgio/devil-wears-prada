"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Starts earlier, reaches full opacity well before hero exits — hard seam eliminated
  const darkOverlayOpacity = useTransform(scrollYProgress, [0.2, 0.85], [0, 1]);

  return (
    <section ref={sectionRef} className="relative w-full aspect-[2/3] md:aspect-[21/9] overflow-hidden">
      {/* Video */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      >
        <video autoPlay loop muted playsInline preload="auto"
          className="absolute inset-0 w-full h-full object-cover">
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Static gradient — bottom anchored to solid black so seam is invisible */}
      <div className="absolute inset-0 z-[1]" style={{
        background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.92) 88%, #0a0a0a 100%)",
      }} />

      {/* Movie logo + tagline + CTA — bottom half */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-[7vh] md:pb-[10vh] gap-3 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          <Image src="/images/movie-logo.svg" alt="The Devil Wears Prada 2"
            width={340} height={180} className="w-52 md:w-[320px] h-auto" priority />
        </motion.div>

        <motion.p
          className="text-white/80 text-xs md:text-sm leading-relaxed max-w-xs md:max-w-sm text-center mt-1"
          style={{ fontFamily: "var(--font-body)", textShadow: "0 1px 10px rgba(0,0,0,0.6)", letterSpacing: "0.03em" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
        >
          Twelve pieces. Three silhouettes. One satisfying surrender to power dressing straight from the Runway.
        </motion.p>

        <motion.button
          className="group inline-flex items-center gap-2.5 border border-white/35 px-8 py-3 text-white text-[0.65rem] tracking-[0.22em] uppercase mt-2 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer rounded-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05 }}
          style={{ fontFamily: "var(--font-body)" }}
        >
          Get Notified
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="group-hover:translate-x-0.5 transition-transform duration-300">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      {/* Scroll-driven overlay — reaches #0a0a0a to match magazine */}
      <motion.div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{ opacity: darkOverlayOpacity, background: "#0a0a0a" }}
      />
    </section>
  );
}
