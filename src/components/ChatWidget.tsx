import { useEffect, useId, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { findAnswer, knowledgeBase } from "../data/chatKnowledge";

interface Message {
  id: string;
  from: "bot" | "user";
  text: string;
}

const WHATSAPP_NUMBER = "919096322912";
const WHATSAPP_TEXT = encodeURIComponent("Hi PowerBill team, I have a question I couldn't find an answer to on the site.");

const GREETING: Message = {
  id: "greeting",
  from: "bot",
  text: "Hi! I'm the PowerBill assistant. Ask me anything about billing, pricing, GST, or offline support — or pick a quick question below.",
};

const QUICK_REPLIES = knowledgeBase.filter((e) => e.quickReply).slice(0, 5);

/**
 * A free, client-side FAQ-matching chat widget -- see chatKnowledge.ts for why this isn't
 * an LLM-backed bot. Always offers a real WhatsApp handoff so a visitor is never stuck
 * talking to a bot that can't help them.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputId = useId();

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function respond(userText: string) {
    const userMessage: Message = { id: crypto.randomUUID(), from: "user", text: userText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);

    const answer = findAnswer(userText);
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), from: "bot", text: answer }]);
      setTyping(false);
    }, 500);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    respond(input.trim());
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open support chat"}
        className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-xl shadow-brand-600/30 transition-transform hover:scale-105 hover:bg-brand-700"
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[520px] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-brand-600 px-4 py-3.5 text-white">
            <div>
              <div className="text-sm font-semibold">PowerBill Assistant</div>
              <div className="text-xs text-brand-50/80">Instant answers, real humans on WhatsApp</div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              <X className="size-5" />
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-canvas px-4 py-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.from === "user"
                      ? "rounded-br-sm bg-brand-600 text-white"
                      : "rounded-bl-sm border border-black/5 bg-white text-ink"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm border border-black/5 bg-white px-3.5 py-2.5 text-sm text-ink/40">
                  Typing...
                </div>
              </div>
            )}

            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => respond(q.quickReply!)}
                    className="rounded-full border border-brand-600/30 bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-700 hover:bg-brand-100"
                  >
                    {q.quickReply}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-black/5 bg-white p-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 flex items-center justify-center gap-2 rounded-lg bg-gold-400/15 py-2 text-xs font-semibold text-gold-600 hover:bg-gold-400/25"
            >
              Chat with a real person on WhatsApp
            </a>
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <label htmlFor={inputId} className="sr-only">
                Type your question
              </label>
              <input
                id={inputId}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand-600"
              />
              <button
                type="submit"
                aria-label="Send"
                className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white hover:bg-brand-700"
              >
                <Send className="size-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
