"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { quizQuestions, quizResults, type QuizResult } from "@/data/quiz";
import { quizOptionImages } from "@/data/images";

export default function QuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [barComplete, setBarComplete] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const isResult = result !== null;
  const isLastQuestion = currentQuestion === quizQuestions.length - 1;

  const handleAnswer = (value: string, optionIndex: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIndex);

    if (isLastQuestion) {
      setBarComplete(true);
      setTimeout(() => {
        const newAnswers = [...answers, value];
        const aCount = newAnswers.filter((a) => a === "a").length;
        let resultKey: string;
        if (aCount >= 5) resultKey = "editor";
        else if (aCount >= 3) resultKey = "protegee";
        else if (aCount >= 1) resultKey = "itgirl";
        else resultKey = "visionary";

        setResult(quizResults[resultKey]);
        setSelectedOption(null);
      }, 1000);
    } else {
      setTimeout(() => {
        setAnswers([...answers, value]);
        setCurrentQuestion((prev) => prev + 1);
        setSelectedOption(null);
      }, 600);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setBarComplete(false);
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Single dark section: heading + quiz */}
      <div className="bg-[#1a1a1a] pt-6 md:pt-10">
        {/* Top: heading left, logo right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-row items-center justify-between"
          style={{ padding: "16px 16px 16px", maxWidth: 768, marginLeft: "auto", marginRight: "auto" }}
        >
          <div>
            <h2
              className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--color-red)] tracking-wide"
              style={{ fontFamily: "var(--font-body)" }}
            >
              TAKE THE QUIZ
            </h2>
            <h2
              className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-wide"
              style={{ fontFamily: "var(--font-body)" }}
            >
              FIND YOUR DWP ALTER EGO
            </h2>
          </div>

          <div className="relative w-20 h-14 sm:w-28 sm:h-20 md:w-36 md:h-24 flex-shrink-0">
            <Image
              src="/images/movie-logo.svg"
              alt="The Devil Wears Prada 2"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>
        <div style={{ maxWidth: 768, marginLeft: "auto", marginRight: "auto", padding: "0 16px 24px", minHeight: 500, display: "flex", flexDirection: "column" }}>
          <div className="w-full" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Progress bar — persists across questions and result */}
          <div style={{ marginBottom: 12 }}>
            <div className="flex items-center justify-between transition-opacity duration-300" style={{ marginBottom: 6, opacity: isResult ? 0 : 1 }}>
              <span className="tracking-editorial text-white/30 text-[0.5rem]">
                QUESTION
              </span>
              <span className="font-accent text-white text-sm">
                {currentQuestion + 1}
                <span className="text-white/30">
                  {" "}/ {quizQuestions.length}
                </span>
              </span>
            </div>
            <div className="h-px bg-white/10 relative">
              <motion.div
                className="absolute top-0 left-0 h-full bg-[var(--color-red)]"
                animate={{
                  width: barComplete
                    ? "100%"
                    : `${((currentQuestion + 0.5) / quizQuestions.length) * 100}%`,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!isResult ? (
              <motion.div
                key="questions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ flex: 1 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <h3 className="font-accent text-lg sm:text-xl md:text-2xl text-white text-center" style={{ paddingTop: 24, paddingBottom: 24, minHeight: 110 }}>
                      {quizQuestions[currentQuestion].prompt}
                    </h3>

                    <div className="grid grid-cols-2" style={{ gap: 16 }}>
                      {[
                        quizQuestions[currentQuestion].optionA,
                        quizQuestions[currentQuestion].optionB,
                      ].map((option, i) => (
                        <button
                          key={i}
                          onClick={() => handleAnswer(option.value, i)}
                          className={`quiz-option group text-left border-2 bg-white/[0.02] backdrop-blur-sm cursor-pointer overflow-hidden transition-all duration-300 ${
                            selectedOption === i
                              ? "border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                              : "border-white/10 hover:border-[var(--color-red)]/50"
                          }`}
                        >
                          <div className="relative aspect-[2/3] overflow-hidden">
                            <motion.div
                              className="relative w-full h-full"
                              key={`${currentQuestion}-${i}`}
                              initial={{ scale: 1.15 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            >
                              <Image
                                src={
                                  quizOptionImages[currentQuestion]?.[i] ||
                                  "/images/product-1.png"
                                }
                                alt={option.label}
                                fill
                                className="object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
                                sizes="(max-width: 768px) 45vw, 350px"
                              />
                            </motion.div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                            <div className="absolute bottom-2 left-3 right-3 md:bottom-3 md:left-4 md:right-4">
                              <div className="tracking-editorial text-white/30 text-[0.45rem] md:text-[0.5rem] mb-0.5">
                                OPTION {i === 0 ? "A" : "B"}
                              </div>
                              <div className="font-accent text-sm md:text-base text-white leading-tight group-hover:text-[var(--color-red)] transition-colors duration-300">
                                {option.label}
                              </div>
                            </div>
                          </div>
                          <div style={{ padding: "8px 12px" }}>
                            <p className="text-white/30 text-[0.65rem] md:text-xs leading-[1.5] line-clamp-2">
                              {option.description}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="text-center"
                style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}
              >
                <div className="tracking-editorial text-white/25 mb-4">
                  YOUR RESULT
                </div>
                <h3 className="font-accent italic text-3xl sm:text-4xl md:text-5xl text-white mb-4">
                  {result.name}
                </h3>
                <p className="text-white/40 text-xs md:text-sm leading-[1.7] max-w-md mx-auto mb-6">
                  {result.description}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button className="px-8 py-3 bg-[var(--color-red)] text-white tracking-[0.12em] uppercase text-sm cursor-pointer hover:bg-[var(--color-deep-red)] transition-colors">
                    {result.cta}
                  </button>
                  <button
                    onClick={resetQuiz}
                    className="px-6 py-3 border border-white/20 text-white/40 tracking-[0.12em] uppercase text-sm cursor-pointer hover:border-white/40 hover:text-white transition-all duration-300"
                  >
                    Retake Quiz
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
