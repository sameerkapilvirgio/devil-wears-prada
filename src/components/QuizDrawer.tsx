"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuizSection from "./QuizSection";

export default function QuizDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200]">
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Mobile: bottom sheet */}
          <motion.div
            className="md:hidden absolute inset-x-0 bottom-0 bg-[#1a1a1a] rounded-t-[20px] overflow-hidden flex flex-col"
            style={{ maxHeight: "92vh" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 280,
              mass: 0.8,
            }}
          >
            <div className="flex-shrink-0 relative flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-white/15" />
              <button
                onClick={onClose}
                className="absolute top-3 right-4 w-8 h-8 flex items-center justify-center text-white/30 hover:text-white transition-colors cursor-pointer"
                aria-label="Close quiz"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain">
              <QuizSection />
            </div>
          </motion.div>

          {/* Desktop: centered modal */}
          <motion.div
            className="hidden md:flex absolute inset-0 items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="relative bg-[#1a1a1a] rounded-2xl overflow-hidden flex flex-col w-full"
              style={{ maxWidth: 520, maxHeight: "80vh" }}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 300,
                mass: 0.6,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center text-white/30 hover:text-white transition-colors cursor-pointer"
                aria-label="Close quiz"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="flex-1 overflow-y-auto overscroll-contain">
                <QuizSection />
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
