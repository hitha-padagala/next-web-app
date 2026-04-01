"use client"
import { useEffect, useState } from "react";

export default function MathsPage() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [op, setOp] = useState("+");
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");

  const generate = () => {
    const ops = ["+", "-", "×"];
    const operator = ops[Math.floor(Math.random() * ops.length)];
    let a = Math.floor(Math.random() * 10);
    let b = Math.floor(Math.random() * 10);
    if (operator === "-" && a < b) [a, b] = [b, a];
    setNum1(a);
    setNum2(b);
    setOp(operator);
  };

  useEffect(() => {
    generate();
  }, []);

  const correct = () => {
    if (op === "+") return num1 + num2;
    if (op === "-") return num1 - num2;
    return num1 * num2;
  };

  const check = () => {
    if (parseInt(answer || "NaN") === correct()) {
      setScore((s) => s + 1);
      setResult("🎉 Correct!");
    } else {
      setResult("❌ Try again!");
    }
    setAnswer("");
    setTimeout(() => {
      setResult("");
      generate();
    }, 1000);
  };

  return (
    <div className="p-4">
      <div className="text-center card-like">
        <div className="text-lg">⭐ Score: {score}</div>
        <h2 className="text-3xl font-bold mt-6">{num1} {op} {num2} = ?</h2>

        <div className="mt-6 flex justify-center">
          <input value={answer} onChange={(e) => setAnswer(e.target.value)} className="border px-3 py-2 rounded-md" />
        </div>

        <div className="mt-4">
          <button onClick={check} className="bg-sky-600 text-white btn-pill">Submit</button>
        </div>

        <div className="mt-4 text-lg">{result}</div>
      </div>
    </div>
  );
}
