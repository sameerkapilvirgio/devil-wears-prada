"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full aspect-[2/3] md:aspect-[21/9] overflow-hidden">
      {/* Video background */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Gradient overlay — heavier at bottom for text legibility */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Center logos */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center gap-2">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Image
            src="/images/virgio-logo.svg"
            alt="Virgio"
            width={80}
            height={32}
            className="w-16 md:w-20 h-auto"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          <Image
            src="/images/movie-logo.svg"
            alt="The Devil Wears Prada 2"
            width={340}
            height={180}
            className="w-52 md:w-[340px] h-auto"
            priority
          />
        </motion.div>
      </div>

      {/* Bottom tagline bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 text-center pb-8 md:pb-12 px-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
      >
        <p
          className="font-accent italic text-white/90 text-sm md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}
        >
          Twelve pieces. Three silhouettes. One satisfying surrender to power
          dressing straight from the Runway.
        </p>
      </motion.div>
    </section>
  );
}
