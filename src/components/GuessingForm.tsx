"use client";
import { useState } from "react";

interface Props {
  wordToGuess: string;
}

const GuessingForm = (props: Props) => {
  const [guess, setGuess] = useState<string[]>(Array(5).fill(""));
  const [attempts, setAttempts] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
 

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const attempt: number[] = [];

    for (let i = 0; i < 5; i++) {
      if (guess[i].toLowerCase() === props.wordToGuess[i].toLowerCase()) {
        // Green (correct position)
        attempt[i] = 1;
      } else if (
        props.wordToGuess.toLowerCase().includes(guess[i].toLowerCase())
      ) {
        // Yellow (exists but incorrect position)
        attempt[i] = 2;
      } else {
        // Gray (does not exist)
        attempt[i] = 0;
      }
    }
    setAttempts(attempt);
  };

  const handleInputChange = (index: number, value: string) => {
    // Ensure only one character is entered
    if (value.length > 1) return;

    const updatedGuess = [...guess];
    updatedGuess[index] = value;
    setGuess(updatedGuess);
  };

  return (
    <form
      onSubmit={handleGuess}
      className="mt-5 w-full flex justify-center flex-col gap-3 items-center"
    >
      <p>Word: {props.wordToGuess}</p>
      <section className="w-full flex gap-2 justify-center items-center mt-5">
        {guess.map((letter, index) => (
          <input
            key={index}
            value={letter}
            onChange={(e) => handleInputChange(index, e.target.value)}
            maxLength={1}
            style={{
              backgroundColor:
                isSubmitted && attempts[index] === 1
                  ? "green"
                  : isSubmitted && attempts[index] === 2
                  ? "yellow"
                  : isSubmitted && attempts[index] === 0
                  ? "gray"
                  : "white",
            }}
            className="border border-black p-3 w-14 h-14 rounded-md flex justify-center items-center"
          />
        ))}
      </section>

      <button type="submit" className="p-3 bg-gray-300 rounded-md">
        Attempt
      </button>
    </form>
  );
};

export default GuessingForm;
