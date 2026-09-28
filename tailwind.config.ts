import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#020814",
        navy: {
          DEFAULT: "#061A3A",
          surface: "rgba(6, 26, 58, 0.6)",
          deep: "#041126",
        },
        stellar: {
          DEFAULT: "#0F4C81",
          subtle: "rgba(15, 76, 129, 0.3)",
          glow: "rgba(15, 76, 129, 0.5)",
        },
        cyan: {
          DEFAULT: "#5FA8FF",
          dim: "rgba(95, 168, 255, 0.2)",
          bright: "#7BBAFF",
        },
        luminous: {
          DEFAULT: "#F7FBFF",
          muted: "rgba(247, 251, 255, 0.7)",
          dim: "rgba(247, 251, 255, 0.4)",
          faint: "rgba(247, 251, 255, 0.15)",
        },
      },
      fontFamily: {
        mono: ["'Azeret Mono'", "ui-monospace", "monospace"],
      },
      fontSize: {
        display: [
          "clamp(2.5rem, 6vw + 1rem, 5.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.04em" },
        ],
        h1: [
          "clamp(2rem, 4vw + 0.75rem, 3.75rem)",
          { lineHeight: "1.1", letterSpacing: "-0.03em" },
        ],
        h2: [
          "clamp(1.5rem, 2.5vw + 0.5rem, 2.5rem)",
          { lineHeight: "1.2", letterSpacing: "-0.02em" },
        ],
        h3: [
          "clamp(1.15rem, 1.5vw + 0.5rem, 1.75rem)",
          { lineHeight: "1.3", letterSpacing: "-0.01em" },
        ],
        body: [
          "clamp(0.875rem, 0.5vw + 0.75rem, 1rem)",
          { lineHeight: "1.65", letterSpacing: "0em" },
        ],
        caption: [
          "clamp(0.75rem, 0.25vw + 0.65rem, 0.875rem)",
          { lineHeight: "1.5", letterSpacing: "0.02em" },
        ],
        label: [
          "clamp(0.6875rem, 0.2vw + 0.6rem, 0.75rem)",
          { lineHeight: "1.4", letterSpacing: "0.15em" },
        ],
      },
      maxWidth: {
        container: "1440px",
      },
      spacing: {
        section: "clamp(5rem, 8vw + 2rem, 10rem)",
      },
      boxShadow: {
        stellar: "0 0 30px rgba(15, 76, 129, 0.35)",
        cyan: "0 0 25px rgba(95, 168, 255, 0.3)",
        glass: "0 8px 32px 0 rgba(2, 8, 20, 0.37)",
      },
    },
  },
  plugins: [],
};

export default config;

