import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(28px, -20px) scale(1.02)" },
          "66%": { transform: "translate(-18px, 14px) scale(0.99)" },
        },
        floatAlt: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-32px, 24px)" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0) translateX(0)", opacity: "0.5" },
          "50%": { transform: "translateY(-14px) translateX(6px)", opacity: "1" },
        },
        driftReverse: {
          "0%, 100%": { transform: "translateY(0) translateX(0)", opacity: "0.4" },
          "50%": { transform: "translateY(12px) translateX(-8px)", opacity: "0.9" },
        },
      },
      animation: {
        float: "float 24s ease-in-out infinite",
        "float-delayed": "floatAlt 30s ease-in-out infinite",
        "float-slow": "float 38s ease-in-out infinite reverse",
        drift: "drift 5s ease-in-out infinite",
        "drift-reverse": "driftReverse 6.5s ease-in-out infinite",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        card: "var(--card)",
        "card-border": "var(--card-border)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        "accent-muted": "var(--accent-muted)",
      },
    },
  },
  plugins: [],
};
export default config;
