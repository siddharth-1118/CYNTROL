"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CalendarClock, 
  MapPin, 
  Calendar,
  LayoutDashboard,
  TrendingUp,
  Sparkles
} from "lucide-react";
import { useAppLayout } from "@/context/AppLayoutContext";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { academia, userData } = useAppLayout();
  const { 
    effectiveSchedule, 
    overallAttendance, 
    overallMarks, 
    effectiveDayOrder, 
    timeStatus,
    sortedMarks,
    calendarData
  } = academia || {};

  const userName = userData?.profile?.name || "Student User";
  const firstName = userName.split(" ")[0];
  const initials = userName === "Student User" ? "RA" : userName.split(" ").map((n: any) => n[0]).join("").substring(0, 2).toUpperCase();

  // Marks calculation: Getted marks by total marks
  const activeMarks = (sortedMarks || []).filter((m: any) => !m.isNA);
  const totalGained = activeMarks.reduce((acc: number, m: any) => acc + (m.totalGot || 0), 0);
  const totalPossible = activeMarks.reduce((acc: number, m: any) => acc + (m.totalMax || 0), 0);

  // Helper to parse time for sorting (e.g., "08:00 - 08:50" -> 800)
  const parseTime = (timeStr: string) => {
    const startTime = timeStr.split("-")[0].trim();
    let [hours, minutes] = startTime.split(":").map(Number);
    // Academic heuristic: 1-7 are likely PM sessions in 12h format
    if (hours >= 1 && hours <= 7) hours += 12;
    return hours * 60 + (minutes || 0);
  };

  // Extract today's classes
  const dayKey = `Day ${effectiveDayOrder}`;
  const daySchedule = effectiveSchedule?.[dayKey] || {};
  const timeSlots = Object.keys(daySchedule).sort((a, b) => parseTime(a) - parseTime(b));
  const classes = timeSlots.map(time => ({
    time,
    ...daySchedule[time],
    isActive: timeStatus?.currentClass?.time === time
  }));

  // Find next operational day order for "Upcoming Classes"
  let upcomingDayOrder = "-";
  if (calendarData) {
    const todayStr = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const todayIdx = calendarData.findIndex((c: any) => c.date === todayStr);
    if (todayIdx !== -1) {
      for (let i = todayIdx + 1; i < calendarData.length; i++) {
        if (calendarData[i].order && calendarData[i].order !== "-" && !isNaN(parseInt(calendarData[i].order))) {
          upcomingDayOrder = calendarData[i].order;
          break;
        }
      }
    }
  }

  const upcomingKey = `Day ${upcomingDayOrder}`;
  const upcomingSchedule = effectiveSchedule?.[upcomingKey] || {};
  const upcomingSlots = Object.keys(upcomingSchedule).sort((a, b) => parseTime(a) - parseTime(b));
  const upcomingClasses = upcomingSlots.map(time => ({ time, ...upcomingSchedule[time] }));

  const isHoliday = classes.length === 0 || effectiveDayOrder === "0" || effectiveDayOrder === "-";

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="flex flex-col h-full bg-[#09090b] text-[#EDEDED] overflow-hidden">
      {/* 1. Page Header (Sticky Top Bar) */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#09090b]/80 backdrop-blur-md border-b border-white/10">
        <h1 className="text-xl font-bold tracking-tight">Dashboard</h1>
        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold shadow-lg border border-white/5 uppercase">
          {initials}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-10 pb-32">
        {/* 1. Welcome Section */}
        <section className="space-y-1">
           <motion.p 
             initial={{ opacity: 0, x: -10 }}
             animate={{ opacity: 1, x: 0 }}
             className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em]"
           >
             SYSTEM_ACCESS_GRANTED
           </motion.p>
           <motion.h2 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase"
           >
             Welcome back, {firstName}
           </motion.h2>
        </section>

        {/* 2. Stats Row (Attendance & Marks) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Attendance Card */}
          <div className="bg-zinc-900/40 p-6 rounded-[2.5rem] border border-white/5 relative group overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
               <CalendarClock size={16} className="text-emerald-400" />
               <p className="text-[10px] font-black text-[#8A8F98] uppercase tracking-[0.2em]">ATTENDANCE_OVERVIEW</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold text-white tracking-tighter">{overallAttendance || "0.0"}</span>
              <span className="text-white/40 text-lg font-bold">%</span>
            </div>
            <div className="mt-6 h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${overallAttendance || 0}%` }}
                className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
              />
            </div>
          </div>

          {/* Marks Card (Getted / Total) */}
          <div className="bg-zinc-900/40 p-6 rounded-[2.5rem] border border-white/5 relative group overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
               <TrendingUp size={16} className="text-indigo-400" />
               <p className="text-[10px] font-black text-[#8A8F98] uppercase tracking-[0.2em]">MARKS_YIELD</p>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-white tracking-tighter">{Math.round(totalGained)}</span>
              <span className="text-white/20 text-2xl font-bold italic">/ {totalPossible}</span>
            </div>
            <p className="text-[10px] text-white/40 font-bold uppercase mt-4 tracking-widest italic opacity-40">Cumulative Performance Index</p>
          </div>
        </section>

        {/* 3. Today's Protocol (Classes) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
               <div className="w-1.5 h-6 bg-cyan-400 rounded-full" />
               <h2 className="text-xl font-bold tracking-tight">Today's Protocol</h2>
            </div>
            <span className="text-[10px] font-black text-[#8A8F98] uppercase tracking-widest opacity-50 px-3 py-1 bg-white/5 rounded-full">Day {effectiveDayOrder || "-"}</span>
          </div>

          {isHoliday ? (
            <div className="bg-zinc-900/10 rounded-[3rem] border border-dashed border-white/10 p-12 text-center flex flex-col items-center gap-4">
               <Sparkles size={32} className="text-zinc-600 animate-pulse" />
               <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Operational Holiday</p>
            </div>
          ) : (
            <div className="relative pl-6 space-y-8">
              <div className="absolute left-[-1px] top-4 bottom-4 w-[1px] bg-white/10" />
              {classes.map((cls, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative grid grid-cols-[70px_1fr] gap-6 group"
                >
                  <div className="flex flex-col pt-1">
                     <span className="text-xs font-bold text-white">{cls.time.split("-")[0]}</span>
                     <span className="text-[9px] font-bold text-[#8A8F98] uppercase opacity-40">{cls.time.split("-")[1]}</span>
                  </div>
                  {/* Indicator */}
                  <div className={cn(
                    "absolute left-[-5.5px] top-2.5 w-2.5 h-2.5 rounded-full border border-[#09090b] z-10 transition-all",
                    cls.isActive ? "bg-cyan-400 shadow-[0_0_10px_#22d3ee] scale-125" : "bg-white/20"
                  )} />
                  {/* Card */}
                  <div className={cn(
                    "bg-[#121315] p-5 rounded-[2rem] border border-white/5 group-hover:border-white/10 transition-all",
                    cls.isActive && "ring-1 ring-cyan-400/30 bg-zinc-900/60"
                  )}>
                    <div className="flex justify-between items-start">
                       <h4 className={cn("text-lg font-bold leading-tight", cls.isActive ? "text-cyan-400" : "text-white")}>{cls.course}</h4>
                       <span className="text-[9px] font-black uppercase tracking-widest text-[#8A8F98] opacity-30">{cls.room}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* 4. Upcoming Classes Section */}
        {upcomingClasses.length > 0 && (
          <section className="space-y-6 pt-6">
            <div className="flex items-center gap-3 px-2">
               <div className="w-1.5 h-6 bg-indigo-500/50 rounded-full" />
               <h2 className="text-xl font-bold tracking-tight">Upcoming Engagement</h2>
               <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-auto">Day {upcomingDayOrder}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingClasses.slice(0, 4).map((cls, idx) => (
                <div key={idx} className="bg-zinc-950 p-4 rounded-2xl border border-white/5 flex flex-col justify-between h-32 hover:bg-zinc-900 transition-colors">
                   <p className="text-[9px] font-black text-[#8A8F98] uppercase tracking-widest opacity-40">{cls.time}</p>
                   <p className="text-sm font-bold text-white line-clamp-2 leading-snug">{cls.course}</p>
                   <div className="flex items-center gap-2 mt-2">
                      <MapPin size={10} className="text-[#8A8F98]" />
                      <span className="text-[10px] font-bold text-[#8A8F98] uppercase tracking-tighter">{cls.room}</span>
                   </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

