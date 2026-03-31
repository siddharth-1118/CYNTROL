"use client";
import React, { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import SettingsPage from "@/components/shared/SettingsPage";
import { useApp } from "@/context/AppContext";
import { useTheme } from "@/context/ThemeContext";
import { useAcademiaData } from "@/hooks/useAcademiaData";

const BrutalistThemeLayout = dynamic(
  () => import("@/components/themes/brutalist/BrutalistTheme"),
  { loading: () => <div className="h-full w-full bg-theme-bg" /> }
);



import { AppLayoutContext } from "@/context/AppLayoutContext";
import Sidebar from "@/components/shared/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { userData, logout, customDisplayName, setCustomDisplayName, isUpdating } = useApp();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const academia = useAcademiaData(userData as any);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isOnboarded = localStorage.getItem("CYNTROL_onboarded") === "true";
    if (!isOnboarded) {
      localStorage.setItem("CYNTROL_onboarded", "true");
    }
  }, [router]);

  const handleUpdateName = (name: string) => {
    setCustomDisplayName(name);
    localStorage.setItem("CYNTROL_custom_name", name);
  };

  return (
    <AppLayoutContext.Provider value={{ 
      onOpenSettings: () => setIsSettingsOpen(true),
      isSwipeDisabled: false,
      setIsSwipeDisabled: () => {},
      userData: userData as any,
      academia,
      logout
    }}>
      <div className="flex h-screen w-full bg-background overflow-hidden relative">
        {/* Global Sidebar */}
        <Sidebar />

        {/* Fading Backdrop Gradient */}
        <div className="fixed inset-0 pointer-events-none z-0 fading-backdrop opacity-50" />

        <main className="flex-1 relative z-10 overflow-hidden flex flex-col pl-[80px]">
           <AnimatePresence mode="wait">
             <motion.div
               key={pathname}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.5, ease: "easeInOut" }}
               className="h-full w-full overflow-y-auto no-scrollbar"
             >
               {children}
             </motion.div>
           </AnimatePresence>
        </main>

        <AnimatePresence>
          {isSettingsOpen && (
            <SettingsPage
              onBack={() => setIsSettingsOpen(false)}
              onLogout={logout}
              profile={{
                name: customDisplayName || userData?.profile?.name || "Student",
                regNo: userData?.profile?.regNo || "",
              }}
              onUpdateName={handleUpdateName}
              onSelectTheme={() => {}}
              currentTheme="brutalist"
            />
          )}
        </AnimatePresence>
      </div>
    </AppLayoutContext.Provider>
  );
}

