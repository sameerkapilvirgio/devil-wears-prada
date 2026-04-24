"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function WaitlistModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative w-full max-w-md overflow-hidden rounded-sm"
              style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.08)" }}
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/30 hover:text-white/60 transition-colors cursor-pointer z-10"
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="px-8 pt-10 pb-8 md:px-10 md:pt-12 md:pb-10">
                <h3 className="font-accent italic text-xl md:text-2xl text-white leading-[1.15] mb-2">
                  Join the Waitlist
                </h3>
                <p
                  className="text-white/30 text-xs leading-[1.7] mb-8"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Be the first to shop the collection when it drops.
                </p>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                  <div>
                    <label className="block text-white/20 text-[0.55rem] tracking-[0.15em] uppercase mb-2" style={{ fontFamily: "var(--font-body)" }}>
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full bg-transparent border-b border-white/10 text-white text-sm py-2.5 outline-none focus:border-[var(--color-red)] transition-colors placeholder:text-white/15"
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-white/20 text-[0.55rem] tracking-[0.15em] uppercase mb-2" style={{ fontFamily: "var(--font-body)" }}>
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full bg-transparent border-b border-white/10 text-white text-sm py-2.5 outline-none focus:border-[var(--color-red)] transition-colors placeholder:text-white/15"
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-white/20 text-[0.55rem] tracking-[0.15em] uppercase mb-2" style={{ fontFamily: "var(--font-body)" }}>
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91"
                      className="w-full bg-transparent border-b border-white/10 text-white text-sm py-2.5 outline-none focus:border-[var(--color-red)] transition-colors placeholder:text-white/15"
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="group w-full inline-flex items-center justify-center gap-2 bg-white/95 py-3.5 text-black text-[0.6rem] tracking-[0.18em] uppercase hover:bg-white/10 hover:text-white transition-all duration-500 cursor-pointer rounded-sm mt-3"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Submit
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      className="group-hover:translate-x-0.5 transition-transform duration-300">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
