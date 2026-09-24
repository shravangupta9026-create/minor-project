import { useState } from "react";
import { Bot, Brain, Lightbulb, Send, Sparkles, Target } from "lucide-react";
import { askAI } from "../services/aiService";

const quickActions = [
  { label: "Explain simply", question: "Explain this lesson simply", icon: Sparkles },
  { label: "Give an example", question: "Give me an example", icon: Lightbulb },
  { label: "Quiz me", question: "Quiz me", icon: Brain },
  { label: "What next?", question: "What should I do next?", icon: Target },
];

function AiLearningAssistant({ lessonContext }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const submitQuestion = async (question) => {
    const message = question.trim();
    if (!message || isLoading) return;
    const isQuickAction = quickActions.some((action) => action.question.toLowerCase() === message.toLowerCase());
    const isNewQuestion = message.endsWith("?") || /^(what|how|why|where|when|can|could|would|please)\b/i.test(message);
    const isQuizAnswer = messages.at(-1)?.expectsQuizAnswer === true && !isQuickAction && !isNewQuestion;
    setMessages((previous) => [...previous, { role: "user", text: message }]);
    setInput(""); setError(""); setIsLoading(true);
    try {
      const response = await askAI({ message, lessonContext, conversation: messages, isQuizAnswer });
      setMessages((previous) => [...previous, { role: "assistant", text: response.text, expectsQuizAnswer: response.expectsQuizAnswer === true, quiz: response.quiz }]);
    } catch {
      const fallback = "I couldn't respond just now. Your lesson progress is safe. Please try again.";
      setError(fallback); setMessages((previous) => [...previous, { role: "assistant", text: fallback }]);
    } finally { setIsLoading(false); }
  };

  const handleSubmit = (event) => { event.preventDefault(); submitQuestion(input); };

  return (
    <section className="ai-glow mt-8 overflow-hidden rounded-[1.8rem] border border-violet-200/70 bg-white" aria-labelledby="ai-assistant-title">
      <header className="relative overflow-hidden bg-gradient-to-br from-[#211936] via-[#352053] to-[#583581] px-5 py-6 text-white sm:px-8 sm:py-7">
        <div aria-hidden="true" className="absolute -right-16 -top-28 h-64 w-64 rounded-full bg-fuchsia-500/25 blur-3xl" />
        <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4"><span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 via-fuchsia-400 to-pink-400 text-white shadow-[0_0_34px_rgba(196,132,255,.45)]"><span className="absolute inset-1 rounded-full border border-white/30" /><Bot size={25} /></span><div><p className="inline-flex items-center gap-1.5 text-[10px] font-extrabold tracking-[.16em] text-violet-200"><Sparkles size={11} /> AI-POWERED LEARNING COMPANION</p><h2 id="ai-assistant-title" className="mt-1 text-xl font-extrabold tracking-tight sm:text-2xl">AI Learning Assistant</h2><p className="mt-1 text-xs text-white/60">Your personal learning companion</p></div></div>
          <p className="max-w-xs rounded-xl border border-white/10 bg-white/[.07] px-4 py-3 text-xs leading-5 text-white/70 backdrop-blur">Learning about <span className="font-extrabold text-white">{lessonContext.title}</span> in {lessonContext.moduleName}</p>
        </div>
      </header>

      <div className="bg-gradient-to-b from-[#fbf9ff] to-white p-4 sm:p-7">
        <div className="mb-3 flex items-center justify-between gap-3"><p className="text-[10px] font-extrabold tracking-[.16em] text-violet-700">TRY A QUICK PROMPT</p><span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-zinc-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> READY TO HELP</span></div>
        <div className="flex flex-wrap gap-2" aria-label="Quick questions">{quickActions.map(({ label, question, icon: Icon }) => <button key={label} type="button" onClick={() => submitQuestion(question)} disabled={isLoading} className="secondary-button inline-flex min-h-11 items-center gap-2 rounded-full px-3.5 py-2.5 text-sm font-extrabold text-[#58438e] disabled:cursor-wait disabled:opacity-60"><Icon size={14} className="text-violet-600" />{label}</button>)}</div>

        <div className="mt-5 max-h-[27rem] min-h-44 space-y-3 overflow-y-auto rounded-2xl border border-violet-100 bg-[#f4f1fc] p-3 sm:p-4" role="log" aria-live="polite" aria-label="Assistant conversation">
          {messages.length === 0 && !isLoading && <div className="animate-enter flex items-start gap-3 rounded-2xl rounded-tl-sm border border-violet-100/80 bg-white p-4 text-sm leading-6 text-[#615a72] shadow-sm"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-pink-100 text-violet-700"><Sparkles size={15} /></span><p>Hi! I’m here to help with <span className="font-extrabold text-[#40345e]">{lessonContext.title}</span>. Ask me to explain an idea, work through an example, or help you choose your next step.</p></div>}
          {messages.map((message, index) => <div key={`${message.role}-${index}`} className={`animate-enter flex items-end gap-2.5 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            {message.role === "assistant" && <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-md shadow-violet-500/20"><Bot size={16} /></span>}
            <div className={`max-w-[88%] rounded-[1.25rem] px-4 py-3 text-sm leading-6 shadow-sm ${message.role === "user" ? "rounded-br-md bg-gradient-to-br from-[#6c4bf4] to-[#a855f7] text-white" : "rounded-bl-md border border-violet-100 bg-white text-[#514a60]"}`}><p className="mb-1 text-[10px] font-extrabold uppercase tracking-[.12em] opacity-70">{message.role === "user" ? "You" : "Your learning companion"}</p><p className="break-words whitespace-pre-wrap">{message.text}</p></div>
          </div>)}
          {isLoading && <div className="flex items-center gap-2.5" role="status"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white"><Bot size={16} /></span><div className="rounded-2xl rounded-bl-md border border-violet-100 bg-white px-4 py-3 text-sm text-[#615a72] shadow-sm">Thinking through your lesson<span className="animate-pulse">…</span></div></div>}
        </div>
        {error && <p className="mt-3 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700" role="alert">{error}</p>}
        <form className="mt-4 flex gap-2 rounded-[1.2rem] border border-violet-100 bg-white p-2 shadow-[0_10px_30px_rgba(48,38,100,.07)] focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-500/10" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="learning-assistant-question">Your question</label><input id="learning-assistant-question" type="text" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask anything about this lesson…" maxLength={500} disabled={isLoading} className="min-w-0 flex-1 rounded-xl bg-transparent px-3 py-3 text-sm text-zinc-800 outline-none placeholder:text-zinc-400 disabled:bg-zinc-50 sm:px-4" />
          <button type="submit" disabled={isLoading || !input.trim()} aria-label={isLoading ? "Assistant is thinking" : "Send message"} className="primary-button inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto sm:gap-2 sm:px-5"><span className="hidden sm:inline">{isLoading ? "Thinking" : "Ask AI"}</span><Send size={16} /></button>
        </form>
        <p className="mt-2 text-center text-[10px] font-medium text-zinc-400">Grounded in this lesson · Your learning progress stays saved</p>
      </div>
    </section>
  );
}

export default AiLearningAssistant;
