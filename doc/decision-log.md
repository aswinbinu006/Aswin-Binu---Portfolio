# Decision Log

Statuses: **APPROVED** (explicit owner approval) · **PROPOSED** (recommendation awaiting approval) · **UNRESOLVED** (needs owner input).
A proposal is never promoted to approved without explicit approval, recorded here with a date.

Log created: 2026-10-11.

## 1. Approved Decisions

| ID | Decision | Rationale | Date |
|---|---|---|---|
| A-01 | Canonical instruction file is `MODEL.md`, not `CLAUDE.md`. | Project will be built in Google Antigravity. | 2026-10-11 |
| A-02 | Palette: Ivory `#E8E0D2`, Warm `#E6D5BD`, Card `#F3EDE1`, Navy `#0E1D61`, Midnight `#070F38`, Gold `#B89A54`, Dark gold `#775C1B`, optional Green `#2E7D5B`. | Specified as finalized by owner. | 2026-10-11 |
| A-03 | Gold `#B89A54` only for thin lines, icons, dividers, active-nav underline; `#775C1B` for gold-toned text. | Contrast requirement. | 2026-10-11 |
| A-04 | Backgrounds are static; no gradients, glow, particles, illustrations, 3D, or graph visuals. | Owner visual rule. | 2026-10-11 |
| A-05 | Section list/order: Hero, About, Projects, Skills, Credentials & Activity, Academics, Contact + Footer. | Owner spec. | 2026-10-11 |
| A-06 | Navigation labels as in `UI-UX.md`; active item gets thin gold underline. | Owner spec. | 2026-10-11 |
| A-07 | No contact form; no charts in Academics; no skills-to-projects graph. | Owner spec. | 2026-10-11 |
| A-08 | No application code until documentation approval gate is passed. | Owner spec. | 2026-10-11 |
| A-09 | Reference widths: 1440px, 768px, 375px; intermediate widths also supported. | Owner spec. | 2026-10-11 |
| A-10 | Framework: Vite + React + TypeScript + Tailwind CSS (resolves U-01 and P-01). | Owner selected the recommended option. Other libraries in `TRD.md` remain PROPOSED. | 2026-10-11 |
| A-11 | Scope for now is Markdown documentation only. The owner declined to approve the documentation for building. The approval gate stays closed. | Owner instruction. | 2026-10-11 |
| A-12 | Implementation gate approved and execution authorized by owner (Phase 0 complete). Proceed with Vite + React + TS + Tailwind with deferred content architecture per §3.1. | Owner instruction via prompt. | 2026-10-11 |
| A-13 | Applied 60:30:10 color balance rule: 60% dominant background (Ivory #E8E0D2 / Midnight #070F38 for contact), 30% structural content & surfaces (Card #F3EDE1, Deep Atlas Navy #0E1D61 headings/structure, Midnight #070F38 text), 10% intentional highlights (Gold #B89A54 lines/icons/indicators, Dark Gold #775C1B mono labels, Status Green #2E7D5B dot). | Owner instruction via prompt. | 2026-10-11 |
| A-14 | Integrated approved handwritten AB signature WebP asset (`logo.webp`) in shared navbar linking to `#home` with responsive sizing (50-62px width, 2:1 aspect ratio) and meaningful alt text. | Owner instruction via prompt. | 2026-10-11 |
| A-15 | Expanded desktop container to max 1320px with balanced gutters (60px at 1440px desktop, 32px tablet, 20px mobile) and added cohesive progressive-enhancement motion system (staggered entrances, scroll reveals, card elevations, animated nav underline, modal/sheet transitions, and prefers-reduced-motion support). | Owner instruction via prompt. | 2026-10-11 |
| A-16 | Phase 3 Layout & Advanced Motion Refinement: Main content container widened to 1360px with 40px gutters (1440px desktop), calibrated vertical rhythm (py-14 to py-24), orchestrated Hero entrance (role mask reveal, name baseline text mask, delayed gold period, floating scroll indicator), distinct section interactions, and bidirectional opening/closing transitions for modals and mobile bottom sheets. | Owner instruction via prompt. | 2026-10-11 |
| A-17 | Layout Horizontal Spacing Optimization: Expanded max container width to 1480px with compact responsive gutters (px-4 to px-12), eliminating excessive blank margins on left and right sides of pages across all viewports to ensure expansive, well-proportioned layout composition. | Owner mandate via voice/audio message. | 2026-10-11 |
| A-18 | High-Fidelity Mockup Recreation: Sourced and recreated complete design and content from the 15 reference mockups in `images/`, including 4 gold corner brackets around hero portrait, active nav link indicator with centered gold dot, 3 iconic fact rows in About, 6 projects with dark UI mockups, 3x2 skills grid with authentic tech brand icons, segmented pill switcher for Credentials/Events, verified academic records (93.2%, 94.6%, 7.62 CGPA), and deep navy contact section. | Owner mandate via voice/audio message. | 2026-10-11 |

## 2. Proposed Decisions (NOT approved)

| ID | Proposal | Rationale |
|---|---|---|
| P-01 | ~~Framework proposal~~ — promoted to APPROVED as A-10 on 2026-10-11. | Owner approval. |
| P-02 | Animation: CSS transitions first; `motion` (Framer Motion) only if needed for modal/sheet choreography. | Keeps bundle small and motion restrained. |
| P-03 | Single-page with hash anchors; no client router except optional `/projects` view. | Matches section-scroll navigation. |
| P-04 | Modals built on native `<dialog>` or an accessible primitive (e.g. Radix Dialog). | Focus trap and Escape handling are hard to get right by hand. |
| P-05 | Tablet (768px) and mobile (375px) layouts for all sections except popups are **proposals** derived from desktop. | Only desktop references (and popup mobile frames) are believed to exist. |
| P-06 | Hosting on a static host (Vercel, Netlify or Cloudflare Pages). | Static output. |
| P-07 | Icons from a single outline icon set (e.g. Lucide) at 1.5px stroke; brand icons for LinkedIn/GitHub. | Consistent thin-line style matching gold hairlines. |
| P-08 | Fonts: a high-contrast serif for headings, a clean sans for body, a mono for labels; specific families in `design-system.md` are recommendations. | Owner specified roles, not families. |
| P-09 | LearnPath AI appears both as About's featured card and in the Projects grid, as a deliberate exception to "no duplication". | Owner spec asks for both. |
| P-10 | Skills groups show plain lists; optional "Strong / Working knowledge" labels only if the owner confirms. | Avoids unverified self-ratings. |

## 3. Unresolved Decisions

| ID | Question | Blocks |
|---|---|---|
| U-01 | ~~Vite vs Next.js~~ — RESOLVED: Vite + React + TS + Tailwind (A-10). | — |
| U-02 | ~~Batch years~~ — RESOLVED: 2024–2028 (Expected) at SIT Nagpur, Sem 4 CGPA 7.62 (A-18, from `images/`). | — |
| U-03 | ~~Leadership titles~~ — RESOLVED: Event Manager (CSI SIT Nagpur, Jan 2025–Pres) & Student Branch Chair (IEEE SIT Nagpur, Aug 2025–Pres) (A-18). | — |
| U-04 | Canonical domain; keep or drop analytics. | SEO, TRD |
| U-05 | Destination of "View all projects": links to GitHub repositories (A-18). | — |
| U-06 | Resume location and filename: `/resume.pdf` or anchor `#resume` (A-18). | — |
| U-07 | ~~Contact URLs~~ — RESOLVED: aswinbinu006@gmail.com, linkedin.com/in/aswin-binu, github.com/aswinbinu006 (Owner explicit instruction). | — |
| U-08 | ~~Location line~~ — RESOLVED: "Nagpur, Maharashtra, India" (A-18). | — |
| U-09 | ~~Certificate list~~ — RESOLVED: 4 verified certificates (Google ML Engineer, AWS Cloud Practitioner, Coursera Deep Learning, Meta FE) (A-18). | — |
| U-10 | ~~Academic data~~ — RESOLVED: 10th 93.2%, 12th 94.6%, B.Tech 7.62 CGPA, detailed semester breakdowns (A-18). | — |
| U-11 | ~~Events design reference~~ — RESOLVED: `images/Certificates and Leadership Portfolio.png` (A-18). | — |
| U-12 | ~~Event metadata~~ — RESOLVED: 6 verified events with posters, tags, and roles (A-18). | — |
| U-13 | ~~Project metadata~~ — RESOLVED: 6 projects with dark UI mockups, highlights, and modal galleries (A-18). | — |
| U-14 | Which Antigravity instruction mechanism loads `MODEL.md`. | Setup |

### 3.1 Owner Instruction: Deferred Content (2026-10-11)

The owner instructed that the following items be **left blank** and that the owner will add the real values after the website is fully built: U-02 (batch years, current semester), U-03 (leadership titles), U-04 (domain, analytics), U-05 (View all projects destination), U-06 (resume filename/location), U-07 (GitHub, LinkedIn, email URLs), U-08 (location), U-09 (certificates), U-10 (school and university marks), U-12 (event years), U-13 (project role, year, contribution).

Consequences (PROPOSED handling, pending approval of this approach):
- Items stay **UNRESOLVED**; blank is not a decision and nothing is invented to fill them.
- The build must render clean empty states: actions with no URL are hidden, missing fields are omitted, empty lists show a neutral "Coming soon" style state or the section/tab is hidden. No fake placeholders.
- All such values live only in `src/data/` so the owner can fill them without touching components.
- The production-content gate (`check:content`) is run in **warn mode** during the build and switched to **blocking mode** before launch.
- "View all projects" is omitted until U-05 is answered.

Not deferrable: U-01 (framework) must be chosen before scaffolding, because it cannot be left blank. U-11 and U-14 do not block the build (see `MODEL.md` and `docs/implementation-plan.md`).

## 4. Inspection Limitations (recorded 2026-10-11)

- The working directory was empty when documentation was written: no repository, source files, dependency manifests or Git history were available to inspect.
- No UI reference images or design notes were available to inspect. Visual direction in `UI-UX.md` is derived from the written specification only.
- The legacy repository (`aswinbinu006/Aswin-Binu---Portfolio`) was not inspected. If used, it is a **read-only content source** (see `MODEL.md` §5): do not reuse its visual layer or effects, do not import `certificates.ts` (sample data), and treat its metrics and marks as unverified.
- `docs/recruiter-requirements.md` was referenced in review notes but is not present. If supplied, its blocking items outrank PRD/UI-UX (see `MODEL.md` §3).

## 5. Change History

| Date | Change |
|---|---|
| 2026-10-11 | Initial documentation set created. All items above start in their listed status. |
| 2026-10-11 | Owner instruction recorded (§3.1): deferred content fields stay blank until after the build. Status of those items unchanged (UNRESOLVED). |
| 2026-10-11 | Owner instruction: Updated email to `aswinbinu006@gmail.com` and GitHub to `aswinbinu006`. Added direct portfolio email service to Contact section. Standardized all 6 project modals to 4-thumbnail gallery layout matching FinSight AI design reference. |
