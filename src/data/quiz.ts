export interface QuizOption {
  label: string;
  description: string;
  value: "a" | "b";
}

export interface QuizQuestion {
  id: number;
  prompt: string;
  optionA: QuizOption;
  optionB: QuizOption;
}

export interface QuizResult {
  id: string;
  name: string;
  title: string;
  description: string;
  cta: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    prompt: "Miranda calls an emergency meeting. You show up in—",
    optionA: {
      label: "The Power Blazer",
      description: "Sharp shoulders, nipped waist. You came to win.",
      value: "a",
    },
    optionB: {
      label: "The Silk Slip Dress",
      description: "Effortless confidence. Let them underestimate you.",
      value: "b",
    },
  },
  {
    id: 2,
    prompt: "Your signature colour at Runway Magazine—",
    optionA: {
      label: "All Black, Always",
      description: "Monochrome is not boring. It's a power move.",
      value: "a",
    },
    optionB: {
      label: "Cerulean Blue",
      description: "The colour that started a thousand-word monologue.",
      value: "b",
    },
  },
  {
    id: 3,
    prompt: "The bag you'd carry through the Elias-Clarke lobby.",
    optionA: {
      label: "Structured Top-Handle",
      description: "Birkin energy. Everything in its place, like Miranda's desk.",
      value: "a",
    },
    optionB: {
      label: "Oversized Soft Tote",
      description: "Room for the Book, dry cleaning, and Harry Potter manuscripts.",
      value: "b",
    },
  },
  {
    id: 4,
    prompt: "Your shoes click across the Runway office floor—",
    optionA: {
      label: "Pointed Stilettos",
      description: "The sound announces you before you arrive. Very Miranda.",
      value: "a",
    },
    optionB: {
      label: "Architectural Block Heels",
      description: "Modern, grounded. You're here to work, not wobble.",
      value: "b",
    },
  },
  {
    id: 5,
    prompt: "Paris Fashion Week. Your outerwear of choice—",
    optionA: {
      label: "The Statement Coat",
      description: "Floor-length, cinematic. Like stepping out of the Town Car.",
      value: "a",
    },
    optionB: {
      label: "The Leather Jacket",
      description: "Rebellion meets refinement. Very post-fountain Andy.",
      value: "b",
    },
  },
  {
    id: 6,
    prompt: "One piece of jewellery to survive the Runway closet—",
    optionA: {
      label: "Single Pearl Strand",
      description: "Old money whisper. Miranda would nod approvingly.",
      value: "a",
    },
    optionB: {
      label: "Stacked Gold Chains",
      description: "Layered, textured. Emily would say 'I love it, I'm dying.'",
      value: "b",
    },
  },
];

export const quizResults: Record<string, QuizResult> = {
  editor: {
    id: "editor",
    name: "Miranda Priestly",
    title: "The Editor",
    description:
      "You command the room before you speak. Your wardrobe is a weapon — precise, intentional, devastating. Like Miranda, you don't follow trends. You end them. That's all.",
    cta: "Shop The Miranda Collection",
  },
  protegee: {
    id: "protegee",
    name: "Andy Sachs",
    title: "The Protégée",
    description:
      "You arrived in a lumpy cerulean sweater and left in Chanel boots. Your style bridges worlds — structure with soul, ambition with authenticity. You can wear the couture and still throw the phone in the fountain.",
    cta: "Shop The Andy Collection",
  },
  itgirl: {
    id: "itgirl",
    name: "Emily Charlton",
    title: "The It Girl",
    description:
      "Fashion isn't a hobby — it's your religion. You survived on cubes of cheese for a Runway gown. Bold, fierce, unapologetically dramatic. You'd starve for couture and call it discipline.",
    cta: "Shop The Emily Collection",
  },
  visionary: {
    id: "visionary",
    name: "Jacqueline Follet",
    title: "The Visionnaire",
    description:
      "Effortlessly chic, dangerously ambitious. You play the long game in couture — while everyone watches Miranda, you're already two moves ahead. Paris wasn't a reward. It was always the plan.",
    cta: "Shop The Jacqueline Collection",
  },
};
