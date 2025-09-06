import { OpenAI } from "openai";
import { streamText } from "ai";
import { openai } from '@ai-sdk/openai';

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Initialize OpenAI client with API key
  const openaiClient = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY, // Ensure OPENAI_API_KEY is set in your environment variables
  });

  // Use the new streamText API with OpenAI adapter
  const result = await streamText({
    model: openai.chat("gpt-4o-mini"), // Use a valid model name like "gpt-4"
    messages: [
      {
        role: "system",
        content: "You are an AI listener. Provide empathetic and supportive responses with compassion.",
      },
      ...messages,
    ],
  });

  // Convert to DataStream response using new 4.0+ method
  return result.toDataStreamResponse();
}