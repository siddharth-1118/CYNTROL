"use client";
import React, { createContext, useContext, useMemo } from "react";

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
  uiStyle: "minimalist" | "brutalist";
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = "brutalist_brutalist";
  const uiStyle: "brutalist" = "brutalist";
  const isDark = true;

  const value = useMemo(() => ({
    theme,
    setTheme: () => {},
    uiStyle,
    isDark
  }), [theme, uiStyle, isDark]);



  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

