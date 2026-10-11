# Responsive Behavior and Accessibility

Reference widths: **1440px** desktop, **768px** tablet, **375px** mobile. These are references, not the only supported widths; layouts must work continuously from 320px to 1920px+. Tablet/mobile layouts for non-popup sections are PROPOSED (P-05).

## 1. Breakpoints (proposed)

| Name | Range | Notes |
|---|---|---|
| Mobile | < 640px | Single column |
| Small tablet | 640–767px | 2-col grids where space allows |
| Tablet | 768–1023px | Reference 768 |
| Desktop | ≥ 1024px | Reference 1440; container max 1200px |

## 2. Section Behavior

| Section | Desktop (1440) | Tablet (768) | Mobile (375) |
|---|---|---|---|
| Navbar | Full link row + CTA | Collapsed to menu button (links won't fit comfortably) or compact row if all fit at ≥14px | Menu button |
| Hero | 2 columns, portrait right | Stacked or 2 narrow columns (PROPOSED: stacked) | Stacked; portrait then content or per approved design; buttons full-width or wrap |
| About | Portrait + text, featured card below | Stacked; featured card full-width | Stacked |
| Projects | 3 columns | 2 columns | 1 column |
| Skills | 3×2 | 2×3 | 1×6 |
| Credentials | List + event grid 3 col | Event grid 2 col | 1 col; tabs full-width |
| Academics | Full table | Full table | Table in internal horizontal scroller or stacked rows |
| Contact | 3 cards in a row | 3→ stacked or 2+1 | Stacked, full-width |

## 3. Mobile Navigation

- Menu button: ≥44×44px, `aria-expanded`, `aria-controls`, label "Menu".
- Panel: opens below the bar, full-width, links ≥48px tall, text ≥18px, includes Let's Connect.
- Closes on link select, Escape, outside tap; focus returns to button; body scroll locked while open.
- Active link: gold underline preserved.

## 4. Modals and Bottom Sheets

- Desktop (≥768px): centered dialog, max-width per variant, max-height `90dvh`, body scrolls internally; header with close stays visible.
- Mobile (<768px): bottom sheet for project and academic details; height up to ~90dvh; content scrolls internally; `overscroll-behavior: contain`; safe-area padding `env(safe-area-inset-bottom)`.
- Background page scroll locked while open; scroll position restored after close.
- Close button ≥44×44px, always visible.
- Event and certificate popups on mobile: PROPOSED to use the sheet pattern as well (no mobile reference known).
- Details in `modal-and-popup-specifications.md`.

## 5. Tables and Tabs

- Semester tabs: horizontal scroll inside their own container (`overflow-x: auto`), never widening the page; active tab scrolled into view; scroll-snap optional.
- Subject tables: internal horizontal scroll with visible scroll affordance (edge border) when columns do not fit; first column sticky if needed. Min 14px text.
- Academic table: wrap text in cells; no truncation of institution names without tooltip/full text in popup.

## 6. Overflow Handling

- No horizontal page scroll at any width (test 320, 375, 768, 1024, 1440, 1920).
- `overflow-wrap: anywhere` on emails, URLs, long titles.
- Images `max-width: 100%`, intrinsic dimensions reserved.
- Cards use `min-width: 0` in grid/flex children.

## 7. Text Sizes

Body ≥16px; secondary ≥14px; mono labels ≥12px uppercase. H1 scales down to ≥40px on mobile. Support browser zoom to 200% and OS text scaling without clipped content. Use `rem`.

## 8. Touch Targets

All interactive targets ≥44×44px (including icon links, close buttons, chevrons); ≥8px spacing between adjacent targets.

## 9. Keyboard and Focus

- Logical DOM order equals visual order.
- Visible focus ring everywhere (2px, ≥3:1 contrast; ivory ring on Midnight).
- Skip link "Skip to content" as first focusable element.
- Modals trap focus, restore focus on close, Escape closes.
- Tabs follow ARIA tabs pattern with arrow keys.
- No keyboard traps outside modals.

## 10. Semantics and ARIA

Landmarks: `header/nav/main/footer`; one `h1`; sequential headings; `nav aria-label="Primary"`; modals `role="dialog" aria-modal="true" aria-labelledby`; tables use `<th scope>`; decorative icons `aria-hidden`; icon-only controls labeled; external links indicate new tab (visually hidden text).

## 11. Contrast and Color

Targets in `design-system.md` §4. Gold `#B89A54` never carries text. State never conveyed by color alone.

## 12. Motion

See `animation-and-interactions.md` §4 for reduced-motion rules.

## 13. Accessibility Target

WCAG 2.2 AA. Automated axe checks with zero serious/critical violations plus manual keyboard and screen-reader (VoiceOver/NVDA) smoke test.
