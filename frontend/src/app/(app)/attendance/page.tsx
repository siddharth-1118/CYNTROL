"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  CalendarClock, 
  ChevronRight,
  Info 
} from "lucide-react";

import { useAppLayout } from "@/context/AppLayoutContext";

export default function AttendancePage() {
  const { userData } = useAppLayout();
  const attendance = userData?.attendance || [];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-24">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-[4rem] font-black tracking-tighter leading-none text-white italic" style={{ fontFamily: 'var(--font-epilogue)' }}>
          ATTENDANCE
        </h1>
        <p className="text-white/40 font-bold tracking-widest text-sm uppercase mt-2">
          Academic Compliance Status
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6">
        {attendance.map((subject: any, idx: number) => {
          const present = subject.conducted - subject.absent;
          const percent = subject.conducted === 0 ? 0 : (present / subject.conducted) * 100;
          const safeToBunk = Math.floor((subject.conducted * 0.25) - subject.absent);
          const course = subject.course || subject.title || "Subject";
          const code = subject.code || "";
          
          return (
            <motion.div 
              key={idx}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="tectonic-plate p-6 group hover:bg-white/5 border-l-4 border-primary transition-all relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                <div className="space-y-1 flex-1">
                  {code && <p className="text-primary font-black text-xs tracking-widest uppercase">{code}</p>}
                  <h3 className="text-2xl font-black text-white italic">{course}</h3>
                  <p className="text-white/40 text-sm font-bold">{subject.conducted} Sessions Conducted</p>
                </div>

                <div className="flex items-center gap-8">
                   <div className="text-right">
                      <p className="text-white/20 text-[10px] font-black tracking-widest uppercase">Safe to Bunk</p>
                      <p className={`text-2xl font-black ${safeToBunk > 0 ? "text-primary" : "text-white/40"}`}>
                        {safeToBunk > 0 ? `${safeToBunk} Classes` : "NO MARGIN"}
                      </p>
                   </div>
                   
                   <div className="relative w-20 h-20">
                      <svg className="w-full h-full transform -rotate-90">
                         <circle
                            cx="40"
                            cy="40"
                            r="36"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-white/5"
                          />
                          <motion.circle
                             initial={{ strokeDasharray: "0 226" }}
                             animate={{ strokeDasharray: `${(percent / 100) * 226} 226` }}
                             transition={{ duration: 1, ease: "circOut" }}
                             cx="40"
                             cy="40"
                             r="36"
                             stroke="currentColor"
                             strokeWidth="8"
                             strokeLinecap="round"
                             fill="transparent"
                             className="text-primary"
                          />
                       </svg>
                       <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[14px] font-black text-white">{Math.round(percent)}%</span>
                       </div>
                    </div>
 
                    <ChevronRight className="text-white/10 group-hover:text-primary transition-colors" />
                 </div>
               </div>
 
               {/* Progress Bar Background */}
               <div className="mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${percent}%` }}
                     className="h-full bg-primary/40 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                  />
               </div>
             </motion.div>
           );
         })}
       </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="tectonic-plate p-6 bg-primary/5 border border-primary/20 flex items-start gap-4"
      >
        <Info className="text-primary shrink-0" />
        <p className="text-sm text-white/60 leading-relaxed italic font-bold">
          The <span className="text-primary">"Safe to Bunk"</span> metric assumes a 75% minimum requirement. Calculations are predictive based on current sessions conducted and may fluctuate as more classes are registered.
        </p>
      </motion.div>
    </div>
  );
}

