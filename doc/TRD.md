# Technical Requirements Document

Status: the framework (**Vite + React + TypeScript + Tailwind CSS**) is **APPROVED** (decision A-10, 2026-10-11). All other stack items below remain **PROPOSED** until recorded in `decision-log.md`.

## 1. Constraints

Static, content-driven single-page site; no backend, CMS, auth, or forms. Built in Google Antigravity per `MODEL.md`.

## 2. Framework Evaluation (decision U-01)

| Criterion | Vite + React + TS + Tailwind | Next.js (App Router) |
|---|---|---|
| Fit for one-page static portfolio | Excellent | Good (more than needed) |
| Build/dev speed, simplicity | Very fast, minimal config | Heavier |
| SEO / meta | Adequate with static HTML + meta tags; prerender optional | Strong: metadata API, static export |
| Routing needs | Hash anchors; optional small router | File-based routes, built in |
| Image optimization | Manual (build-time tooling) | Built in `next/image` |
| Hosting | Any static host | Static export or Node/edge host |
| Future growth (blog, per-project pages) | Add router/prerender | Natural |
| Bundle/JS overhead | Lower | Higher baseline |

**Decision (APPROVED, A-10): Vite + React + TypeScript + Tailwind.** Rationale: all content is static and in typed modules; popups replace per-project routes; simplest deployment and smallest bundle. Choose Next.js instead if per-project URLs, a blog, or richer SEO is wanted. Do not scaffold until the documentation approval gate is passed.

## 3. Proposed Stack

| Area | Proposal |
|---|---|
| Language | TypeScript, `strict: true` |
| UI | React 18+ function components |
| Styling | Tailwind CSS with design tokens mapped from `design-system.md` CSS variables |
| Animation | CSS transitions/keyframes first; optional `motion` for modal/sheet only if needed (P-02) |
| Modals | Accessible primitive (native `<dialog>` or Radix Dialog) (P-04) |
| Icons | Lucide (or one equivalent set) + brand SVGs |
| Fonts | Self-hosted via fontsource/woff2, `font-display: swap`; families per P-08 |
| Routing | Single page, section anchors with IntersectionObserver for active nav; optional `/projects` view (U-05) |
| State | Local component state + small context for modal selection; no global store |
| Data | Typed TS modules under `src/data/` (or JSON validated by TS types) |
| Lint/format | ESLint (typescript-eslint, jsx-a11y), Prettier |
| Tests | Vitest + Testing Library (unit); Playwright (e2e, visual, a11y with axe) |

## 4. Image Handling

- Real assets only. Source in `src/assets/` or `public/`.
- Serve WebP/AVIF with JPEG/PNG fallback; responsive `srcset`/`sizes`; explicit `width`/`height` to prevent layout shift.
- Hero portrait: eager, high priority. Everything below the fold: `loading="lazy"`, `decoding="async"`.
- Alt text required for every informative image.
- Max single image ~300KB after optimization (target).

## 5. Performance Targets

Lighthouse (mobile, production build): Performance ≥ 90, Accessibility ≥ 95 (target 100), Best Practices ≥ 95, SEO ≥ 95. LCP < 2.5s, CLS < 0.1, INP < 200ms. JS initial bundle target < 150KB gzip (proposed).

## 6. SEO

Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), one `h1`, unique title and description, canonical URL (domain U-04), Open Graph and Twitter tags, `robots.txt`, `sitemap.xml`, JSON-LD `Person` with only verified fields, favicon.

## 7. Analytics and Privacy

None by default. Adding analytics requires approval (U-04); if approved, privacy-friendly and no cookie banner needed where possible.

## 8. Deployment

Static host (Vercel, Netlify or Cloudflare Pages) (P-06). CI: install → lint → type-check → test → build → preview deployment. SPA fallback only if a client router is introduced. HTTPS, custom domain after U-04. Production build must fail (or warn loudly) if placeholder content flags are present.

## 9. Development Scripts (proposed)

| Script | Purpose |
|---|---|
| `dev` | Start dev server |
| `build` | Production build |
| `preview` | Serve production build |
| `lint` | ESLint |
| `typecheck` | `tsc --noEmit` |
| `test` | Unit tests |
| `test:e2e` | Playwright |
| `check:content` | Fail if unapproved/placeholder content or invalid URLs ship |

## 10. Browser Support

Last 2 versions of Chrome, Edge, Firefox, Safari; iOS Safari 16+; Chrome Android. Use dynamic viewport units (`dvh`) with fallbacks for bottom sheets.
