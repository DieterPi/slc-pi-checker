import { useState } from "react";

const PI_DIGITS = "14159265358979323846264338327950288419716939937510";

export default function PiDigitChecker() {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("3,");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleCheck = () => {
    const userDigits = input.replace("3,", ""); // Verwijder "3," bij eerste invoer
    const correctDigits = PI_DIGITS.slice(index, index + 10);
    let correctCount = 0;

    for (let i = 0; i < userDigits.length; i++) {
      if (userDigits[i] === correctDigits[i]) {
        correctCount++;
      } else {
        break; // Stop bij de eerste fout
      }
    }

    if (correctCount === 10) {
      setMessage("Correct! Voer de volgende 10 cijfers in.");
      setIndex(index + 10);
      setInput("");
      setScore(score + 10);
    } else {
      setMessage("Fout! Spel voorbij.");
      setScore(score + correctCount);
      setIsGameOver(true);
    }
  };

  return (
    <div 
      className="flex flex-col items-center gap-6 p-12 min-h-screen w-full" 
      style={{ backgroundColor: isGameOver ? "red" : "white" }}
    >
      <h1 className="text-4xl font-bold">Pi Cijfer Checker</h1>
      <p className="text-2xl font-semibold">Score: {score}</p>
      <div className="border p-8 w-2/3 max-w-2xl text-center shadow-lg rounded-lg bg-white">
        <p className="mb-4 text-xl">Voer de volgende 10 cijfers van π in:</p>
        <input
          type="text"
          value={input}
          maxLength={12}
          disabled={isGameOver}
          onChange={(e) => setInput(e.target.value)}
          className="border p-4 text-center text-2xl w-full"
        />
        <button 
          onClick={handleCheck} 
          className="mt-6 w-full p-4 bg-blue-500 text-white text-xl rounded"
          disabled={isGameOver}
        >
          Controleer
        </button>
        {message && <p className="mt-4 text-2xl">{message}</p>}
      </div>
    </div>
  );
}
