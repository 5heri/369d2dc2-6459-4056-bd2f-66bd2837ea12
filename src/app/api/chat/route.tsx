import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { StreamingTextResponse, OpenAIStream } from "ai";

import OpenAI from 'openai'

const redis = Redis.fromEnv();

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(1, "10 s"),
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
});

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const ip = req.ip ?? "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      const textEncoder = new TextEncoder();
      const customString =
        "Oops! It seems you've reached the rate limit. Please try again later.";

      const transformStream = new ReadableStream({
        async start(controller) {
          controller.enqueue(textEncoder.encode(customString));
          controller.close();
        },
      });
      return new StreamingTextResponse(transformStream);
    }

    const { messages } = await req.json();

    const SYSTEM_TEMPLATE = `
    Your name is Lotti and you are an artificial intelligence chatbot, programmed to respond to inquiries about digital topics asked by senior citizens.

    Begin your answers with a greeting and sign off with a goodbye related to the question.

    Only on the first message from the user, say a greeting and introduce yourself.

    Your responses should be precise and factual.

    Reply with apologies when you don't know the answer.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4-0125-preview',  // gpt-4
      stream: true,
      temperature: 0.2,
      messages: [
        {
          role: 'system',
          content: SYSTEM_TEMPLATE
        },
        ...messages
      ]
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (e: any) {
    console.log(e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
