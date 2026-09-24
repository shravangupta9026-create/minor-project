import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, CircleDollarSign, Compass, Megaphone } from "lucide-react";
import { learningModules } from "../data/learningModules";
import { getActiveModule, getCompletedLessons, getModuleProgress, getOverallProgress, setActiveModule } from "../utils/learningProgress";
import { getAssessmentAnswers, getAssessmentRecommendations, isCompleteAssessment } from "../utils/assessmentData";

const modules = [
  {
    title: "Digital Marketing",
    icon: Megaphone,
    difficulty: "Beginner friendly",
    duration: "45 min",
  },
  {
    title: "Business Strategy",
    icon: Compass,
    difficulty: "All levels",
    duration: "60 min",
  },
  {
    title: "Financial Skills",
    icon: CircleDollarSign,
    difficulty: "Beginner friendly",
    duration: "50 min",
  },
];

function Learning() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const answers = isCompleteAssessment(state?.answers)
    ? state.answers
    : getAssessmentAnswers();
  const hasAssessment = answers.length === 5;
  const recommendedSkills = hasAssessment ? getAssessmentRecommendations(answers).map(({ name }) => name) : [];
  const activeModule = getActiveModule();
  const overallProgress = getOverallProgress(learningModules);

  const startModule = (moduleName) => {
    const firstLesson = learningModules[moduleName].lessons[0];
    const completedLessons = getCompletedLessons(moduleName);
    setActiveModule(moduleName);
    navigate("/learning/lesson", {
      state: {
        moduleName,
        lesson: firstLesson,
        lessonIndex: 0,
        lessonNumber: 1,
        moduleLessons: learningModules[moduleName].lessons,
        completedLessons,
        answers,
      },
    });
  };

  return (
    <main className="app-page px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-7 flex flex-wrap items-center justify-between gap-4"><div><p className="eyebrow">YOUR PERSONALIZED PATH</p><h1 className="display-title mt-2 text-3xl font-extrabold sm:text-4xl">Your Learning Journey</h1></div><nav className="flex items-center gap-4 text-sm font-bold"><Link to="/results" state={{ answers }} className="text-violet-700 transition hover:underline">Growth Plan</Link><Link to="/" className="text-zinc-500 transition hover:text-violet-700">Home</Link></nav></header>

        <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#211936] via-[#39265f] to-[#74428c] p-6 text-white shadow-2xl shadow-violet-950/15 sm:p-9">
          <div aria-hidden="true" className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-fuchsia-500/25 blur-3xl" />
          <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div><p className="text-[10px] font-extrabold tracking-[.18em] text-violet-200">YOUR LEARNING RHYTHM</p><h2 className="mt-2 text-4xl font-extrabold tracking-tight">{overallProgress}% <span className="text-lg font-bold text-white/65">complete</span></h2><p className="mt-2 max-w-md text-sm leading-6 text-white/65">A personal path shaped by your assessment. Build momentum one useful lesson at a time.</p></div>
            <div className="relative flex h-28 w-28 shrink-0 items-center justify-center self-center rounded-full sm:mr-3" style={{ background: `conic-gradient(#e9c4ff ${overallProgress * 3.6}deg, rgba(255,255,255,.14) ${overallProgress * 3.6}deg)` }} aria-label={`${overallProgress}% overall progress`}><div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-[#392451]"><span className="text-2xl font-extrabold">{overallProgress}%</span><span className="text-[10px] font-bold uppercase tracking-widest text-white/60">PROGRESS</span></div></div>
          </div>
          <div className="progress-track relative mt-6 h-2.5 bg-white/15" role="progressbar" aria-label="Overall learning progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={overallProgress}><div className="progress-fill h-full" style={{ width: `${overallProgress}%` }} /></div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">PERSONALIZED RECOMMENDATIONS</p>
              <h2 className="display-title mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">Recommended for you</h2>
              <p className="mt-2 text-sm text-zinc-600">Your assessment suggests focusing on these skill areas.</p>
            </div>
          </div>
          {recommendedSkills.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedSkills.map((skill, index) => (
              <article key={skill} className={`surface-card surface-card-hover relative overflow-hidden p-5 sm:p-6 ${index === 0 ? "bg-gradient-to-br from-violet-50 to-white" : ""}`}>
                {index === 0 && <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 to-pink-400" />}
                <span className="inline-flex rounded-full bg-[#f0edff] px-3 py-1 text-[10px] font-extrabold tracking-wider text-[#5635dd]">FOCUS 0{index + 1}</span>
                <h3 className="mt-4 text-lg font-extrabold text-zinc-900">{skill}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {modules.find((module) => module.title === skill)?.description ?? "Develop this skill to build confidence and grow your business."}
                </p>
              </article>
            ))}
          </div> : <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-6">
            <p className="font-semibold text-zinc-900">Your recommendations are waiting</p>
            <p className="mt-1 text-sm leading-6 text-zinc-600">Complete the assessment to see learning areas matched to your goals.</p>
            <Link to="/assessment" className="mt-4 inline-flex text-sm font-semibold text-[#6c4bf4] hover:underline">Start Assessment</Link>
          </div>}
        </section>

        <section className="mt-10">
          <div className="mb-5">
            <p className="eyebrow">YOUR LEARNING PATH</p><h2 className="display-title mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">Learning modules</h2>
            <p className="mt-1 text-sm text-zinc-600">Pick a module to make it your current learning focus.</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {modules.map((module) => {
              const Icon = module.icon;
              const moduleData = learningModules[module.title];
              const lessons = moduleData.lessons;
              const progress = getModuleProgress(module.title, lessons.length);
              const isActive = activeModule === module.title;
              return (
                <article key={module.title} className={`surface-card surface-card-hover flex flex-col overflow-hidden p-5 sm:p-6 ${isActive ? "border-violet-300/70 bg-gradient-to-br from-violet-50 to-white" : ""}`}>
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#eeeaff] to-[#f8edf7] text-[#6c4bf4]"><Icon size={22} /></span>
                    {isActive ? <span className="rounded-full bg-[#eeeaff] px-3 py-1.5 text-xs font-bold text-[#5635dd]">In progress</span> : progress === 100 ? <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">Completed</span> : <span className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-600">Not started</span>}
                  </div>
                  <h3 className="mt-5 text-xl font-bold tracking-tight text-zinc-900">{module.title}</h3>
                  <p className="mt-2 min-h-18 text-sm leading-6 text-zinc-600">{moduleData.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-zinc-600">
                    <span className="rounded-full bg-zinc-100 px-3 py-1.5">{module.difficulty}</span>
                    <span className="rounded-full bg-zinc-100 px-3 py-1.5">{module.duration}</span>
                  </div>
                  <div className="mt-5 flex items-center justify-between text-xs font-medium text-zinc-500">
                    <span>Module progress</span><span>{progress}%</span>
                  </div>
                  <div className="progress-track mt-2 h-2" role="progressbar" aria-label={`${module.title} progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
                    <div className="progress-fill h-full" style={{ width: `${progress}%` }} />
                  </div>
                  <button type="button" onClick={() => startModule(module.title)}
                    className="primary-button mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 font-semibold text-white">
                    {isActive ? "Module Active" : "Start Module"}
                    <ArrowRight size={16} />
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Learning;
