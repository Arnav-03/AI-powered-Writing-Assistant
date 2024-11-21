import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { text, mode } = await request.json();

  // Validate inputs
  if (!text || !mode) {
    return NextResponse.json(
      { error: "Both 'text' and 'mode' are required." },
      { status: 400 }
    );
  }

  const geminikey = process.env.GEMINI;
  const genAI = new GoogleGenerativeAI(geminikey!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  // Generate the prompt based on rephrasing mode
  const prompt = `Rephrase the following text in a ${mode} style:

Original Text:
"${text}"

Rephrasing Guidelines:
- Maintain the original meaning and core message
- Apply a ${mode} tone and language complexity
- Ensure the rephrased version is clear and engaging
- Do not add or remove significant information`;

  const MAX_RETRIES = 5;
  const RETRY_DELAY = 3000;

  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      console.log(`Attempt ${attempt + 1}: Sending rephrase request to Gemini...`);
      const result = await model.generateContent(prompt);

      if (result && result.response) {
        return NextResponse.json({ rephrased: result.response.text() });
      } else {
        throw new Error("Empty response from Gemini");
      }
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed:`, error);

      if (attempt === MAX_RETRIES - 1) {
        return NextResponse.json(
          { error: "Max retries reached. Unable to rephrase text." },
          { status: 500 }
        );
      }

      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }

    attempt++;
  }
}