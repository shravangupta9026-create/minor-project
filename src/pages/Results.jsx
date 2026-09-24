import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Compass, Sparkles, Target, UsersRound, WalletCards } from "lucide-react";
import { getAssessmentAnswers, getAssessmentRecommendations, isCompleteAssessment } from "../utils/assessmentData";

const skillIcons = { "Business Strategy": Compass, "Digital Marketing": Target, "Financial Skills": WalletCards, "Leadership & Communication": UsersRound };

function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const answers = isCompleteAssessment(state?.answers) ? state.answers : getAssessmentAnswers();
  const hasAnswers = isCompleteAssessment(answers);
  const plan = getAssessmentRecommendations(answers);
  const stage = answers[0] ? answers[0].toLowerCase() : "your business journey";
  const goal = answers[4] ? answers[4].toLowerCase() : "your next business goal";
  const matchScore = plan[0]?.progress ?? 0;

  return (
    <main className="app-page px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><p className="eyebrow inline-flex items-center gap-2"><Sparkles size={14} /> YOUR GROWTH BLUEPRINT</p><Link to="/" className="secondary-button px-4 py-2.5 text-sm font-bold text-zinc-700">Back to Home</Link></div>
        <section className="relative overflow-hidden rounded-[2rem] bg-[#17151f] text-white shadow-2xl shadow-violet-950/15">
          <div aria-hidden="true" className="absolute -right-24 -top-40 h-[30rem] w-[30rem] rounded-full bg-violet-600/40 blur-3xl" /><div aria-hidden="true" className="absolute bottom-[-12rem] left-[30%] h-80 w-80 rounded-full bg-pink-500/25 blur-3xl" />
          <div className="relative grid gap-8 px-6 py-8 sm:px-10 sm:py-11 lg:grid-cols-[1fr_auto] lg:items-center lg:px-14">
            <div className="max-w-3xl"><p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.08] px-3.5 py-2 text-[10px] font-extrabold tracking-[.17em] text-violet-100"><Sparkles size={13} /> PERSONALIZED FOR YOUR NEXT CHAPTER</p><h1 className="mt-5 text-4xl font-extrabold leading-[1.04] tracking-[-.055em] sm:text-5xl lg:text-6xl">Your Growth<br className="hidden sm:block" /> <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">Blueprint.</span></h1>
              {hasAnswers ? <p className="mt-5 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">You’re {stage}, and your focus is to {goal}. Here are three skill areas selected to help you build momentum with purpose.</p> : <p className="mt-5 max-w-2xl leading-8 text-white/70">Complete the assessment to get recommendations tailored to your business stage, strengths, and goals.</p>}
              <div className="mt-7 flex flex-wrap gap-3"><button type="button" onClick={() => hasAnswers ? navigate("/learning", { state: { answers } }) : navigate("/assessment")} className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm font-extrabold text-[#5635dd] transition hover:-translate-y-0.5 hover:shadow-xl">{hasAnswers ? "Start My Learning Journey" : "Start Assessment"}<ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></button><Link to="/assessment" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[.07] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/[.13]">Retake Assessment</Link></div>
            </div>
            <div className="mx-auto flex items-center gap-4 rounded-[1.6rem] border border-white/10 bg-white/[.07] p-4 backdrop-blur-xl lg:mx-0 lg:flex-col lg:gap-2 lg:p-5">
              <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full" style={{ background: `conic-gradient(#c4a7ff ${matchScore * 3.6}deg, rgba(255,255,255,.12) ${matchScore * 3.6}deg)` }} aria-label={`Priority match ${matchScore} percent`}><div className="flex h-[5.25rem] w-[5.25rem] flex-col items-center justify-center rounded-full bg-[#282238]"><span className="text-2xl font-extrabold">{matchScore}%</span><span className="text-[10px] font-bold uppercase tracking-widest text-white/60">MATCH</span></div></div>
              <div className="lg:text-center"><p className="text-sm font-extrabold">Your priority fit</p><p className="mt-1 max-w-36 text-xs leading-5 text-white/55">A starting point shaped by your answers</p></div>
            </div>
          </div>
          <div className="relative grid grid-cols-3 border-t border-white/10 bg-white/[.035] px-4 py-4 sm:px-10"><div className="text-center"><p className="text-xl font-extrabold">05</p><p className="mt-1 text-[10px] font-bold leading-4 uppercase tracking-[.12em] text-white/60">Answers reviewed</p></div><div className="border-x border-white/10 text-center"><p className="text-xl font-extrabold">03</p><p className="mt-1 text-[10px] font-bold leading-4 uppercase tracking-[.12em] text-white/60">Skill areas matched</p></div><div className="text-center"><p className="text-xl font-extrabold">01</p><p className="mt-1 text-[10px] font-bold leading-4 uppercase tracking-[.12em] text-white/60">Next step at a time</p></div></div>
        </section>

        <section className="mt-10"><div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><p className="eyebrow">YOUR PERSONALIZED FOCUS</p><h2 className="display-title mt-2 text-2xl font-extrabold sm:text-3xl">Three ways to grow from here</h2></div><p className="max-w-sm text-sm leading-6 text-[#6b6875]">Start with the highest-priority skill, then explore the next areas when you’re ready.</p></div>
          {hasAnswers ? <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{plan.map((recommendation, index) => { const Icon = skillIcons[recommendation.name] ?? Sparkles; return <article key={recommendation.name} className={`surface-card surface-card-hover relative overflow-hidden p-5 sm:p-6 ${index === 0 ? "border-violet-300/60 bg-gradient-to-br from-white via-violet-50 to-pink-50 lg:-translate-y-2" : ""}`}>
            {index === 0 && <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-400" />}
            <div className="flex items-center justify-between gap-3"><span className="eyebrow">0{index + 1} / {index === 0 ? "TOP FOCUS" : "NEXT FOCUS"}</span><span className="rounded-full bg-violet-100 px-3 py-1.5 text-[10px] font-extrabold text-violet-700">{recommendation.priority}</span></div>
            <span className={`mt-5 flex h-14 w-14 items-center justify-center rounded-[1.2rem] ${index === 0 ? "bg-gradient-to-br from-violet-600 to-pink-500 text-white shadow-lg shadow-violet-500/20" : "bg-violet-50 text-violet-700"}`}><Icon size={25} /></span>
            <h3 className="mt-5 text-xl font-extrabold tracking-tight">{recommendation.name}</h3><p className="mt-2 min-h-20 text-sm leading-7 text-[#6b6875]">{recommendation.description}</p>
            <div className="mt-5 flex items-center justify-between text-xs font-bold text-zinc-500"><span>Suggested focus</span><span>{recommendation.progress}%</span></div><div className="progress-track mt-2 h-2"><div className="progress-fill h-full" style={{ width: `${recommendation.progress}%` }} /></div>
          </article>; })}</div> : <div className="surface-card p-6 text-sm text-zinc-600">Your answers aren’t available yet. Start the assessment to create your personalized plan.</div>}
        </section>
      </div>
    </main>
  );
}

export default Results;
