import { OpenAI } from "openai";
import { streamText } from "ai";
import { openai } from '@ai-sdk/openai';

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Use the new streamText API with OpenAI adapter
  const result = await streamText({
    model: openai.chat("gpt-4o-mini"), // Use valid model name
    messages: [
      {
        role: "system",
        content: "You are an AI therapist. Provide empathetic and supportive responses.",
      },
      ...messages,
    ],
  });

  // Convert to DataStream response using new 4.0+ method
  return result.toDataStreamResponse();
}