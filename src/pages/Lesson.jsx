import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Check, Clock3, Lightbulb, Sparkles, Target } from "lucide-react";
import AiLearningAssistant from "../components/AiLearningAssistant";
import { learningModules } from "../data/learningModules";
import { getCompletedLessons, getModuleProgress, markLessonComplete } from "../utils/learningProgress";

const marketingLessons = {
  "Know Your Ideal Customer": {
    introduction: "Marketing works best when you understand the people you want to help. This lesson will help you focus on a real group of customers and learn what matters to them.",
    sections: [
      { title: "Start with a specific group", content: "Describe the people who are most likely to need your offer. Consider their situation, goals, daily routines, and constraints. A focused audience helps you make clearer product and marketing choices." },
      { title: "Learn the problem behind the purchase", content: "Ask what your customers are trying to accomplish and what makes it difficult. Listen for their own words, workarounds, and questions. These details reveal what kind of value they will recognize." },
      { title: "Check your assumptions", content: "Talk with a few people who fit your audience. Ask open questions about recent experiences instead of asking whether they like your idea. Use what you hear to refine your customer profile." },
    ],
    example: "A home baker might first say people who like cake, then discover nearby parents need reliable, allergy-aware birthday cakes with easy pickup. That sharper customer need can guide the menu and message.",
    task: "Write a one-sentence description of your ideal customer. Then list three questions you could ask to understand their needs better.",
  },
  "Shape Your Brand Message": {
    introduction: "A useful brand message makes it easy for a potential customer to understand who you help, what you help them do, and why your offer is a good fit.",
    sections: [
      { title: "Name the customer and need", content: "Use familiar language to identify the people you serve and the problem or goal your offer addresses. Specific wording helps the right people recognize themselves in your message." },
      { title: "Describe the outcome", content: "Focus on the change customers can expect, not only the features of your product. Keep the promise realistic and connect it to a concrete customer benefit." },
      { title: "Add a reason to believe", content: "Support your message with a relevant detail: your process, experience, materials, service promise, or customer feedback. A clear proof point makes your promise more credible." },
    ],
    example: "Instead of saying We sell natural skincare, a maker could promise gentle, fragrance-free body care for busy parents with sensitive skin, then explain that each product is patch-tested and made in small batches.",
    task: "Draft a short message with this pattern: I help [customer] achieve [outcome] with [offer or approach]. Add one proof point you can stand behind.",
  },
  "Choose Your Marketing Channels": {
    introduction: "You do not need to be everywhere. Choose channels that match how your ideal customers discover information and that you can use consistently.",
    sections: [
      { title: "Follow your customer", content: "Use conversations and observation to learn where customers ask questions, compare options, and get recommendations. A channel is useful when your audience already gives it attention." },
      { title: "Match the channel to your offer", content: "Visual products may benefit from image-led platforms or local markets. Services that require trust may benefit from referrals, useful articles, or community events. Choose a format that shows your value clearly." },
      { title: "Test one channel at a time", content: "Set a small, repeatable test: publish a useful post each week, contact a few referral partners, or attend one local event. Track enquiries and sales alongside effort so you can decide what to continue." },
    ],
    example: "A neighborhood meal-prep service could test a weekly menu on a local community group and collect orders through a simple form. It can compare enquiries and repeat orders before investing in broader advertising.",
    task: "Choose one channel your customers already use. Write down one action you can repeat weekly and one result you will track for the next month.",
  },
  "Plan Content That Connects": {
    introduction: "Helpful content answers customer questions and builds trust over time. A simple plan makes it easier to show up regularly without needing a new idea every day.",
    sections: [
      { title: "Use customer questions as prompts", content: "Collect questions from conversations, messages, and sales discussions. Each recurring question can become a short tip, demonstration, checklist, or explanation." },
      { title: "Balance useful content types", content: "Share practical guidance, examples of your process, customer stories with permission, and clear information about your offer. Keep the focus on helping the audience make a confident next step." },
      { title: "Plan a sustainable rhythm", content: "Choose a realistic publishing schedule and reuse strong ideas in different formats. Include a clear next step, such as replying with a question, booking a call, or viewing a product." },
    ],
    example: "A tailoring studio can turn the question How do I measure for alterations? into a short measuring guide, a photo carousel, and a reminder about what to bring to an appointment.",
    task: "Write down three questions customers ask. Turn one into a content idea and add a simple call to action that helps the reader take the next step.",
  },
};

function getLessonContent(moduleName, lesson) {
  if (moduleName === "Digital Marketing" && marketingLessons[lesson.title]) {
    return marketingLessons[lesson.title];
  }

  const financial = moduleName === "Financial Skills";
  const subject = financial ? "your business finances" : "your business strategy";
  return {
    introduction: `${lesson.description} In this lesson, you will learn a practical way to apply this idea to ${subject}.`,
    sections: [
      { title: "Understand the key idea", content: financial ? "Start with accurate, simple records. Separate business activity from personal spending and note when money is expected to move, not only when a sale is made." : "Begin with a clear customer and a specific need. Strong strategy connects the value you offer with the people who need it and the way your business can deliver it." },
      { title: "Use a simple decision process", content: financial ? "Write down the decision, the numbers that affect it, and the assumptions behind those numbers. Compare a cautious estimate with an expected estimate before committing." : "List a few options, compare them against your customer needs and available resources, then choose one small step you can test. Use what you learn to improve the plan." },
      { title: "Review and adjust", content: financial ? "Check your actual results against your plan regularly. Notice changes in costs, cash timing, and sales, then adjust early while you still have options." : "Choose a measure that reflects progress toward your goal. Review it at a regular interval and update your next action when customer feedback or results change." },
    ],
    example: financial ? "Before ordering more materials, a maker can compare the order cost and payment date with expected sales and upcoming bills to check whether enough cash will remain available." : "A consultant who wants more repeat clients could test a follow-up package with a small group, gather feedback, and refine it before making it a core offer.",
    task: financial ? "Choose one upcoming business decision. List the money coming in, the costs going out, and the date each is expected. Note one question you still need to answer." : "Write one business goal for the next month, one small action that supports it, and one signal that will tell you whether the action is working.",
  };
}

function Lesson() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const moduleName = learningModules[state?.moduleName] ? state.moduleName : "Digital Marketing";
  const moduleLessons = learningModules[moduleName].lessons;
  const requestedLessonIndex = Number.isInteger(state?.lessonIndex) ? state.lessonIndex : 0;
  const lessonIndex = requestedLessonIndex >= 0 && requestedLessonIndex < moduleLessons.length
    ? requestedLessonIndex
    : 0;
  const lesson = moduleLessons[lessonIndex];
  const lessonNumber = lessonIndex + 1;
  const answers = Array.isArray(state?.answers) ? state.answers : [];
  const initialCompleted = getCompletedLessons(moduleName);
  const [completedLessonKey, setCompletedLessonKey] = useState(null);
  const completed = initialCompleted.includes(lessonIndex) || completedLessonKey === `${moduleName}:${lessonIndex}`;
  const moduleProgress = getModuleProgress(moduleName, moduleLessons.length);
  const content = getLessonContent(moduleName, lesson);
  const completedLessons = completed && !initialCompleted.includes(lessonIndex)
    ? [...initialCompleted, lessonIndex]
    : initialCompleted;

  const lessonState = (index) => ({
    moduleName,
    lesson: moduleLessons[index],
    lessonIndex: index,
    lessonNumber: index + 1,
    moduleLessons,
    completedLessons,
    answers,
  });

  const goToNextLesson = () => {
    const nextIndex = lessonIndex + 1;
    if (nextIndex < moduleLessons.length) {
      navigate("/learning/lesson", { state: lessonState(nextIndex) });
    } else {
      navigate("/learning/module", { state: { moduleName, answers, completedLessons } });
    }
  };

  return (
    <main className="app-page px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Lesson breadcrumb" className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm font-bold text-zinc-500">
            <Link to="/learning" state={{ answers }} className="hover:text-violet-700">Learning</Link><span>/</span><Link to="/learning/module" state={{ moduleName, answers, completedLessons }} className="hover:text-violet-700">{moduleName}</Link><span>/</span><span className="text-zinc-900">Lesson {String(lessonNumber).padStart(2, "0")}</span>
          </nav>
          <Link to="/" className="text-sm font-bold text-violet-700 hover:underline">Back to Home</Link>
        </header>

        <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#211936] via-[#39265f] to-[#74428c] p-6 text-white shadow-2xl shadow-violet-950/15 sm:p-9">
          <div aria-hidden="true" className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-fuchsia-500/25 blur-3xl" />
          <div className="relative">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.08] px-3 py-1.5 text-[10px] font-extrabold tracking-[.16em] text-violet-100"><BookOpen size={14} /> LESSON {String(lessonNumber).padStart(2, "0")}</p>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl">{lesson.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm font-semibold text-white/70">
            <span className="rounded-full border border-white/15 bg-white/[.08] px-3 py-1">{moduleName}</span>
            <span className="inline-flex items-center gap-1.5"><Clock3 size={15} />{lesson.time}</span><span className="rounded-full bg-emerald-300/15 px-3 py-1 text-xs font-bold text-emerald-100">Beginner friendly</span>
          </div>
          <div className="mt-7 max-w-2xl">
            <div className="mb-2 flex items-center justify-between text-xs font-bold text-white/65"><span>Module progress</span><span>{moduleProgress}%</span></div>
            <div className="h-2 overflow-hidden rounded-full bg-white/15" role="progressbar" aria-label={`${moduleName} progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={moduleProgress}><div className="h-full rounded-full bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300 transition-all duration-700" style={{ width: `${moduleProgress}%` }} /></div>
          </div>
          </div>
        </section>

        <article className="accent-surface mt-6 rounded-[1.5rem] p-5 sm:p-7">
          <p className="eyebrow inline-flex items-center gap-2"><Sparkles size={14} /> Key idea</p>
          <p className="mt-3 max-w-4xl text-lg font-semibold leading-8 text-[#373047]">{content.introduction}</p>
        </article>

        <section className="mt-5 space-y-3" aria-label="Lesson learning sections">
          {content.sections.map((section, index) => (
            <article key={section.title} className="surface-card p-5 sm:p-7">
              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#eeeaff] text-sm font-bold text-[#5635dd]">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="text-lg font-bold text-zinc-900">{section.title}</h2>
                  <p className="mt-2 leading-7 text-zinc-600">{section.content}</p>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-5 grid gap-3 md:grid-cols-2">
          <article className="surface-card p-5 sm:p-6">
            <p className="eyebrow inline-flex items-center gap-2"><Lightbulb size={14} /> Practical example</p>
            <p className="mt-3 leading-7 text-zinc-700">{content.example}</p>
          </article>
          <article className="accent-surface rounded-2xl p-5 sm:p-6">
            <p className="eyebrow inline-flex items-center gap-2"><Target size={14} /> Your action task</p>
            <p className="mt-3 leading-7 text-zinc-700">{content.task}</p>
          </article>
          <article className="accent-surface rounded-2xl p-5 sm:col-span-2 sm:p-6">
            <p className="eyebrow inline-flex items-center gap-2"><Sparkles size={14} /> Key takeaway</p>
            <p className="mt-3 leading-7 text-zinc-700">{lesson.description}</p>
          </article>
        </section>

        <section className="surface-card mt-5 p-6 sm:p-8" aria-live="polite">
          {completed ? (
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div className="animate-enter">
                <h2 className="inline-flex items-center gap-2 text-xl font-extrabold text-emerald-700"><span className="success-pop flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100"><Check size={20} /></span> Lesson complete!</h2>
                <p className="mt-1 text-sm leading-6 text-zinc-600">Nice work. Your progress has been updated for this learning path.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button type="button" disabled className="secondary-button inline-flex shrink-0 items-center gap-2 px-5 py-3 font-semibold text-[#5635dd]">
                  Completed
                </button>
                <button type="button" onClick={goToNextLesson} className="primary-button inline-flex shrink-0 items-center gap-2 px-5 py-3 font-semibold text-white">
                  Next Lesson <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-zinc-900">Ready to finish this lesson?</h2>
                <p className="mt-1 text-sm leading-6 text-zinc-600">Try the action task, then mark the lesson complete to update your module progress.</p>
              </div>
              <button type="button" onClick={() => {
                markLessonComplete(moduleName, lessonIndex);
                setCompletedLessonKey(`${moduleName}:${lessonIndex}`);
              }} className="primary-button group inline-flex shrink-0 items-center gap-2 px-5 py-3 font-extrabold text-white">
                <Check size={16} className="transition-transform group-hover:scale-110" /> Mark Lesson Complete
              </button>
            </div>
          )}
        </section>

        <AiLearningAssistant
          key={`${moduleName}:${lesson.title}`}
          lessonContext={{
            moduleName,
            title: lesson.title,
            description: lesson.description,
            introduction: content.introduction,
            sections: content.sections,
            example: content.example,
            task: content.task,
            recommendedSkill: answers[2] || null,
            completedLessons: initialCompleted.filter((index) => index < moduleLessons.length).length,
            totalLessons: moduleLessons.length,
            moduleProgress,
            isLessonComplete: completed,
            nextLessonTitle: moduleLessons[lessonIndex + 1]?.title || null,
          }}
        />
      </div>
    </main>
  );
}

export default Lesson;
