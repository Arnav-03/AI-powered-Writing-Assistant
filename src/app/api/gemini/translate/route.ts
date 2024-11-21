import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { text, targetLanguage } = await request.json();

  // Validate inputs
  if (!text || !targetLanguage) {
    return NextResponse.json(
      { error: "Both 'text' and 'targetLanguage' are required." },
      { status: 400 }
    );
  }

  const geminikey = process.env.GEMINI;
  const genAI = new GoogleGenerativeAI(geminikey!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  // Generate the prompt based on target language
  const prompt = `Translate the following text to ${targetLanguage}:

Original Text:
"${text}"

Translation Guidelines:
- Provide an accurate translation to ${targetLanguage}
- Preserve the original meaning and tone
- Use natural, fluent ${targetLanguage} language
- If the text contains idiomatic expressions, translate them appropriately`;

  const MAX_RETRIES = 5;
  const RETRY_DELAY = 3000;

  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      console.log(`Attempt ${attempt + 1}: Sending translation request to Gemini...`);
      const result = await model.generateContent(prompt);

      if (result && result.response) {
        return NextResponse.json({ translated: result.response.text() });
      } else {
        throw new Error("Empty response from Gemini");
      }
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed:`, error);

      if (attempt === MAX_RETRIES - 1) {
        return NextResponse.json(
          { error: "Max retries reached. Unable to translate text." },
          { status: 500 }
        );
      }

      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }

    attempt++;
  }
}