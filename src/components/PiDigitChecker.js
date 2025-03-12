import { useState } from "react";

const PI_DIGITS = "1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482";

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
      className="flex flex-col items-center gap-4 p-6 min-h-screen" 
      style={{ backgroundColor: isGameOver ? "red" : "white" }}
    >
      <h1 className="text-2xl font-bold">Pi Cijfer Checker</h1>
      <p className="text-lg font-semibold">Score: {score}</p>
      <div className="border p-4 w-96 text-center shadow-md rounded-lg bg-white">
        <p className="mb-2">Voer de volgende 10 cijfers van π in:</p>
        <input
          type="text"
          value={input}
          maxLength={12}
          disabled={isGameOver}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 text-center text-xl w-full"
        />
        <button 
          onClick={handleCheck} 
          className="mt-4 w-full p-2 bg-blue-500 text-white rounded"
          disabled={isGameOver}
        >
          Controleer
        </button>
        {message && <p className="mt-2 text-lg">{message}</p>}
      </div>
    </div>
  );
}