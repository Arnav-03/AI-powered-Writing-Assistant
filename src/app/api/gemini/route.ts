import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure server-side execution
export const runtime = "edge";

// Maximum execution time
export const maxDuration = 60;

// Ensure dynamic rendering
export const dynamic = "force-dynamic";

// Validate the environment variable
if (!process.env.GEMINI) {
  throw new Error("Missing GEMINI API key in environment variables");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { topic, type } = await request.json();

    // Validate input
    if (!topic || !type) {
      return NextResponse.json(
        { error: "Topic and type are required" },
        { status: 400 }
      );
    }

    // Validate type
    if (!["essay", "blog"].includes(type.toLowerCase())) {
      return NextResponse.json(
        { error: `Invalid type "${type}". Please specify "essay" or "blog".` },
        { status: 400 }
      );
    }

    // Construct prompt based on type
    const prompt = `Write a detailed ${type} on the topic: "${topic}". 
If the type is "essay":
    - Write with an academic tone.
    - Focus on a structured format with an introduction, body, and conclusion.
    - Ensure the content is formal and objective.

If the type is "blog":
    - Write in a conversational and engaging style.
    - Include an introduction, key points, and a casual conclusion.
    - Make the content relatable and easy to read for a broad audience.`;

    // Generate content
    const result = await model.generateContent(prompt);
    const generatedText = result.response.text();

    // Return the generated content
    return NextResponse.json({ content: generatedText });
  } catch (error) {
    console.error("Error generating content:", error);

    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
