# Modal and Popup Specifications

Seven variants. Reference images were not available to confirm exact pixel layouts (see `decision-log.md` §4); layouts here are specified from requirements, and mobile frames for non-academic/project popups are PROPOSED.

## 1. Behavior Common to All Popups

| Concern | Rule |
|---|---|
| Open | Triggered by click/Enter/Space on card, row or action. One popup at a time. |
| Close | Visible Close (✕) button ≥44×44px, Escape key, backdrop click/tap (desktop dialogs; sheets also by drag-down if implemented). |
| Backdrop | Flat translucent Midnight (~60%); no blur effects required. |
| Focus | On open, focus moves to the popup heading (or close button); Tab cycles within; on close, focus returns to the triggering element. |
| Scroll lock | Page scroll locked while open; scrollbar-width shift compensated; scroll position preserved. |
| Internal scrolling | Header (title + close) stays pinned; body scrolls; `overscroll-behavior: contain`. |
| Safe areas | Mobile sheets pad bottom with `env(safe-area-inset-bottom)`; top respects `env(safe-area-inset-top)` when near full height. |
| Semantics | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to title. |
| Links | Only render buttons for real URLs; validate with `lib/url.ts` (https, no placeholder like `#` or `example.com`); external opens in new tab with `rel="noopener noreferrer"`. |
| Missing data | Omit the field/row; never show "N/A" filler or invented values. |
| Motion | Durations in `animation-and-interactions.md`; reduced-motion respected. |

## 2. Variant 1 — Desktop Project Popup

- Container: centered, width `min(960px, 92vw)`, max-height 90dvh, card surface, 1px gold border, 16px radius.
- Layout: two columns (PROPOSED): left screenshot gallery (main image + thumbnails if multiple); right content. Single column if no screenshots.
- Content order: title (serif) → tag chips → meta row (Role · Year · Duration) → short description → "My contribution" → contributors (team projects) → Key highlights (verified, bullet list) → actions (View Live, GitHub, only if valid).
- Close ✕ top-right. Backdrop, Escape and ✕ close.

## 3. Variant 2 — Mobile Project Bottom Sheet

- Slides up from bottom; width 100%; max-height 92dvh; 20px top radius; drag handle (decorative) centered.
- Order: close ✕ + title in sticky header; screenshot(s) (horizontal swipe or single image); tags; meta (stacked); description; contribution; contributors; highlights; actions full-width stacked.
- Body scrolls; safe-area bottom padding; backdrop tap closes.

## 4. Variant 3 — Desktop Certificate Popup

- Width `min(640px, 92vw)`.
- Fields: title, issuer, issue date, 1–2 line description, skills covered (chips), credential ID, certificate image if available, **Verify** button only with a real credential URL.
- No fabricated IDs: omit credential ID row if unknown.
- Mobile: PROPOSED sheet using the Variant 2 pattern.

## 5. Variant 4 — Desktop Event Popup

- Width `min(880px, 92vw)`, two columns when poster present (poster left, info right).
- Content: poster; real supporting photos (thumbnail strip) where available; event title and subtitle (e.g. Enthusia 5.0); period only if verified; description; role; team size and participant count **only when verified**; **View Photos** only if valid photos/URL exist.
- Mobile: PROPOSED sheet; poster on top.

## 6. Variant 5 — School Academic-Record Popup (desktop)

- Width `min(680px, 92vw)`.
- Header: school name; sub-line: location · board · year.
- Overall score displayed prominently (label "OVERALL SCORE" mono).
- Subject table with columns **Subject · Marks · Max · Grade**; right-align numerics; internal scroll if long.
- Used for 10th and 12th. Data must be real; placeholders blocked from production.

## 7. Variant 6 — University Academic-Record Popup (desktop)

- Width `min(860px, 92vw)`.
- Header: institute; university; location; duration.
- Summary strip: **Current CGPA /10**, **Backlogs**, semester summary (e.g. count completed) — values only from verified data.
- Semester tabs (horizontally scrollable) above the subject table.
- Subject table: Subject · Credits (if verified) · Grade; per-semester SGPA shown only if verified.
- Arrow keys move between semester tabs; active tab gold underline.

## 8. Variant 7 — Mobile Academic-Record Bottom Sheet

- Same sheet pattern as Variant 2, used for both school and university records.
- School: header, overall score, subject table in internal horizontal scroller if needed.
- University: summary stacked 2×2, semester tabs in a horizontally scrolling strip (must not cause page overflow), then subject table.
- Close ✕ ≥44px; safe-area padding.

## 9. Checklist per Variant (testing hook)

Opens via mouse/keyboard · closes via ✕/Escape/backdrop · focus trapped and restored · page scroll locked · inner scroll works at 375×667 and 1440×900 · no horizontal overflow · links valid · missing data omitted · reduced-motion respected.
