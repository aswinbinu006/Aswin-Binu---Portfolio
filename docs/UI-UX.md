# UI/UX Document — Aswin Binu Portfolio

## 1. Design Principles
1. **One Continuous Story, Not Sections** — each chapter feels like another room in the same handcrafted universe, not a stack of disconnected templates.
2. **Every Animation Has a Reason** — motion serves an action (revealing an archive, pulling a record off the wall, confirming an action). No animation runs just to look busy.
3. **Restraint Over Density** — quiet, matte surfaces; blue illumination (`#5FA8FF`) appears only where an object is active or inspected.
4. **Mobile Is Not a Fallback** — distinct vertical exhibition structures designed specifically for mobile (~375px–430px viewports).

## 2. Design Tokens (Locked)

### Color Palette
| Purpose | Hex |
|---|---|
| Black Void | `#020814` |
| Deep Navy / Surface | `#061A3A` / `#12151c` |
| Nebula Blue | `#0F4C81` |
| Soft Glow Accent | `#5FA8FF` |
| Off White / Text | `#F7FBFF` / `#f8fafc` |

*Rule:* Blue is the single accent color for the UI design system. No purple gradients, no neon cyan, no rainbow fills.

### Typography
One typeface everywhere: **Azeret Mono** (`'Azeret Mono', monospace`).
- Hero display: 800 weight, `-0.04em` tracking
- Section titles: 700 / 800 weight, uppercase
- Body copy: 400 weight, leading-relaxed
- Archival metrics / badges: 600 weight, uppercase tracking

### Materials
1. **Frosted Glass**: `backdrop-filter: blur(14px)` with low-opacity white border (`border-white/10` to `border-white/20`).
2. **Matte Metal**: Flat dark architectural mounting plates (`bg-[#0d1017]` / `bg-[#12151c]`), rivet pins, and hairline borders.
3. **Light**: Soft blue glow (`#5FA8FF`) used sparingly as perimeter rim light and active state beacon.

---

## 3. Chapter-by-Chapter UX Structure

### Chapter 1 — The Statement (Hero)
Pure black screen, name revelation, moving spotlight beam, and seamless crack universe transition.

### Chapter 2 — The Operator (About)
60/40 asymmetrical split. Left: architectural narrative copy and 4 identity telemetry chips. Right: command console portrait with gentle tilt.

### Chapter 3 — Skill Constellation
Interactive 4-quadrant neural graph topology. Hovering or focusing a node illuminates connected technical pathways and dims unrelated clusters.

### Chapter 4 — Project Gallery
Asymmetrical layout with lead case study card. Living expansion cards on desktop, accordion panels on mobile.

### Chapter 5 — Event Archive
Museum exhibition wall featuring varied poster aspect ratios (portrait, tall, wide, square) with rich in-place detail inspection.

### Chapter 6 — Academic Archive (The Academic Wall)
**Visual Identity**: Physical exhibition archive wall floating in space.
- **Entry Feel**: Smooth camera approach transition upon scrolling into view.
- **Spatial Hierarchy**:
  - *Background*: Deep sapphire cosmic starlight.
  - *Midground*: Architectural exhibition wall and illuminated progression trajectory conduit.
  - *Foreground*: Selected academic record or semester artifact pulled in-place.
- **Milestones**:
  - *01 — Secondary School (10th)*: CBSE certificate (2020), 91.2% aggregate, with in-place expandable subject marks drawer (Mathematics 95, Science 92, Computer Applications 94).
  - *02 — Senior Secondary (12th)*: HSC Pure Science & CS (2022), 87.4% aggregate, with expandable marks drawer (CS 96, Mathematics 92, Physics 88).
  - *03 — University (B.Tech SIT)*: Symbiosis Institute of Technology, B.Tech CSE (AI & ML), 2023–2027. Supporting CGPA telemetry (7.58 / 10.0 across Sem 1–4: 7.60, 7.60, 7.62, 7.48), SGPA progression sparkline, and rack of semester plates with Sem 5 currently active.
- **In-Place Interaction**: Clicking or focusing any semester plate pulls the record off the wall via GSAP elevation (`scale: 1.02`), illuminating its edge in soft blue (`#5FA8FF`) and revealing subjects, grades, credits, and focus domain. No popup modals.

### Chapter 8 — Contact
Calm horizon silver starlight. Minimalist tactical uplink with direct communication channels and clipboard feedback.

---

## 4. Hidden Discoveries & Ambient Events
- **Discovery 01 — Constellation Extension**: Clicking empty background space has a 20% chance to reveal an intricate 8–10 star constellation.
- **Discovery 02 — Neural Topology**: Rare chance (~8%) for cosmic stars to connect into a feedforward neural network structure, dissolving naturally without labels.
- **Discovery 03 — Graduation Cap Trace**: When in Chapter 6 (Academic Archive), cosmos clicks can form a subtle graduation cap silhouette.
- **Discovery 04 — Paper Trace**: Rare ambient event (110–190s) gliding an illuminated paper-plane starlight vector across the screen.
- **Rare Ambient Events**: Infrequent shooting stars (45–80s), distant satellite flybys (90–160s), and subtle star cluster shimmer synchronization.
- **No Cursor Following**: Stars and lighting never follow or magnetize to the mouse cursor; interaction is deliberate.

---

## 5. Accessibility & Reduced Motion
- **Full Keyboard Navigation**: `Tab`, `Enter`, `Space`, `Escape` supported across all cards, plates, and buttons.
- **`prefers-reduced-motion`**: Instant reveals, disabled 3D parallax, and static starfields with 0 dropped frames.
- **Mobile First**: Clean vertical exhibition spine for viewports from 375px upward.
