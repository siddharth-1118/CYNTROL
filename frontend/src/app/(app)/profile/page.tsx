"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Fingerprint, 
  MapPin, 
  LogOut, 
  Save, 
  Users,
  Search,
  Activity
} from "lucide-react";
import { useAppLayout } from "@/context/AppLayoutContext";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const { userData, logout } = useAppLayout();
  
  const name = userData?.profile?.name || "User Identity";
  const reg = userData?.profile?.regNo || userData?.profile?.registerNumber || "RAXXXXXXXXXXXXX";
  const batch = userData?.profile?.batch || "Batch 2021";
  const dept = userData?.profile?.dept || "CSE Core";
  const section = userData?.profile?.section || "Section K1";
  const semester = userData?.profile?.semester || "Semester 6";
  const email = `${reg.toLowerCase()}@srmist.edu.in`;

  const roommates = [
    { name: "Aditya S.", room: "A-302", initials: "AS" },
    { name: "Rahul M.", room: "A-302", initials: "RM" },
    { name: "Vikas K.", room: "A-302", initials: "VK" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-full bg-[#09090b] text-[#EDEDED] relative overflow-x-hidden pb-32">
      {/* Floating Cyan Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="p-6 md:p-12 space-y-12 relative z-10"
      >
        {/* 1. Hero Profile Section (Header) */}
        <motion.section 
          variants={item}
          className="bg-slate-900 rounded-[4rem] p-8 md:p-16 shadow-2xl relative overflow-hidden group"
        >
          {/* Subtle noise grain for deep navy card */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noiseFilter%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noiseFilter)%22%2F%3E%3C%2Fsvg%3E')]" />

          <div className="flex flex-col xl:flex-row items-center xl:items-start gap-12 relative z-10">
            {/* User Avatar */}
            <div className="relative shrink-0">
               <div className="w-[200px] h-[200px] md:w-[250px] md:h-[250px] bg-zinc-950 rounded-[3.5rem] flex items-center justify-center border border-white/5 shadow-2xl relative overflow-hidden">
                  <span className="text-8xl md:text-9xl font-black text-cyan-400 italic tracking-tighter opacity-80 uppercase font-mono">
                    {name[0]}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent" />
               </div>
               {/* Identity Badge */}
               <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-[#09090b] px-5 py-2 rounded-full flex items-center gap-2 shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-bounce-slow">
                  <ShieldCheck size={18} fill="currentColor" className="opacity-80" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">VERIFIED IDENTITY</span>
               </div>
            </div>

            {/* Typography & Identity */}
            <div className="flex-1 text-center xl:text-left space-y-8">
               <div className="space-y-4">
                  <h2 className="text-5xl md:text-7xl xl:text-8xl font-black text-white italic tracking-tighter leading-[0.9] uppercase break-words font-mono">
                    {name}
                  </h2>
                  <div className="flex flex-wrap gap-3 justify-center xl:justify-start">
                     <div className="px-5 py-2 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span className="text-xs font-bold text-white/60 tracking-widest uppercase">{dept}</span>
                     </div>
                     <div className="px-5 py-2 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center gap-2">
                        <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase font-mono">{reg}</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </motion.section>

        {/* 2. Info Grid (12-Column Mosaic) */}
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
           {/* Biometric Overview (Col-Span 12) */}
           <motion.div 
             variants={item}
             className="xl:col-span-12 bg-zinc-900/20 rounded-[3rem] p-10 border border-white/5 space-y-10"
           >
              <div className="flex items-center gap-3">
                 <Fingerprint className="text-cyan-400" size={24} />
                 <h3 className="text-xs font-black text-[#8A8F98] uppercase tracking-[0.3em]">BIOMETRIC OVERVIEW</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-[#8A8F98] uppercase tracking-widest opacity-40">Encryption Address</p>
                    <p className="text-lg font-bold text-white truncate max-w-full">{email}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-[#8A8F98] uppercase tracking-widest opacity-40">Communication Node</p>
                    <p className="text-lg font-bold text-white tracking-widest">+91 SEC-PRO-99</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-[#8A8F98] uppercase tracking-widest opacity-40">Academic Cluster</p>
                    <p className="text-lg font-bold text-white uppercase">{semester} • {section}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-[#8A8F98] uppercase tracking-widest opacity-40">System Status</p>
                    <div className="flex items-center gap-3">
                       <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-pulse" />
                       <p className="text-lg font-black text-white italic uppercase tracking-tighter">ACTIVE_NODE</p>
                    </div>
                 </div>
              </div>
           </motion.div>
        </section>

        {/* 3. Hostel Coordinates (Input Form) */}
        <motion.section 
          variants={item}
          className="bg-zinc-900/10 rounded-[4rem] p-10 md:p-16 border border-white/5 space-y-12"
        >
           <div className="space-y-2">
              <h3 className="text-xs font-black text-[#8A8F98] uppercase tracking-[0.4em]">CALIBRATE COORDINATES</h3>
              <p className="text-[#8A8F98] text-sm font-medium opacity-60">Establish permanent dormitory location for system mesh.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                 <label className="text-[10px] font-black text-[#8A8F98] uppercase tracking-widest pl-4">DORMITORY HUB</label>
                 <input 
                   disabled
                   type="text" 
                   placeholder="ENTER HOSTEL NAME..." 
                   className="w-full h-20 bg-white/5 border border-white/5 rounded-3xl px-8 text-xl font-bold placeholder:text-white/10 text-white focus:outline-none focus:border-cyan-500/30 transition-all uppercase"
                 />
              </div>
              <div className="space-y-4">
                 <label className="text-[10px] font-black text-[#8A8F98] uppercase tracking-widest pl-4">SUITE ID</label>
                 <input 
                   disabled
                   type="text" 
                   placeholder="ENTER ROOM ID..." 
                   className="w-full h-20 bg-white/5 border border-white/5 rounded-3xl px-8 text-xl font-bold placeholder:text-white/10 text-white focus:outline-none focus:border-cyan-500/30 transition-all uppercase"
                 />
              </div>
           </div>

           <div className="flex flex-col md:flex-row gap-6">
              <button 
                className="h-20 flex-1 bg-cyan-400 text-[#09090b] rounded-[2rem] font-black uppercase tracking-[0.2em] italic flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(34,211,238,0.2)]"
              >
                <Save size={20} fill="currentColor" />
                COMMIT COORDINATES
              </button>
              <button 
                onClick={logout}
                className="h-20 md:w-32 bg-zinc-900 border border-white/10 text-white/40 rounded-[2rem] flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-all active:scale-[0.95] group"
              >
                <LogOut size={24} className="group-hover:rotate-12 transition-transform" />
              </button>
           </div>
        </motion.section>
      </motion.div>
    </div>
  );
}

