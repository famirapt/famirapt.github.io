import { useState } from "react";
import { Terminal as TerminalIcon, AlertTriangle, Shield, CheckCircle, ExternalLink, Award, Sparkles, X } from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import { Project } from "../types";
import { HoneypotDemo, SIEMDemo, WAFDemo } from "./ProjectDemos";

export default function Projects() {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const renderSandboxDemo = (project: Project, onClose: () => void) => {
    switch (project.demoType) {
      case "honeypot":
        return <HoneypotDemo onClose={onClose} />;
      case "siem":
        return <SIEMDemo onClose={onClose} />;
      case "waf":
        return <WAFDemo onClose={onClose} />;
      default:
        return (
          <div className="p-8 text-center bg-slate-950 rounded-lg">
            <p className="text-sm font-mono text-slate-400">Sandbox config is missing for this project.</p>
            <button onClick={onClose} className="mt-4 px-4 py-2 bg-indigo-650 rounded font-bold text-xs text-white uppercase">Close</button>
          </div>
        );
    }
  };

  return (
    <section id="projects" className="py-20 bg-slate-50 dark:bg-[#02020a] border-b border-slate-200/50 dark:border-slate-900/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-indigo-505 dark:text-indigo-400 mb-2 block font-mono font-bold">
            Crafted Threat Labs
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            Key Defense Projects & <span className="text-indigo-650 dark:text-indigo-400">Cyber Sandboxes</span>
          </h2>
          <p className="text-sm font-normal text-slate-500 dark:text-slate-450 mt-3 font-sans leading-relaxed max-w-xl mx-auto">
            Explore interactive live mockups simulating full-stack threat triages, honeypot log decodes, and perimeter payload blocks. Click **"Launch Demo Terminal"** on any project to interact.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col h-full bg-white dark:bg-[#060613]/85 backdrop-blur overflow-hidden border border-slate-200 dark:border-slate-800/80 hover:border-indigo-500/40 shadow-md shadow-indigo-505/5 hover:shadow-lg rounded-xl transition-all duration-300 transform hover:-translate-y-1"
              id="project-card"
            >
              {/* Cover Thumbnail (Clickable) */}
              <div 
                className="relative h-48 sm:h-52 overflow-hidden bg-slate-100 dark:bg-slate-900/45 cursor-pointer"
                onClick={() => setSelectedProject(project)}
                id={`project-card-image-${project.id}`}
              >
                <img
                  src={project.imagePath}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 select-none contrast-[1.05]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay Play Indicator */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-mono font-bold text-[10px] uppercase tracking-wider flex items-center space-x-1.5 shadow-lg shadow-indigo-600/25">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    <span>Open Interactive Lab</span>
                  </div>
                </div>

                {/* Left Floating Category Tag */}
                <div className="absolute top-3 left-3 px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest bg-slate-950/90 text-indigo-400 border border-indigo-500/30 font-bold shadow rounded-md">
                  {project.demoType === "honeypot" ? "Log Parser" : project.demoType === "siem" ? "SIEM Dashboard" : "WAF Rules"}
                </div>
              </div>

              {/* Information body */}
              <div className="flex-1 p-6 flex flex-col">
                <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-[10px] tracking-wider font-bold uppercase text-purple-600 dark:text-purple-400 mt-1 mb-4 font-mono">
                  {project.subtitle}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans font-normal flex-1">
                  {project.description}
                </p>

                {/* Project Tech stack tag pills */}
                <div className="flex flex-wrap gap-1.5 pt-4 pb-5 border-b border-slate-100 dark:border-slate-800/80">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-[9px] uppercase tracking-wider font-mono bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800/60"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="px-1.5 py-0.5 text-[9px] font-mono text-slate-400 font-bold">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>

                {/* Primary cta button to launch sandbox */}
                <button
                  onClick={() => setSelectedProject(project)}
                  className="mt-5 w-full flex items-center justify-center space-x-2 py-3 px-4 text-[10px] font-bold font-mono tracking-widest uppercase bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500/10 dark:hover:bg-indigo-500 dark:text-indigo-400 dark:hover:text-white border border-indigo-500/25 rounded-lg transition-all pointer-events-auto cursor-pointer shadow-md shadow-indigo-500/5 text-center"
                  id={`project-btn-${project.id}`}
                >
                  <TerminalIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>Launch Demo Terminal</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Overlay for Interactive Lab */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 overflow-y-auto px-4 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm transition-opacity" id="project-lab-modal">
            <div className="relative w-full max-w-4xl bg-[#030014] overflow-hidden border border-slate-800 shadow-2xl rounded-xl pt-2 animate-in zoom-in duration-200">
              
              {/* Modal Close icon */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-805"
                aria-label="Close modal"
                id="close-lab-modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Informative Header / Description */}
              <div className="px-6 py-5 border-b border-slate-800 bg-slate-950/70 pr-12">
                <span className="text-[9px] uppercase font-mono text-indigo-400 tracking-widest font-semibold block mb-1">
                  Interactive Security Lab • Sandbox Environment
                </span>
                <h3 className="text-2xl font-display font-bold text-white">
                  {selectedProject.title}
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-3 leading-relaxed font-normal">
                  {selectedProject.longDescription}
                </p>
              </div>

              {/* Mounted Sandbox Shell */}
              <div className="p-6 bg-[#030014] select-none">
                {renderSandboxDemo(selectedProject, () => setSelectedProject(null))}
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
