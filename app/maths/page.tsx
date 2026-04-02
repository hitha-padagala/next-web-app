"use client";
import { useState, useEffect } from "react";

type Category = "addition" | "subtraction" | "multiplication" | "division";

interface Question {
  num1: number;
  num2: number;
  op: string;
  answer: number;
}

const categoryConfig: Record<
  Category,
  {
    label: string;
    emoji: string;
    op: string;
    generate: () => Question;
    color: string;
  }
> = {
  addition: {
    label: "Addition",
    emoji: "➕",
    op: "+",
    color: "from-green-400 to-emerald-500",
    generate: () => {
      const a = Math.floor(Math.random() * 50) + 1;
      const b = Math.floor(Math.random() * 50) + 1;
      return { num1: a, num2: b, op: "+", answer: a + b };
    },
  },
  subtraction: {
    label: "Subtraction",
    emoji: "➖",
    op: "-",
    color: "from-blue-400 to-indigo-500",
    generate: () => {
      let a = Math.floor(Math.random() * 50) + 10;
      let b = Math.floor(Math.random() * 50) + 1;
      if (a < b) [a, b] = [b, a];
      return { num1: a, num2: b, op: "-", answer: a - b };
    },
  },
  multiplication: {
    label: "Multiplication",
    emoji: "✖️",
    op: "×",
    color: "from-purple-400 to-pink-500",
    generate: () => {
      const a = Math.floor(Math.random() * 12) + 1;
      const b = Math.floor(Math.random() * 12) + 1;
      return { num1: a, num2: b, op: "×", answer: a * b };
    },
  },
  division: {
    label: "Division",
    emoji: "➗",
    op: "÷",
    color: "from-orange-400 to-red-500",
    generate: () => {
      const b = Math.floor(Math.random() * 10) + 1;
      const answer = Math.floor(Math.random() * 10) + 1;
      const a = b * answer;
      return { num1: a, num2: b, op: "÷", answer };
    },
  },
};

function generateQuestions(category: Category, count: number): Question[] {
  const questions: Question[] = [];
  for (let i = 0; i < count; i++) {
    questions.push(categoryConfig[category].generate());
  }
  return questions;
}

const keypadButtons = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "⌫",
  "0",
  "✓",
];

export default function MathsPage() {
  const [category, setCategory] = useState<Category>("addition");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");
  const [answers, setAnswers] = useState<(boolean | null)[]>([]);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  const resetQuiz = () => {
    setQuestions(generateQuestions(category, 10));
    setCurrentIndex(0);
    setScore(0);
    setAnswer("");
    setResult("");
    setAnswers(new Array(10).fill(null));
  };

  useEffect(() => {
    if (started && !finished) {
      resetQuiz();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const startQuiz = () => {
    setStarted(true);
    setFinished(false);
    setQuestions(generateQuestions(category, 10));
    setCurrentIndex(0);
    setScore(0);
    setAnswer("");
    setResult("");
    setAnswers(new Array(10).fill(null));
  };

  const handleKeypadPress = (key: string) => {
    setPressedKey(key);
    setTimeout(() => setPressedKey(null), 150);

    if (key === "⌫") {
      setAnswer((prev) => prev.slice(0, -1));
    } else if (key === "✓") {
      if (answer.length > 0) check();
    } else {
      setAnswer((prev) => prev + key);
    }
  };

  const check = () => {
    if (questions.length === 0) return;
    const current = questions[currentIndex];
    const isCorrect = parseInt(answer || "NaN", 10) === current.answer;

    if (isCorrect) {
      setScore((s) => s + 1);
      setResult("🎉 Correct!");
    } else {
      setResult(`❌ Wrong! Answer is ${current.answer}`);
    }

    const newAnswers = [...answers];
    newAnswers[currentIndex] = isCorrect;
    setAnswers(newAnswers);

    setTimeout(() => {
      setResult("");
      setAnswer("");
      if (currentIndex < 9) {
        setCurrentIndex((i) => i + 1);
      } else {
        setFinished(true);
      }
    }, 1200);
  };

  const getBadge = () => {
    if (score === 10)
      return {
        emoji: "🏆",
        label: "Perfect Score!",
        color: "text-yellow-500",
        bg: "bg-yellow-100",
      };
    if (score >= 8)
      return {
        emoji: "🌟",
        label: "Excellent!",
        color: "text-blue-500",
        bg: "bg-blue-100",
      };
    if (score >= 6)
      return {
        emoji: "👍",
        label: "Good Job!",
        color: "text-green-500",
        bg: "bg-green-100",
      };
    if (score >= 4)
      return {
        emoji: "💪",
        label: "Keep Trying!",
        color: "text-orange-500",
        bg: "bg-orange-100",
      };
    return {
      emoji: "📚",
      label: "Practice More!",
      color: "text-red-500",
      bg: "bg-red-100",
    };
  };

  const allCorrect = score === 10;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-50 to-blue-100 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          🧮 Maths Fun! 🎯
        </h1>

        {!started ? (
          <div className="bg-white rounded-3xl shadow-xl p-6 border-4 border-purple-200">
            <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">
              🎮 Choose a Game
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {(Object.keys(categoryConfig) as Category[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setCategory(key)}
                  className={`p-5 rounded-2xl border-4 text-lg font-bold transition transform hover:scale-105 ${
                    category === key
                      ? `bg-gradient-to-br ${categoryConfig[key].color} text-white border-white shadow-lg`
                      : "bg-white border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <div className="text-4xl mb-2">
                    {categoryConfig[key].emoji}
                  </div>
                  <div>{categoryConfig[key].label}</div>
                </button>
              ))}
            </div>
            <button
              onClick={startQuiz}
              className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:from-green-500 hover:to-emerald-600 transition transform hover:scale-105 shadow-lg"
            >
              🚀 Start Quiz (10 Questions)
            </button>
          </div>
        ) : finished ? (
          <div className="bg-white rounded-3xl shadow-xl p-6 border-4 border-yellow-200">
            <h2 className="text-3xl font-bold text-center mb-4 text-purple-700">
              🎊 Quiz Complete! 🎊
            </h2>
            <div className="text-8xl mb-4 animate-bounce">
              {getBadge().emoji}
            </div>
            <div className={`text-3xl font-bold ${getBadge().color} mb-2`}>
              {getBadge().label}
            </div>
            <div className="text-2xl mb-4 text-gray-700">
              Score:{" "}
              <span className="font-bold text-purple-600">{score}/10</span>
            </div>
            {allCorrect && (
              <div className="bg-gradient-to-r from-yellow-100 to-amber-100 border-4 border-yellow-400 rounded-2xl p-4 mb-4">
                <div className="text-4xl mb-2">🎉🏆🎉</div>
                <div className="text-xl font-bold text-yellow-700">
                  ALL CORRECT! AMAZING WORK!
                </div>
                <div className="text-3xl mt-2">⭐⭐⭐⭐⭐</div>
              </div>
            )}
            <div className="mb-4">
              <h3 className="font-bold text-lg mb-2 text-gray-700">
                📋 Your Answers:
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {answers.map((a, i) => (
                  <span
                    key={i}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                      a === true
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {a ? "✓" : "✗"}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={startQuiz}
              className="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:from-blue-500 hover:to-purple-600 transition transform hover:scale-105 shadow-lg"
            >
              🔄 Play Again
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl p-6 border-4 border-blue-200">
            <div className="flex justify-between items-center mb-4">
              <div
                className={`text-lg font-bold px-4 py-2 rounded-full bg-gradient-to-r ${categoryConfig[category].color} text-white`}
              >
                {categoryConfig[category].emoji}{" "}
                {categoryConfig[category].label}
              </div>
              <div className="text-xl font-bold text-purple-600">
                ⭐ {score}/10
              </div>
            </div>
            <div className="mb-2 text-sm text-gray-500 font-medium">
              📝 Question {currentIndex + 1} of 10
            </div>
            <div className="flex justify-center gap-1 mb-4">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-2 rounded-full ${
                    i < currentIndex
                      ? answers[i]
                        ? "bg-green-500"
                        : "bg-red-500"
                      : i === currentIndex
                        ? "bg-purple-500"
                        : "bg-gray-200"
                  }`}
                />
              ))}
            </div>

            {questions[currentIndex] && (
              <>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-4">
                  <h2 className="text-5xl font-bold text-center text-gray-800">
                    {questions[currentIndex].num1} {questions[currentIndex].op}{" "}
                    {questions[currentIndex].num2} ={" "}
                    <span className="text-purple-600">{answer || "?"}</span>
                  </h2>
                </div>

                <div className="mt-4 text-2xl font-bold min-h-[2.5rem] text-center">
                  {result && (
                    <span
                      className={
                        result.includes("Correct")
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {result}
                    </span>
                  )}
                </div>

                {/* Number Keypad */}
                <div className="grid grid-cols-3 gap-2 mt-4 max-w-xs mx-auto">
                  {keypadButtons.map((key) => {
                    let btnClass =
                      "bg-gray-100 hover:bg-gray-200 text-gray-800";
                    if (key === "⌫") {
                      btnClass = "bg-orange-400 hover:bg-orange-500 text-white";
                    } else if (key === "✓") {
                      btnClass = "bg-green-500 hover:bg-green-600 text-white";
                    } else if (pressedKey === key) {
                      btnClass = "bg-purple-300 text-purple-800";
                    }
                    return (
                      <button
                        key={key}
                        onClick={() => handleKeypadPress(key)}
                        className={`py-4 rounded-xl text-2xl font-bold transition transform active:scale-95 shadow-md ${btnClass}`}
                      >
                        {key}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
