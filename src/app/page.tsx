import GuessingForm from "@/components/GuessingForm";

export default async function Home() {
  const word = await fetch("http://localhost:3000/api/wordService", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await word.json();

  console.log("wordtEST", response);

  return (
    <main>
      <GuessingForm wordToGuess={response.word || ""} />
    </main>
  );
}
