import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import ContactForm from "./components/ContactForm";
import ResumeModal from "./components/ResumeModal";
import { Shield } from "lucide-react";

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme === "dark";
      }
    } catch {
      // Safe fallback
    }
    // Default to dark theme for security analyst tech aesthetic
    return true;
  });

  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen font-sans bg-stone-50 dark:bg-[#0F0F0F] text-stone-900 dark:text-stone-100 transition-colors duration-300">
      
      {/* Scrollable layout sections wrapper */}
      <Header 
        isDark={isDark} 
        toggleTheme={() => setIsDark(!isDark)} 
        openResume={() => setIsResumeOpen(true)} 
      />

      <main className="print:hidden">
        <Hero openResume={() => setIsResumeOpen(true)} />
        <Skills />
        <Experience />
        <Projects />
        <Testimonials />
        <ContactForm />
      </main>

      {/* Corporate Modern Footer */}
      <footer className="py-12 border-t border-stone-200 dark:border-[#222] bg-stone-150/30 dark:bg-[#0B0B0B] text-sm font-mono text-stone-500 text-center select-none print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center justify-center space-x-2 text-stone-800 dark:text-white">
            <Shield className="w-5 h-5 text-[#C19A6B]" />
            <span className="font-serif italic font-light tracking-wide">Rahmatu Abdulkarim</span>
          </div>
          <p className="text-xs text-stone-400 dark:text-[#888] leading-relaxed max-w-md mx-auto">
            Professional Cybersecurity Portfolio. Designed for elegant contrast, lightweight interactions, and responsive modular systems.
          </p>
          <div className="pt-2 text-[10px] tracking-widest text-[#C19A6B] uppercase font-bold">
            © {new Date().getFullYear()} Rahmatu Abdulkarim. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* Floating Full Printable CV Page Modal overlay */}
      {isResumeOpen && (
        <ResumeModal onClose={() => setIsResumeOpen(false)} />
      )}
    </div>
  );
}

