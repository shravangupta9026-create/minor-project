import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Circle, Sparkles } from "lucide-react";
import { saveAssessmentAnswers } from "../utils/assessmentData";

const questions = [
  { question: "What best describes your current business stage?", options: ["I have a business idea", "I am just starting my business", "I already have customers", "I am growing an existing business"] },
  { question: "How confident are you in creating a business strategy?", options: ["Beginner", "Somewhat confident", "Confident", "Very confident"] },
  { question: "Which area would you most like to improve?", options: ["Business Strategy", "Digital Marketing", "Financial Skills", "Leadership & Communication"] },
  { question: "How comfortable are you with using digital tools?", options: ["Not comfortable yet", "I know the basics", "Comfortable", "Very comfortable"] },
  { question: "What is your main goal right now?", options: ["Start my business", "Get more customers", "Grow my revenue", "Build my confidence"] },
];

function Assessment() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const selectedAnswer = answers[currentQuestion];
  const progress = Math.round(((currentQuestion + 1) / questions.length) * 100);

  const handleAnswer = (answer) => setAnswers((previous) => {
    const updated = [...previous];
    updated[currentQuestion] = answer;
    return updated;
  });

  const handleNext = () => {
    if (!selectedAnswer) return;
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((question) => question + 1);
      return;
    }
    saveAssessmentAnswers(answers);
    navigate("/results", { state: { answers } });
  };

  return (
    <main className="app-page relative min-h-[calc(100vh-5rem)] overflow-hidden px-4 py-8 sm:px-6 sm:py-12">
      <div aria-hidden="true" className="pointer-events-none absolute -right-36 top-24 h-96 w-96 rounded-full bg-fuchsia-200/35 blur-3xl" />
      <div className="relative mx-auto max-w-3xl">
        <Link to="/" className="secondary-button inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-zinc-700"><ArrowLeft size={15} /> Back to Home</Link>
        <header className="mt-9 max-w-2xl"><p className="eyebrow inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/75 px-3.5 py-2"><Sparkles size={14} /> A plan that starts with you</p><h1 className="display-title mt-4 text-4xl font-extrabold sm:text-5xl">Let’s understand <span className="gradient-text">your journey.</span></h1><p className="mt-4 max-w-xl text-base leading-8 text-[#6b6875] sm:text-lg">A few thoughtful questions will help shape a practical learning plan around your goals.</p></header>

        <section className="surface-card animate-enter mt-8 overflow-hidden" aria-label="Entrepreneurship skills assessment">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#211936] via-[#34205a] to-[#6c3c91] px-5 py-6 text-white sm:px-9 sm:py-8">
            <div aria-hidden="true" className="absolute -right-10 -top-24 h-64 w-64 rounded-full bg-fuchsia-500/25 blur-3xl" />
            <div className="relative flex items-center justify-between gap-4"><div><p className="text-[10px] font-extrabold tracking-[.2em] text-violet-200">STEP {String(currentQuestion + 1).padStart(2, "0")} / {String(questions.length).padStart(2, "0")}</p><p className="mt-1 text-sm font-bold text-white/90">A thoughtful starting point</p></div><span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-extrabold text-white">{progress}%</span></div>
            <div className="progress-track mt-5 h-2 bg-white/15" role="progressbar" aria-label="Assessment progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><div className="progress-fill h-full" style={{ width: `${progress}%` }} /></div>
          </div>
          <div className="p-5 sm:p-9">
            <h2 className="text-xl font-extrabold leading-8 tracking-tight text-[#17151f] sm:text-2xl">{questions[currentQuestion].question}</h2>
            <p className="mt-2 text-sm text-[#777282]">Choose the answer that feels closest to where you are right now.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {questions[currentQuestion].options.map((option) => {
                const isSelected = selectedAnswer === option;
                return <button key={option} type="button" onClick={() => handleAnswer(option)} aria-pressed={isSelected} className="option-card group flex min-h-[5.25rem] w-full items-center gap-4 px-4 py-4 text-left text-zinc-700 sm:px-5">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-extrabold transition ${isSelected ? "bg-gradient-to-br from-[#6c4bf4] to-[#a855f7] text-white shadow-md shadow-violet-500/20" : "bg-[#f3f0fa] text-zinc-500 group-hover:bg-[#eeeaff] group-hover:text-[#6c4bf4]"}`}>{isSelected ? <Check size={17} /> : <Circle size={16} />}</span>
                  <span className={`font-bold leading-6 ${isSelected ? "text-[#5635dd]" : "text-zinc-700"}`}>{option}</span>
                  {isSelected && <span className="ml-auto text-[10px] font-extrabold uppercase tracking-widest text-violet-600">Selected</span>}
                </button>;
              })}
            </div>
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-violet-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button type="button" onClick={() => setCurrentQuestion((question) => Math.max(0, question - 1))} disabled={currentQuestion === 0} className="secondary-button inline-flex w-full items-center justify-center gap-2 px-6 py-3 font-bold text-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"><ArrowLeft size={16} /> Previous</button>
              <button type="button" onClick={handleNext} disabled={!selectedAnswer} className="primary-button inline-flex w-full items-center justify-center gap-2 px-7 py-3 font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto">{currentQuestion === questions.length - 1 ? "See my growth plan" : "Next"}<ArrowRight size={16} /></button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Assessment;
