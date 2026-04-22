"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[45vh] md:h-[70vh] overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="/images/cover-image.png"
          alt="Devil Wears Prada 2 cover"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </motion.div>

      <div className="relative z-10 h-full flex items-end justify-center p-5 md:p-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <button className="bg-[var(--color-black)] px-8 py-4 rounded-2xl text-white text-sm md:text-base tracking-[0.02em] cursor-pointer hover:bg-black/80 transition-colors">
            Waitlist Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}
