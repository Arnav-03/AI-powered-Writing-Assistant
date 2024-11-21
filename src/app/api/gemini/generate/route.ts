import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
export const maxDuration = 60; // This function can run for a maximum of 5 seconds
export const dynamic = 'force-dynamic';
 
export async function POST(request: Request) {
  const { topic, type } = await request.json();

  if (!["essay", "blog"].includes(type.toLowerCase())) {
    return NextResponse.json(
      { error: `Invalid type "${type}". Please specify "essay" or "blog".` },
      { status: 400 }
    );
  }

  const geminikey = process.env.GEMINI;
  const genAI = new GoogleGenerativeAI(geminikey!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `Write a detailed ${type} on the topic: "${topic}". 
  If the type is "essay":
      - Write with an academic tone.
      - Focus on a structured format with an introduction, body, and conclusion.
      - Ensure the content is formal and objective.

  If the type is "blog":
      - Write in a conversational and engaging style.
      - Include an introduction, key points, and a casual conclusion.
      - Make the content relatable and easy to read for a broad audience.`;

  const MAX_RETRIES = 5;
  const RETRY_DELAY = 3000;

  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      console.log(`Attempt ${attempt + 1}: Sending request to Gemini...`);
      const result = await model.generateContent(prompt);

      if (result && result.response) {
        return NextResponse.json({ content: result.response.text() });
      } else {
        throw new Error("Empty response from Gemini");
      }
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed:`, error);

      if (attempt === MAX_RETRIES - 1) {
        return NextResponse.json(
          { error: "Max retries reached. Unable to generate content." },
          { status: 500 }
        );
      }

      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }

    attempt++;
  }
}
