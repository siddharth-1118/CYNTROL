"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Hourglass, 
  CalendarClock, 
  BookOpenText, 
  TrendingUp, 
  BookOpen, 
  Calendar, 
  Calculator, 
  Workflow, 
  Utensils, 
  FileText, 
  Users, 
  MessageCircleHeart, 
  User, 
  Sparkles, 
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import GlowEffect from "./GlowEffect";
import { useAppLayout } from "@/context/AppLayoutContext";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Timetable", icon: Hourglass, href: "/timetable" },
  { label: "Attendance", icon: CalendarClock, href: "/attendance" },
  { label: "Marks", icon: BookOpenText, href: "/marks" },
  { label: "Percentage", icon: TrendingUp, href: "/percentage" },
  { label: "Courses", icon: BookOpen, href: "/courses" },
  { label: "Calendar", icon: Calendar, href: "/calendar" },
  { label: "GradeX", icon: Calculator, href: "/gradex" },
  { label: "Projects", icon: Workflow, href: "/projects" },
  { label: "Mess Menu", icon: Utensils, href: "/mess-menu" },
  { label: "Notes", icon: FileText, href: "/notes" },
  { label: "Community", icon: Users, href: "/community" },
  { label: "Profile", icon: User, href: "/profile" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { userData, logout } = useAppLayout();
  const userName = userData?.name || "Student User";
  const initials = userName === "Student User" ? "RA" : userName.split(" ").map((n:any) => n[0]).join("").substring(0, 2).toUpperCase();

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="fixed left-0 top-0 h-screen bg-surface-container-lowest border-r border-white/5 z-50 flex flex-col shadow-2xl relative"
    >
      {/* Grain Overlay for Sidebar */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noiseFilter%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noiseFilter)%22%2F%3E%3C%2Fsvg%3E')]" />
      
      {/* Logo */}
      <div className="p-6 flex items-center justify-between mb-4 relative z-20">
        {!isCollapsed && (
          <motion.span 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="text-2xl font-black tracking-tighter text-white" 
             style={{ fontFamily: 'var(--font-epilogue)' }}
          >
            CYNTROL
          </motion.span>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 space-y-1 relative z-10">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.label} href={item.href}>
              <GlowEffect className="rounded-xl overflow-hidden" glowColor="rgba(34,211,238,0.2)">
                <div
                  className={cn(
                    "flex items-center gap-4 px-4 py-3 rounded-xl transition-all relative group",
                    isActive 
                      ? "bg-primary/10 text-primary shadow-[0_0_20px_rgba(34,211,238,0.1)]" 
                      : "text-white/40 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="active-pill"
                      className="absolute left-0 w-1 h-6 bg-primary rounded-full"
                    />
                  )}
                  <item.icon size={22} className={cn("shrink-0", isActive ? "text-primary" : "group-hover:text-primary transition-colors")} />
                  {!isCollapsed && (
                    <span className="font-bold text-[14px] tracking-tight">{item.label}</span>
                  )}
                </div>
              </GlowEffect>
            </Link>
          );
        })}
      </div>

      {/* Footer Info / User Mini Profile */}
      <div className="p-4 mt-auto border-t border-white/5 relative z-10">
        <div className={cn("flex items-center gap-3", isCollapsed ? "justify-center" : "px-2")}>
           <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-black text-sm uppercase tracking-tighter">
             {initials}
           </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-white text-sm font-bold truncate max-w-[140px] uppercase tracking-tighter italic">{userName}</span>
                <span className="text-white/40 text-[10px] tracking-widest font-black uppercase">Active Node</span>
              </div>
            )}
         </div>

         {/* Logout Button */}
         <button 
           onClick={() => {
             if (confirm("Are you sure you want to logout?")) {
               logout();
             }
           }}
           className={cn(
             "mt-4 w-full flex items-center gap-3 px-4 py-2 rounded-xl text-red-500/60 hover:text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20 group relative overflow-hidden",
             isCollapsed && "justify-center px-0"
           )}
         >
           <LogOut size={18} className={cn("shrink-0", !isCollapsed && "group-hover:-translate-x-1 transition-transform")} />
           {!isCollapsed && (
             <span className="font-bold text-[12px] tracking-widest uppercase italic">Terminate</span>
           )}
           
           {/* Glitch Overlay for Logout */}
           <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
         </button>
        </div>
    </motion.div>
  );
}

