import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        violet: "rgb(var(--color-violet) / <alpha-value>)",
        cyan: "rgb(var(--color-cyan) / <alpha-value>)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(140, 173, 255, 0.18), 0 18px 65px rgba(32, 81, 255, 0.18)",
        pulse: "0 0 35px rgba(110, 135, 255, 0.28)",
      },
      backgroundImage: {
        radial:
          "radial-gradient(circle at top, rgba(114, 131, 255, 0.28), transparent 36%), radial-gradient(circle at 20% 20%, rgba(164, 85, 247, 0.22), transparent 28%), linear-gradient(180deg, rgba(5, 8, 20, 0.98) 0%, rgba(2, 3, 8, 1) 100%)",
      },
      animation: {
        ticker: "ticker 22s linear infinite",
        float: "float 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 4s ease-in-out infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.65" },
          "50%": { opacity: "1" },
        },
      },
      fontFamily: {
        display: ["var(--font-orbitron)", "sans-serif"],
        body: ["var(--font-space-grotesk)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
