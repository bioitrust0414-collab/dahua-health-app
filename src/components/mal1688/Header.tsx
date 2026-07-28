import { Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";

const navLinks = [
  { to: "/mal1688/story", label: "暖心守護故事" },
  { to: "/mal1688/science", label: "黃金協同技術" },
  { to: "/mal1688/solutions", label: "四重高效配方" },
  { to: "/mal1688/lab", label: "成長灌溉實驗室" },
  { to: "/mal1688/pricing", label: "線上特惠訂購", accent: true },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/mal1688" className="flex items-center gap-3 group">
          <div className="w-12 h-8 rounded-full border-2 border-teal-500/50 flex items-center justify-center p-1 relative group-hover:scale-105 transition-transform bg-white shadow-sm">
            <div className="w-full h-full border border-amber-400/50 rounded-full flex items-center justify-center">
              <span className="text-[10px] font-black text-teal-600 tracking-tighter">MAL</span>
            </div>
            <div className="absolute -top-1 left-2 w-2 h-2 rounded-full bg-teal-400" />
            <div className="absolute -bottom-0.5 right-3 w-1.5 h-1.5 rounded-full bg-amber-400" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-teal-700 bg-clip-text text-transparent">
              MitoActiveLife
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold leading-none mt-0.5">
              活「粒」生活 · 全方位家庭發育營養科學
            </span>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-semibold transition-colors ${
                l.accent
                  ? "text-amber-600 hover:text-amber-700"
                  : "text-slate-600 hover:text-teal-600"
              }`}
              activeProps={{ className: l.accent ? "text-amber-700" : "text-teal-600" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/mal1688/academy"
            className="text-sm font-semibold text-teal-600 hover:text-teal-500 transition-colors flex items-center gap-1.5 px-3 py-1 bg-teal-50 rounded-full border border-teal-500/20"
          >
            <BookOpen className="w-4 h-4" />
            內部教育訓練沙盒
          </Link>
        </nav>
      </div>
    </header>
  );
}
