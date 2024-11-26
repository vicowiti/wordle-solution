import { NextResponse } from "next/server";
import Words from "../../../../words.json";
export const GET = async () => {

  const randomIndex = Math.floor(Math.random() * Words.words.length);

  return NextResponse.json({
    word: Words.words[randomIndex]
  });
};
