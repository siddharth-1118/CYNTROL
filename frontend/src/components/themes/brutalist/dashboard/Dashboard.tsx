"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, animate } from "framer-motion";
import {
  Loader,
  Calendar,
  Clock,
  MapPin,
  GraduationCap
} from "lucide-react";
import { StudentProfile, AttendanceRecord, ScheduleData, ScheduleSlot } from "@/types";

const ScoreCounter = ({ value, isPercentage = true }: { value: number, isPercentage?: boolean }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const prevValue = useRef(0);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const numericValue = value;
    if (isNaN(numericValue)) return;
    
    const controls = animate(prevValue.current, numericValue, {
      duration: 0.8,
      ease: "circOut",
      onUpdate: (v) => {
        node.textContent = Math.round(v).toString() + (isPercentage ? "%" : "");
      },
    });
    prevValue.current = numericValue;
    return () => controls.stop();
  }, [value, isPercentage]);

  return <span ref={nodeRef} />;
};

interface HomeDashboardProps {
  onProfileClick: () => void;
  profile?: StudentProfile;
  attendance?: AttendanceRecord[];
  displayName?: string;
  timeStatus?: {
    nextClass: any;
    currentClass: any;
  };
  upcomingAlerts?: any[];
  calendarData?: any[];
  overallAttendance?: number;
  criticalAttendance?: any[];
  overallMarks?: number;
  recentMarks?: any[];
  effectiveDayOrder?: string;
  effectiveSchedule?: ScheduleData;
  onRefresh?: () => Promise<void>;
  isRefreshing?: boolean;
}

const parseTimeValues = (timeStr: string): number => {
  if (!timeStr) return 0;
  const cleanStr = timeStr.replace(/[^\d:]/g, "");
  let [h, m] = cleanStr.split(":").map(Number);
  if (isNaN(h) || isNaN(m)) return 0;
  if (h < 7) h += 12;
  return h * 60 + m;
};

const getSortedClasses = (daySchedule: Record<string, ScheduleSlot> | undefined) => {
  if (!daySchedule) return [];
  return Object.entries(daySchedule)
    .map(([timeRange, details]) => {
      const [startStr] = timeRange.split(" - ");
      return {
        ...details,
        time: timeRange,
        startMinutes: parseTimeValues(startStr),
      };
    })
    .sort((a, b) => a.startMinutes - b.startMinutes);
};

export default function HomeDashboard({
  onProfileClick,
  profile,
  displayName,
  timeStatus,
  overallAttendance = 0,
  overallMarks = 0,
  effectiveDayOrder,
  effectiveSchedule,
  calendarData = [],
  onRefresh,
  isRefreshing: isParentRefreshing,
}: HomeDashboardProps) {
  const router = useRouter();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [pullY, setPullY] = useState(0);
  const [isLocalRefreshing, setIsLocalRefreshing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const startX = useRef(0);

  const isRefreshing = isLocalRefreshing || isParentRefreshing;

  const studentName = displayName || (profile?.name ? profile.name.split(" ")[0] : "Student");

  const todayClassesObj = effectiveSchedule && effectiveDayOrder && effectiveDayOrder !== "-" 
    ? effectiveSchedule[`Day ${effectiveDayOrder}`] 
    : undefined;
    
  const todayClasses = getSortedClasses(todayClassesObj);
  const hasClassesToday = todayClasses.length > 0;

  let upcomingDayOrder = "-";
  if (calendarData && calendarData.length > 0) {
    const todayDateStr = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).replace(/ /g, " "); // Ensure spacing matches standard en-GB
    
    const todayIdx = calendarData.findIndex(item => item.date === todayDateStr);
    if (todayIdx !== -1) {
      for (let i = todayIdx + 1; i < calendarData.length; i++) {
        const order = calendarData[i].order;
        if (order && order !== "-" && !isNaN(parseInt(order, 10))) {
          upcomingDayOrder = order;
          break;
        }
      }
    }
  }
  
  // Fallback calculation if calendar fails to supply an upcoming day order
  if (upcomingDayOrder === "-" && effectiveDayOrder && effectiveDayOrder !== "-") {
    const orderNum = parseInt(effectiveDayOrder, 10);
    if (!isNaN(orderNum)) upcomingDayOrder = (orderNum % 5) + 1 + "";
  }

  const upcomingClassesObj = effectiveSchedule && upcomingDayOrder !== "-" 
    ? effectiveSchedule[`Day ${upcomingDayOrder}`] 
    : undefined;
    
  const upcomingClasses = getSortedClasses(upcomingClassesObj);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (containerRef.current && containerRef.current.scrollTop <= 0) {
      startY.current = e.touches[0].clientY;
      startX.current = e.touches[0].clientX;
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const currentX = e.touches[0].clientX;
    const diffY = currentY - startY.current;
    const diffX = currentX - startX.current;

    if (Math.abs(diffX) > Math.abs(diffY)) return;

    if (
      containerRef.current &&
      containerRef.current.scrollTop <= 0 &&
      diffY > 0 &&
      !isRefreshing
    ) {
      if (diffY < 200) {
        if (e.cancelable) e.preventDefault();
      }
      setPullY(Math.pow(diffY, 0.8));
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (pullY > 80) {
      setIsLocalRefreshing(true);
      setPullY(80);
      if (typeof window !== "undefined" && navigator.vibrate) navigator.vibrate(20);

      if (onRefresh) {
        onRefresh().finally(() => {
          setIsLocalRefreshing(false);
          setPullY(0);
        });
      } else {
        setTimeout(() => {
          window.location.reload();
        }, 800);
      }
    } else {
      setPullY(0);
    }
  };

  const ClassCard = ({ cls, isCurrent }: { cls: any, isCurrent?: boolean }) => (
    <div className={`flex flex-col p-5 rounded-[1.5rem] mb-4 relative overflow-hidden transition-all ${isCurrent ? 'bg-primary/20 backdrop-blur-md' : 'bg-surface-container-low'}`}>
      {isCurrent && (
         <div className="absolute top-0 right-0 w-24 h-24 bg-primary rounded-full blur-[40px] opacity-30 -mr-10 -mt-10" />
      )}
      <div className="flex justify-between items-start mb-2 relative z-10">
        <h3 className="font-bold text-[18px] text-white leading-tight" style={{ fontFamily: "var(--font-jakarta)" }}>
          {cls.course}
        </h3>
        {cls.type === "lab" && (
          <span className="bg-surface-container-highest text-white/80 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md ml-2 shrink-0">
            Lab
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-2 text-[12px] font-bold text-white/60 tracking-wide mt-2 relative z-10" style={{ fontFamily: "var(--font-jakarta)" }}>
        <div className="flex items-center gap-1.5 bg-surface-container-highest/50 px-2.5 py-1.5 rounded-lg">
          <Clock size={14} className="text-theme-primary" />
          {cls.time}
        </div>
        <div className="flex items-center gap-1.5 bg-surface-container-highest/50 px-2.5 py-1.5 rounded-lg">
          <MapPin size={14} className="text-theme-primary" />
          {cls.room}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full w-full bg-background relative overflow-hidden text-theme-text font-body">
      {/* Background Liquid Glow */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-tertiary-container/30 blur-[150px] rounded-full pointer-events-none z-0" />
      
      <div
        className="absolute top-0 left-0 w-full flex justify-center pt-8 z-20 transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: Math.min(pullY / 60, 1),
          transform: `translateY(${pullY * 0.3}px)`,
        }}
      >
        <Loader
          className="w-8 h-8 text-primary"
          style={{
            animation: isRefreshing ? "spin 1s linear infinite" : "none",
            transform: `rotate(${pullY * 2}deg)`,
          }}
        />
      </div>

      <div
        ref={containerRef}
        className="h-full w-full relative z-10 overflow-y-auto no-scrollbar flex flex-col p-6 pb-32"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          animate={{ y: pullY }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex flex-col w-full"
        >
          {/* Header Row */}
          <div className="flex justify-between items-center w-full mb-8 pt-4">
            <span className="text-xl font-black lowercase tracking-tight text-white" style={{ fontFamily: "var(--font-epilogue)" }}>
              CYNTROL
            </span>
            <button
              onClick={onProfileClick}
              className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 bg-surface-container-highest hover:border-primary transition-colors"
            >
              <img src="/image.png" className="object-cover w-full h-full" alt="Profile" />
            </button>
          </div>

          {/* Welcome & Stats Section */}
          <div className="flex flex-col gap-6 mb-12">
            <h1 className="text-[3.5rem] leading-[1] font-black text-white tracking-tighter" style={{ fontFamily: "var(--font-epilogue)" }}>
              welcome,<br/>
              <span className="text-primary">{studentName}</span>
            </h1>

            <div className="grid grid-cols-2 gap-4 w-full">
              {/* Attendance Card */}
              <div className="bg-surface-container-low p-6 rounded-[1.5rem] flex flex-col justify-between border-b-2 border-primary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[30px] -mr-10 -mt-10 pointer-events-none" />
                <span className="text-[14px] font-bold text-white/50 lowercase tracking-widest mb-4">attendance</span>
                <span className="text-[3rem] font-black text-white leading-none tracking-tighter" style={{ fontFamily: "var(--font-epilogue)" }}>
                  <ScoreCounter value={overallAttendance} />
                </span>
              </div>

              {/* Marks Card */}
              <div className="bg-surface-container-low p-6 rounded-[1.5rem] flex flex-col justify-between border-b-2 border-secondary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-[30px] -mr-10 -mt-10 pointer-events-none" />
                <span className="text-[14px] font-bold text-white/50 lowercase tracking-widest mb-4">marks</span>
                <span className="text-[3rem] font-black text-white leading-none tracking-tighter" style={{ fontFamily: "var(--font-epilogue)" }}>
                  <ScoreCounter value={overallMarks} />
                </span>
              </div>
            </div>
          </div>

          {/* Today's Classes */}
          <div className="mb-12">
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-[2rem] font-black text-white leading-none tracking-tight" style={{ fontFamily: "var(--font-epilogue)" }}>
                today
              </h2>
              {hasClassesToday && effectiveDayOrder !== "-" && (
                <span className="text-[12px] font-bold text-white/40 uppercase tracking-widest bg-surface-container-high px-3 py-1.5 rounded-full">
                  Day {effectiveDayOrder}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              {!hasClassesToday ? (
                <div className="bg-surface-container-lowest p-8 flex flex-col items-center justify-center text-center rounded-[1.5rem] border border-outline-variant/15">
                  <span className="text-[1.5rem] font-black text-primary mb-2" style={{ fontFamily: "var(--font-epilogue)" }}>
                    enjoy the holiday
                  </span>
                  <span className="text-[14px] font-bold text-white/50">No classes scheduled for today.</span>
                </div>
              ) : (
                todayClasses.map((cls, i) => {
                  const isCurrent = timeStatus?.currentClass?.course === cls.course && timeStatus?.currentClass?.time === cls.time;
                  return <ClassCard key={i} cls={cls} isCurrent={isCurrent} />;
                })
              )}
            </div>
          </div>

          {/* Upcoming Classes */}
          <div className="mb-8">
             <div className="flex items-end justify-between mb-6">
              <h2 className="text-[2rem] font-black text-white leading-none tracking-tight" style={{ fontFamily: "var(--font-epilogue)" }}>
                upcoming
              </h2>
              {upcomingDayOrder !== "-" && (
                <span className="text-[12px] font-bold text-white/40 uppercase tracking-widest bg-surface-container-high px-3 py-1.5 rounded-full">
                  Day {upcomingDayOrder}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              {upcomingClasses.length === 0 ? (
                <div className="bg-surface-container-lowest p-6 flex flex-col items-center justify-center text-center rounded-[1.5rem] border border-outline-variant/15">
                  <span className="text-[14px] font-bold text-white/50">No classes scheduled for upcoming day.</span>
                </div>
              ) : (
                upcomingClasses.map((cls, i) => (
                  <ClassCard key={i} cls={cls} />
                ))
              )}
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

