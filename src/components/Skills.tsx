import { useState } from "react";
import { Terminal, Lightbulb, Search, Code, ShieldAlert, Cpu } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

export default function Skills() {
  const { competencies } = portfolioData;
  const [searchTerm, setSearchTerm] = useState("");

  const getIcon = (category: string) => {
    switch (category) {
      case "SIEM & Log Analysis":
        return <Terminal className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />;
      case "Threat Detection":
        return <ShieldAlert className="w-4 h-4 text-purple-500 dark:text-purple-400" />;
      case "Network & Perimeter":
        return <Cpu className="w-4 h-4 text-pink-500 dark:text-pink-450" />;
      default:
        return <Lightbulb className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />;
    }
  };

  const filteredCompetencies = competencies.map(comp => {
    const matchedItems = comp.items.filter(item => 
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return {
      ...comp,
      matchedItems,
      hasMatch: matchedItems.length > 0
    };
  });

  return (
    <section id="skills" className="py-20 bg-slate-50 dark:bg-[#02020a] border-b border-slate-200/50 dark:border-slate-900/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-indigo-500 dark:text-indigo-400 mb-2 font-mono font-bold">
            Professional Stack
          </h2>
          <p className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            Security Core <span className="text-indigo-600 dark:text-indigo-400">Competencies</span>
          </p>
          <p className="text-sm font-normal text-slate-500 dark:text-slate-450 mt-3 font-sans leading-relaxed max-w-xl mx-auto">
            Trained and experienced in multi-tenant triages, live packet captures, cloud postures, and infrastructure protection.
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search skill (e.g. ELK, WAF, Python, AWS)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#060613]/90 text-slate-900 dark:text-slate-100 placeholder-slate-400 hover:border-slate-300 dark:hover:border-slate-705 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono transition-all"
              id="skill-search"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-mono uppercase tracking-wider font-bold"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Skill Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCompetencies.map((comp, idx) => {
            const isSearching = searchTerm.trim() !== "";
            const isCategoryMatched = comp.category.toLowerCase().includes(searchTerm.toLowerCase());
            
            // If searching and nothing matches in this card, or if it doesn't match the category/items, fade it
            const shouldHighlight = isSearching ? (isCategoryMatched || comp.hasMatch) : true;
            
            return (
              <div
                key={idx}
                className={`flex flex-col p-6 border transition-all duration-300 ${
                  shouldHighlight 
                    ? "bg-white dark:bg-[#060613]/85 backdrop-blur border-slate-200 dark:border-slate-800/80 shadow-md shadow-indigo-500/5 hover:border-indigo-500/30 rounded-xl opacity-100" 
                    : "border-slate-200/40 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-950/20 opacity-30 shadow-none pointer-events-none rounded-xl"
                }`}
                id={`skill-card-${idx}`}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2.5 bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-indigo-500 rounded-lg shadow-inner">
                    {getIcon(comp.category)}
                  </div>
                  <h3 className="font-display font-bold text-base text-slate-850 dark:text-slate-200">
                    {comp.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {comp.items.map((item, itemIdx) => {
                    const isItemMatched = isSearching && item.toLowerCase().includes(searchTerm.toLowerCase());
                    return (
                      <span
                        key={itemIdx}
                        className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-mono rounded-lg border transition-all ${
                          isItemMatched
                            ? "bg-indigo-500/10 text-indigo-505 dark:text-indigo-400 border-indigo-500/30 font-extrabold scale-102 shadow-[0_0_12px_rgba(99,102,241,0.15)]"
                            : "bg-slate-50 dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800/70 hover:text-indigo-550 dark:hover:text-indigo-455 hover:border-indigo-500/30"
                        }`}
                      >
                        {item}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight footer */}
        <div className="mt-12 p-4 border border-dashed border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-[#07071c]/40 text-center text-[10px] text-slate-500 dark:text-slate-400 tracking-widest uppercase font-mono rounded-lg">
          ✦ SECURITY AUDITS • THREAT INTELLIGENCE REPORTS • INCIDENT CHECKLISTS • PERIMETER DEFENSE LAYERS ✦
        </div>

      </div>
    </section>
  );
}
