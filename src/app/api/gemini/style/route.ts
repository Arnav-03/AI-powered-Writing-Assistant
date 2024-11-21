import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 60; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { selectedText, style } = await request.json();

  // Validate inputs
  if (!selectedText || !style) {
    return NextResponse.json(
      { error: "Both 'selectedText' and 'style' are required." },
      { status: 400 }
    );
  }

  const geminikey = process.env.GEMINI;
  const genAI = new GoogleGenerativeAI(geminikey!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  // Generate the prompt based on input
  const prompt = `Transform the following text into a style described as "${style}":
  
Original Text:
"${selectedText}"

Requirements:
- Maintain the original meaning of the text.
- Apply the style "${style}" as specified.`;

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
          { error: "Max retries reached. Unable to transform text." },
          { status: 500 }
        );
      }

      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }

    attempt++;
  }
}
