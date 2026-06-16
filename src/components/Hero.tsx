import { Shield, Mail, Phone, MapPin, ArrowRight, FileText, Award } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

interface HeroProps {
  openResume: () => void;
}

export default function Hero({ openResume }: HeroProps) {
  const { personalInfo, certifications } = portfolioData;

  const scrollToDemos = () => {
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-slate-50 dark:bg-[#02020a] transition-colors duration-300 border-b border-slate-200/50 dark:border-slate-900/60">
      {/* Visual background grids / decorative accents representing cybersecurity packet routing */}
      <div className="absolute inset-0 z-0 opacity-[0.05] dark:opacity-[0.1] pointer-events-none">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] rounded-full border border-purple-500/25 blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] rounded-full border border-indigo-500/25 blur-3xl"></div>
        <div className="w-full h-full bg-[linear-gradient(to_right,#818cf8_1px,transparent_1px),linear-gradient(to_bottom,#818cf8_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Info */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-indigo-500/5 dark:bg-indigo-950/10 border border-indigo-500/10 dark:border-indigo-500/20 w-fit">
              <Shield className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-indigo-650 dark:text-indigo-300 font-mono">
                Active SOC Analyst • B.Sc. Cyber Security
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 tracking-tight leading-[1.1] relative" id="hero-title">
              Rahmatu <br />
              <span className="text-indigo-600 dark:text-indigo-400">Abdulkarim</span>
            </h1>
            
            <p className="text-xs uppercase tracking-[0.3em] font-black text-purple-600 dark:text-purple-400 font-mono">
              {personalInfo.title}
            </p>

            <p className="text-sm sm:text-base text-slate-650 dark:text-slate-300 leading-relaxed font-sans max-w-2xl font-normal">
              {personalInfo.summary}
            </p>

            {/* Quick Contact Ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 pb-4 border-y border-slate-200/60 dark:border-slate-800/75 text-[11px] uppercase tracking-widest font-mono text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
                <a href={`mailto:${personalInfo.email}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors truncate">
                  {personalInfo.email}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
                <span className="truncate">{personalInfo.location}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={scrollToDemos}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-all rounded-lg text-xs uppercase tracking-widest font-bold pointer-events-auto cursor-pointer shadow-lg shadow-indigo-500/15"
                id="cta-projects"
              >
                <span>Launch Security Demos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              
              <button
                onClick={openResume}
                className="flex items-center justify-center space-x-2 px-6 py-3 border border-purple-500/40 dark:border-purple-550/50 hover:bg-purple-500/10 text-slate-800 dark:text-purple-300 transition-all rounded-lg text-xs uppercase tracking-widest font-bold pointer-events-auto cursor-pointer"
                id="cta-resume"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Download Resume PDF</span>
              </button>
            </div>
          </div>

          {/* Avatar & Verification Display */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 select-none">
              {/* EST Stamp Style Label on upper right */}
              <div className="absolute -top-4 -right-4 w-20 h-20 border border-indigo-505/20 rounded-full flex flex-col items-center justify-center text-[8px] tracking-widest uppercase text-indigo-500 dark:text-indigo-400 rotate-12 bg-white dark:bg-[#070715] z-20 shadow-md font-mono font-bold">
                <span>EST.</span>
                <span className="font-extrabold text-[10px]">2026</span>
              </div>

              {/* Outer orbit layout */}
              <div className="absolute inset-0 rounded-full border border-indigo-500/10 dark:border-indigo-500/20 animate-spin" style={{ animationDuration: '40s' }} />
              <div className="absolute inset-4 rounded-full border border-dashed border-purple-500/10 dark:border-purple-500/20 animate-spin" style={{ animationDuration: '60s', animationDirection: 'reverse' }} />
              
              {/* Avatar mask */}
              <div className="absolute inset-8 rounded-full overflow-hidden border-2 border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-100 dark:bg-[#0d0d21]">
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover select-none filter contrast-105 hover:scale-105 transition-all duration-500 animate-in fade-in zoom-in"
                  referrerPolicy="no-referrer"
                  id="avatar-image"
                />
              </div>

              {/* Verified Badge / Floating Element */}
              <div className="absolute -bottom-2 -right-2 bg-white dark:bg-[#07071dbf] backdrop-blur border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all rounded-lg p-3 flex items-center space-x-2 select-none">
                <div className="w-8 h-8 rounded-md bg-indigo-500/10 border border-indigo-500/35 text-indigo-500 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[8px] font-bold text-slate-400 font-mono uppercase tracking-widest leading-none">
                    Security Badge
                  </span>
                  <span className="text-[11px] font-bold text-slate-850 dark:text-white block mt-1 leading-none font-sans">
                    Google Professional
                  </span>
                </div>
              </div>
            </div>

            {/* Certifications Quick Bar */}
            <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-sm lg:max-w-none">
              {certifications.slice(0, 2).map((cert, index) => (
                <div 
                  key={index}
                  className="p-3 bg-white/60 dark:bg-[#07071c]/55 backdrop-blur border border-slate-200 dark:border-slate-850 hover:border-indigo-550/30 transition-all text-xs font-mono rounded-lg shadow-sm"
                >
                  <span className="block text-indigo-500 dark:text-indigo-400 font-bold uppercase text-[9px] tracking-wider mb-1 font-sans">
                    {cert.issuer}
                  </span>
                  <p className="font-bold text-slate-800 dark:text-slate-250 line-clamp-1 font-display text-sm tracking-tight">
                    {cert.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
