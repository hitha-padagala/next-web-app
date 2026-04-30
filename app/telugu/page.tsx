"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import vegetablesData from "@/data/telugu-vegetables.json";
import fruitsData from "@/data/telugu-fruits.json";
import readingLessonsData from "@/data/telugu-reading.json";

type Section = "vegetables" | "fruits" | "reading";

type VegetableItem = {
  telugu: string;
  phonetic: string;
  english: string;
  image: string;
  emoji: string;
};

type FruitItem = {
  telugu: string;
  phonetic: string;
  english: string;
  image: string;
  emoji: string;
};

type ReadingItem = {
  title: string;
  telugu: string;
  phonetic: string;
  english: string;
  emoji: string;
};

const { vegetables } = vegetablesData;
const { fruits } = fruitsData;
const { readingLessons } = readingLessonsData;

const getTeluguVoice = (voices: SpeechSynthesisVoice[]) => {
  return (
    voices.find((v) => v.lang.toLowerCase().startsWith("te")) ||
    voices.find((v) => v.lang.toLowerCase().includes("in")) ||
    null
  );
};

const sectionConfig: Record<
  Section,
  {
    label: string;
    emoji: string;
    color: string;
    bgColor: string;
    borderColor: string;
  }
> = {
  vegetables: {
    label: "కూరగాయలు",
    emoji: "🥬",
    color: "from-green-400 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50",
    borderColor: "border-green-300",
  },
  fruits: {
    label: "పండ్లు",
    emoji: "🍎",
    color: "from-red-400 to-pink-500",
    bgColor: "from-red-50 to-pink-50",
    borderColor: "border-red-300",
  },
  reading: {
    label: "చదవడం నేర్చుకుందాం",
    emoji: "📖",
    color: "from-blue-400 to-indigo-500",
    bgColor: "from-blue-50 to-indigo-50",
    borderColor: "border-blue-300",
  },
};

export default function TeluguPage() {
  const [activeSection, setActiveSection] = useState<Section>("vegetables");
  const [vegIndex, setVegIndex] = useState(0);
  const [fruitIndex, setFruitIndex] = useState(0);
  const [readingIndex, setReadingIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  // Load voices when component mounts
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      // Load voices
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          setVoicesLoaded(true);
        }
      };

      // Try to load voices immediately
      loadVoices();

      // Listen for voiceschanged event (voices may load asynchronously)
      window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

      return () => {
        window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      };
    }
  }, []);

  const currentVeg = vegetables[vegIndex];
  const currentFruit = fruits[fruitIndex];
  const currentReading = readingLessons[readingIndex];

  const speak = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.9;
    // Try to find an English voice
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(
      (v) => v.lang.startsWith("en") && !v.lang.startsWith("en-IN"),
    );
    if (englishVoice) u.voice = englishVoice;
    window.speechSynthesis.speak(u);
  };

  const speakTelugu = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "te-IN";
    u.rate = 0.8;

    // Ensure voices are loaded before trying to speak (important in Chrome/Edge)
    if (!voicesLoaded) {
      window.speechSynthesis.getVoices();
    }

    // Try to find a Telugu voice first
    const voices = window.speechSynthesis.getVoices();
    const teluguVoice = getTeluguVoice(voices);
    if (teluguVoice) {
      u.voice = teluguVoice;
    }

    u.onerror = () => {
      const fallback = new SpeechSynthesisUtterance(text);
      fallback.lang = "en-IN";
      fallback.rate = 0.8;
      window.speechSynthesis.speak(fallback);
    };

    window.speechSynthesis.speak(u);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-sky-200 via-purple-100 to-pink-200">
      {/* Floating clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animate-float-slow absolute top-10 left-10 text-6xl">
          ☁️
        </div>
        <div className="animate-float-medium absolute top-20 right-20 text-5xl">
          ☁️
        </div>
        <div className="animate-float-fast absolute top-40 left-1/3 text-4xl">
          ☁️
        </div>
        <div className="animate-float-slow absolute top-60 right-1/4 text-6xl">
          ☁️
        </div>
      </div>

      {/* Floating stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-twinkle"
            style={{
              top: `${10 + i * 10}%`,
              left: `${5 + i * 10}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            ⭐
          </div>
        ))}
      </div>

      {/* Floating emojis */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="animate-bounce absolute top-32 left-20 text-4xl"
          style={{ animationDelay: "0s" }}
        >
          🥬
        </div>
        <div
          className="animate-bounce absolute top-48 right-16 text-4xl"
          style={{ animationDelay: "0.5s" }}
        >
          🍎
        </div>
        <div
          className="animate-bounce absolute bottom-32 left-24 text-4xl"
          style={{ animationDelay: "1s" }}
        >
          📖
        </div>
        <div
          className="animate-bounce absolute bottom-48 right-24 text-4xl"
          style={{ animationDelay: "0.3s" }}
        >
          🌟
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Fun header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="text-5xl animate-bounce">📚</span>
              <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 drop-shadow-lg">
                తెలుగు నేర్చుకుందాం!
              </h1>
              <span
                className="text-5xl animate-bounce"
                style={{ animationDelay: "0.3s" }}
              >
                🎯
              </span>
            </div>
            <p className="text-xl font-semibold text-purple-700 drop-shadow-sm">
              {"Hey Champ! Let's Learn Telugu! 🚀"}
            </p>
          </div>

          {/* Section Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {(Object.keys(sectionConfig) as Section[]).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setActiveSection(key);
                  setShowTranslation(false);
                }}
                className={`px-5 py-3 rounded-2xl border-4 text-lg font-bold transition transform hover:scale-110 ${
                  activeSection === key
                    ? `bg-gradient-to-br ${sectionConfig[key].color} text-white border-white shadow-lg`
                    : "bg-white border-gray-200 hover:border-purple-300"
                }`}
              >
                <span className="text-2xl mr-2">
                  {sectionConfig[key].emoji}
                </span>
                {sectionConfig[key].label}
              </button>
            ))}
          </div>

          {/* Vegetables Section */}
          {activeSection === "vegetables" && (
            <div className="bg-white rounded-3xl shadow-xl p-6 border-4 border-green-200 relative">
              {/* Decorative corner emojis */}
              <div className="absolute -top-4 -left-4 text-4xl animate-bounce">
                🥕
              </div>
              <div
                className="absolute -top-4 -right-4 text-4xl animate-bounce"
                style={{ animationDelay: "0.5s" }}
              >
                🍅
              </div>
              <div
                className="absolute -bottom-4 -left-4 text-4xl animate-bounce"
                style={{ animationDelay: "1s" }}
              >
                🥔
              </div>
              <div
                className="absolute -bottom-4 -right-4 text-4xl animate-bounce"
                style={{ animationDelay: "0.3s" }}
              >
                🥒
              </div>

              <h2 className="text-3xl font-bold text-center mb-6 text-green-700">
                🥬 కూరగాయలు (Vegetables) 🥦
              </h2>

              <div className="text-center">
                {/* Image with fun border */}
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-emerald-300 rounded-2xl transform rotate-3"></div>
                  <img
                    src={currentVeg.image}
                    alt={currentVeg.telugu}
                    width={224}
                    height={224}
                    className="relative w-56 h-56 object-cover rounded-2xl mx-auto shadow-lg border-4 border-white"
                  />
                </div>

                {/* Name display with animation */}
                <div className="mt-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-4 inline-block">
                  <h3 className="text-5xl font-bold text-green-800 animate-pulse">
                    {currentVeg.emoji} {currentVeg.telugu} {currentVeg.emoji}
                  </h3>
                  <div className="mt-2 text-2xl text-zinc-600 font-medium">
                    🔊 {currentVeg.phonetic}
                  </div>
                  <div className="mt-1 text-lg text-zinc-500">
                    ({currentVeg.english})
                  </div>
                </div>

                {/* Fun buttons */}
                <div className="mt-6 flex justify-center gap-3 flex-wrap">
                  <button
                    onClick={() => speakTelugu(currentVeg.telugu)}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:from-indigo-600 hover:to-purple-600 transition transform hover:scale-110 shadow-lg"
                  >
                    🔊 వినండి
                  </button>
                  <button
                    onClick={() =>
                      setVegIndex((i) => (i + 1) % vegetables.length)
                    }
                    className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:from-green-500 hover:to-emerald-600 transition transform hover:scale-110 shadow-lg"
                  >
                    ➡️ తర్వాత
                  </button>
                  <button
                    onClick={() =>
                      setVegIndex(
                        (i) => (i - 1 + vegetables.length) % vegetables.length,
                      )
                    }
                    className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:from-blue-500 hover:to-cyan-600 transition transform hover:scale-110 shadow-lg"
                  >
                    ⬅️ ముందు
                  </button>
                </div>

                {/* Progress bar */}
                <div className="mt-4 flex items-center justify-center gap-2">
                  <span className="text-sm text-gray-500">{vegIndex + 1}</span>
                  <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-300"
                      style={{
                        width: `${((vegIndex + 1) / vegetables.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {vegetables.length}
                  </span>
                </div>

                {/* All vegetables grid */}
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    👀 అన్ని కూరగాయలు చూడండి:
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {vegetables.map((veg, idx) => (
                      <button
                        key={idx}
                        onClick={() => setVegIndex(idx)}
                        className={`p-3 rounded-xl border-2 transition transform hover:scale-110 ${
                          idx === vegIndex
                            ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white border-green-500 shadow-lg"
                            : "bg-white border-gray-200 hover:border-green-300"
                        }`}
                      >
                        <div className="text-3xl mb-1">{veg.emoji}</div>
                        <div className="text-xs font-bold">{veg.telugu}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fruits Section */}
          {activeSection === "fruits" && (
            <div className="bg-white rounded-3xl shadow-xl p-6 border-4 border-red-200 relative">
              {/* Decorative corner emojis */}
              <div className="absolute -top-4 -left-4 text-4xl animate-bounce">
                🍎
              </div>
              <div
                className="absolute -top-4 -right-4 text-4xl animate-bounce"
                style={{ animationDelay: "0.5s" }}
              >
                🍌
              </div>
              <div
                className="absolute -bottom-4 -left-4 text-4xl animate-bounce"
                style={{ animationDelay: "1s" }}
              >
                🍇
              </div>
              <div
                className="absolute -bottom-4 -right-4 text-4xl animate-bounce"
                style={{ animationDelay: "0.3s" }}
              >
                🍊
              </div>

              <h2 className="text-3xl font-bold text-center mb-6 text-red-700">
                🍎 పండ్లు (Fruits) 🍇
              </h2>

              <div className="text-center">
                {/* Image with fun border */}
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-300 to-pink-300 rounded-2xl transform rotate-3"></div>
                  <img
                    src={currentFruit.image}
                    alt={currentFruit.telugu}
                    width={224}
                    height={224}
                    className="relative w-56 h-56 object-cover rounded-2xl mx-auto shadow-lg border-4 border-white"
                  />
                </div>

                {/* Name display with animation */}
                <div className="mt-6 bg-gradient-to-r from-red-100 to-pink-100 rounded-2xl p-4 inline-block">
                  <h3 className="text-5xl font-bold text-red-800 animate-pulse">
                    {currentFruit.emoji} {currentFruit.telugu}{" "}
                    {currentFruit.emoji}
                  </h3>
                  <div className="mt-2 text-2xl text-zinc-600 font-medium">
                    🔊 {currentFruit.phonetic}
                  </div>
                  <div className="mt-1 text-lg text-zinc-500">
                    ({currentFruit.english})
                  </div>
                </div>

                {/* Fun buttons */}
                <div className="mt-6 flex justify-center gap-3 flex-wrap">
                  <button
                    onClick={() => speakTelugu(currentFruit.telugu)}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:from-indigo-600 hover:to-purple-600 transition transform hover:scale-110 shadow-lg"
                  >
                    🔊 వినండి
                  </button>
                  <button
                    onClick={() =>
                      setFruitIndex((i) => (i + 1) % fruits.length)
                    }
                    className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:from-red-500 hover:to-pink-600 transition transform hover:scale-110 shadow-lg"
                  >
                    ➡️ తర్వాత
                  </button>
                  <button
                    onClick={() =>
                      setFruitIndex(
                        (i) => (i - 1 + fruits.length) % fruits.length,
                      )
                    }
                    className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:from-orange-500 hover:to-red-600 transition transform hover:scale-110 shadow-lg"
                  >
                    ⬅️ ముందు
                  </button>
                </div>

                {/* Progress bar */}
                <div className="mt-4 flex items-center justify-center gap-2">
                  <span className="text-sm text-gray-500">
                    {fruitIndex + 1}
                  </span>
                  <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-400 to-pink-500 transition-all duration-300"
                      style={{
                        width: `${((fruitIndex + 1) / fruits.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500">{fruits.length}</span>
                </div>

                {/* All fruits grid */}
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-gray-700 mb-3">
                    👀 అన్ని పండ్లు చూడండి:
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {fruits.map((fruit, idx) => (
                      <button
                        key={idx}
                        onClick={() => setFruitIndex(idx)}
                        className={`p-3 rounded-xl border-2 transition transform hover:scale-110 ${
                          idx === fruitIndex
                            ? "bg-gradient-to-br from-red-400 to-pink-500 text-white border-red-500 shadow-lg"
                            : "bg-white border-gray-200 hover:border-red-300"
                        }`}
                      >
                        <div className="text-3xl mb-1">{fruit.emoji}</div>
                        <div className="text-xs font-bold">{fruit.telugu}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reading Section */}
          {activeSection === "reading" && (
            <div className="bg-white rounded-3xl shadow-xl p-6 border-4 border-blue-200 relative">
              {/* Decorative corner emojis */}
              <div className="absolute -top-4 -left-4 text-4xl animate-bounce">
                📚
              </div>
              <div
                className="absolute -top-4 -right-4 text-4xl animate-bounce"
                style={{ animationDelay: "0.5s" }}
              >
                ✏️
              </div>
              <div
                className="absolute -bottom-4 -left-4 text-4xl animate-bounce"
                style={{ animationDelay: "1s" }}
              >
                🎓
              </div>
              <div
                className="absolute -bottom-4 -right-4 text-4xl animate-bounce"
                style={{ animationDelay: "0.3s" }}
              >
                📝
              </div>

              <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
                📖 చదవడం నేర్చుకుందాం 🎓
              </h2>

              {/* Lesson Navigation */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {readingLessons.map((lesson, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setReadingIndex(idx);
                      setShowTranslation(false);
                    }}
                    className={`px-3 py-2 rounded-xl text-sm font-bold transition transform hover:scale-110 ${
                      idx === readingIndex
                        ? "bg-gradient-to-br from-blue-400 to-indigo-500 text-white shadow-lg"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {lesson.emoji} {lesson.title.split(" ")[0]}
                  </button>
                ))}
              </div>

              {/* Current Lesson Content */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-4 border-2 border-blue-200">
                <div className="text-center mb-4">
                  <span className="text-5xl animate-bounce inline-block">
                    {currentReading.emoji}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-center mb-4 text-blue-800">
                  {currentReading.title}
                </h3>

                <div className="text-2xl sm:text-3xl leading-relaxed text-center text-gray-800 mb-4 whitespace-pre-line bg-white rounded-xl p-4 border-2 border-blue-100">
                  {currentReading.telugu}
                </div>

                <div className="text-lg text-center text-zinc-600 mb-2 italic bg-white/50 rounded-xl p-3">
                  🔊 {currentReading.phonetic}
                </div>

                {showTranslation && (
                  <div className="text-lg text-center text-green-700 bg-green-50 rounded-xl p-3 mt-2 border-2 border-green-200 animate-pulse">
                    🌟 {currentReading.english}
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="mt-4 flex justify-center gap-3 flex-wrap">
                <button
                  onClick={() => speakTelugu(currentReading.telugu)}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-3 rounded-2xl text-lg font-bold hover:from-indigo-600 hover:to-purple-600 transition transform hover:scale-110 shadow-lg"
                >
                  🔊 తెలుగు వినండి
                </button>
                <button
                  onClick={() => speak(currentReading.phonetic)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-3 rounded-2xl text-lg font-bold hover:from-purple-600 hover:to-pink-600 transition transform hover:scale-110 shadow-lg"
                >
                  🔊 ఉచ్ఛారణ
                </button>
                <button
                  onClick={() => setShowTranslation(!showTranslation)}
                  className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-5 py-3 rounded-2xl text-lg font-bold hover:from-blue-500 hover:to-cyan-600 transition transform hover:scale-110 shadow-lg"
                >
                  {showTranslation ? "🙈 దాచు" : "👁️ చూడు"}
                </button>
                <button
                  onClick={() =>
                    setReadingIndex((i) => (i + 1) % readingLessons.length)
                  }
                  className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-5 py-3 rounded-2xl text-lg font-bold hover:from-green-500 hover:to-emerald-600 transition transform hover:scale-110 shadow-lg"
                >
                  ➡️ తర్వాత
                </button>
                <button
                  onClick={() =>
                    setReadingIndex(
                      (i) =>
                        (i - 1 + readingLessons.length) % readingLessons.length,
                    )
                  }
                  className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-5 py-3 rounded-2xl text-lg font-bold hover:from-orange-500 hover:to-yellow-600 transition transform hover:scale-110 shadow-lg"
                >
                  ⬅️ ముందు
                </button>
              </div>

              {/* Progress indicator */}
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="text-sm text-gray-500">
                  పాఠం {readingIndex + 1}
                </span>
                <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-300"
                    style={{
                      width: `${((readingIndex + 1) / readingLessons.length) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500">
                  {readingLessons.length}
                </span>
              </div>
            </div>
          )}

          {/* Back to Home */}
          <div className="text-center mt-6">
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-purple-400 to-pink-500 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:from-purple-500 hover:to-pink-600 transition transform hover:scale-110 shadow-lg"
            >
              🏠 హోమ్‌కి వెళ్ళండి
            </Link>
          </div>

          {/* Bottom decorative elements */}
          <div className="mt-8 flex items-center justify-center gap-4 text-4xl">
            <span className="animate-bounce" style={{ animationDelay: "0s" }}>
              🎈
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
              🌟
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
              🎯
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.6s" }}>
              🏆
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.8s" }}>
              🎈
            </span>
          </div>
        </div>
      </div>

      {/* Rainbow decoration at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-red-400 via-green-400 to-purple-400"></div>
    </div>
  );
}
