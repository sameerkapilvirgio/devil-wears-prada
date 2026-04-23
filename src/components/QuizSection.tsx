"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { quizQuestions, quizResults, type QuizResult } from "@/data/quiz";
import { quizOptionImages } from "@/data/images";

export default function QuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [barComplete, setBarComplete] = useState(false);

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
    <div className="pt-1 md:pt-2">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-row items-center justify-between"
        style={{
          padding: "4px 16px 8px",
          maxWidth: 768,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div>
          <h2
            className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-wide"
            style={{ fontFamily: "var(--font-body)" }}
          >
            PICK <span className="text-[var(--color-red)]">YOUR</span> STYLE
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

      <div
        style={{
          maxWidth: 768,
          marginLeft: "auto",
          marginRight: "auto",
          padding: "0 16px 24px",
          minHeight: 460,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="w-full"
          style={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          <div style={{ marginBottom: 12 }}>
            <div
              className="flex items-center justify-between transition-opacity duration-300"
              style={{ marginBottom: 6, opacity: isResult ? 0 : 1 }}
            >
              <span className="tracking-editorial text-white/30 text-[0.5rem]">
                QUESTION
              </span>
              <span className="font-accent text-white text-sm">
                {currentQuestion + 1}
                <span className="text-white/30">
                  {" "}
                  / {quizQuestions.length}
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
                    <h3
                      className="font-accent text-lg sm:text-xl md:text-2xl text-white text-center"
                      style={{
                        paddingTop: 20,
                        paddingBottom: 20,
                        minHeight: 100,
                      }}
                    >
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
                          className={`quiz-option group text-left border-2 bg-white/[0.02] backdrop-blur-sm cursor-pointer overflow-hidden rounded-xl transition-all duration-300 ${
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
                              transition={{
                                duration: 1.2,
                                ease: [0.16, 1, 0.3, 1],
                              }}
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative overflow-hidden rounded-2xl w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mb-5">
                    <motion.div
                      className="relative w-full h-full"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Image
                        src={result.image}
                        alt={result.name}
                        fill
                        className="object-cover object-top"
                        sizes="256px"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="tracking-editorial text-white/40 text-[0.5rem] mb-2">
                      YOUR ALTER EGO
                    </div>
                    <h3 className="font-accent italic text-2xl sm:text-3xl md:text-4xl text-white leading-[1.1] mb-1">
                      {result.name}
                    </h3>
                    <div className="text-[var(--color-red)] text-xs tracking-[0.15em] uppercase font-bold mb-4">
                      {result.title}
                    </div>
                    <p className="text-white/50 text-xs md:text-sm leading-[1.7] max-w-sm mx-auto mb-5">
                      {result.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
