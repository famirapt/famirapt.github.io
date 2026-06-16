import { X, Printer, Phone, Mail, MapPin, ExternalLink, Download } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

interface ResumeModalProps {
  onClose: () => void;
}

export default function ResumeModal({ onClose }: ResumeModalProps) {
  const { personalInfo, competencies, experiences, certifications, awardsAndActivities } = portfolioData;

  const handlePrint = () => {
    // Elegant local window print command
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto px-4 py-8 flex items-center justify-center bg-zinc-950/85 backdrop-blur-sm select-text" id="resume-viewer-modal">
      <div className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-xl shadow-2xl overflow-hidden border border-gray-150 dark:border-zinc-800 animate-in fade-in-25 duration-300 flex flex-col h-[90vh]">
        
        {/* Header Block of Resume Modal */}
        <div className="px-6 py-4 bg-stone-50 dark:bg-[#111] border-b border-stone-200 dark:border-[#222] flex items-center justify-between z-10 shrink-0 select-none print:hidden">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block shrink-0" />
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-stone-300">
              Rahmatu_Abdulkarim_CV.pdf (Print Ready View)
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-4 py-2 text-[10px] font-bold font-mono uppercase tracking-wider rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm cursor-pointer transition-colors"
              id="print-cv-btn"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 px-2 text-stone-500 hover:text-stone-800 dark:hover:text-white rounded-lg border border-stone-200 dark:border-[#222] bg-white dark:bg-[#1E1E1E] transition-colors"
              aria-label="Close CV panel"
              id="close-cv-modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Page */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 bg-stone-100 dark:bg-[#090909] print:bg-white print:p-0 select-text">
          
          {/* Printable Layout Sheet */}
          <div className="mx-auto max-w-3xl bg-white dark:bg-[#111] rounded-none border border-stone-250 dark:border-[#222]/80 p-8 shadow-sm print:shadow-none print:border-none print:bg-white text-stone-800 dark:text-[#BBB] font-sans print:text-black">
            
            {/* Header CV Block */}
            <div className="text-center pb-6 border-b border-stone-200 print:border-black/30 dark:border-[#222]/50">
              <h1 className="text-3xl font-display font-extrabold tracking-tight text-stone-900 dark:text-white print:text-black uppercase">
                {personalInfo.name}
              </h1>
              <p className="text-indigo-600 dark:text-indigo-400 print:text-black/80 font-mono text-xs tracking-widest mt-1 uppercase font-bold">
                {personalInfo.title}
              </p>
              
              {/* Core Links & Contacts */}
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 mt-3 text-[11px] font-mono tracking-wider uppercase text-stone-500 print:text-black/60 dark:text-[#888]">
                <span className="flex items-center space-x-1 shrink-0">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-indigo-500 dark:text-indigo-400" />
                  <span>{personalInfo.location}</span>
                </span>
                <span className="flex items-center space-x-1 shrink-0">
                  <Phone className="w-3.5 h-3.5 shrink-0 text-indigo-500 dark:text-indigo-400" />
                  <span>{personalInfo.phone}</span>
                </span>
                <span className="flex items-center space-x-1 shrink-0">
                  <Mail className="w-3.5 h-3.5 shrink-0 text-indigo-500 dark:text-indigo-400" />
                  <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>
                </span>
                <span className="flex items-center space-x-1 shrink-0">
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 text-indigo-500 dark:text-indigo-400" />
                  <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                </span>
                <span className="flex items-center space-x-1 shrink-0">
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 text-indigo-500 dark:text-indigo-400" />
                  <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                </span>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="mt-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 print:text-black border-b border-stone-200 print:border-black/30 dark:border-[#222]/50 pb-1 font-mono">
                Professional Summary
              </h2>
              <p className="text-sm text-stone-605 dark:text-[#BBB] print:text-black/90 mt-2.5 leading-relaxed font-sans font-light text-justify">
                {personalInfo.summary}
              </p>
            </div>

            {/* Core Competencies */}
            <div className="mt-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 print:text-black border-b border-stone-200 print:border-black/30 dark:border-[#222]/50 pb-1 font-mono">
                Core Competencies
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-3 text-xs">
                {competencies.map((comp, idx) => (
                  <div key={idx} className="font-mono">
                    <strong className="text-stone-900 dark:text-stone-300 print:text-black">{comp.category}:</strong>
                    <span className="text-stone-500 dark:text-[#888] print:text-black/80 ml-1">
                      {comp.items.join(", ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Experience */}
            <div className="mt-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 print:text-black border-b border-stone-200 print:border-black/30 dark:border-[#222]/50 pb-1 font-mono">
                Professional Experience
              </h2>
              <div className="mt-3 space-y-5">
                {experiences.map((exp) => (
                  <div key={exp.id} className="space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between font-mono text-xs">
                      <div>
                        <strong className="text-sm text-stone-900 dark:text-white print:text-black font-sans">{exp.role}</strong>
                        <span className="text-indigo-600 dark:text-indigo-405 print:text-black/70 font-semibold ml-1">
                          | {exp.company}
                        </span>
                      </div>
                      <div className="text-stone-500 print:text-black/60 dark:text-[#888] text-right">
                        {exp.period} | {exp.location}
                      </div>
                    </div>
                    <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-stone-605 dark:text-[#BBB] print:text-black/80 leading-relaxed font-light">
                      {exp.bullets.map((b, bIdx) => (
                        <li key={bIdx}>
                          <strong className="text-stone-800 dark:text-stone-200 print:text-black font-semibold">{b.title}:</strong> {b.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Profile Block */}
            <div className="mt-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 print:text-black border-b border-stone-200 print:border-black/30 dark:border-[#222]/50 pb-1 font-mono">
                Education
              </h2>
              <div className="mt-3 text-xs">
                <div className="flex justify-between font-mono">
                  <div>
                    <strong className="text-stone-900 dark:text-white print:text-black">B.Sc. in Cyber Security</strong>
                    <span className="text-stone-500 print:text-black/70 ml-1">| Bayero University Kano</span>
                  </div>
                  <div className="text-stone-500 print:text-black/65">2018 – 2024 | Kano, Nigeria</div>
                </div>
                <div className="mt-2 text-stone-600 dark:text-stone-400 print:text-black/80 bg-stone-50 dark:bg-[#151515] print:bg-white p-3 rounded-none border border-stone-200 dark:border-[#222] print:border-none print:p-0">
                  <strong className="text-stone-800 dark:text-stone-200 print:text-black font-mono">Final Year Project: Implementation and Analysis of Cowrie Honeypot</strong>
                  <p className="mt-1 leading-relaxed font-sans font-light">
                    Deployed an SSH/Telnet decoy on Ubuntu to monitor attacks using Nmap, Medusa, and Metasploit. Programmed customized Python search logs filters, transforming automated brute-force hits into cohesive Tactics, Techniques, and Procedures reports.
                  </p>
                </div>
              </div>
            </div>

            {/* Certifications Block */}
            <div className="mt-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 print:text-black border-b border-stone-200 print:border-black/30 dark:border-[#222]/50 pb-1 font-mono">
                Certifications
              </h2>
              <ul className="list-disc list-inside mt-2.5 text-xs text-stone-605 dark:text-[#BBB] print:text-black/80 space-y-1 font-mono font-light">
                {certifications.map((cert, index) => (
                  <li key={index}>
                    <span className="font-bold text-stone-900 dark:text-stone-250 print:text-black">{cert.name}</span> — {cert.issuer}, {cert.year}
                  </li>
                ))}
              </ul>
            </div>

            {/* Awards & Activities Block */}
            <div className="mt-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 print:text-black border-b border-stone-200 print:border-black/30 dark:border-[#222]/50 pb-1 font-mono">
                Awards & Activities
              </h2>
              <ul className="list-disc list-inside mt-2 text-xs text-stone-605 dark:text-[#BBB] print:text-black/80 space-y-1 font-mono font-light">
                {awardsAndActivities.map((act, index) => (
                  <li key={index}>{act}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Modal instruction footer */}
        <div className="p-4 bg-stone-50 dark:bg-[#111] border-t border-stone-200 dark:border-[#222] text-center text-[10px] tracking-wider uppercase text-stone-400 font-mono shrink-0 select-none print:hidden">
          💡 For a neat resume download, click **Print / Save PDF** at the top right and select **"Save as PDF"** in your system printer destination.
        </div>

      </div>
    </div>
  );
}
