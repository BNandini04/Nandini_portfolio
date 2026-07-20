"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Sparkles, X } from "lucide-react";
import { answerQuestion, suggestions } from "@/lib/assistant";
import { profile } from "@/data/portfolio";

type Message = { role: "user" | "assistant"; content: string };

const GREETING: Message = {
  role: "assistant",
  content: `Hi — I'm ${profile.name}'s AI assistant. Ask me about her background, the products she's built, or the technologies she works with.`,
};

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, thinking]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const ask = (question: string) => {
    const q = question.trim();
    if (!q || thinking) return;

    setMessages((m) => [...m, { role: "user", content: q }]);
    setInput("");
    setThinking(true);

    // Brief pause so answers don't appear instantly — reads as a response
    // rather than a lookup, without pretending to be a network call.
    const answer = answerQuestion(q);
    window.setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", content: answer }]);
      setThinking(false);
    }, 480);
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={open}
        className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#4F46E5] text-white shadow-[0_0_34px_-6px_rgba(79,70,229,0.9)] transition-colors hover:bg-[#4338CA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {open ? <X size={22} /> : <Sparkles size={22} />}
          </motion.span>
        </AnimatePresence>
        {!open && (
          <span
            aria-hidden
            className="absolute inset-0 -z-10 animate-ping rounded-full bg-indigo-500 opacity-20"
          />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="AI assistant"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-[60] flex h-[540px] w-[calc(100vw-3rem)] max-w-[400px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111827]/95 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700">
                <Sparkles size={16} className="text-white" />
              </span>
              <div>
                <p className="text-sm font-medium text-white">AI Assistant</p>
                <p className="text-xs text-gray-500">
                  Answers from a local knowledge base
                </p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <p
                    className={`max-w-[85%] text-pretty rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-sm bg-[#4F46E5] text-white"
                        : "rounded-bl-sm border border-white/[0.06] bg-white/[0.04] text-gray-300"
                    }`}
                  >
                    {m.content}
                  </p>
                </div>
              ))}

              {thinking && (
                <div className="flex justify-start">
                  <span className="flex gap-1.5 rounded-2xl rounded-bl-sm border border-white/[0.06] bg-white/[0.04] px-4 py-3.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-indigo-400"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </span>
                </div>
              )}

              {messages.length === 1 && (
                <div className="space-y-2 pt-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => ask(s)}
                      className="block w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-left text-xs text-gray-400 transition-colors hover:border-indigo-500/30 hover:text-white"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="flex items-center gap-2 border-t border-white/[0.06] p-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Nandini..."
                aria-label="Ask a question"
                className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:border-indigo-500/50 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || thinking}
                aria-label="Send"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#4F46E5] text-white transition-colors hover:bg-[#4338CA] disabled:opacity-40"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
