import { createGroq } from '@ai-sdk/groq';
import { streamText } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY,
  });

  // Use the new streamText API with Groq adapter
  const result = await streamText({
    model: groq("llama-3.3-70b-versatile"),
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