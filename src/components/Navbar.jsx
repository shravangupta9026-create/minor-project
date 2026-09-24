import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowRight, Menu, Sparkles, X } from "lucide-react";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/assessment", label: "Assessment" },
  { to: "/learning", label: "Learning" },
  { to: "/dashboard", label: "Dashboard" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinkClass = ({ isActive }) => `rounded-full px-3.5 py-2 text-sm font-bold transition ${isActive ? "bg-[#f0eaff] text-[#6c4bf4]" : "text-zinc-600 hover:bg-white/75 hover:text-zinc-950"}`;

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav aria-label="Main navigation" className="app-nav relative mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-3 py-2.5 sm:px-5">
        <Link to="/" className="flex shrink-0 items-center gap-2.5 rounded-xl" onClick={() => setMenuOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#6c4bf4] via-[#8b5cf6] to-[#ec4899] text-white shadow-lg shadow-purple-500/20"><Sparkles size={19} /></span>
          <span className="text-lg font-extrabold tracking-tight text-[#17151f]">SheRise<span className="gradient-text"> AI</span></span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-white/80 bg-white/55 p-1 lg:flex">
          {links.map(({ to, label, end }) => <NavLink key={to} to={to} end={end} className={navLinkClass}>{label}</NavLink>)}
        </div>

        <Link to="/learning" className="primary-button group hidden items-center gap-2 px-5 py-3 text-sm font-extrabold text-white lg:inline-flex">
          Start Learning <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
        <button type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} className="secondary-button flex h-10 w-10 items-center justify-center text-zinc-800 lg:hidden">
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>

        {menuOpen && <div className="absolute inset-x-0 top-[calc(100%+0.6rem)] rounded-2xl border border-white/80 bg-white/95 p-3 shadow-xl backdrop-blur-2xl lg:hidden">
          <div className="grid gap-1">
            {links.map(({ to, label, end }) => <NavLink key={to} to={to} end={end} onClick={() => setMenuOpen(false)} className={({ isActive }) => `rounded-xl px-4 py-3 text-sm font-bold ${isActive ? "bg-[#f1edff] text-[#6c4bf4]" : "text-zinc-700 hover:bg-zinc-50"}`}>{label}</NavLink>)}
          </div>
          <Link to="/learning" onClick={() => setMenuOpen(false)} className="primary-button mt-2 flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white">Start Learning <ArrowRight size={16} /></Link>
        </div>}
      </nav>
    </header>
  );
}

export default Navbar;
