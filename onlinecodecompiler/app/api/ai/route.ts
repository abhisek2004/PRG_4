import { createResponse } from '@/helpers/responseHelper';
import { GoogleGenerativeAI } from '@google/generative-ai';

// const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
export const runtime = 'edge';

export async function POST(request: Request) {
  const { question, genimiApiKey } = await request.json();
  const genAI = new GoogleGenerativeAI(genimiApiKey);
  const prompt = `${question}`;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return createResponse(true, text, 200);

  } catch (error) {
    console.error("Error generating content:", error);
    return createResponse(false, "Failed to generate content", 500);
  }
}