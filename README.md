# Aswin Binu — Engineering Portfolio

High-fidelity, interactive engineering portfolio built with **Vite**, **React 19**, **TypeScript**, **Tailwind CSS**, and **GSAP**.

## Storyline Architecture

Continuous scroll-driven narrative across chapters:
- **Chapter 1: The Statement (Hero)** — Spotlight beam, title revelation, and crack universe transition.
- **Chapter 2: The Operator (About)** — Command console narrative, editorial dossier, and interactive portrait.
- **Chapter 3: Skill Constellation (Skills)** — 4-quadrant interactive SVG/GSAP neural graph with live telemetry.
- **Chapter 4: Project Gallery (Projects)** — Asymmetrical editorial project cards with tech specs and live links.
- **Chapter 5: Event Archive (Gallery)** — Museum exhibition posters with responsive detail inspection modals.
- **Chapter 6: Academic Archive (Academics)** — Physical exhibition wall presenting secondary, senior secondary, and university engineering development records with in-place transcript expansion.
- **Chapter 8: Contact** — Minimalist tactical uplink and communication channels.

---

## Tech Stack & Architecture

- **Bundler / Dev Engine**: [Vite](https://vite.dev/) with `@vitejs/plugin-react`
- **Frontend Core**: React 19 + TypeScript 5
- **Styling**: Tailwind CSS + custom CSS design tokens (`src/styles/globals.css`)
- **Animation & Transitions**: GSAP 3 (ScrollTrigger, Flip, Context), Lenis (Smooth Scroll)
- **Visuals / Shaders**: OGL WebGL runtime (`CinematicNebula`) for real-time background cosmic rendering
- **Typography**: Azeret Mono (Strict single-font discipline)

### Directory Structure (`src/`)

```text
src/
├── app/                  # Main application container and layout providers
│   ├── App.tsx
│   └── providers.tsx
├── components/           # Reusable UI & layout components
│   ├── effects/          # Shaders, animations (CinematicNebula, IntroOverlay)
│   ├── hooks/            # Shared React & GSAP hooks
│   ├── layout/           # App shell, Background controller, SmoothScroll
│   └── ui/               # Design token components (Label, Tag, Button, Section)
├── data/                 # Data collections (projects.ts, skills.ts, events.ts, academics.ts)
├── lib/                  # Strongly typed models & utilities (academics.ts, utils.ts)
├── sections/             # Section chapters
│   ├── Hero/             # Chapter 1 — The Statement
│   ├── About/            # Chapter 2 — The Operator
│   ├── Skills/           # Chapter 3 — Skill Constellation
│   ├── Projects/         # Chapter 4 — Project Gallery
│   ├── Gallery/          # Chapter 5 — Event Archive
│   ├── Academics/        # Chapter 6 — Academic Archive (The Academic Wall)
│   └── Contact/          # Chapter 8 — Tactical Contact Uplink
├── styles/               # Global stylesheet and token definitions
├── types/                # Core TypeScript definitions
└── utils/                # GSAP registration and Lenis utility functions
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
