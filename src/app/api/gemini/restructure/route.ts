import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { text } = await request.json();

  // Validate inputs
  if (!text) {
    return NextResponse.json(
      { error: "Text is required for restructuring." },
      { status: 400 }
    );
  }

  const geminikey = process.env.GEMINI;
  const genAI = new GoogleGenerativeAI(geminikey!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  // Generate the prompt for restructuring
  const prompt = `Restructure the following text to improve clarity and flow:

Original Text:
"${text}"

Restructuring Guidelines:
- Improve sentence structure and organization
- Enhance readability and logical flow
- Maintain the original meaning and key points
- Break down complex sentences if needed
- Use transitional phrases to connect ideas
- Ensure a coherent and smooth narrative`;

  const MAX_RETRIES = 5;
  const RETRY_DELAY = 3000;

  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      console.log(`Attempt ${attempt + 1}: Sending restructuring request to Gemini...`);
      const result = await model.generateContent(prompt);

      if (result && result.response) {
        return NextResponse.json({ restructured: result.response.text() });
      } else {
        throw new Error("Empty response from Gemini");
      }
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed:`, error);

      if (attempt === MAX_RETRIES - 1) {
        return NextResponse.json(
          { error: "Max retries reached. Unable to restructure text." },
          { status: 500 }
        );
      }

      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }

    attempt++;
  }
}