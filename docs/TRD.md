# TRD — Aswin Binu Portfolio

## 1. Purpose
Technical companion to PRD.md — how the site is built, not what it does. Read alongside DESIGN-TOKENS reference in UI-UX.md §1 for the visual constants this document assumes.

## 2. System Overview
```
[React 19 + Vite Static Client]
        |
        +--> [Background.tsx — Shared Background Coordinator]
        |         (spotlight, pinned crack transition, film grain overlay)
        |         |
        |         +--> [CinematicNebula.tsx — Hybrid WebGL (OGL) + Canvas 2D]
        |                   (JWST photo, fBm UV warp, breathing, real-star overlay, constellations, ambient events)
        |
        +--> [Chapter components — Story-driven chapter flow]
        |         (Hero -> About -> Skills -> Projects -> Gallery -> Academics -> Contact)
        |
        +--> [SmoothScroll.tsx — Lenis <-> GSAP ScrollTrigger sync]
```
Static client-side architecture with WebGL GPU acceleration and zero database/backend dependencies.

## 3. Environments & Tooling
| Environment | Notes |
|---|---|
| Local Dev | `npm run dev` (Vite dev server) |
| Production | `npm run build` (`tsc && vite build`) -> Static dist bundle |
| Type Check | `npm run lint` (`tsc --noEmit`) |

## 4. Tech Stack
- **Bundler & Build Engine**: Vite 8 with `@vitejs/plugin-react`
- **Frontend Core**: React 19 + TypeScript 5
- **Styling**: Tailwind CSS + Custom CSS Design Tokens (`src/styles/globals.css`)
- **Animation Suite**: GSAP 3 (ScrollTrigger, Flip, Core Context)
- **Smooth Scrolling**: Lenis with GSAP ticker synchronization
- **WebGL / Graphics**: OGL minimal runtime for real-time background shader effects
- **Typography**: Azeret Mono (`'Azeret Mono', monospace`) — strictly single typeface across the entire portfolio

## 5. The Shared Background Coordinator & Ambient Universe
`components/layout/Background.tsx` coordinates background rendering across all 7 chapters:
- **Chapter 1 (Hero)**: Pure-black void with moving spotlight. CinematicNebula mounted, `reveal` scrubs 0 -> 1 on scroll.
- **Chapter 2 (About)**: Living JWST cosmic nebula with fBm UV displacement and luminance breathing.
- **Chapter 3–5 (Skills, Projects, Gallery)**: Nebula smoothly dissolves to floor starlight on Canvas 2D overlay; WebGL halts at `dissolve >= 0.999` to eliminate GPU overhead.
- **Chapter 6 (Academic Archive)**: Deep sapphire starlight atmosphere with spatial camera approach parallax.
- **Chapter 8 (Contact)**: Calm horizon silver starlight.
- **Discoveries & Ambient Events**:
  - *Constellation Extension*: 20% probability on cosmos click to span 8–10 stars in geometric harmony.
  - *Neural Topology*: ~8% probability to form a layered feedforward graph structure.
  - *Graduation Cap Trace*: ~35% probability in Chapter 6 to trace a subtle diamond cap silhouette.
  - *Paper Trace*: Rare ambient event (110–190s) gliding a starlight paper-plane vector along a spline.
  - *Meteors & Satellites*: Infrequent, controlled ambient streaks (45–80s meteors, 90–160s satellites).

## 6. Academic Archive Architecture (Chapter 6)
Structured under `src/sections/Academics/` and data modeled in `src/lib/academics.ts`:
- **`AcademicTrajectory.tsx`**: Illuminated conduit rail connecting Phase 01 (10th), Phase 02 (12th), and Phase 03 (University).
- **`SchoolRecordPlate.tsx`**: Monolithic archival plate with corner mounting rivets, registry stamps, aggregate score telemetry, and in-place expandable subject transcript drawers.
- **`UniversityRecordSection.tsx`**: Centerpiece exhibition fixture displaying institutional credentials, supporting CGPA telemetry, ascending SGPA trajectory track, and the 6-semester plate rack.
- **`SemesterPlate.tsx`**: Individual semester plate that transforms in-place with GSAP elevation (`scale: 1.02`, `y: -4`), soft blue illumination (`#5FA8FF`), and detailed course/grade listings without popup modals.
- **`AcademicWall.tsx`**: Structural mounting wall providing both focused-stage inspection and holistic all-tier exhibition views.

## 7. Data Models
All content is strongly typed in TypeScript:
- **Academics**: `src/lib/academics.ts` (`AcademicRecord[]`, `SemesterRecord[]`, `SubjectRecord[]`).
- **Projects**: `src/data/projects.ts` (`Project[]`).
- **Skills**: `src/data/skills.ts` (`Skill[]`, `SkillCluster[]`).
- **Events**: `src/data/events.ts` (`EventItem[]`).

## 8. Accessibility & Performance
- **Keyboard Traversal**: Every record plate, stage button, and interactive element is reachable via `Tab` and triggers with `Enter` / `Space` / `Escape`.
- **ARIA Compliance**: Proper `aria-expanded`, `aria-label`, `role="button"`, and semantic landmarks.
- **Reduced Motion**: All GSAP timelines and Canvas particles respect `prefers-reduced-motion` with instant, accessible fallbacks.
- **Mobile First**: Distinct vertical exhibition archive layout engineered specifically for 375px/390px/430px viewports.
