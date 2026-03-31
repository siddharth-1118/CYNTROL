"use client";
import React from "react";
import { motion } from "framer-motion";
import { Utensils, Coffee, Sun, Sunset, AlertCircle } from "lucide-react";

const meals = [
  { name: "Breakfast Protocol", time: "07:30 - 09:00", main: "Idli, Vada, Sambhar", sides: ["Tea", "Coffee", "Milk"], icon: Coffee, active: false },
  { name: "Lunch Special", time: "12:30 - 14:00", main: "Paneer Tikka, Jeera Rice, Dal Tadka", sides: ["Buttermilk", "Fruit Salad"], icon: Sun, active: true },
  { name: "High-Tea Sector", time: "16:30 - 17:30", main: "Samosa, Chutney", sides: ["Tea", "Coffee"], icon: Coffee, active: false },
  { name: "Dinner Sequence", time: "19:30 - 21:00", main: "Mixed Veg Curry, Phulka, Curd Rice", sides: ["Gulab Jamun"], icon: Sunset, active: false },
];

export default function MessMenuPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 pb-24">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-[4rem] font-black tracking-tighter leading-none text-white italic" style={{ fontFamily: 'var(--font-epilogue)' }}>
          MESS MENU
        </h1>
        <p className="text-white/40 font-bold tracking-widest text-sm uppercase mt-2">
          Nutritional Deployment Schedule
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {meals.map((meal, idx) => (
          <motion.div 
            key={meal.name}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`tectonic-plate p-10 bg-white/5 border-b-4 transition-all relative overflow-hidden ${meal.active ? 'border-primary shadow-[0_0_40px_rgba(34,211,238,0.1)]' : 'border-white/10'}`}
          >
             {meal.active && (
               <div className="absolute top-6 right-6">
                 <span className="bg-primary text-background px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">Live Now</span>
               </div>
             )}

             <div className="flex items-center gap-6 mb-10">
                <div className={`p-5 rounded-3xl ${meal.active ? 'bg-primary/20 text-primary' : 'bg-white/5 text-white/20'}`}>
                   <meal.icon size={40} />
                </div>
                <div>
                   <p className="text-white/20 text-xs font-black uppercase tracking-widest">{meal.time}</p>
                   <h3 className="text-3xl font-black text-white italic underline underline-offset-8 decoration-white/5">{meal.name}</h3>
                </div>
             </div>

             <div className="space-y-6">
                <div className="bg-white/5 p-6 rounded-2xl">
                   <p className="text-white/20 text-[10px] font-black uppercase tracking-widest mb-2">Main Component</p>
                   <p className="text-2xl font-bold text-white leading-tight italic">{meal.main}</p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                   {meal.sides.map(s => (
                     <div key={s} className="px-4 py-2 bg-indigo-500/5 border border-indigo-500/10 rounded-xl text-indigo-400 text-xs font-bold uppercase tracking-wider">
                        {s}
                     </div>
                   ))}
                </div>
             </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="tectonic-plate p-8 bg-indigo-500/5 border border-indigo-500/20 flex gap-4 items-center"
      >
        <AlertCircle className="text-indigo-400 shrink-0" />
        <p className="text-sm font-bold text-white/40 italic">
          Menu is subject to logistical availability. System updates reflect standard sector cycles for <span className="text-white">PR-2 Block</span>.
        </p>
      </motion.div>
    </div>
  );
}

