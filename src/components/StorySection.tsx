"use client";

import QuizCTA from "./QuizCTA";

export default function StorySection({ onQuizOpen }: { onQuizOpen: () => void }) {
  return <QuizCTA onOpen={onQuizOpen} />;
}
