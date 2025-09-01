// client/src/app/api/chat/route.ts
import { NextRequest } from "next/server";

export const runtime = "edge"; // faster + cheaper for streaming

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // Minimal SSE proxy to OpenAI Responses API
    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        // messages: [{role:"user", content:"..."}, ...] works too, but we’ll send as "input"
        input: messages,
        stream: true,
      }),
    });

    if (!r.ok || !r.body) {
      const text = await r.text().catch(() => "");
      return new Response(
        JSON.stringify({ error: "Upstream error", detail: text }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Pass OpenAI’s event stream straight through
    return new Response(r.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        // Required so Vercel/Next won’t buffer/transform the stream
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: "Request failed", detail: String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
