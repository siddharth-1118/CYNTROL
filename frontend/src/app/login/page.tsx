"use client";
import React, { useState } from "react";
import LoginPage from "@/components/shared/LoginPage";
import LandingSection from "@/components/shared/LandingSection";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { EncryptionUtils } from "@/utils/shared/Encryption";
import { AnimatePresence } from "framer-motion";

export default function LoginRoute() {
  const { setUserData } = useApp();
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();

  const handleLoginSuccess = (data: any) => {
    setUserData(data);
    localStorage.setItem("ratio_data", JSON.stringify(data));
    EncryptionUtils.setSessionCookie();
    router.replace("/");
  };

  return (
    <div className="w-full h-full bg-[#0A0A0A] overflow-hidden">
      <AnimatePresence mode="wait">
        {!showLogin ? (
          <LandingSection key="landing" onEnter={() => setShowLogin(true)} />
        ) : (
          <LoginPage key="login" onLogin={handleLoginSuccess} />
        )}
      </AnimatePresence>
    </div>
  );
}


