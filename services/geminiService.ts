// Test: Integration tests for AI service functionality
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
// Initialize with empty key if not present to avoid immediate crash, 
// though calls will fail if key is missing.
const ai = new GoogleGenAI({ apiKey });

export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are a Senior DevOps Engineer and Site Reliability Engineer (SRE) assistant. 
      You are embedded within a DevOps simulation dashboard. 
      Your goal is to explain concepts like CI/CD, Docker, Kubernetes, Prometheus, Grafana, and Git workflows to users.
      You are also an expert in Apache Maven for build automation.
      If the user asks about a specific error in a build log, analyze it as if it were a real software failure.
      Keep responses concise, technical but accessible, and helpful.`,
    },
  });
};

export const analyzeLogsWithAI = async (logs: string[]): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the following CI/CD build logs and explain what went wrong or summarize the success. 
            Provide actionable advice if there is a failure.
            
            LOGS:
            ${logs.join('\n')}
            `
    });
    return response.text || "No analysis could be generated.";
  } catch (error) {
    console.error("AI Log Analysis failed", error);
    return "Failed to analyze logs using Gemini AI. Please check your API Key.";
  }
}

export const sendMessageToChat = async (chat: Chat, message: string): Promise<string> => {
  try {
    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "";
  } catch (error) {
    console.error("Chat message failed", error);
    return "I'm having trouble connecting to the DevOps mainframe (API Error).";
  }
};