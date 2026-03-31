"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, User, ChevronLeft, ChevronRight } from "lucide-react";

const days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"];

import { useAppLayout } from "@/context/AppLayoutContext";

export default function TimetablePage() {
  const { academia } = useAppLayout();
  const effectiveSchedule = academia?.effectiveSchedule || {};
  const effectiveDayOrder = academia?.effectiveDayOrder || "1";
  
  const [selectedDay, setSelectedDay] = useState(`Day ${effectiveDayOrder}`);

  const getSessionsForDay = (day: string) => {
    const dayData = effectiveSchedule[day];
    if (!dayData) return [];

    const parseTime = (timeStr: string) => {
      const startTime = timeStr.split("-")[0].trim();
      let [hours, minutes] = startTime.split(":").map(Number);
      // Academic heuristic: 1-7 are likely PM sessions in 12h format
      if (hours >= 1 && hours <= 7) hours += 12;
      return hours * 60 + (minutes || 0);
    };
    
    return Object.entries(dayData).map(([time, details]: [string, any]) => ({
      time,
      subject: details.course || details.subject || "Unknown",
      room: details.room || "TBA",
      faculty: details.faculty || "TBA",
      type: details.type || "theory"
    })).sort((a, b) => parseTime(a.time) - parseTime(b.time));
  };

  const sessions = getSessionsForDay(selectedDay);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-24">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-end"
      >
        <div>
          <h1 className="text-[4rem] font-black tracking-tighter leading-none text-white italic" style={{ fontFamily: 'var(--font-epilogue)' }}>
            TIMETABLE
          </h1>
          <p className="text-white/40 font-bold tracking-widest text-sm uppercase mt-2">
            Sequential Academic Flow
          </p>
        </div>
      </motion.div>

      {/* Day Selector */}
      <div className="flex bg-white/5 p-2 rounded-[2rem] overflow-x-auto no-scrollbar gap-2 shadow-inner">
         {days.map((day) => (
           <button
             key={day}
             onClick={() => setSelectedDay(day)}
             className={`px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest transition-all whitespace-nowrap ${selectedDay === day ? "bg-primary text-background shadow-lg shadow-primary/20" : "text-white/40 hover:text-white"}`}
           >
             {day}
           </button>
         ))}
      </div>

      {/* Schedule Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
         {sessions.map((session, idx) => (
           <motion.div
             key={idx}
             initial={{ scale: 0.95, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ delay: idx * 0.1 }}
             className={`tectonic-plate p-8 flex flex-col justify-between border-t-4 ${session.type === 'lab' ? 'border-indigo-500 bg-indigo-500/5' : 'border-primary'}`}
           >
             <div className="flex justify-between items-start mb-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-widest">
                     <Clock size={14} />
                     {session.time}
                  </div>
                  <h3 className="text-3xl font-black text-white italic leading-tight">{session.subject}</h3>
                </div>
                {session.type === 'lab' && (
                  <span className="bg-indigo-500 text-white text-[10px] font-black tracking-tighter px-2 py-1 rounded">LAB</span>
                )}
             </div>

             <div className="space-y-3 pt-6 border-t border-white/5">
                <div className="flex items-center gap-3 text-white/60">
                   <MapPin size={18} className="text-primary" />
                   <span className="font-bold text-sm">{session.room}</span>
                </div>
                <div className="flex items-center gap-3 text-white/60">
                   <User size={18} className="text-primary" />
                   <span className="font-bold text-sm">{session.faculty}</span>
                </div>
             </div>
           </motion.div>
         ))}

         {sessions.length === 0 && (
           <div className="col-span-full h-64 tectonic-plate flex flex-col items-center justify-center text-center p-8 bg-white/5">
              <h2 className="text-3xl font-black text-white italic mb-2 uppercase">System Idle</h2>
              <p className="text-white/40 font-bold italic">No academic sequences detected for this sector.</p>
           </div>
         )}
      </div>
    </div>
  );
}

