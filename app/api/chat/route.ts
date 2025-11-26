import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  });

  // Use the new streamText API with Google Gemini adapter
  const result = await streamText({
    model: google("gemini-2.0-flash"),
    messages: [
      {
        role: "system",
        content: "You are an AI listener. Provide empathetic and supportive responses with compassion.",
      },
      ...messages,
    ],
  });

  // Convert to text stream response
  return result.toTextStreamResponse();
}