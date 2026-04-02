
import { GoogleGenAI } from "@google/genai";
import fs from "fs";

async function generate() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY not found");
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = "gemini-2.5-flash-image";

  const prompt = "A high-quality, minimalist, futuristic digital art piece featuring the text 'MALVIN KRISTANTO ALIM' in a bold, clean, sans-serif font. The background is deep black with subtle cyan neon glow and thin geometric grid lines. The aesthetic is professional, tech-oriented, and matches a modern software engineer's portfolio. 16:9 aspect ratio.";

  try {
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [{ text: prompt }],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64 = part.inlineData.data;
        fs.writeFileSync("src/name-image-base64.ts", `export const nameImageBase64 = "data:image/png;base64,${base64}";`);
        console.log("Image generated and saved to src/name-image-base64.ts");
        return;
      }
    }
    console.error("No image generated");
  } catch (error) {
    console.error("Error generating image:", error);
  }
}

generate();
