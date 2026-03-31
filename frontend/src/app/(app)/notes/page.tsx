"use client";
import React from "react";
import { motion } from "framer-motion";
import { FileText, Download, Share2, Search, Filter } from "lucide-react";

const mockNotes = [
  { title: "Discrete Math - Unit 2 Handouts", module: "MA1002", type: "PDF", size: "2.4 MB" },
  { title: "Data Structures - Complexity Analysis", module: "CS1003", type: "DOCX", size: "1.1 MB" },
  { title: "Analog Circuits - Practical Guide", module: "CS1001", type: "PDF", size: "5.8 MB" },
  { title: "Computer Networks - OSI Model", module: "CS1005", type: "PPTX", size: "3.2 MB" },
  { title: "Environmental Science - Quiz Bank", module: "EV1004", type: "XLSX", size: "0.5 MB" },
];

export default function NotesPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-24">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
      >
        <div>
          <h1 className="text-[4rem] font-black tracking-tighter leading-none text-white italic" style={{ fontFamily: 'var(--font-epilogue)' }}>
            NOTES
          </h1>
          <p className="text-white/40 font-bold tracking-widest text-sm uppercase mt-2">
            Centralized Academic Repository
          </p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
           <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                placeholder="Filter Repository..." 
                className="bg-white/5 border border-white/5 rounded-2xl pl-12 pr-6 py-3 w-full md:w-64 text-white text-sm outline-none focus:border-primary/40 transition-all"
              />
           </div>
           <button className="p-3 bg-white/5 rounded-2xl text-white/40 hover:text-white transition-all border border-white/5">
              <Filter size={20} />
           </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-4">
        {mockNotes.map((note, idx) => (
          <motion.div 
            key={note.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="tectonic-plate p-6 flex items-center justify-between group hover:bg-primary/5 border-l-4 border-transparent hover:border-primary transition-all"
          >
             <div className="flex items-center gap-6">
                <div className="p-4 rounded-xl bg-surface-container-high text-white/20 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                   <FileText size={24} />
                </div>
                <div>
                   <h3 className="text-lg font-black text-white italic group-hover:text-primary transition-colors">{note.title}</h3>
                   <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs font-bold text-white/20 uppercase tracking-widest">{note.module}</span>
                      <span className="w-1 h-3 bg-white/5 rounded-full" />
                      <span className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter bg-indigo-500/5 px-2 py-0.5 rounded-md border border-indigo-500/10">{note.type}</span>
                   </div>
                </div>
             </div>

             <div className="flex items-center gap-6">
                <span className="text-xs font-bold text-white/20 tabular-nums">{note.size}</span>
                <div className="flex gap-2">
                   <button className="p-3 rounded-xl bg-white/5 text-white/20 hover:text-white hover:bg-white/10 transition-all">
                      <Share2 size={18} />
                   </button>
                   <button className="p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all shadow-lg shadow-primary/5">
                      <Download size={18} />
                   </button>
                </div>
             </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

