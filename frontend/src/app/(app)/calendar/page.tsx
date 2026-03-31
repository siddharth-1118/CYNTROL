"use client";
import React from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, MapPin, Flag, Zap } from "lucide-react";

const academicEvents = [
  { date: "04 Apr 2026", event: "Good Friday", type: "Holiday", color: "text-white/40" },
  { date: "14 Apr 2026", event: "Tamil New Year", type: "Holiday", color: "text-white/40" },
  { date: "20 Apr 2026", event: "CLA-2 Assessment", type: "Exam", color: "text-primary" },
  { date: "25 Apr 2026", event: "Project Phase-II Submission", type: "Deadline", color: "text-indigo-400" },
];

export default function CalendarPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-24">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-[4rem] font-black tracking-tighter leading-none text-white italic" style={{ fontFamily: 'var(--font-epilogue)' }}>
          CALENDAR
        </h1>
        <p className="text-white/40 font-bold tracking-widest text-sm uppercase mt-2">
          Academic Temporal Matrix
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {academicEvents.map((event, idx) => (
           <motion.div 
             key={event.date}
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: idx * 0.1 }}
             className="tectonic-plate p-8 bg-white/5 border-t-4 border-white/5 hover:border-primary transition-all flex flex-col justify-between aspect-square"
           >
              <div className="space-y-1">
                 <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">{event.type}</p>
                 <h2 className="text-3xl font-black text-white italic leading-tight">{event.date.split(' ')[0]}</h2>
                 <p className="text-white/60 font-bold text-sm uppercase tracking-tight">{event.date.split(' ').slice(1).join(' ')}</p>
              </div>

              <div className="space-y-4">
                 <p className={`text-xl font-black italic tracking-tighter ${event.color}`}>{event.event}</p>
                 <div className="flex items-center gap-2 text-white/20">
                    <MapPin size={12} />
                    <span className="text-[10px] font-bold uppercase">Main Campus</span>
                 </div>
              </div>
           </motion.div>
         ))}
      </div>

      <div className="tectonic-plate p-10 bg-obsidian border-l-8 border-indigo-500 overflow-hidden relative">
         <div className="absolute top-0 right-0 p-12 opacity-5 scale-150">
            <Flag size={120} className="text-indigo-400" />
         </div>
         <div className="relative z-10 max-w-2xl">
            <h3 className="text-3xl font-black text-white uppercase italic mb-4">Tactical Forecast</h3>
            <p className="text-white/60 font-bold text-lg leading-relaxed">
               System projection indicates a high concentration of <span className="text-indigo-400 italic font-black">Examination Protocols</span> in the final quadrant of April. Advance preparation is mandated.
            </p>
            <div className="mt-8 flex items-center gap-4">
               <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/40 text-xs font-black uppercase tracking-widest">34 Days Remaining</div>
               <Zap className="text-primary animate-pulse" size={20} />
            </div>
         </div>
      </div>
    </div>
  );
}

