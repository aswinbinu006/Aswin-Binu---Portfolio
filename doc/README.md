# Aswin Binu — Personal Engineering Portfolio

A single-page portfolio presenting Aswin Binu's AI & ML engineering projects, skills, credentials, leadership activity and academic records. Visual identity: ivory, deep navy and thin gold lines, with static backgrounds.

> **Status: documentation phase.** No application code exists yet. Implementation begins only after the documentation is approved (`docs/implementation-plan.md`, Phase 0). The project will be built in Google Antigravity; the canonical instruction file is [`MODEL.md`](MODEL.md).

## Technology Stack

**Approved framework:** Vite + React + TypeScript + Tailwind CSS (decision A-10 in `docs/decision-log.md`; comparison with Next.js in `docs/TRD.md`). Other libraries are still proposals.

## Setup and Commands

To be finalized after scaffolding. Proposed scripts: `dev`, `build`, `preview`, `lint`, `typecheck`, `test`, `test:e2e`, `check:content`.

```bash
# After scaffold approval (placeholder, not yet runnable)
npm install
npm run dev
```

## Documentation

| Document | Purpose |
|---|---|
| [MODEL.md](MODEL.md) | Master rules for Antigravity |
| [docs/PRD.md](docs/PRD.md) | Product requirements |
| [docs/UI-UX.md](docs/UI-UX.md) | Visual direction and section layouts |
| [docs/design-system.md](docs/design-system.md) | Tokens, type, components, states |
| [docs/TRD.md](docs/TRD.md) | Technical requirements |
| [docs/architecture.md](docs/architecture.md) | Structure and data models |
| [docs/component-specifications.md](docs/component-specifications.md) | Component behavior and props |
| [docs/content-and-assets.md](docs/content-and-assets.md) | Content inventory and verification status |
| [docs/animation-and-interactions.md](docs/animation-and-interactions.md) | Motion rules |
| [docs/responsive-and-accessibility.md](docs/responsive-and-accessibility.md) | Breakpoints and accessibility |
| [docs/modal-and-popup-specifications.md](docs/modal-and-popup-specifications.md) | All seven popup variants |
| [docs/testing-and-quality.md](docs/testing-and-quality.md) | Tests and quality gates |
| [docs/implementation-plan.md](docs/implementation-plan.md) | Phased plan and approval gate |
| [docs/decision-log.md](docs/decision-log.md) | Approved, proposed, unresolved decisions |

## Content Integrity

All displayed content must be real and verified. Missing items (links, resume, portrait, screenshots, certificates, academic records, event details) are tracked in `docs/content-and-assets.md`. Nothing unverified may ship.

## Deployment Overview

Proposed: static hosting (Vercel, Netlify or Cloudflare Pages) with CI running lint, type-check, tests and build, and preview deployments before production. Domain and analytics are undecided (U-04).
