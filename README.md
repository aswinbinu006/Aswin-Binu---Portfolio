# Aswin Binu — Engineering Portfolio

High-fidelity, interactive engineering portfolio built with **Vite**, **React 19**, **TypeScript**, **Tailwind CSS**, and **GSAP**.

## Storyline Architecture

Continuous scroll-driven narrative across acts/chapters:
- **Chapter 1: The Statement (Hero)** — Spotlight beam, title revelation, and crack universe transition.
- **Chapter 2: The Operator (About / Intro)** — Command console narrative, editorial dossier, and interactive portrait.
- **Chapter 3: Skill Constellation (Skills)** — 4-quadrant interactive SVG/GSAP neural graph with live radar ping telemetry.
- **Chapter 4: Project Gallery (Projects)** — Asymmetrical editorial project cards with tech specs and live links.
- **Chapter 5: Event Archive (Gallery)** — Museum exhibition posters with responsive detail inspection modals.
- **Chapter 8: Contact** — Minimalist tactical uplink and communication channels.

---

## Tech Stack & Architecture

- **Bundler / Dev Engine**: [Vite](https://vite.dev/) with `@vitejs/plugin-react`
- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS + custom CSS design tokens (`src/styles/globals.css`)
- **Animation & Transitions**: GSAP 3 (ScrollTrigger, Flip), Lenis (Smooth Scroll)
- **Visuals / Shaders**: OGL WebGL runtime (`CinematicNebula`) for real-time background rendering

### Directory Structure (`src/`)

```text
src/
├── app/                  # Main application container and layout providers
│   ├── App.tsx
│   └── providers.tsx
├── components/           # Reusable UI & layout components
│   ├── effects/          # Shaders, animations (CinematicNebula, IntroOverlay)
│   ├── hooks/            # Shared React & GSAP hooks
│   └── layout/           # App shell, Background controller, SmoothScroll
├── data/                 # Data collections (projects.ts, skills.ts, events.ts)
├── sections/             # Section chapters
│   ├── Hero/             # Chapter 1
│   ├── About/            # Chapter 2
│   ├── Skills/           # Chapter 3
│   ├── Projects/         # Chapter 4
│   ├── Gallery/          # Chapter 5
│   └── Contact/          # Chapter 8
├── styles/               # Global stylesheet and token definitions
├── types/                # Core TypeScript definitions
└── utils/                # GSAP registration and utility functions
```

---

## Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Server starts at `http://localhost:5174`.

### Production Build & Type Checking

```bash
npm run lint    # Type check via tsc --noEmit
npm run build   # Production bundle with Vite
npm run preview # Preview production build locally
```

---

## Next.js Legacy Cleanup Summary

The project previously contained two overlapping codebases (an older Next.js setup and a Vite setup). The codebase is now purely Vite + React:

1. **Deleted Legacy Next.js Directories & Files**:
   - `app/` (legacy Next.js root layout, page, and globals)
   - `components/` (root-level legacy components)
   - `lib/` (root-level legacy helper libraries)
   - `data/` (root-level duplicate data directory)
   - `next.config.js` & `next-env.d.ts`
   - `skiper31.tsx` (legacy experimental component)
   - `AUDIT_REPORT.md` (audit for old Next.js setup)
   - `.next/` build artifact folder
2. **Cleaned Dependencies & Configuration**:
   - Removed `next` dependency from `package.json`
   - Confirmed `tsconfig.json` paths point cleanly to `./src/*`
   - Verified `vite.config.ts` alias `@` maps to `./src`
   - Ensured `dist/` is ignored in `.gitignore`
   - All components and assets in `src/` validated with 0 type errors and successful production builds.
