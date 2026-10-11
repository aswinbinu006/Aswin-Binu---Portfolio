# Implementation Plan

**No application code is written until Phase 0 approval is recorded in `decision-log.md`.**

## Phase 0 — Documentation Approval Gate

| Item | Detail |
|---|---|
| Deliverables | All files in the documentation set |
| Dependencies | Owner review |
| Acceptance | Approval checklist (below) fully ticked; framework decision U-01 resolved; decisions recorded as APPROVED with dates |
| Verification | Owner sign-off in decision log |

### Approval Checklist

- [ ] Palette and typography direction confirmed (including font families)
- [x] Framework choice approved: Vite + React + TS + Tailwind (A-10)
- [ ] Section structure and navigation labels confirmed
- [ ] Popup layouts (7 variants) confirmed
- [ ] Tablet/mobile proposals accepted or revised
- [ ] Deferred content approach accepted: blank fields with clean empty states; owner fills `src/data/` after the build (decision log §3.1). Replaces the need to decide U-02, U-03, U-04, U-05, U-06, U-07, U-08, U-09, U-10, U-12, U-13 before the build.
- [ ] Antigravity instruction mechanism for `MODEL.md` configured (U-14)
- [ ] Content-supply plan agreed (links, resume, portrait, screenshots, academic data, certificates, events)
- [ ] Owner states "documentation approved"

## Phase 1 — Scaffold and Tokens

Depends on: Phase 0. Create project in a separate folder (legacy repo, if any, remains read-only). Set up TS strict, lint, formatting, test tooling, tokens CSS, fonts, base layout, skip link. **Acceptance:** `dev`, `build`, `lint`, `typecheck` pass; token page shows palette. **Verify:** screenshot of tokens; contrast measurements recorded.

## Phase 2 — Shared Primitives

Depends on: 1. Button, Chip, IconLink, Tabs, Card, Modal, BottomSheet, Table, SectionHeader. **Acceptance:** states per design system; keyboard operable; unit tests. **Verify:** a11y checks on a primitives demo.

## Phase 3 — Layout and Navigation

Depends on: 2. Navbar, MobileMenu, Footer, active-section hook, anchors. **Acceptance:** nav behaviour per specs at 3 widths. **Verify:** Playwright navigation tests.

## Phase 4 — Data Layer

Depends on: 1. Types, data modules, validation script, content gate. Only verified content; blocked items stay empty or dev-fixture only. **Acceptance:** `check:content` fails on placeholders. **Verify:** unit tests.

## Phase 5 — Sections (Hero → Contact)

Depends on: 2, 3, 4. Build Hero, About, Projects, Skills, Credentials & Activity, Academics, Contact in order, each reviewed at 1440/768/375. **Acceptance:** per `UI-UX.md`; no overflow. **Verify:** screenshots + review after each section.

## Phase 6 — Popups

Depends on: 5. All 7 variants, scroll lock, focus management, gestures optional. **Acceptance:** modal checklist in popup doc passes. **Verify:** Playwright + manual keyboard/screen reader.

## Phase 7 — Motion

Depends on: 5, 6. Implement `animation-and-interactions.md`; reduced-motion support. **Acceptance:** durations ≤ spec; no layout animation. **Verify:** manual + reduced-motion emulation.

## Phase 8 — Content Integration

Depends on: owner-supplied assets/data (owner adds these after the build per decision log §3.1; the content gate runs in warn mode until then and blocking before launch). Replace missing items with approved real content; update `content-and-assets.md` approvals. **Acceptance:** no placeholders in production build. **Verify:** content gate + owner review.

## Phase 9 — Quality, SEO, Performance

Depends on: 8. Lighthouse, axe, link check, SEO assets, image optimization. **Acceptance:** `testing-and-quality.md` all green. **Verify:** CI report.

## Phase 10 — Deployment

Depends on: 9. Host setup, domain, HTTPS, preview → production. **Acceptance:** live URL passes smoke tests. **Verify:** deployment checklist; final report listing limitations.

## Parallelism

Phases 3 and 4 may run in parallel after Phase 2/1. Content collection (owner task) should start immediately, because Phase 8 and many popups depend on it.
