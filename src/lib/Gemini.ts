"use server";
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const geminikey = process.env.GEMINI;
const genAI = new GoogleGenerativeAI(geminikey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export async function generateFromGemini(topic: string, type: string) {
  console.log("Called Gemini");
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

  const MAX_RETRIES = 5; // Maximum number of retries
  const RETRY_DELAY = 3000; // Delay between retries in milliseconds

  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      console.log(`Attempt ${attempt + 1}: Sending request to Gemini...`);
      const result = await model.generateContent(prompt);

      // Return the response if successful
      if (result && result.response) {
        return result.response.text();
      } else {
        throw new Error("Empty response from Gemini");
      }
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed:`, error);

      if (attempt === MAX_RETRIES - 1) {
        // Throw the error if we've reached the max attempts
        throw new Error("Max retries reached. Unable to generate content.");
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }

    attempt++;
  }
}
