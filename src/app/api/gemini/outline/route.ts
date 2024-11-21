import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { topic } = await request.json();

  // Validate inputs
  if (!topic) {
    return NextResponse.json(
      { error: "Topic is required for generating an outline." },
      { status: 400 }
    );
  }

  const geminikey = process.env.GEMINI;
  const genAI = new GoogleGenerativeAI(geminikey!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  // Generate the prompt for outline creation
  const prompt = `Create a detailed, hierarchical outline for the topic: "${topic}"

Outline Guidelines:
- Include main sections and subsections
- Provide 3-5 main sections
- Add 2-4 subsections under each main section
- Use clear, descriptive headings
- Ensure logical flow and progression of ideas
- Make the outline comprehensive yet concise`;

  const MAX_RETRIES = 5;
  const RETRY_DELAY = 3000;

  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      console.log(`Attempt ${attempt + 1}: Sending outline request to Gemini...`);
      const result = await model.generateContent(prompt);

      if (result && result.response) {
        return NextResponse.json({ outline: result.response.text() });
      } else {
        throw new Error("Empty response from Gemini");
      }
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed:`, error);

      if (attempt === MAX_RETRIES - 1) {
        return NextResponse.json(
          { error: "Max retries reached. Unable to generate outline." },
          { status: 500 }
        );
      }

      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }

    attempt++;
  }
}