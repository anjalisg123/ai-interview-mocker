"use server"
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// FIX: Switch to the newest model listed in your account
// 'gemini-2.5-flash' appeared in your successful list
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash", 
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export async function chatSession(prompt) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            { text: "Start Interview" },
          ],
        },
        {
            role: "model",
            parts:[
                {text:"Okay, I am ready to generate interview questions. Please provide the details."}
            ]
        }
      ],
    });

    const result = await chatSession.sendMessage(prompt);
    
    const responseText = result.response.text();
    const cleanText = responseText.replace(/```json|```/g, '').trim();

    return cleanText;

  } catch (error) {
    console.error("Error in AI generation:", error);
    throw new Error("Failed to generate interview questions");
  }
}