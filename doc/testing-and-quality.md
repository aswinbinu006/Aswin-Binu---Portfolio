# Testing and Quality

A task is not complete until applicable checks here pass and results are reported honestly (`MODEL.md` §7, §9).

## 1. Test Matrix

| Area | Checks | Method |
|---|---|---|
| Navigation | Every nav link scrolls to the right section; active underline tracks scroll; Let's Connect goes to Contact; AB. goes Home; labels identical across the site | Playwright |
| Mobile menu | Opens/closes via button, Escape, link; focus return; scroll lock | Playwright at 375px |
| Buttons | View Projects, Download Resume (file downloads, correct filename), icon links, View Project, Verify, View Live, GitHub, View Photos | Playwright |
| Links | No `#`, empty, `example.com` or placeholder URLs; external links `noopener noreferrer`; all return success (CI link check) | `check:content` + link checker |
| Modals | All 7 variants: open, ✕, Escape, backdrop, focus trap/restore, scroll lock, inner scroll | Playwright + manual |
| Tabs | Certificates/Events switching, arrow keys; semester tabs switch table | Playwright |
| Academics | Row click opens correct popup; keyboard activation | Playwright |
| Responsive | 320, 375, 768, 1024, 1440, 1920: no horizontal overflow, no clipped text, grids as specified | Playwright screenshots + overflow assertion |
| Content accuracy | Every shown fact maps to `Approved: Yes` entry; no placeholder or unverified items in production build; no invented stats | `check:content` + manual review against `content-and-assets.md` |
| Accessibility | axe: 0 serious/critical; keyboard-only run-through; screen reader smoke test; contrast measurements; focus visible; reduced-motion | axe-playwright + manual |
| Typography | Body ≥16px, secondary ≥14px, labels ≥12px | Computed-style test |
| Colors | Only tokens used; no gradients; gold not used for text | Lint/grep + visual review |
| Console | No errors or warnings on load or interactions | Playwright console listener |
| Performance | Lighthouse mobile: Perf ≥90, A11y ≥95, BP ≥95, SEO ≥95; LCP <2.5s, CLS <0.1 | Lighthouse CI |
| Build | `typecheck`, `lint`, `test`, `build` succeed with no warnings | CI |
| Images | All have alt, dimensions, lazy-load below fold; sizes within budget | Script |
| SEO | Title, description, canonical, OG, sitemap, robots, single h1 | Script + manual |
| Deployment readiness | Preview URL loads; HTTPS; 404 behaviour; resume reachable; env/domain set | Manual checklist |

## 2. Visual Verification

Capture screenshots at 1440, 768, 375 for each section and each open popup. Compare against the written spec and any approved references. Record deviations. Do not claim visual parity with a reference that was not inspected.

## 3. Content Gate (blocking)

Production build must fail if any of the following exist: `verification !== "verified"` content rendered, placeholder strings, fake certificate IDs, sample marks, missing alt text, invalid URLs.

## 4. Reporting Template

```text
Task: …
Docs read: …
Changes: …
Tests run: command → pass/fail
Visual checks: widths covered
Not done / limitations: …
Missing assets or content: …
Errors/warnings: …
```

## 5. Definition of Done

Acceptance criteria in `PRD.md` §7 satisfied; all checks above green; documentation updated for any approved change; decision log current.
