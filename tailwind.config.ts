import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#090a0f",
        surface: {
          DEFAULT: "#12151c",
          panel: "#161922",
          subtle: "rgba(22, 25, 34, 0.7)",
          card: "rgba(18, 21, 28, 0.85)",
          border: "rgba(255, 255, 255, 0.08)",
          hover: "rgba(30, 36, 48, 0.8)",
        },
        grey: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#080b11",
        },
        silver: {
          DEFAULT: "#e2e8f0",
          bright: "#ffffff",
          muted: "#94a3b8",
          dim: "#64748b",
          faint: "#334155",
        },
        /* Backward compatibility aliases remapped to dark grey / silver */
        cyan: {
          DEFAULT: "#e2e8f0",
          dim: "rgba(226, 232, 240, 0.1)",
          bright: "#ffffff",
        },
        navy: {
          DEFAULT: "#12151c",
          surface: "rgba(18, 21, 28, 0.75)",
          deep: "#090a0f",
        },
        stellar: {
          DEFAULT: "#334155",
          subtle: "rgba(148, 163, 184, 0.12)",
          glow: "rgba(226, 232, 240, 0.15)",
        },
        luminous: {
          DEFAULT: "#f8fafc",
          muted: "rgba(248, 250, 252, 0.75)",
          dim: "rgba(248, 250, 252, 0.45)",
          faint: "rgba(248, 250, 252, 0.12)",
        },
      },
      fontFamily: {
        mono: ["'Azeret Mono'", "ui-monospace", "monospace"],
      },
      fontSize: {
        display: [
          "clamp(1.75rem, 3.2vw, 3rem)",
          { lineHeight: "1.1", letterSpacing: "-0.03em" },
        ],
        h1: [
          "clamp(1.35rem, 2.2vw, 2.25rem)",
          { lineHeight: "1.18", letterSpacing: "-0.025em" },
        ],
        h2: [
          "clamp(1.15rem, 1.6vw, 1.5rem)",
          { lineHeight: "1.25", letterSpacing: "-0.015em" },
        ],
        h3: [
          "clamp(0.95rem, 1.2vw, 1.25rem)",
          { lineHeight: "1.35", letterSpacing: "-0.01em" },
        ],
        body: [
          "clamp(0.875rem, 0.3vw + 0.75rem, 0.95rem)",
          { lineHeight: "1.65", letterSpacing: "0em" },
        ],
        caption: [
          "0.8125rem",
          { lineHeight: "1.5", letterSpacing: "0.02em" },
        ],
        label: [
          "0.6875rem",
          { lineHeight: "1.4", letterSpacing: "0.12em" },
        ],
      },
      maxWidth: {
        container: "1440px",
      },
      spacing: {
        section: "clamp(4.5rem, 6vw + 1.5rem, 7.5rem)",
      },
      boxShadow: {
        silver: "0 0 25px rgba(226, 232, 240, 0.15)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;

