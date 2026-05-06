import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function analyzePrescription(imageData: string) {
  if (!ai) throw new Error("Gemini API Key non configurée");
  
  // Extract base64 part
  const base64Data = imageData.split(',')[1] || imageData;
  
  const result = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        text: "Tu es un assistant pharmacien IA. Analyse cette ordonnance et liste les médicaments, dosages et fréquences. Sois précis et professionnel."
      },
      {
        inlineData: {
          data: base64Data,
          mimeType: "image/jpeg"
        }
      }
    ]
  });

  return result.text || "Impossible d'analyser l'image.";
}

export async function medicalAssistantChat(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  if (!ai) throw new Error("Gemini API Key non configurée");
  
  const result = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        role: "user",
        parts: [{ text: "Tu es un assistant médical qualifié. Tu réponds aux questions de santé de manière précise, empathique et sécurisée. Rappelle toujours à l'utilisateur de consulter un vrai médecin pour un diagnostic définitif." }],
      },
      ...history.map(h => ({
        role: h.role,
        parts: h.parts
      })),
      {
        role: "user",
        parts: [{ text: message }]
      }
    ]
  });

  return result.text || "Désolé, je ne peux pas répondre pour le moment.";
}
