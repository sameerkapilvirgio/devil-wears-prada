"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import MagazineSection from "@/components/MagazineSection";
import MoodboardSection from "@/components/MoodboardSection";
import StorySection from "@/components/StorySection";
import DevilApprovedSection from "@/components/DevilApprovedSection";
import ProductGrid from "@/components/ProductGrid";
import WaitlistSection from "@/components/WaitlistSection";
import WaitlistModal from "@/components/WaitlistModal";
import QuizDrawer from "@/components/QuizDrawer";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const [quizOpen, setQuizOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const openWaitlist = () => setWaitlistOpen(true);

  return (
    <main>
      {/* Hero — full-bleed video, no padding needed */}
      <HeroSection onWaitlistOpen={openWaitlist} />

      <DevilApprovedSection />

      {/* Magazine — scroll-driven, manages its own sticky + scroll runway */}
      <MagazineSection onWaitlistOpen={openWaitlist} />

      <StorySection onQuizOpen={() => setQuizOpen(true)} />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        transition={{ duration: 0.4, ease }}
      >
        <MoodboardSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        transition={{ duration: 0.4, ease }}
      >
        <ProductGrid />
      </motion.div>

      <WaitlistSection onOpen={openWaitlist} />

      {/* Footer */}
      <motion.footer
        className="bg-[#1a1a1a] py-16 md:py-20 border-t border-white/5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeUp}
        transition={{ duration: 0.4, ease }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Brand */}
            <div>
              <div className="font-accent text-2xl text-white mb-3">
                DWP<span className="text-[var(--color-red)] italic">2</span>{" "}
                <span className="text-white/30">×</span>{" "}
                <span
                  className="tracking-[0.1em] text-lg text-white/60"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  VIRGIO
                </span>
              </div>
              <p className="text-white/30 text-sm leading-[1.7] max-w-xs">
                A capsule collection where cinema meets couture. Twelve pieces
                that dress the woman who walks away — and the one who walks back.
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="tracking-editorial text-white/20 text-[0.6rem] mb-4">
                  COLLECTION
                </div>
                <ul className="space-y-2">
                  {["Lookbook", "Atelier", "Sketches", "Press"].map((item) => (
                    <li key={item}>
                      <span className="text-white/40 text-sm hover:text-white transition-colors cursor-pointer pb-0.5">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="tracking-editorial text-white/20 text-[0.6rem] mb-4">
                  CONNECT
                </div>
                <ul className="space-y-2">
                  {["Instagram", "Newsletter", "Contact", "Careers"].map(
                    (item) => (
                      <li key={item}>
                        <span className="text-white/40 text-sm hover:text-white transition-colors cursor-pointer pb-0.5">
                          {item}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* Legal */}
            <div>
              <div className="tracking-editorial text-white/20 text-[0.6rem] mb-4">
                LEGAL
              </div>
              <ul className="space-y-2">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                  <li key={item}>
                    <span className="text-white/40 text-sm hover:text-white transition-colors cursor-pointer pb-0.5">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-white/15 text-xs tracking-wider">
              © 2026 DWP2 × VIRGIO. All rights reserved.
            </span>
            <span className="text-white/15 text-xs tracking-wider italic">
              That&apos;s all.
            </span>
          </div>
        </div>
      </motion.footer>
      <QuizDrawer isOpen={quizOpen} onClose={() => setQuizOpen(false)} onWaitlistOpen={openWaitlist} />
      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </main>
  );
}
