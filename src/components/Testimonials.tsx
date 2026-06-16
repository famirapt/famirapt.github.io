import { MessageSquare, Quote } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

export default function Testimonials() {
  const { testimonials } = portfolioData;

  return (
    <section id="testimonials" className="py-20 bg-slate-50 dark:bg-[#02020a] border-b border-slate-200/50 dark:border-slate-900/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-indigo-500 dark:text-indigo-400 mb-2 block font-mono font-bold">
            Endorsements
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            Peer & Academic <span className="text-indigo-600 dark:text-indigo-400">Recommendations</span>
          </h2>
          <p className="text-sm font-normal text-slate-500 dark:text-slate-450 mt-3 font-sans leading-relaxed max-w-xl mx-auto">
            Hear from leads, advisors, and team managers validating Rahmatu's systematic technical execution and collaborative drive.
          </p>
        </div>

        {/* Grid display layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="relative p-6 border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#060613]/85 backdrop-blur shadow-md shadow-indigo-500/5 hover:border-indigo-500/35 rounded-xl transition-all duration-300 flex flex-col justify-between"
              id={`testimonial-card-${test.id}`}
            >
              {/* Decorative Quote Icon */}
              <div className="absolute top-6 right-6 text-slate-100 dark:text-slate-800/40">
                <Quote className="w-8 h-8 rotate-180 opacity-30 text-indigo-500" />
              </div>

              {/* Text quotation */}
              <div className="relative z-10 flex-1 pr-6 mb-6">
                <p className="text-sm text-slate-655 dark:text-slate-300 leading-relaxed font-sans">
                  "{test.text}"
                </p>
              </div>

              {/* Avatar Metadata block */}
              <div className="flex items-center space-x-3 pt-5 border-t border-slate-105 dark:border-slate-800/80">
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-indigo-500/30 transition-transform duration-300">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="w-full h-full object-cover select-none"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-850 dark:text-white uppercase tracking-wider font-sans leading-none">
                    {test.name}
                  </h4>
                  <p className="text-[10px] font-bold text-purple-600 dark:text-purple-400 font-mono mt-1.5 leading-normal">
                    {test.role} at <span className="italic font-sans text-[11px] font-semibold text-slate-500 dark:text-slate-400">{test.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
