# UI/UX Document — Aswin Binu Portfolio

## 1. Design principles
1. **One continuous story, not sections** — each chapter should feel
   like it belongs to the same handcrafted world, not a stack of
   independently-designed blocks.
2. **Every animation has a reason** — motion answers an action
   (opening, revealing, confirming). No animation runs just to look
   busy. See the motion language table below.
3. **Restraint over density** — one bold, memorable moment per
   chapter; everything around it stays quiet. Cut a decoration before
   adding another one.
4. **Mobile is not a fallback** — most visitors arrive from a LinkedIn
   link on a phone. Every desktop interaction has a real mobile
   equivalent, designed alongside it, not bolted on after.

## 2. Design tokens (locked)

### Color
| Purpose | Hex |
|---|---|
| Black Void | `#020814` |
| Deep Navy | `#061A3A` |
| Nebula Blue | `#0F4C81` |
| Soft Glow | `#5FA8FF` |
| White | `#F7FBFF` |

Blue is the only accent for the UI design system. No purple, no neon cyan, no rainbow gradients.
*Explicit exception:* The authentic background JWST nebula photo (`/nebula.webp`) carries its own natural cosmic warm colors; all interface elements, overlays, text, buttons, and constellation traces remain strictly in the locked blues.

### Background Journey
| Phase | Chapter Range | Background State | Motion & WebGL State |
|---|---|---|---|
| 1. Void & Spotlight | Chapter 1 | Pure black void with subtle floor spotlight behind name | WebGL mounted but invisible (`reveal < 0.01`), 0 GPU work |
| 2. Fracture Crack | Transition (Ch 1 -> 2) | Spotlight drops, blue cracks radiate, void dissolves | `reveal` scrubs 0 -> 1 via pinned timeline, revealing nebula |
| 3. Living Nebula | Chapter 2 | Full JWST photo, glowing gas, dust, hero-star spikes | WebGL fBm UV warp + luminance breathing active |
| 4. Star Dissolve | Ch 2 -> Ch 4 | Photo dims to 12% floor, real stars fade up on overlay | `dissolve` scrubs 0 -> 1; at 0.999, WebGL halts completely |
| 5. Deep Space Stars | Chapters 4 to 8 | Minimal starfield on near-black void | Zero fBm GPU load; 2D starfield and click-constellations run |

### Typography
One typeface, everywhere: **Azeret Mono**.

| Element | Weight |
|---|---|
| Hero name | 800 |
| Section titles | 700 |
| Body | 400 |
| Buttons | 500 |
| Stats | 700 |

Hero letter-spacing `-0.04em`. No text gradients, no outline, no glow
on the type itself — glow belongs to the environment.

### Materials
Only three exist: frosted glass (backdrop-blur + low-opacity border),
matte metal (flat dark surface, subtle highlight, no gloss), and light
(the soft-glow accent, used sparingly as rim light/spotlight — never a
fill color). No random glowing blobs.

### Motion language
| Action | Animation |
|---|---|
| Enter | Slide + blur |
| Exit | Morph |
| Hover | Lift |
| Click | Ripple |
| Expand | GSAP Flip |
| Scroll | Pin + transform |

### Living Expansion Card timing
| Time | Action |
|---|---|
| 0ms | Lift |
| 80ms | Expand |
| 180ms | Image sharpens |
| 240ms | Text enters |
| 320ms | Buttons appear |
| 350ms | Finished |

## 3. Chapter-by-chapter structure

### Chapter 1 — The Statement
Full black screen, name only, nothing competes with it. Small "Scroll"
indicator. Ends in the crack transition — see TRD.md §5.

### Chapter 2 — Introduction
60/40 split. Left: one powerful sentence, short intro, four info chips.
Right: portrait with slight scroll-driven tilt, glass reflection edge,
blue rim glow. No gimmicks beyond that.

### Chapter 3 — Skill Constellation
Centerpiece interactive topology. Asymmetrical editorial composition avoiding
uniform grids or circles. Quiet cluster names floating directly in the scene.
Hover, tap, or keyboard focus illuminates a skill star and all connected skills,
animating SVG line traces and dimming unrelated nodes. Node clicks stop propagation,
while clicking empty space continues triggering the background cosmos constellation.

### Chapter 4 — Project Gallery
Asymmetrical layout, not a uniform grid — the lead project gets a
larger card. Living Expansion Cards per the timing table above; mobile
gets a tap-to-open accordion using the same visual language, not a
simplified copy.

### Chapter 5 — Event Archive
Museum exhibition wall display with editorial imbalance and varying poster aspects
(portrait, tall, wide, square). Posters show title and year only in rest state.
Click/tap triggers smooth layout expansion revealing hero poster, story,
role, team & participant metrics, and photo placeholders. Integrated with Lenis
scroll pausing, body scroll locking, and Escape/outside-click restoration.

### Chapter 8 — Contact
Everything slows down. One sentence, one set of links (GitHub,
LinkedIn, Resume, Email). Soft blue glow settles behind the CTA area —
restrained, not a giant glowing button.

## 4. Core interactions

### Constellation click
Clicking empty background space (once the cosmos state is revealed,
i.e. Chapter 2 onward) connects 4–8 nearby stars into a temporary
shape, holds ~2.5s, dissolves. The background never reacts to cursor
movement — only intentional clicks.

### Project card expansion
See TRD.md §6 for the technical mechanism. From a UX standpoint: hover
expand-and-lock on desktop, tap-toggle on mobile, both using the same
timing sequence so the interaction feels consistent across devices
even though the trigger differs.

## 5. Screen/section states (required, not optional polish)
Every chapter needs a defined state for:
- Initial/entry (what it looks like when scrolled into)
- Interactive/active (hover-expanded card, active constellation, etc.)
- Reduced-motion fallback (see below)

A chapter shipped without a defined reduced-motion state is not done.

## 6. Responsive behavior
- Mobile-first baseline: ~375px width
- 60/40 splits (Chapter 2) and multi-column grids (Chapter 4) stack
  vertically below the `md` breakpoint
- Hover-only interactions (card lock-open, portrait tilt) have a
  distinct touch equivalent — never just "hover doesn't fire on
  mobile, so nothing happens"

## 7. Accessibility checklist
- Visible keyboard focus on every interactive element
- Keyboard-operable project cards (Enter/Space expands, matching
  click behavior)
- `prefers-reduced-motion` respected for every custom animation: crack
  transition, constellation clicks, portrait tilt, card Flip — each
  needs an instant/reduced fallback, not just a slower version
- Sufficient contrast between `--off-white` text and the
  `--black-void`/`--deep-navy` backgrounds (verify at final copy sizes,
  not just token values)

## 8. Banned — non-negotiable
- Inter, Satoshi, Outfit, Manrope, Space Grotesk, or any second
  typeface at all
- Neon cyberpunk themes
- Giant glowing CTA buttons
- Floating random glass blobs
- Generic feature-card grids
- Endless testimonial sections
- Centered template layouts repeated across chapters
- Cursor-following particle effects
- Animation without a specific reason

## 9. What this document does not cover
Pixel-level mockups — none exist yet. This document is the structural/
behavioral spec to build to until real mockups (if any) are produced.
Phase 2/3 chapters (Skill Constellation, Event Archive, Academic
Dashboard, Playground) are intentionally not detailed here — spec them
when their phase starts, against real content per PRD.md §10.
