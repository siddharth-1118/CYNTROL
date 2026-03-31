import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        epilogue: ["var(--font-epilogue)", "sans-serif"],
        jakarta: ["var(--font-jakarta)", "sans-serif"],
        body: ["var(--font-jakarta)", "sans-serif"],
        headline: ["var(--font-epilogue)", "sans-serif"],
        code: ["monospace"],
      },
      colors: {
        background: "#0f172a",
        surface: "#0f172a",
        "surface-container-lowest": "#080d1a",
        "surface-container-low": "#161e33",
        "surface-container-high": "#1e294b",
        "surface-container-highest": "#334155",
        primary: {
          DEFAULT: "#22d3ee", // Nordic Cyan
          container: "#0891b2",
        },
        "surface-tint": "#22d3ee",
        tertiary: {
          container: "#6366f1", // Indigo Accent
        },
        secondary: {
          DEFAULT: "#94a3b8",
          container: "#1e293b",
        },
        "on-secondary-container": "#cbd5e1",
        "outline-variant": "#334155",
        
        // Backward compatibility
        "theme-bg": "#0f172a",
        "theme-text": "#f8fafc",
        "theme-primary": "#22d3ee",
        "theme-secondary": "#6366f1",
        "theme-accent": "#00f2ff",
        "theme-highlight": "#22d3ee",
      },
      borderRadius: {
        xl: "1.5rem",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

