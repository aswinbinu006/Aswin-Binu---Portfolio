import type { Config } from "tailwindcss";

// Design tokens are LOCKED per the portfolio blueprint — do not add unauthorized colors.
const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "black-void": "#090a0d",
        "deep-navy": "#111317",
        "nebula-blue": "#191b20",
        "soft-glow": "#F6C343",
        "stellar-gold": "#FFAA00",
        white: "#f8fafc",
        "off-white": "#f1f5f9",
      },
      fontFamily: {
        mono: ["var(--font-azeret)", "ui-monospace", "monospace"],
        space: ["'Space Grotesk'", "sans-serif"],
      },
      letterSpacing: {
        hero: "-0.04em",
      },
      fontWeight: {
        hero: "800",
        title: "700",
        btn: "500",
        body: "400",
      },
    },
  },
  plugins: [],
};

export default config;
