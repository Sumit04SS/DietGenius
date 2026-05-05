import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost",
    "X-Title": "AI Diet Planner",
  },
});

// 🔥 common function
const callAI = async (PROMPT) => {
  try {
    const res = await openai.chat.completions.create({
      model: "google/gemma-3-4b-it:free",
      messages: [{ role: "user", content: PROMPT }],
    });

    const text = res?.choices?.[0]?.message?.content;
    if (!text) return null;

    console.log("RAW AI TEXT:", text);

    try {
      let cleaned = text;

      cleaned = cleaned.replace(/```json/g, "").replace(/```/g, "");
      cleaned = cleaned.replace(/\*\*/g, "");
      cleaned = cleaned.replace(/\n/g, "").trim();

      // ✅ STRONG FIX
      cleaned = cleaned.replace(
        /"recipeName":\s*([^,}]+)/g,
        (match, p1) => `"recipeName": "${p1.trim().replace(/"/g, "")}"`
      );

      const start = cleaned.indexOf("[");
      const end = cleaned.lastIndexOf("]");

      if (start === -1 || end === -1) {
        console.log("No JSON found:", cleaned);
        return null;
      }

      const jsonString = cleaned.substring(start, end + 1);

      return JSON.parse(jsonString);

    } catch (e) {
      console.log("JSON parse failed:", text);
      return null;
    }

  } catch (error) {
    console.log("AI ERROR:", error.message);
    return null;
  }
};

// ✅ EXPORTS (NOW OUTSIDE FUNCTION)
export const CalculateCaloriesAI = async (PROMPT) => {
  return await callAI(PROMPT);
};

export const GenerateRecipeOptionsAiModel = async (PROMPT) => {
  return await callAI(PROMPT);
};

