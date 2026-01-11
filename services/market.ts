
import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
  try {
    return process.env.API_KEY || '';
  } catch {
    return '';
  }
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

export interface MarketInsight {
  text: string;
  sources: { title: string; uri: string }[];
}

export async function getMarketAnalysis(language: string = 'en'): Promise<MarketInsight> {
  const apiKey = getApiKey();
  if (!apiKey) {
    return {
      text: "Market analysis unavailable: API Key not configured.",
      sources: [],
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a brief financial market analysis for Lenovo (HKG: 0992) and the current resale market value trends for ThinkPad laptops (specifically T, X, and P series). 
      Format the response for a tech enthusiast hub. 
      Language: ${language}. 
      Include current stock sentiment and a 'Resale Index' recommendation (e.g. "Excellent time to buy used T480s").`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => ({
        title: chunk.web?.title || 'Source',
        uri: chunk.web?.uri || '#',
      }))
      .filter((s: any) => s.uri !== '#') || [];

    return {
      text: response.text || "Unable to retrieve analysis.",
      sources: sources.slice(0, 3), // Get top 3 sources
    };
  } catch (error) {
    console.error("Market Analysis Error:", error);
    return {
      text: "Market data stream interrupted. Check back shortly.",
      sources: [],
    };
  }
}
