# PRD — Aswin Binu Portfolio (Next.js)

## 1. Summary
A cinematic, handcrafted personal portfolio website — one continuous
scroll-driven story across 8 chapters, not a set of static pages. Built
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
- Present real project work with enough depth (role, stack, outcome)
  that it reads as substance, not decoration
- Ship a working v1 rather than a perfect, never-finished v3

## 4. Non-goals (v1 / Phase 1)
- Chapters 3, 5, 6, 7 (Skill Constellation, Event Archive, Academic
  Dashboard, Playground) — sequenced into Phase 2/3, not v1
- Hidden constellations / rare background events (shooting stars,
  satellite flybys) — nice-to-have, never load-bearing
- CMS or admin panel for editing content — content is hardcoded/data
  files for now, no non-technical editing flow in v1
- Multi-language support

## 5. Audience
Primary: recruiters and engineers evaluating Aswin for AI/ML Engineer
roles, most likely arriving via a LinkedIn link on mobile. Secondary:
other developers who may inspect the interactions/code out of interest.

## 6. Structure — the 8 chapters

| # | Chapter | Hero | Phase | Status |
|---|---------|------|-------|--------|
| 1 | The Statement | Name | 1 | Complete |
| 2 | Introduction | Portrait | 1 | Complete |
| 3 | Skill Constellation | Interactive skill graph | 2 | In Progress |
| 4 | Project Gallery | Living Expansion Cards | 1 | Complete |
| 5 | Event Archive | Exhibition posters | 2 | In Progress |
| 6 | Academic Dashboard | SGPA graph | 3 | Planned |
| 7 | Playground | Mini-game | 3 | Planned |
| 8 | Contact | CTA | 1 | Complete |

## 7. Key feature: the crack transition + shared cosmos background
- Chapter 1 is pure black void with a spotlight sweep, zero stars, and zero WebGL GPU work
- A single scroll-triggered "crack" moment (pinned between Chapter 1 and
  2) reveals a living hybrid WebGL (OGL) + Canvas 2D JWST nebula background
- Chapter 2 showcases the living nebula with organic fBm UV warp and luminance breathing
- Between Chapter 2 and Chapter 4, the photo dissolves to a 12% floor as its real stars pick up on the 2D overlay, and WebGL rendering halts completely to preserve GPU performance for remaining chapters
- Chapters 4 through 8 continue across the minimal starfield with click-only constellations
- This shared journey is orchestrated by one coordinator (`Background.tsx`) rather than per-chapter reloads (see TRD.md §5)

## 8. Key feature: Living Expansion Cards (Project Gallery)
- Hover expands a project card and **locks it open** until the cursor
  leaves the entire expanded zone — not a simple hover-toggle
- Mobile equivalent: tap-to-open accordion, not a degraded hover
  simulation
- Overridden nothing from an earlier doc — this is the mechanism as
  originally specified, just sequenced into Phase 1 because the
  Project Gallery is one of the four ship-blocking chapters

## 9. Success criteria (Phase 1 & Phase 2)
- Chapters 1, 2, 3, 4, 5, 8 live and integrated into one continuous universe
- Crack transition, Skill Constellation connections, and card/poster expansions run without visible jank
- `prefers-reduced-motion` produces a correct, non-broken fallback for
  every custom animation, not just a suggestion to skip
- Site is legible and fully usable on a ~375px-wide mobile viewport

## 10. Open questions / dependencies & placeholders
- Final 3 projects for the Project Gallery, plus their real copy,
  links, and screenshots — currently placeholder data
- Final 4 chip labels for Chapter 2 — currently a guess
- Additional 4 skills to expand the 16-skill constellation graph in Phase 3
- Final event copy, narratives, and confirmed dates for the 7 events in Event Archive
- Archival photos and asset links for Event Archive photo placeholder tiles
- Final verified participant and team metrics across all curated events
- Hosting/domain decision — Vercel assumed, custom domain vs subdomain
  not yet decided

## 11. Milestones (suggested)
1. Phase 1 core (Ch. 1, 2, 4, 8) scaffolded and running locally — done
2. Phase 2 (Ch. 3 Skill Constellation, Ch. 5 Event Archive) scaffolded & integrated — in progress
3. Real content swapped in for all Phase 1 & 2 placeholders
4. Deployed, verified on a real mobile device
5. Phase 3 (Ch. 6 Academic Dashboard, Ch. 7 Playground, hidden discoveries) — stretch, cut freely
