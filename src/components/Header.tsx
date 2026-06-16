import { useState } from "react";
import { Shield, Sun, Moon, Menu, X, FileText } from "lucide-react";

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
  openResume: () => void;
}

export default function Header({ isDark, toggleTheme, openResume }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scroll = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Skills", id: "skills" },
    { label: "Experience", id: "experience" },
    { label: "Projects & Live Demos", id: "projects" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Contact", id: "contact" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b border-slate-200/50 dark:border-slate-800/80 bg-white/80 dark:bg-[#050510]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 border-b border-transparent">
          {/* Logo / Brand */}
          <div 
            onClick={() => scroll("home")} 
            className="flex items-center space-x-2.5 cursor-pointer group"
            id="brand-logo"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-500 dark:text-indigo-400 group-hover:scale-105 transition-all shadow-[0_0_15px_rgba(99,102,241,0.15)]">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="font-display font-bold text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-indigo-400 dark:to-purple-400 group-hover:text-indigo-500 transition-colors leading-none text-base">
                Rahmatu
              </span>
              <span className="font-mono text-[9px] text-purple-600 dark:text-purple-400 uppercase tracking-widest block leading-none mt-0.5 font-bold">
                .AstroSec
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scroll(item.id)}
                className="px-3 py-2 rounded-lg text-[11px] uppercase tracking-widest font-bold text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors"
                id={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-50 hover:bg-slate-150 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-850"
              aria-label="Toggle theme"
              id="theme-toggle-desktop"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-500 animate-pulse" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Resume Button */}
            <button
              onClick={openResume}
              className="bg-indigo-600 text-white dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 px-5 py-2.5 rounded-lg flex items-center gap-1.5 transition-all text-[11px] font-bold uppercase tracking-widest shadow-md shadow-indigo-500/10"
              id="view-resume-desktop"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-805 text-slate-600 dark:text-slate-300 transition-colors"
              aria-label="Toggle theme"
              id="theme-toggle-mobile"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-805 text-slate-600 dark:text-slate-300 transition-colors"
              aria-label="Toggle menu"
              id="menu-toggle-mobile"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070715] transition-colors duration-300">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scroll(item.id)}
                className="block w-full text-left px-4 py-3 rounded-lg text-xs uppercase tracking-widest font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-indigo-600 dark:hover:text-indigo-400"
                id={`nav-mobile-${item.id}`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                openResume();
              }}
              className="flex items-center space-x-2 w-full text-center justify-center px-4 py-3 rounded-lg text-xs uppercase tracking-widest font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/10"
              id="view-resume-mobile"
            >
              <FileText className="w-4 h-4" />
              <span>Full CV / Print PDF</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
