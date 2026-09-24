import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Check, Clock3, Sparkles, Target, TrendingUp } from "lucide-react";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import { learningModules } from "../data/learningModules";
import { getCompletedLessons, getModuleProgress, getOverallProgress } from "../utils/learningProgress";

function Home() {
  const overallProgress = getOverallProgress(learningModules);
  const moduleProgress = Object.entries(learningModules).map(([name, module]) => ({
    name,
    progress: getModuleProgress(name, module.lessons.length),
  }));
  const completedLessonCount = moduleProgress.reduce((total, module) => (
    total + getCompletedLessons(module.name).filter((index) => index < learningModules[module.name].lessons.length).length
  ), 0);
  const totalLessonCount = Object.values(learningModules).reduce((total, module) => total + module.lessons.length, 0);

  return (
    <main className="app-page home-page min-h-screen overflow-hidden">
      <section className="home-hero relative mx-3 mt-3 grid min-h-[calc(100vh-6.5rem)] items-center gap-8 overflow-hidden rounded-[2rem] px-5 py-12 sm:mx-5 sm:mt-4 sm:rounded-[2.5rem] sm:px-8 sm:py-14 lg:mx-auto lg:max-w-7xl lg:grid-cols-[1fr_1fr] lg:gap-10 lg:px-12 lg:py-10">
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-violet-400/25 blur-3xl" />
        <div className="animate-enter relative z-10 max-w-2xl lg:pb-6">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.08] px-4 py-2 text-[11px] font-extrabold tracking-[.16em] text-violet-100 shadow-sm backdrop-blur-lg">
            <Sparkles size={14} /> AI-POWERED LEARNING
          </div>
          <h1 className="display-title home-hero-title font-extrabold">
            Build the skills.<br />Grow with <span className="gradient-text">confidence.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/70 sm:text-lg">
            SheRise AI turns your entrepreneurial goals into a personalized learning path—with practical lessons, progress that stays with you, and an AI companion by your side.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/assessment" className="primary-button group inline-flex items-center justify-center gap-2 px-6 py-4 font-extrabold text-white">Start Your Journey <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" /></Link>
            <Link to="/learning" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[.08] px-6 py-4 font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/[.14]">Explore Learning <BookOpen size={17} /></Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-white/70">
            <span className="inline-flex items-center gap-2"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-300/20 text-violet-200"><Check size={13} /></span>Personalized for your goals</span>
            <span className="inline-flex items-center gap-2"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-pink-300/20 text-pink-200"><Check size={13} /></span>Learn at your own pace</span>
          </div>
        </div>

        <div className="hero-stage relative mx-auto flex w-full max-w-[590px] min-w-0 flex-col items-center gap-3 pt-12 animate-enter lg:block lg:min-h-[680px] lg:pt-0">
          <div aria-hidden="true" className="glow-orb absolute left-[19%] top-[12%] h-48 w-48 rounded-full bg-violet-400/35 sm:h-64 sm:w-64 lg:h-80 lg:w-80" />
          <div className="absolute left-[7%] top-[7%] h-20 w-20 rounded-full border border-white/70 bg-white/35 backdrop-blur-xl sm:h-28 sm:w-28 lg:h-36 lg:w-36" />
          <div className="surface-card relative z-10 w-full min-w-0 rounded-[2rem] p-5 sm:p-6 lg:absolute lg:left-[12%] lg:top-[12%] lg:w-[76%] lg:p-7">
            <div className="flex items-start justify-between gap-3">
              <div><p className="eyebrow">Your growth blueprint</p><h2 className="mt-2 text-xl font-extrabold tracking-tight sm:text-2xl">A little progress, every day.</h2></div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-500/20"><TrendingUp size={21} /></span>
            </div>
            <div className="mt-6 rounded-[1.35rem] bg-gradient-to-br from-[#f4f0ff] via-white to-[#fff1f8] p-4 sm:p-5">
              <div className="flex items-center justify-between gap-4">
                <div><p className="text-[10px] font-extrabold tracking-[.15em] text-violet-700">OVERALL PROGRESS</p><p className="mt-1 text-4xl font-extrabold tracking-tight">{overallProgress}<span className="text-2xl">%</span></p></div>
                <div className="relative flex h-[86px] w-[86px] items-center justify-center rounded-full" style={{ background: `conic-gradient(#8b5cf6 ${overallProgress * 3.6}deg, #e9e3fa ${overallProgress * 3.6}deg)` }} aria-label={`${overallProgress}% overall progress`}>
                  <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-white text-center"><span className="text-[10px] font-extrabold leading-tight text-violet-700">YOUR<br />PACE</span></div>
                </div>
              </div>
              <div className="progress-track mt-4 h-2.5"><div className="progress-fill h-full" style={{ width: `${overallProgress}%` }} /></div>
              <p className="mt-2 text-xs font-semibold text-[#777282]">{completedLessonCount} of {totalLessonCount} lessons completed</p>
            </div>
            <div className="mt-5 flex items-center justify-between"><p className="text-sm font-extrabold">Your skill path</p><Link to="/dashboard" className="text-xs font-extrabold text-violet-700 hover:underline">View dashboard</Link></div>
            <div className="mt-3 space-y-2.5">
              {moduleProgress.map((module, index) => <div key={module.name} className="flex items-center gap-3 rounded-xl border border-violet-100/80 bg-white/80 px-3 py-2.5">
                <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${index === 1 ? "bg-pink-50 text-pink-600" : "bg-violet-50 text-violet-600"}`}><Target size={16} /></span>
                <span className="min-w-0 flex-1 truncate text-xs font-bold text-[#393444]">{module.name}</span>
                <span className="h-1.5 w-16 overflow-hidden rounded-full bg-zinc-100"><span className="block h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400" style={{ width: `${module.progress}%` }} /></span>
                <span className="w-8 text-right text-[10px] font-extrabold text-zinc-500">{module.progress}%</span>
              </div>)}
            </div>
          </div>
          <div className="surface-card relative z-20 w-full rounded-2xl p-4 sm:p-5 lg:absolute lg:bottom-[3%] lg:left-[1%] lg:w-[61%]">
            <div className="flex items-center gap-3"><span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6c4bf4] to-[#ec4899] text-white shadow-lg shadow-violet-500/20"><Sparkles size={20} /><i className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-400" /></span><div><p className="text-sm font-extrabold">Your AI learning companion</p><p className="mt-0.5 text-xs text-[#777282]">Ready when you are</p></div></div>
            <div className="mt-3 rounded-xl rounded-tl-sm bg-[#f3efff] px-3 py-2.5 text-xs font-semibold leading-5 text-[#554e67]">Small steps add up. Let’s make your next one count.</div>
          </div>
          <div className="surface-card relative z-20 flex max-w-full items-center gap-2.5 self-end rounded-2xl px-3 py-3 shadow-xl sm:px-4 lg:absolute lg:right-[1%] lg:top-[8%]"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-50 text-pink-600"><Clock3 size={17} /></span><div><p className="text-xs font-extrabold">Your time, your pace</p><p className="text-[10px] font-medium text-zinc-500">Short focused lessons</p></div></div>
        </div>
      </section>

      <Features />
      <HowItWorks />
      <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 sm:pb-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#17151f] px-6 py-10 text-white shadow-2xl shadow-violet-950/15 sm:px-10 sm:py-14">
          <div aria-hidden="true" className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-fuchsia-500/30 blur-3xl" /><div aria-hidden="true" className="absolute -bottom-36 left-[30%] h-72 w-72 rounded-full bg-violet-600/30 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-7 sm:flex-row sm:items-center"><div className="max-w-2xl"><p className="text-xs font-extrabold tracking-[.2em] text-fuchsia-200">YOUR NEXT CHAPTER STARTS HERE</p><h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">Ready to turn your ambition into action?</h2><p className="mt-3 leading-7 text-white/70">Find your focus, get a plan, and grow one lesson at a time.</p></div><Link to="/assessment" className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-4 font-extrabold text-[#5635dd] transition hover:-translate-y-1 hover:shadow-xl">Start Your Journey <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></Link></div>
        </div>
      </section>
    </main>
  );
}

export default Home;
