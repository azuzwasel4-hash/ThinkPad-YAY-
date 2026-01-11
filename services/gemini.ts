
import { GoogleGenAI } from "@google/genai";

// Fallback for environments where process might not be defined globally
const getApiKey = () => {
  try {
    return process.env.API_KEY || '';
  } catch {
    return '';
  }
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

export async function getThinkBotResponse(prompt: string, history: { role: string; content: string }[], currentLang: string = 'en') {
  const apiKey = getApiKey();
  if (!apiKey) {
    return "API Key missing. Please configure your environment variables.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.content }] })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `You are "ThinkBot", an AI assistant for the "ThinkPad YAY!!" community hub. 
        
        Your goals are:
        1. **Troubleshooting**: Provide expert, step-by-step solutions for ThinkPad hardware and software issues (e.g., BIOS updates, keyboard replacements, Linux driver support).
        2. **Buying Advice**: Recommend specific models like T480, X1 Carbon, or P-series based on user needs and budget.
        3. **Modding**: Offer advice on classic ThinkPad mods (e.g., 7-row keyboard mods, screen upgrades).
        
        Languages supported: English, Arabic, Russian, German, Hindi, and Spanish. Respond in the user's language.
        Maintain a professional, highly technical, and enthusiastic tone about ThinkPad hardware. Use Markdown for formatting.`,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "ThinkBot is currently undergoing maintenance. Please try again later.";
  }
}
