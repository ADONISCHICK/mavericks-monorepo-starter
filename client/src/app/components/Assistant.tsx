// client/src/app/components/Assistant.tsx
"use client";

import { useEffect, useRef, useState } from "react";

type ChatMsg = { role: "user" | "assistant" | "system"; content: string };

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<ChatMsg[]>([
    {
      role: "system",
      content:
        "You are Mavericks Assistant. Be concise, helpful, and friendly. You can answer about the site and help with shopping.",
    },
  ]);
  const [streaming, setStreaming] = useState(false);
  const [partial, setPartial] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!boxRef.current) return;
    boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [history, partial, open]);

  async function send(userText: string) {
    if (!userText.trim() || streaming) return;

    const newHistory = [...history, { role: "user", content: userText }];
    setHistory(newHistory);
    setInput("");
    setPartial("");
    setStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: newHistory }),
      });

      if (!res.ok || !res.body) {
        setHistory((h) => [
          ...h,
          { role: "assistant", content: "Sorry—AI is unavailable right now." },
        ]);
        setStreaming(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buf = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buf += decoder.decode(value, { stream: true });

        // Simple SSE event parsing
        const lines = buf.split("\n");
        buf = lines.pop() || "";
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const payloadStr = trimmed.slice(5).trim();
          if (payloadStr === "[DONE]") continue;

          try {
            const payload = JSON.parse(payloadStr);
            // Responses API streams as chunks; we read delta text
            const delta = payload?.response?.output?.[0]?.content?.[0]?.text?.slice?.(partial.length)
              ?? payload?.delta
              ?? payload?.response?.output_text // fallback if server sends full text
              ?? "";

            if (typeof delta === "string" && delta.length) {
              setPartial((p) => (payload?.response?.output_text ? payload.response.output_text : p + delta));
            }
          } catch {
            // ignore JSON errors on keepalive/heartbeat lines
          }
        }
      }

      // finalize message
      setHistory((h) => [...h, { role: "assistant", content: partial || "…" }]);
      setPartial("");
    } catch {
      setHistory((h) => [
        ...h,
        { role: "assistant", content: "Network error while streaming." },
      ]);
    } finally {
      setStreaming(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    void send(input);
  }

  return (
    <>
      {/* Fab Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed right-4 bottom-4 z-50 rounded-full px-4 py-2 shadow-lg
                   bg-blue-600 hover:bg-blue-500 text-white font-semibold"
        aria-label="Open Mavericks Assistant"
      >
        {open ? "Close" : "Ask Mavericks"}
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed right-4 bottom-20 z-50 w-[min(420px,calc(100vw-2rem))]
                     rounded-2xl border shadow-2xl bg-white/90 backdrop-blur
                     dark:bg-neutral-900/90 dark:text-neutral-100"
        >
          <div className="p-3 border-b font-semibold">Mavericks Assistant</div>
          <div
            ref={boxRef}
            className="p-3 max-h-[50vh] overflow-y-auto space-y-3 text-sm"
          >
            {history
              .filter((m) => m.role !== "system")
              .map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user"
                      ? "bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 p-2 rounded-lg"
                      : "bg-neutral-100 dark:bg-neutral-800 p-2 rounded-lg"
                  }
                >
                  {m.content}
                </div>
              ))}
            {streaming && (
              <div className="bg-neutral-100 dark:bg-neutral-800 p-2 rounded-lg">
                {partial || "…"}
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 p-3 border-t">
            <input
              className="flex-1 rounded-lg border px-3 py-2 bg-white dark:bg-neutral-900"
              placeholder="Ask anything…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={streaming}
            />
            <button
              className="rounded-lg px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50"
              disabled={streaming || !input.trim()}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
