import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Check, Clock3, Compass, Megaphone, Sparkles, WalletCards } from "lucide-react";
import { learningModules } from "../data/learningModules";
import { getActiveModule, getCompletedLessons, getModuleProgress, setActiveModule } from "../utils/learningProgress";

const moduleIcons = { "Digital Marketing": Megaphone, "Business Strategy": Compass, "Financial Skills": WalletCards };

function Module() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const answers = Array.isArray(state?.answers) ? state.answers : [];
  const savedActiveModule = getActiveModule();
  const moduleName = learningModules[state?.moduleName] ? state.moduleName : learningModules[savedActiveModule] ? savedActiveModule : "Digital Marketing";
  const selectedModule = learningModules[moduleName];
  const completedLessons = getCompletedLessons(moduleName).filter((index) => index < selectedModule.lessons.length);
  const progress = getModuleProgress(moduleName, selectedModule.lessons.length);
  const Icon = moduleIcons[moduleName] ?? BookOpen;

  const openLesson = (lessonIndex) => {
    const lesson = selectedModule.lessons[lessonIndex];
    if (!lesson) return;
    setActiveModule(moduleName);
    navigate("/learning/lesson", { state: { moduleName, lesson, lessonIndex, lessonNumber: lessonIndex + 1, moduleLessons: selectedModule.lessons, completedLessons, answers } });
  };

  return (
    <main className="app-page px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><Link to="/learning" state={{ answers }} className="secondary-button inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold"><ArrowLeft size={15} /> Back to Learning</Link><Link to="/" className="text-sm font-bold text-violet-700 hover:underline">Home</Link></div>
        <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#221737] via-[#48246f] to-[#803e91] p-6 text-white shadow-2xl shadow-violet-950/15 sm:p-9 lg:p-11">
          <div aria-hidden="true" className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-fuchsia-500/30 blur-3xl" /><div aria-hidden="true" className="absolute bottom-[-10rem] left-[25%] h-72 w-72 rounded-full bg-violet-400/20 blur-3xl" />
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div><p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.08] px-3 py-1.5 text-[10px] font-extrabold tracking-[.17em] text-violet-100"><Sparkles size={13} /> LEARNING MODULE</p><span className="mt-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-violet-100 backdrop-blur"><Icon size={28} /></span><h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">{moduleName}</h1><p className="mt-3 max-w-2xl leading-7 text-white/70">{selectedModule.description}</p></div>
            <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[.08] p-4 backdrop-blur-xl md:flex-col md:gap-2 md:p-6"><div className="relative flex h-24 w-24 items-center justify-center rounded-full" style={{ background: `conic-gradient(#e9c4ff ${progress * 3.6}deg, rgba(255,255,255,.14) ${progress * 3.6}deg)` }}><div className="flex h-[4.35rem] w-[4.35rem] items-center justify-center rounded-full bg-[#392451]"><span className="text-xl font-extrabold">{progress}%</span></div></div><div className="md:text-center"><p className="text-sm font-extrabold">Your progress</p><p className="mt-1 text-xs text-white/55">{selectedModule.lessons.length} guided lessons</p></div></div>
          </div>
          <div className="relative mt-8 border-t border-white/10 pt-5"><div className="mb-2 flex justify-between text-xs font-bold text-white/70"><span>{completedLessons.length} of {selectedModule.lessons.length} lessons complete</span><span>{progress}%</span></div><div className="h-2 overflow-hidden rounded-full bg-white/15" role="progressbar" aria-label={`${moduleName} progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><div className="h-full rounded-full bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300 transition-all duration-700" style={{ width: `${progress}%` }} /></div></div>
        </section>

        <section className="mt-10"><div className="mb-6"><p className="eyebrow">YOUR LEARNING PATH</p><h2 className="display-title mt-2 text-2xl font-extrabold sm:text-3xl">Lessons, one step at a time</h2><p className="mt-2 text-sm leading-6 text-[#6b6875]">Move at your own pace. Your progress is saved automatically.</p></div>
          <div className="relative space-y-4 pl-7 sm:pl-10"><div aria-hidden="true" className="timeline-line absolute bottom-8 left-[.65rem] top-8 w-px sm:left-[.95rem]" />
            {selectedModule.lessons.map((lesson, index) => { const isComplete = completedLessons.includes(index); const isCurrent = !isComplete && completedLessons.length === index; return <article key={lesson.title} className={`surface-card surface-card-hover relative overflow-visible p-5 sm:p-6 ${isCurrent ? "border-violet-300/70 bg-gradient-to-r from-violet-50/85 via-white to-white" : ""}`}>
              <span className={`absolute -left-7 top-8 z-10 flex h-5 w-5 items-center justify-center rounded-full border-[4px] border-[#faf8ff] sm:-left-10 ${isComplete ? "bg-emerald-500" : isCurrent ? "bg-violet-500 shadow-[0_0_0_5px_rgba(139,92,246,.15)]" : "bg-zinc-300"}`} />
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex min-w-0 gap-4"><span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-extrabold ${isComplete ? "bg-emerald-50 text-emerald-600" : isCurrent ? "bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-md shadow-violet-500/20" : "bg-zinc-100 text-zinc-500"}`}>{isComplete ? <Check size={19} /> : String(index + 1).padStart(2, "0")}</span><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="font-extrabold tracking-tight text-zinc-900">{lesson.title}</h3>{isComplete ? <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-extrabold text-emerald-700">Completed</span> : isCurrent ? <span className="rounded-full bg-violet-100 px-2.5 py-1 text-[10px] font-extrabold text-violet-700">UP NEXT</span> : null}</div><p className="mt-1 max-w-2xl text-sm leading-6 text-[#6b6875]">{lesson.description}</p><p className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500"><Clock3 size={13} />{lesson.time}</p></div></div>
                <button type="button" onClick={() => openLesson(index)} aria-pressed={isComplete} className={`${isComplete ? "secondary-button text-violet-700" : "primary-button text-white"} inline-flex shrink-0 items-center justify-center gap-2 px-5 py-3 text-sm font-extrabold`}>{isComplete ? "Completed" : isCurrent ? "Start Lesson" : "Open Lesson"}<ArrowRight size={15} /></button>
              </div>
            </article>; })}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Module;
