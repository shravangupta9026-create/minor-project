import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, CheckCircle2, CirclePlay, Clock3, Sparkles, Target, Trophy } from "lucide-react";
import { learningModules } from "../data/learningModules";
import { getAssessmentAnswers, getAssessmentRecommendations } from "../utils/assessmentData";
import {
  getActiveModule,
  getCompletedLessons,
  getModuleProgress,
  getOverallProgress,
  setActiveModule,
} from "../utils/learningProgress";

function readDashboardData() {
  const modules = Object.entries(learningModules).map(([name, module]) => {
    const completed = getCompletedLessons(name).filter((index) => index < module.lessons.length);
    return {
      name,
      ...module,
      completed,
      progress: getModuleProgress(name, module.lessons.length),
    };
  });
  const moduleNames = modules.map((module) => module.name);
  const savedActiveModule = getActiveModule();
  const activeModule = moduleNames.includes(savedActiveModule) ? savedActiveModule : null;
  const totalLessons = modules.reduce((total, module) => total + module.lessons.length, 0);
  const completedCount = modules.reduce((total, module) => total + module.completed.length, 0);

  return {
    modules,
    activeModule,
    totalLessons,
    completedCount,
    overallProgress: getOverallProgress(learningModules),
    completedModules: modules.filter((module) => module.progress === 100).length,
    answers: getAssessmentAnswers(),
  };
}

function Dashboard() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(readDashboardData);
  const refreshDashboard = useCallback(() => setDashboard(readDashboardData()), []);

  useEffect(() => {
    window.addEventListener("storage", refreshDashboard);
    window.addEventListener("focus", refreshDashboard);
    window.addEventListener("pageshow", refreshDashboard);
    return () => {
      window.removeEventListener("storage", refreshDashboard);
      window.removeEventListener("focus", refreshDashboard);
      window.removeEventListener("pageshow", refreshDashboard);
    };
  }, [refreshDashboard]);

  const {
    modules,
    activeModule,
    totalLessons,
    completedCount,
    overallProgress,
    completedModules,
    answers,
  } = dashboard;
  const hasAssessment = answers.length === 5;
  const recommendations = hasAssessment ? getAssessmentRecommendations(answers) : [];
  const activeModuleData = modules.find((module) => module.name === activeModule);
  const nextLessonIndex = activeModuleData
    ? activeModuleData.lessons.findIndex((_, index) => !activeModuleData.completed.includes(index))
    : -1;
  const nextLesson = nextLessonIndex >= 0 ? activeModuleData.lessons[nextLessonIndex] : null;
  const allComplete = totalLessons > 0 && completedCount === totalLessons;
  const recommendedModule = recommendations.find(({ name }) => learningModules[name]);
  const nextIncompleteModule = modules.find((module) => module.progress < 100);

  const openModule = (moduleName) => {
    setActiveModule(moduleName);
    navigate("/learning/module", { state: { moduleName, answers } });
  };

  const openLesson = (moduleName, lessonIndex) => {
    const module = learningModules[moduleName];
    if (!module?.lessons[lessonIndex]) return;
    setActiveModule(moduleName);
    navigate("/learning/lesson", {
      state: {
        moduleName,
        lesson: module.lessons[lessonIndex],
        lessonIndex,
        lessonNumber: lessonIndex + 1,
        moduleLessons: module.lessons,
        completedLessons: getCompletedLessons(moduleName),
        answers,
      },
    });
  };

  let nextStepTitle = "Start your learning journey";
  let nextStepText = "Take the short assessment to get a learning plan tailored to your goals.";
  let nextStepAction = () => navigate("/assessment");
  let nextStepButton = "Take Assessment";

  if (allComplete) {
    nextStepTitle = "Your learning path is complete";
    nextStepText = "You have completed every lesson. Revisit a module or refresh your growth plan when your goals change.";
    nextStepButton = "Refresh Growth Plan";
  } else if (nextLesson && activeModuleData) {
    nextStepTitle = "Continue where you left off";
    nextStepText = `Pick up with “${nextLesson.title}” in ${activeModuleData.name}.`;
    nextStepAction = () => openLesson(activeModuleData.name, nextLessonIndex);
    nextStepButton = "Continue Lesson";
  } else if (recommendedModule || nextIncompleteModule) {
    const targetModule = recommendedModule?.name ?? nextIncompleteModule.name;
    nextStepTitle = hasAssessment ? `Start with ${targetModule}` : "Choose a module to begin";
    nextStepText = hasAssessment
      ? "This learning area matches your assessment recommendations. Start with its first lesson."
      : "Explore a learning module and start with the first lesson.";
    nextStepAction = () => openLesson(targetModule, 0);
    nextStepButton = "Start Learning";
  }

  return (
    <main className="app-page px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">LEARNER DASHBOARD</p>
            <h1 className="display-title mt-3 text-3xl font-extrabold sm:text-4xl">Welcome back<span className="gradient-text">.</span></h1>
            <p className="mt-3 max-w-2xl leading-7 text-[#6b6875]">Your learning journey is moving forward. Pick up where you left off and keep building momentum.</p>
          </div>
          <Link to="/assessment" className="secondary-button inline-flex items-center justify-center gap-2 self-start px-5 py-3 text-sm font-bold text-zinc-700 sm:self-auto">
            {hasAssessment ? "Retake Assessment" : "Take Assessment"}<ArrowRight size={16} />
          </Link>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-[1.35fr_.65fr]" aria-label="Learning summary">
          <article className="relative overflow-hidden rounded-[1.7rem] bg-gradient-to-br from-[#201834] via-[#38235d] to-[#6e438e] p-6 text-white shadow-xl shadow-violet-950/10 sm:p-8">
            <div aria-hidden="true" className="absolute -right-14 -top-24 h-64 w-64 rounded-full bg-fuchsia-500/25 blur-3xl" />
            <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
              <div><p className="text-[10px] font-extrabold tracking-[.18em] text-violet-200">OVERALL PROGRESS</p><p className="mt-2 text-5xl font-extrabold tracking-tight">{overallProgress}<span className="text-3xl">%</span></p><p className="mt-2 text-sm font-semibold text-white/65">{completedCount} of {totalLessons} lessons completed</p>
                <div className="mt-5 h-2.5 w-full max-w-md overflow-hidden rounded-full bg-white/15" role="progressbar" aria-label="Overall learning progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={overallProgress}><div className="h-full rounded-full bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300 transition-all duration-700" style={{ width: `${overallProgress}%` }} /></div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[.08] p-4 backdrop-blur sm:flex-col sm:gap-2 sm:px-6 sm:py-5">
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full" style={{ background: `conic-gradient(#e9c4ff ${overallProgress * 3.6}deg, rgba(255,255,255,.14) ${overallProgress * 3.6}deg)` }}><div className="flex h-[4.35rem] w-[4.35rem] items-center justify-center rounded-full bg-[#35244f]"><BookOpen size={23} /></div></div><p className="text-sm font-extrabold">Your steady pace</p>
              </div>
            </div>
          </article>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <article className="surface-card flex items-center justify-between gap-4 p-5 sm:p-6"><div><p className="eyebrow">ACTIVE MODULE</p><p className="mt-2 text-lg font-extrabold leading-snug">{activeModule ?? "Not started"}</p><p className="mt-1 text-sm text-[#6b6875]">{activeModuleData ? `${activeModuleData.completed.length} of ${activeModuleData.lessons.length} lessons complete` : "Choose a module to set your focus"}</p></div><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600"><Target size={21} /></span></article>
            <article className="surface-card flex items-center justify-between gap-4 p-5 sm:p-6"><div><p className="eyebrow">MODULES COMPLETED</p><p className="mt-2 text-3xl font-extrabold">{completedModules}<span className="ml-2 text-sm font-bold text-[#777282]">/ {modules.length}</span></p><p className="mt-1 text-sm text-[#6b6875]">Keep going at your own pace</p></div><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-50 text-pink-600"><Trophy size={21} /></span></article>
          </div>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[1.35fr_0.85fr]">
          <article className="surface-card p-6 sm:p-8">
            <div className="flex items-center gap-2 text-[#6c4bf4]"><CirclePlay size={18} /><p className="eyebrow">Continue learning</p></div>
            {nextLesson && activeModuleData ? (
              <div className="animate-enter">
                <p className="mt-5 text-sm font-semibold text-zinc-500">{activeModuleData.name} · Lesson {String(nextLessonIndex + 1).padStart(2, "0")}</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900">{nextLesson.title}</h2>
                <p className="mt-2 leading-7 text-zinc-600">{nextLesson.description}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-500">
                  <span className="inline-flex items-center gap-1.5"><Clock3 size={15} />{nextLesson.time}</span>
                  <span className="rounded-full bg-[#eeeaff] px-3 py-1 text-xs font-bold text-[#5635dd]">Next incomplete lesson</span>
                </div>
                <button type="button" onClick={() => openLesson(activeModuleData.name, nextLessonIndex)} className="primary-button mt-6 inline-flex items-center gap-2 px-5 py-3 font-semibold text-white">
                  Continue Lesson <ArrowRight size={16} />
                </button>
              </div>
            ) : allComplete ? (
              <div className="accent-surface mt-5 rounded-2xl p-5">
                <h2 className="font-bold text-zinc-900">Every lesson is complete</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-600">Choose a module to review its lessons or refresh your growth plan.</p>
              </div>
            ) : (
              <div className="accent-surface mt-5 rounded-2xl p-5">
                <h2 className="font-bold text-zinc-900">No lesson in progress yet</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-600">Choose a module below and its first lesson will be ready for you.</p>
              </div>
            )}
          </article>

          <article className="accent-surface p-6 sm:p-8">
            <div className="flex items-center gap-2 text-[#6c4bf4]"><Sparkles size={18} /><p className="eyebrow">Your next step</p></div>
            <h2 className="mt-5 text-xl font-bold tracking-tight text-zinc-900">{nextStepTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{nextStepText}</p>
            <button type="button" onClick={nextStepAction} className="primary-button mt-5 inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white">
              {nextStepButton}<ArrowRight size={15} />
            </button>
          </article>
        </section>

        <section className="mt-9">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Recommended for you</h2>
              <p className="mt-1 text-sm text-zinc-600">Skill areas selected from your assessment answers.</p>
            </div>
            {hasAssessment && <Link to="/results" state={{ answers }} className="text-sm font-semibold text-[#5635dd] hover:underline">View growth plan</Link>}
          </div>
          {recommendations.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recommendations.map((recommendation, index) => (
                <article key={recommendation.name} className={`surface-card surface-card-hover p-5 ${index === 0 ? "accent-surface" : ""}`}>
                  <span className="rounded-full bg-[#eeeaff] px-3 py-1 text-xs font-bold text-[#5635dd]">Priority {index + 1}</span>
                  <h3 className="mt-4 text-lg font-bold text-zinc-900">{recommendation.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{recommendation.description}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="surface-card p-6">
              <p className="font-semibold text-zinc-900">Your personalized recommendations are waiting</p>
              <p className="mt-1 text-sm leading-6 text-zinc-600">Complete the assessment to see skill areas matched to your goals.</p>
              <Link to="/assessment" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#5635dd] hover:underline">Start Assessment <ArrowRight size={15} /></Link>
            </div>
          )}
        </section>

        <section className="mt-9">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Your modules</h2>
              <p className="mt-1 text-sm text-zinc-600">Your progress comes from lessons saved on this device.</p>
            </div>
            <Link to="/learning" className="text-sm font-semibold text-[#5635dd] hover:underline">Open learning path</Link>
          </div>
          <div className="relative space-y-4 pl-7 sm:pl-10">
            <div aria-hidden="true" className="timeline-line absolute bottom-8 left-[.65rem] top-8 w-px sm:left-[.95rem]" />
            {modules.map((module, index) => {
              const status = module.progress === 100 ? "Completed" : module.name === activeModule ? "In progress" : "Not started";
              return (
                <article key={module.name} className={`surface-card surface-card-hover relative flex flex-col p-5 sm:p-6 lg:flex-row lg:items-center lg:gap-8 ${status === "In progress" ? "border-violet-300/70 bg-gradient-to-r from-violet-50/90 via-white to-white" : ""}`}>
                  <span className={`absolute -left-7 top-8 z-10 flex h-5 w-5 items-center justify-center rounded-full border-[4px] border-[#faf8ff] sm:-left-10 ${status === "Completed" ? "bg-emerald-500" : status === "In progress" ? "bg-violet-500 shadow-[0_0_0_5px_rgba(139,92,246,.15)]" : "bg-zinc-300"}`} />
                  <div className="flex items-start justify-between gap-3">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-2xl text-[#6c4bf4] ${index === 0 ? "bg-[#eeeaff]" : index === 1 ? "bg-[#f4eefa]" : "bg-[#edf2ff]"}`}><BookOpen size={20} /></span>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${status === "Completed" ? "bg-emerald-50 text-emerald-700" : status === "In progress" ? "bg-[#eeeaff] text-[#5635dd]" : "bg-zinc-100 text-zinc-600"}`}>{status}</span>
                  </div>
                  <div className="lg:min-w-64 lg:flex-1"><h3 className="mt-4 text-lg font-extrabold text-zinc-900">{module.name}</h3>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-zinc-600">{module.description}</p></div>
                  <div className="mt-4 flex items-center justify-between text-xs font-semibold text-zinc-500">
                    <span>{module.completed.length} of {module.lessons.length} lessons</span><span>{module.progress}%</span>
                  </div>
                  <div className="progress-track mt-2 h-2" role="progressbar" aria-label={`${module.name} progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={module.progress}>
                    <div className="progress-fill h-full" style={{ width: `${module.progress}%` }} />
                  </div>
                  <button type="button" onClick={() => openModule(module.name)} className="secondary-button mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-extrabold text-[#5635dd] lg:mt-0">
                    {module.progress === 100 ? "Review Module" : module.name === activeModule ? "Open Active Module" : "Open Module"}<ArrowRight size={15} />
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section className="surface-card mt-9 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-[#6c4bf4]"><Trophy size={18} /><h2 className="text-xl font-bold tracking-tight text-zinc-900">Learning activity</h2></div>
          {completedCount || activeModule ? (
            <ul className="mt-5 space-y-3">
              {modules.flatMap((module) => module.completed.map((index) => ({ module: module.name, lesson: module.lessons[index] }))).map(({ module, lesson }) => (
                <li key={`${module}:${lesson.title}`} className="flex flex-col justify-between gap-1 border-b border-[#eeedf5] pb-3 text-sm sm:flex-row sm:items-center">
                  <span className="inline-flex items-center gap-2 font-medium text-zinc-800"><CheckCircle2 size={16} className="text-[#6c4bf4]" />Completed: {lesson.title}</span>
                  <span className="text-zinc-500">{module}</span>
                </li>
              ))}
              {activeModule && <li className="flex flex-col justify-between gap-1 text-sm sm:flex-row sm:items-center"><span className="inline-flex items-center gap-2 font-medium text-zinc-800"><Target size={16} className="text-[#6c4bf4]" />Current focus: {activeModule}</span><span className="text-zinc-500">Active module</span></li>}
            </ul>
          ) : (
            <div className="mt-4 rounded-2xl bg-[#f8f7fc] p-5">
              <p className="font-semibold text-zinc-900">No activity yet</p>
              <p className="mt-1 text-sm text-zinc-600">Completed lessons and your active module will appear here.</p>
            </div>
          )}
        </section>

        {totalLessons === 0 && <div className="surface-card mt-8 p-6 text-center">No learning modules are available yet.</div>}
      </div>
    </main>
  );
}

export default Dashboard;
