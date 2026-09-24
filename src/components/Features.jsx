import { BookOpen, Bot, TrendingUp } from "lucide-react";

const features = [
  { icon: Bot, eyebrow: "YOUR PERSONAL GUIDE", title: "AI Learning Assistant", description: "Ask questions in the middle of a lesson. Get a simpler explanation, a useful example, or a next step grounded in what you are learning.", iconStyle: "from-violet-600 to-fuchsia-500", surface: "from-violet-50 to-white" },
  { icon: BookOpen, eyebrow: "BUILT AROUND YOU", title: "Personalized Learning", description: "Your assessment shapes a practical path through marketing, business strategy, and financial skills—focused on the areas you want to grow.", iconStyle: "from-indigo-500 to-violet-500", surface: "from-indigo-50 to-white" },
  { icon: TrendingUp, eyebrow: "MOMENTUM THAT LASTS", title: "Smart Progress Tracking", description: "Pick up where you left off. Completed lessons and module progress are saved on your device as your confidence grows.", iconStyle: "from-pink-500 to-violet-500", surface: "from-pink-50 to-white" },
];

function Features() {
  return (
    <section id="features" className="scroll-mt-28 relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute right-8 top-24 -z-10 h-52 w-52 rounded-full bg-fuchsia-200/35 blur-3xl" />
      <div className="mx-auto max-w-3xl text-center"><p className="eyebrow">MADE FOR YOUR MOMENTUM</p><h2 className="display-title mt-4 text-3xl font-extrabold sm:text-4xl lg:text-5xl">Everything you need to <span className="gradient-text">grow.</span></h2><p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#6b6875] sm:text-lg">One supportive place to build business skills, turn insight into action, and keep moving forward.</p></div>
      <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:mt-14">
        {features.map(({ icon: Icon, eyebrow, title, description, iconStyle, surface }, index) => <article key={title} className={`surface-card surface-card-hover group relative overflow-hidden bg-gradient-to-br ${surface} p-6 sm:p-8`}>
          <span className="absolute -right-5 -top-7 text-8xl font-extrabold tracking-tighter text-violet-950/[.035]">0{index + 1}</span>
          <div className={`flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-gradient-to-br ${iconStyle} text-white shadow-lg shadow-violet-500/20 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105`}><Icon size={28} strokeWidth={1.8} /></div>
          <p className="eyebrow mt-7 text-[10px]">{eyebrow}</p><h3 className="mt-2 text-xl font-extrabold tracking-tight">{title}</h3><p className="mt-3 leading-7 text-[#6b6875]">{description}</p>
          <span className="mt-6 block h-1 w-12 rounded-full bg-gradient-to-r from-violet-500 to-pink-400 transition-all duration-300 group-hover:w-20" />
        </article>)}
      </div>
    </section>
  );
}

export default Features;
