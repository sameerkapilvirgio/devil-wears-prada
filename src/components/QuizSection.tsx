"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { quizQuestions, quizResults, type QuizResult } from "@/data/quiz";
import { quizOptionImages } from "@/data/images";

export default function QuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers,         setAnswers]          = useState<string[]>([]);
  const [result,          setResult]           = useState<QuizResult | null>(null);
  const [selectedOption,  setSelectedOption]   = useState<number | null>(null);
  const [barComplete,     setBarComplete]       = useState(false);

  const isResult        = result !== null;
  const isLastQuestion  = currentQuestion === quizQuestions.length - 1;
  const progress        = barComplete ? 100 : ((currentQuestion + 0.5) / quizQuestions.length) * 100;

  const handleAnswer = (value: string, optionIndex: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIndex);

    if (isLastQuestion) {
      setBarComplete(true);
      setTimeout(() => {
        const newAnswers = [...answers, value];
        const aCount     = newAnswers.filter((a) => a === "a").length;
        let resultKey: string;
        if      (aCount >= 5) resultKey = "editor";
        else if (aCount >= 3) resultKey = "protegee";
        else if (aCount >= 1) resultKey = "itgirl";
        else                  resultKey = "visionary";
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

  const options = [
    quizQuestions[currentQuestion]?.optionA,
    quizQuestions[currentQuestion]?.optionB,
  ];

  return (
    <div className="px-4 pb-6" style={{ maxWidth: 540, marginLeft: "auto", marginRight: "auto" }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="flex items-center justify-between py-4 mb-1"
      >
        <h2 className="text-sm font-bold text-white tracking-[0.2em]" style={{ fontFamily: "var(--font-body)" }}>
          PICK <span className="text-[var(--color-red)]">YOUR</span> STYLE
        </h2>
        <div className="relative w-16 h-10 flex-shrink-0">
          <Image src="/images/movie-logo.svg" alt="DWP2" fill className="object-contain" />
        </div>
      </motion.div>

      {/* Progress */}
      <div className="mb-5" style={{ opacity: isResult ? 0 : 1, transition: "opacity 0.3s" }}>
        <div className="h-[1px] bg-white/10 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-[var(--color-red)]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Quiz content */}
      <AnimatePresence mode="wait">
        {!isResult ? (
          <motion.div
            key="questions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Question prompt */}
                <h3 className="font-accent text-center text-white text-[1.3rem] sm:text-2xl leading-[1.35] mb-5 min-h-[3em] flex items-center justify-center px-2">
                  {quizQuestions[currentQuestion].prompt}
                </h3>

                {/* Options */}
                <div className="grid grid-cols-2 gap-3">
                  {options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(option.value, i)}
                      className={`quiz-option group text-left border bg-white/[0.03] cursor-pointer overflow-hidden transition-all duration-300 ${
                        selectedOption === i
                          ? "border-[var(--color-red)] shadow-[0_0_24px_rgba(155,27,48,0.3)]"
                          : "border-white/10 hover:border-[var(--color-red)]/40"
                      }`}
                    >
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <motion.div
                          className="relative w-full h-full"
                          key={`${currentQuestion}-${i}`}
                          initial={{ scale: 1.12 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <Image
                            src={quizOptionImages[currentQuestion]?.[i] || "/images/product-1.png"}
                            alt={option.label}
                            fill
                            className="object-cover opacity-80 group-hover:opacity-95 transition-opacity duration-400"
                            sizes="(max-width: 768px) 45vw, 240px"
                          />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Result */}
            <div className="flex flex-col items-center text-center pt-2">
              <div className="relative overflow-hidden w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 mb-6"
                   style={{ clipPath: "polygon(0 0, 100% 0, 100% 92%, 50% 100%, 0 92%)" }}>
                <motion.div
                  className="relative w-full h-full"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={result.image}
                    alt={result.name}
                    fill
                    className="object-cover object-top"
                    sizes="240px"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-6"
              >
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="h-px w-6 bg-[var(--color-red)]/50" />
                  <span className="tracking-editorial text-white/30 text-[0.48rem]">YOUR ALTER EGO</span>
                  <div className="h-px w-6 bg-[var(--color-red)]/50" />
                </div>
                <h3 className="font-accent italic text-[1.8rem] sm:text-[2.2rem] text-white leading-[1.05] mb-1">
                  {result.name}
                </h3>
                <div className="text-[var(--color-red)] text-[0.65rem] tracking-[0.2em] uppercase font-medium mb-4">
                  {result.title}
                </div>
                <p className="text-white/45 text-xs sm:text-sm leading-[1.75] max-w-xs mx-auto mb-6"
                   style={{ fontFamily: "var(--font-body)" }}>
                  {result.description}
                </p>
                <button
                  onClick={resetQuiz}
                  className="text-white/30 text-[0.65rem] tracking-[0.18em] uppercase hover:text-white/60 transition-colors duration-300 cursor-pointer border-b border-white/15 hover:border-white/40 pb-0.5"
                >
                  Retake Quiz
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
