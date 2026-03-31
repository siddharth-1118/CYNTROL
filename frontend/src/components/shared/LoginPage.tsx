"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { EncryptionUtils } from "@/utils/shared/Encryption";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";


interface LoginPageProps {
  onLogin: (data: any) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const { performLogin } = useApp();
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [captchaInput, setCaptchaInput] = useState<string>("");
  const [captchaImage, setCaptchaImage] = useState<string | null>(null);
  const [cdigest, setCdigest] = useState<string | null>(null);

  const [isExiting, setIsExiting] = useState(false);

  const formatUsername = (val: string) => {
    const cleanVal = val.trim();
    return cleanVal.includes("@") ? cleanVal : `${cleanVal}@srmist.edu.in`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    setError("");
    const fullUsername = formatUsername(username);

    try {
      EncryptionUtils.cleanOldKeys();
      const savedCookies = EncryptionUtils.loadDecrypted("academia_cookies");
      const creds = {
        username: fullUsername,
        password: password,
        cookies: savedCookies,
        captcha: captchaInput || undefined,
        cdigest: cdigest || undefined,
      };

      setLoading(true);
      try {
        const data = await performLogin(creds);
        onLogin(data);
      } catch (err: any) {
        if (err?.type === "CAPTCHA_REQUIRED") {
          setCaptchaImage(err.image);
          setCdigest(err.cdigest);
          setError(err.message || "Please enter the CAPTCHA.");
          setCaptchaInput("");
        } else {
          setCaptchaImage(null);
          setCdigest(null);
          setError(err.message || "auth failed");
        }
        setLoading(false);
      }
    } catch (err: any) {
      if (err?.type === "CAPTCHA_REQUIRED") {
        setCaptchaImage(err.image);
        setCdigest(err.cdigest);
        setError(err.message || "Please enter the CAPTCHA.");
        setCaptchaInput("");
      } else {
        setCaptchaImage(null);
        setCdigest(null);
        setError(err.message || "auth failed");
      }
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1] as any
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as any
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#0A0A0A]">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        className="w-full max-w-md bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 space-y-10"
      >
        <div className="space-y-2 text-center">
          <h2 
            className="text-3xl font-bold tracking-tight text-white"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            Welcome Back
          </h2>
          <p className="text-white/40 text-sm">Please enter your credentials to access your node.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">
              NetID / Email
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
              placeholder="username@srmist.edu.in"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                placeholder="••••••••"
                style={{ fontFamily: 'var(--font-jakarta)' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-white/20 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {captchaImage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">
                  CAPTCHA
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                    placeholder="Enter code"
                    style={{ fontFamily: 'var(--font-jakarta)' }}
                  />
                  <div className="bg-white rounded-xl p-1 h-[56px] w-[120px] flex-shrink-0 flex items-center justify-center overflow-hidden border border-white/10">
                    <img src={captchaImage} alt="CAPTCHA" className="h-full object-contain mix-blend-multiply" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-xs font-medium flex items-center gap-3"
              >
                <AlertCircle size={16} /> {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-black font-bold h-[64px] rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-[0_10px_20px_rgba(34,211,238,0.2)]"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
