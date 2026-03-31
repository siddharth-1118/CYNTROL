"use client";
import React from "react";
import { motion } from "framer-motion";
import { Code2, Github, ExternalLink, Users2, Layers } from "lucide-react";

const mockProjects = [
  { name: "Verge AI Infrastructure", tech: ["Next.js", "Python", "GPT-4"], status: "In Progress", color: "text-primary" },
  { name: "Nordic Cyan Design System", tech: ["Tailwind", "Framer Motion"], status: "Completed", color: "text-indigo-400" },
  { name: "CYNTROL Mobile Sync", tech: ["React Native", "Go"], status: "Planning", color: "text-white/40" },
];

export default function ProjectsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-24">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-[4rem] font-black tracking-tighter leading-none text-white italic" style={{ fontFamily: 'var(--font-epilogue)' }}>
          PROJECTS
        </h1>
        <p className="text-white/40 font-bold tracking-widest text-sm uppercase mt-2">
          Technical Initiative Portfolio
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {mockProjects.map((project, idx) => (
          <motion.div 
            key={project.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={`tectonic-plate p-10 bg-white/5 border-b-4 border-white/10 group hover:border-primary transition-all aspect-[4/5] flex flex-col justify-between`}
          >
             <div className="flex justify-between items-start">
                <div className={`p-4 rounded-2xl bg-white/5 ${project.color}`}>
                   <Layers size={32} />
                </div>
                <div className="flex gap-4">
                   <Github size={20} className="text-white/20 hover:text-white cursor-pointer" />
                   <ExternalLink size={20} className="text-white/20 hover:text-white cursor-pointer" />
                </div>
             </div>

             <div className="space-y-4">
                <p className={`text-[10px] font-black uppercase tracking-widest ${project.color}`}>{project.status}</p>
                <h3 className="text-3xl font-black text-white italic leading-tight">{project.name}</h3>
                <div className="flex flex-wrap gap-2">
                   {project.tech.map(t => (
                     <span key={t} className="px-3 py-1 rounded-full bg-white/5 text-white/40 text-[10px] font-bold uppercase">{t}</span>
                   ))}
                </div>
             </div>

             <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="flex -space-x-3">
                   {[1,2].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full bg-surface-container-high border-2 border-background" />
                   ))}
                   <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-[10px] text-primary font-black">+2</div>
                </div>
                <Users2 size={16} className="text-white/20" />
             </div>
          </motion.div>
        ))}
        
        {/* Add New Card */}
        <div className="tectonic-plate p-10 bg-primary/5 border border-dashed border-primary/20 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-primary/10 transition-all border-b-4 aspect-[4/5]">
           <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Code2 size={32} />
           </div>
           <p className="text-white font-black italic text-xl uppercase">Initiate Project</p>
           <p className="text-white/20 text-xs font-bold mt-2 uppercase tracking-widest">Deploy New Sequence</p>
        </div>
      </div>
    </div>
  );
}

