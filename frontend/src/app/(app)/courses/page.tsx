"use client";
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Clock, Award } from "lucide-react";

const mockCourses = [
  { name: "Analog and Digital Electronics", prof: "Dr. Preeti R.", credits: 4, hours: 45, level: "Advanced" },
  { name: "Discrete Mathematics", prof: "Dr. Arun Kumar", credits: 4, hours: 60, level: "Intermediate" },
  { name: "Data Structures", prof: "Mr. Rizwan S.", credits: 3, hours: 40, level: "Core" },
  { name: "Computer Networks", prof: "Ms. Sarah Jones", credits: 3, hours: 40, level: "Standard" },
  { name: "Environmental Science", prof: "Dr. Meena L.", credits: 2, hours: 20, level: "Elective" },
];

export default function CoursesPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-24">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-[4rem] font-black tracking-tighter leading-none text-white italic" style={{ fontFamily: 'var(--font-epilogue)' }}>
          COURSES
        </h1>
        <p className="text-white/40 font-bold tracking-widest text-sm uppercase mt-2">
          Academic Module Inventory
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockCourses.map((course, idx) => (
          <motion.div 
            key={course.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="tectonic-plate p-10 bg-white/5 border-b-4 border-white/5 hover:border-primary/40 group transition-all"
          >
            <div className="flex justify-between items-start mb-8">
               <div className="p-4 rounded-3xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <BookOpen size={32} />
               </div>
               <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">{course.level} Module</span>
            </div>

            <div className="space-y-2 mb-10">
               <h3 className="text-3xl font-black text-white italic leading-tight group-hover:text-primary transition-colors">
                  {course.name}
               </h3>
               <p className="text-white/40 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                  <GraduationCap size={14} className="text-primary" />
                  Instructed by {course.prof}
               </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-surface-container-low p-4 rounded-2xl flex items-center gap-4">
                  <Award className="text-primary" size={24} />
                  <div>
                    <p className="text-[10px] font-black text-white/20 uppercase">Credits</p>
                    <p className="text-xl font-bold text-white">{course.credits}.0</p>
                  </div>
               </div>
               <div className="bg-surface-container-low p-4 rounded-2xl flex items-center gap-4">
                  <Clock className="text-primary" size={24} />
                  <div>
                    <p className="text-[10px] font-black text-white/20 uppercase">Total Hours</p>
                    <p className="text-xl font-bold text-white">{course.hours}H</p>
                  </div>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

