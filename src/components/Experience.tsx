import { useState } from "react";
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, Flag } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

export default function Experience() {
  const { experiences } = portfolioData;
  const [expandedId, setExpandedId] = useState<string | null>("exp1"); // Default expand first job
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Collect all unique tags for filter tabs
  const allTags = Array.from(
    new Set(experiences.flatMap((exp) => exp.tags))
  );

  const filteredExperiences = selectedTag
    ? experiences.filter((exp) => exp.tags.includes(selectedTag))
    : experiences;

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="py-20 bg-slate-50 dark:bg-[#02020a] border-b border-slate-200/50 dark:border-slate-900/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.3em] text-indigo-500 dark:text-indigo-400 mb-2 block font-mono font-bold">
              Career Timeline
            </span>
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
              Professional <span className="text-indigo-600 dark:text-indigo-400">Cybersecurity</span> Journey
            </h2>
            <p className="text-sm font-normal text-slate-500 dark:text-slate-450 mt-3 font-sans leading-relaxed">
              Hands-on enterprise roles covering web-application shield tunings, military perimeters, network log correlations, and local training programs.
            </p>
          </div>

          {/* Quick Filters */}
          <div className="mt-8 md:mt-0 flex flex-wrap gap-2 self-start md:self-end">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-lg text-[10px] uppercase tracking-wider font-mono font-bold border transition-all ${
                selectedTag === null
                  ? "bg-indigo-600 text-white border-transparent shadow-md"
                  : "bg-white dark:bg-[#060613]/90 text-slate-600 dark:text-slate-405 border-slate-200 dark:border-slate-800 hover:border-indigo-550/40"
              }`}
              id="tag-filter-all"
            >
              All Focus Areas
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-lg text-[10px] uppercase tracking-wider font-mono font-bold transition-all border ${
                  selectedTag === tag
                    ? "bg-indigo-600 text-white border-transparent shadow-md"
                    : "bg-white dark:bg-[#060613]/90 text-slate-600 dark:text-slate-405 border-slate-200 dark:border-slate-800 hover:border-indigo-550/40"
                }`}
                id={`tag-filter-${tag.replace(/\s+/g, '-').toLowerCase()}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Path Container */}
        <div className="relative border-l border-slate-200 dark:border-slate-800 ml-3 md:ml-6 pl-6 md:pl-10 space-y-10 py-2">
          {filteredExperiences.map((exp) => {
            const isExpanded = expandedId === exp.id;
            const isMilitary = exp.company.toLowerCase().includes("signal") || exp.company.toLowerCase().includes("military");

            return (
              <div key={exp.id} className="relative group transition-all" id={`experience-timeline-block-${exp.id}`}>
                {/* Timeline Dot icon */}
                <div 
                  className={`absolute -left-[41px] md:-left-[51px] top-1.5 w-8 h-8 rounded-lg flex items-center justify-center transition-all border ${
                    isExpanded 
                      ? "bg-indigo-600 text-white border-transparent shadow-md" 
                      : "bg-white dark:bg-[#060613]/90 text-slate-400 border-slate-200 dark:border-slate-800 group-hover:border-indigo-500 group-hover:text-indigo-500"
                  }`}
                >
                  {isMilitary ? <Flag className="w-3.5 h-3.5" /> : <Briefcase className="w-3.5 h-3.5" />}
                </div>

                {/* Main Card */}
                <div className={`p-6 border transition-all rounded-xl ${
                  isExpanded
                    ? "bg-white dark:bg-[#060613]/90 border-slate-300 dark:border-slate-800 shadow-lg scale-100 ring-1 ring-indigo-500/10"
                    : "bg-white/60 dark:bg-[#07071c]/55 backdrop-blur border-slate-200 dark:border-slate-900/60 shadow-sm hover:bg-white dark:hover:bg-slate-900/40 hover:border-indigo-500/35 rounded-xl"
                }`}>
                  {/* Card Header clickable to collapse/expand */}
                  <div 
                    onClick={() => toggleExpand(exp.id)}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none"
                    id={`experience-header-click-${exp.id}`}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl md:text-2xl font-display font-bold text-slate-850 dark:text-white">
                          {exp.role}
                        </h3>
                        <span className="px-3 py-0.5 rounded-lg text-[9px] uppercase tracking-widest font-mono bg-indigo-500/15 text-indigo-650 dark:text-indigo-400 border border-indigo-500/25 font-extrabold">
                          {exp.company}
                        </span>
                      </div>

                      {/* Meta links info */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-[11px] text-slate-500 dark:text-slate-405 font-mono tracking-wider uppercase">
                        <span className="flex items-center space-x-1.5 shrink-0">
                          <Calendar className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 shrink-0" />
                          <span>{exp.period}</span>
                        </span>
                        <span className="flex items-center space-x-1.5 shrink-0">
                          <MapPin className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 shrink-0" />
                          <span>{exp.location}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      {/* Expansion control button */}
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-800">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Bullet Responsibilities Block */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4" id={`experience-details-box-${exp.id}`}>
                      {exp.bullets.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start space-x-3 text-sm">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2" />
                          <div className="space-y-1">
                            <h4 className="font-bold text-slate-850 dark:text-slate-205 font-mono text-[11px] uppercase tracking-wider">
                              {b.title}
                            </h4>
                            <p className="text-slate-655 dark:text-slate-400 leading-relaxed font-sans font-normal">
                              {b.description}
                            </p>
                          </div>
                        </div>
                      ))}

                      {/* Display Experience Tags */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-105 dark:border-slate-800/60">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTag(tag);
                            }}
                            className={`px-3 py-1 text-[10px] uppercase tracking-wider font-mono rounded-lg cursor-pointer transition-colors ${
                              selectedTag === tag
                                ? "bg-indigo-650 text-white"
                                : "bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400"
                            }`}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
