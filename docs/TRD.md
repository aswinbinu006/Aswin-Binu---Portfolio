# TRD — Aswin Binu Portfolio (Next.js)

## 1. Purpose
Technical companion to PRD.md — how the site is built, not what it
does. Read alongside DESIGN-TOKENS reference in UI-UX.md §1 for the
visual constants this document assumes.

## 2. System overview
```
[Next.js app, static/SSR pages]
        |
        +--> [Background.tsx — shared background coordinator]
        |         (spotlight, pinned crack transition, crack SVG, grain)
        |         |
        |         +--> [CinematicNebula.tsx — hybrid WebGL (OGL) + Canvas 2D]
        |                   (JWST photo, fBm UV warp, breathing, real-star overlay, constellations)
        |
        +--> [Chapter components — render content on top of the background]
        |
        +--> [SmoothScroll.tsx — Lenis <-> GSAP ScrollTrigger sync]
```
No backend, no database, no auth. This is a static portfolio site with client-side WebGL acceleration.

## 3. Environments
| Environment | Notes |
|---|---|
| Local dev | `npm run dev`, default for all development |
| Production | Vercel (assumed) — domain decision still open, see PRD.md §10 |

## 4. Tech stack
- Next.js (App Router)
- Tailwind CSS
- GSAP + GSAP Flip + ScrollTrigger
- Lenis (smooth scroll)
- OGL (minimal WebGL library) for full-screen JWST texture warping and luminance breathing
- Canvas 2D overlay for pre-rendered dust sprites, hero-star spikes, shooting stars, and real-star constellations
- Azeret Mono via `next/font/google` — the only typeface in the project

## 5. The shared background system & CinematicNebula contract
`components/background/Background.tsx` is the single owner of background state across every chapter. It houses:
- Chapter 1: Pure-black void and moving spotlight. CinematicNebula is mounted and preloaded, but invisible (`reveal < 0.01`), doing zero GPU work.
- The Transition: Seamlessly scrubbed across Chapter 1 scroll directly into Chapter 2 (no dead pin gaps). Drives `control.current.reveal` (0 -> 1), dissolving the black void and moving spotlight smoothly to reveal the living nebula.
- Chapter 2: The living nebula is fully revealed with fBm UV displacement and luminance breathing.
- Dissolve Phase: A second ScrollTrigger between `#chapter-2` (center top) and `#chapter-4` (top center) scrubs `control.current.dissolve` (0 -> 1). The photo dims to a 12% floor (`uPhoto`), displacement/breathing scale to 0, detected stars fade in on the 2D overlay at the exact coordinates of the photo's real stars, and hero spikes retain a 40% sparkle. At `dissolve >= 0.999`, WebGL rendering halts completely to eliminate fBm GPU costs.
- Chapters 4 to 8: Minimal starfield on near-black. Click-only constellations connect the 4–8 nearest detected stars and dissolve in 2.5s. Opt-out supported via `[data-no-constellation]`.

`control` contract:
`React.MutableRefObject<NebulaControl>` with `{ reveal: number, dissolve: number }`. Never updated via React state on scroll frames to avoid re-render overhead. Both triggers scrub in reverse on scroll-up. Reduced-motion instantly sets `reveal = 1`, while dissolve remains scroll-scrubbed.

## 6. The Living Expansion Card mechanic
Lives in `ProjectCard.tsx`. Branches on `event.pointerType`:
- `mouse` → hover expands and locks open via `onPointerEnter`/
  `onPointerLeave`, collapses only when the cursor leaves the entire
  expanded zone
- non-mouse (touch) → tap toggles open/closed (accordion equivalent)

Both paths animate through GSAP Flip, not CSS transitions alone, to
avoid flicker on rapid state changes. Timing sequence (lift → expand →
image sharpens → text enters → buttons appear) is implemented via
`Flip.from`'s `onEnter` stagger against the locked timing table in
UI-UX.md.

## 7. Data model
No database. Static typed models define content across chapters:
- **Projects**: `lib/projects.ts` as a typed array (`Project[]`).
- **Skills Constellation**: `lib/skills.ts` as a typed array (`Skill[]`), capturing clusters (Core, AI, Product, Leadership), directional connections (`connectedSkillIds`), and normalized 2D topology coordinates.
- **Event Archive**: `lib/events.ts` as a typed array (`EventItem[]`), capturing titles, years, summaries, stories, roles, team sizes, attendee metrics, poster aspect ratios, and placeholder photo sets.

Adding/editing records is a code change, not a CMS entry. Revisit if content updates become frequent enough to justify a headless CMS — not needed yet.

## 8. Performance requirements
- Crack transition and card expansion: no dropped-frame jank on a
  mid-range mobile device, not just desktop
- `prefers-reduced-motion`: every custom animation (crack transition,
  constellation clicks, portrait tilt, card Flip) has a correct
  reduced/instant fallback, verified by testing with the OS setting
  on, not assumed from the code
- Canvas starfield: fixed star count (currently 90), not scaled by
  viewport size — revisit only if a specific device shows a real
  perf issue

## 9. Accessibility requirements
- Visible keyboard focus (`.focus-ring`) on every interactive element
- All interactive elements reachable and operable by keyboard, not
  just pointer (this includes the project cards — confirm Enter/Space
  triggers the same expand behavior as click)
- Responsive down to ~375px width as a first-class target, not a
  fallback

## 10. Testing strategy
Priority order for a static, no-backend site:
1. Manual verification of the crack transition and card-expansion
   mechanic on both a real mobile device and desktop — these are the
   two custom, hand-built interactions most likely to break silently
2. `prefers-reduced-motion` fallback paths, verified with the OS
   setting toggled on
3. Lighthouse pass (performance + accessibility) before each phase is
   considered done
4. Cross-browser check (Safari specifically, given backdrop-blur and
   canvas usage) — not the priority, but worth one pass before deploy

## 11. Out of scope for Phase 1
- Any Phase 2/3 chapter (Skill Constellation, Event Archive, Academic
  Dashboard, Playground)
- CMS/admin content editing
- Analytics/tracking (add later if wanted — not assumed here)
- i18n
