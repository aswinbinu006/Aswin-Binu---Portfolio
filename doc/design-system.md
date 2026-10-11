# Design System

## 1. Color Tokens (exact values)

| Token | Value | Role |
|---|---|---|
| `--color-ivory` | `#E8E0D2` | Page background |
| `--color-warm` | `#E6D5BD` | Warm secondary surface, subtle section contrast |
| `--color-card` | `#F3EDE1` | Card surface |
| `--color-navy` | `#0E1D61` | Headings, primary buttons, key actions |
| `--color-midnight` | `#070F38` | Body text; dark sections (Contact) |
| `--color-gold` | `#B89A54` | Thin lines, icons, dividers, active-nav underline **only** |
| `--color-gold-text` | `#775C1B` | Gold-toned text on light surfaces |
| `--color-green` | `#2E7D5B` | Optional status dot/text only |
| `--color-border` | `rgba(184,154,84,0.35)` | Card borders (gold at ~35%) |
| `--color-on-dark` | `#E8E0D2` | Ivory text on Midnight |

## 2. CSS Variable Recommendation

```css
:root {
  --color-ivory: #E8E0D2;
  --color-warm: #E6D5BD;
  --color-card: #F3EDE1;
  --color-navy: #0E1D61;
  --color-midnight: #070F38;
  --color-gold: #B89A54;
  --color-gold-text: #775C1B;
  --color-green: #2E7D5B;
  --color-border: rgb(184 154 84 / 0.35);

  --font-heading: "Playfair Display", Georgia, serif;   /* PROPOSED */
  --font-body: "Inter", system-ui, sans-serif;           /* PROPOSED */
  --font-mono: "JetBrains Mono", ui-monospace, monospace;/* PROPOSED */

  --radius-sm: 6px; --radius-md: 12px; --radius-lg: 16px;
  --shadow-card: 0 1px 2px rgb(7 15 56 / 0.06);
  --shadow-modal: 0 12px 40px rgb(7 15 56 / 0.25);
}
```
If Tailwind is used, map these into the theme config; do not hard-code hex values in components.

## 3. Color Usage Rules

- Gold `#B89A54` is **never** used for body or label text on ivory or card surfaces (contrast too low). Lines, icons, dividers, and the active nav underline only.
- Text on ivory/card: Midnight `#070F38`; headings Navy `#0E1D61`; gold-toned text `#775C1B`.
- Dark sections: ivory text on Midnight; gold hairlines; gold icons permitted.
- No gradients, glows, tinted overlays or decorative background images. Modal backdrop is a flat translucent Midnight (e.g. 60%) — functional, not decorative.
- Cards: `--color-card` fill, 1px `--color-border`.

## 4. Contrast Targets (verify during build)

| Pair | Minimum |
|---|---|
| Midnight on Ivory / Card | 4.5:1 (expected well above) |
| Navy on Ivory / Card | 4.5:1 |
| Dark gold text `#775C1B` on Ivory/Card | 4.5:1 — verify; if it fails on `#E8E0D2`, darken and record in decision log |
| Ivory on Midnight | 4.5:1 |
| Non-text UI (borders for inputs/focus, icons conveying meaning) | 3:1 |
| Gold `#B89A54` decorative hairlines | Exempt as decoration; any meaningful icon must be paired with a text label |

Measured ratios must be recorded in `testing-and-quality.md` results.

## 5. Typography

| Role | Style |
|---|---|
| H1 | Serif, high-contrast, 56–72px desktop / 40–44px mobile, line-height 1.05–1.15, Navy |
| H2 | Serif, 36–44px / 28–32px, Navy |
| H3 / card title | Serif, 20–24px, Navy |
| Body | Sans, **16px minimum**, line-height 1.6, Midnight |
| Secondary text | Sans, **14px minimum**, Midnight at full or high opacity |
| Labels | Mono, 12–13px **uppercase**, letter-spacing 0.12em, dark gold or Navy. (Labels are the only text allowed below 14px and must still meet contrast; keep ≥12px.) |
| Buttons | Sans 14–16px, medium weight |

Never use text smaller than 12px. Do not use light gray text.

## 6. Spacing and Layout

4px base grid. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96. Container max 1200px. Card padding 24px (20px mobile). Grid gap 24px.

## 7. Borders, Radii, Shadows

- Borders: 1px, `--color-border`; hairline dividers 1px gold.
- Radii: chips 999px; buttons 8px; cards 12–16px; modals 16px (bottom sheets 20px top corners).
- Shadows: minimal; `--shadow-card` subtle; modals `--shadow-modal`. No glows.

## 8. Icons

Single outline set, 1.5px stroke, 20–24px, gold `#B89A54` for decorative/meaningful-with-label; Navy for action icons on light surfaces. Brand icons (LinkedIn, GitHub, mail) in the same line style. Icon-only buttons need `aria-label` and ≥44×44px target.

## 9. Components and States

| Component | Default | Hover | Focus-visible | Active | Disabled |
|---|---|---|---|---|---|
| Primary button | Navy fill, ivory text | Slightly lighter navy or 1px gold underline offset | 2px Navy outline + 2px ivory offset ring | Pressed shade, no scale >0.98 | 50% opacity, `aria-disabled` |
| Outline button | Transparent, 1px Navy border, Navy text | Fill `--color-warm` | Same ring | Darker warm | 50% |
| Chip | Warm fill, Midnight text, 999px | Static (non-interactive) unless filter | Ring if interactive | — | — |
| Card | Card fill + border | Border becomes gold ~60%, translate-y ≤2px (interactive cards) | Ring | — | — |
| Nav link | Midnight text | Gold hairline underline preview | Ring | Gold 2px underline persistent | — |
| Tab | Midnight text | — | Ring | Gold underline + Navy text | — |
| Table row | Transparent | `--color-warm` | Ring (row is a button) | — | — |

Focus ring must be ≥3:1 against adjacent colors; on Midnight sections use an ivory ring.

## 10. Accessibility Rules

- Never convey state by color alone (add underline/icon/text).
- Status green is supplementary to text "Open to internships".
- Respect `prefers-reduced-motion` and `prefers-color-scheme` is not themed (single light theme; dark mode not in scope).
