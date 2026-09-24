import { ArrowRight, BookOpenCheck, ClipboardCheck, TrendingUp } from "lucide-react";

const steps = [
  { number: "01", icon: ClipboardCheck, title: "Assess", description: "Share where you are today and what you want to make possible next.", detail: "A few thoughtful questions" },
  { number: "02", icon: BookOpenCheck, title: "Learn", description: "Follow a personal skill path with practical lessons and a context-aware AI guide.", detail: "One lesson at a time" },
  { number: "03", icon: TrendingUp, title: "Grow", description: "Practice what you learn, save your progress, and build real momentum.", detail: "Your growth, made visible" },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-28 relative overflow-hidden bg-[#f0edfa] py-20 sm:py-28">
      <div aria-hidden="true" className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-violet-300/30 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center"><p className="eyebrow">A SIMPLE WAY FORWARD</p><h2 className="display-title mt-4 text-3xl font-extrabold sm:text-4xl lg:text-5xl">How SheRise AI <span className="gradient-text">works.</span></h2><p className="mx-auto mt-5 max-w-xl leading-8 text-[#6b6875]">A supportive loop that turns your ambition into practical progress.</p></div>
        <div className="relative mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div aria-hidden="true" className="timeline-line absolute left-[16.5%] right-[16.5%] top-9 hidden h-px lg:block" />
          {steps.map(({ number, icon: Icon, title, description, detail }) => <article key={number} className="surface-card surface-card-hover relative p-6 sm:p-8">
            <div className="flex items-center justify-between"><span className="relative z-10 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border-[5px] border-[#f0edfa] bg-gradient-to-br from-[#6c4bf4] to-[#a855f7] text-white shadow-lg shadow-violet-500/20"><Icon size={23} /></span><span className="text-4xl font-extrabold tracking-tighter text-violet-950/[.08]">{number}</span></div>
            <p className="eyebrow mt-6">STEP {number}</p><h3 className="mt-2 text-2xl font-extrabold">{title}</h3><p className="mt-3 min-h-20 leading-7 text-[#6b6875]">{description}</p><div className="mt-5 flex items-center gap-2 border-t border-violet-100 pt-4 text-xs font-extrabold text-violet-700"><span className="h-1.5 w-1.5 rounded-full bg-pink-500" />{detail}<ArrowRight size={14} className="ml-auto" /></div>
          </article>)}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
