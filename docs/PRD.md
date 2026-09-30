# PRD — Aswin Binu Portfolio

## 1. Summary
A cinematic, handcrafted personal portfolio website — one continuous
scroll-driven story across distinct chapters, not a set of static pages. Built
to be distinct from AI-generated landing pages, SaaS templates, and
Framer clones.

## 2. Problem
A generic portfolio (templated hero, feature-card grid, testimonials)
doesn't differentiate a third-year student from hundreds of other
candidates with similar coursework. Recruiters give a site seconds of
attention; there's no room for a site that looks like everyone else's.

## 3. Goals
- Make a recruiter stop within 3 seconds of landing
- Make the interactions themselves memorable enough to create
  word-of-mouth ("did you see this guy's portfolio")
- Present real project work and academic development with genuine depth (role, stack, outcome, progression)
  that it reads as authentic substance, not decoration
- Maintain strict aesthetic discipline (Azeret Mono, locked blue palette, frosted glass, matte metal)

## 4. Non-goals
- **No Mini-Game / No Playground Canvas**: The previously proposed "Data Dash" game concept is completely removed. The site maintains a calm, focused, and elevated cinematic tone without gimmicks.
- Hidden discoveries are ambient, subtle, and self-discovered — no "Easter Eggs" labels or game mechanics.
- CMS or admin panel — content is structured via strongly typed data files (`src/lib/` and `src/data/`).
- Multi-language support.

## 5. Audience
Primary: recruiters and engineering leaders evaluating Aswin for AI/ML Engineer
and Systems roles, most likely arriving via a LinkedIn link on mobile. Secondary:
other developers and researchers inspecting interactions, architecture, and code.

## 6. Structure — Story Chapters

| # | Chapter | Hero / Visual Identity | Phase | Status |
|---|---------|------------------------|-------|--------|
| 1 | The Statement | Monolithic Name & spotlight sweep | 1 | Complete |
| 2 | The Operator | Editorial intro dossier & portrait | 1 | Complete |
| 3 | Skill Constellation | 4-Quadrant interactive neural topology | 2 | Complete |
| 4 | Project Gallery | Asymmetrical living expansion cards | 1 | Complete |
| 5 | Event Archive | Museum exhibition wall posters | 2 | Complete |
| 6 | Academic Archive | The Academic Wall / Archival evidence | 3 | Complete |
| 8 | Contact | Tactical uplink & verified channels | 1 | Complete |

*(Note: There is no Chapter 7 or playground section; the story flows seamlessly from Chapter 6 Academic Archive directly into Chapter 8 Contact.)*

## 7. Key Feature: Academic Archive (The Academic Wall)
- **Concept**: A spatial exhibition wall floating in the universe presenting authentic evidence of academic development, rather than a generic marks dashboard or KPI grid.
- **Chronological Trajectory**: An illuminated architectural conduit connecting:
  1. *Phase 01 — Secondary School (10th)*: CBSE certificate (2020), 91.2% aggregate, and in-place subject mark inspection.
  2. *Phase 02 — Senior Secondary (12th)*: HSC PCM + CS certificate (2022), 87.4% aggregate, and subject-level breakdowns.
  3. *Phase 03 — University (B.Tech)*: Symbiosis Institute of Technology (SIT), B.Tech CSE (AI & ML), 2023–2027, with cumulative CGPA (7.58 / 10.0 across Sem 1–4: 7.60, 7.60, 7.62, 7.48), ascending SGPA progression trajectory, and in-place expandable semester record plates (currently in Semester V).
- **Physical Feel**: Matte metal borders, mounting pins, frosted glass surfaces, and restrained blue illumination for active/selected artifacts.

## 8. Key Feature: Hidden Discoveries & Rare Ambient Events
- **Discovery 01 — Constellation Extension**: Clicking empty cosmic space has a rare probability to temporarily extend constellations with additional geometric bridging nodes.
- **Discovery 02 — Neural Topology**: Rare chance for stars to connect into a subtle multi-layer neural network silhouette, dissolving naturally without labels or text.
- **Discovery 03 — Graduation Cap Trace**: When exploring Chapter 6 (Academic Archive), background cosmos clicks can form a subtle graduation cap silhouette.
- **Discovery 04 — Paper Trace**: Rare ambient event where a tiny illuminated paper-plane silhouette glides softly across deep space on an aerodynamic spline.
- **Rare Ambient Events**: Controlled, infrequent shooting stars (45–80s), distant satellite flybys (90–160s), and subtle star cluster shimmer synchronization.
- **No Cursor Following**: Cursor does not control stars, camera, or lighting — deliberate interaction only.

## 9. Success Criteria & Accessibility
- Clean 60 FPS performance across desktop and mobile.
- Full keyboard navigation across all interactive elements (Tab, Enter, Space, Escape).
- Robust `prefers-reduced-motion` compliance across all GSAP and OGL shaders.
- Distinct mobile layout optimized for 375px/390px/430px viewports.
