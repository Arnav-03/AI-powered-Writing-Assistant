"use server";
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const geminikey = process.env.GEMINI;
const genAI = new GoogleGenerativeAI(geminikey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export async function generateFromGemini(topic: any, type: string) {
  console.log("called gemini ");
  console.log(topic, type);
  if (!["essay", "blog"].includes(type.toLowerCase())) {
    throw new Error(
      `Invalid type "${type}". Please specify "essay" or "blog".`
    );
  }

  const prompt = `Write a detailed ${type} on the topic: "${topic}". 
If the type is "essay":
    - Write with an academic tone.
    - Focus on a structured format with an introduction, body, and conclusion.
    - Ensure the content is formal and objective.

If the type is "blog":
    - Write in a conversational and engaging style.
    - Include an introduction, key points, and a casual conclusion.
    - Make the content relatable and easy to read for a broad audience.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}
