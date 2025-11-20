"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

type Animal = "cat" | "dog" | "fox" | "hamster" | "horse";

interface Option {
  text: string;
  animal: Animal;
}

interface Question {
  question: string;
  options: Option[];
}

const questions: Question[] = [
  {
    question: "What’s your favorite type of activity?",
    options: [
      { text: "Chasing laser pointers", animal: "cat" },
      { text: "Playing fetch", animal: "dog" },
      { text: "Exploring forests", animal: "fox" },
      { text: "Nibbling on seeds", animal: "hamster" },
      { text: "Galloping in fields", animal: "horse" },
    ],
  },
  {
    question: "How do you prefer to spend a weekend?",
    options: [
      { text: "Curling up with a good book", animal: "cat" },
      { text: "Going for a long walk", animal: "dog" },
      { text: "Hiking in the woods", animal: "fox" },
      { text: "Running in a maze", animal: "hamster" },
      { text: "Riding a horse", animal: "horse" },
    ],
  },
  {
    question: "What’s your favorite snack?",
    options: [
      { text: "Fish flakes", animal: "cat" },
      { text: "Bones", animal: "dog" },
      { text: "Berries", animal: "fox" },
      { text: "Seeds", animal: "hamster" },
      { text: "Hay", animal: "horse" },
    ],
  },
  {
    question: "Which trait describes you best?",
    options: [
      { text: "Independent", animal: "cat" },
      { text: "Loyal", animal: "dog" },
      { text: "Curious", animal: "fox" },
      { text: "Energetic", animal: "hamster" },
      { text: "Graceful", animal: "horse" },
    ],
  },
  {
    question: "What’s your ideal vacation?",
    options: [
      { text: "A quiet cabin", animal: "cat" },
      { text: "A beach with a dog park", animal: "dog" },
      { text: "A forest retreat", animal: "fox" },
      { text: "A city with a petting zoo", animal: "hamster" },
      { text: "A ranch with open fields", animal: "horse" },
    ],
  },
];

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<Animal, number>>({
    cat: 0,
    dog: 0,
    fox: 0,
    hamster: 0,
    horse: 0,
  });
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[current];
  const shuffledOptions = useMemo(() => shuffle(currentQuestion.options), [current]);

  const handleAnswer = (animal: Animal) => {
    setScores((prev) => ({ ...prev, [animal]: prev[animal] + 1 }));
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const retake = () => {
    setCurrent(0);
    setScores({
      cat: 0,
      dog: 0,
      fox: 0,
      hamster: 0,
      horse: 0,
    });
    setShowResult(false);
  };

  if (showResult) {
    const bestAnimal = Object.entries(scores).reduce((a, b) =>
      b[1] > a[1] ? b : a
    )[0] as Animal;
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-semibold">
          You are most like a {bestAnimal}!
        </h2>
        <img
          src={`/${bestAnimal}.png`}
          alt={bestAnimal}
          width={512}
          height={512}
          className="rounded-md"
        />
        <Share text={`I am a ${bestAnimal}! ${url}`} />
        <Button variant="outline" onClick={retake}>
          Retake Quiz
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold">{currentQuestion.question}</h2>
      <div className="flex flex-col gap-2">
        {shuffledOptions.map((opt, idx) => (
          <Button
            key={idx}
            onClick={() => handleAnswer(opt.animal)}
            className="w-full"
          >
            {opt.text}
          </Button>
        ))}
      </div>
    </div>
  );
}
