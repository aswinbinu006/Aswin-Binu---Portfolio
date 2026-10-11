# Animation and Interactions

Status: **IMPLEMENTED & APPROVED** (A-15, A-16, 2026-10-11). Principle: motion clarifies state; it never decorates. Backgrounds stay static. Motion implemented via CSS keyframes and IntersectionObserver with complete `prefers-reduced-motion` progressive enhancement.

## 1. Global Rules

- Animate only `opacity` and `transform` (and `border-color`/`background-color` for states). No layout-property animation.
- Easing: Editorial ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`) for entrances and reveals; ease-in (`cubic-bezier(0.4, 0, 1, 1)`) for exits; `ease-in-out` for state color changes.
- Hero opening sequence: Orchestrated stagger (chip 100ms → role mask 200ms → name baseline mask 300ms → gold dot fade 550ms → tagline 420ms → buttons 540ms → social links 640–760ms → portrait settle 250ms → scroll indicator 900ms).
- Bidirectional modals & sheets: Smooth opening and exit animations prior to DOM unmounting.

## 2. Durations

| Interaction | Duration | Effect |
|---|---|---|
| Hover/focus color change | 150–220ms | Border/background/text color |
| Nav underline | 200ms | Underline scale-x 0→1; active indicator persists |
| Card hover elevation | 220–280ms | Border gold 35%→80%, translateY(−4px to −6px), shadow-card-hover |
| Project card arrow | 200ms | Arrow shifts 4px up-right with background inversion |
| Content reveal on scroll | 500–600ms | 28px translateY + opacity reveal, editorial easing, 60–80ms stagger |
| Tab switch content | 300ms | Clean fade-in without observer race condition |
| Modal open (desktop) | 240ms | Backdrop fade 0→1; panel scale 0.96→1 + translateY(12px→0) |
| Modal close (desktop) | 180ms | Reverse exit animation before unmount |
| Mobile bottom sheet open | 300ms | translateY(100%→0) |
| Mobile bottom sheet close | 220ms | translateY(0→100%) |
| Academic detail dialog | Same as modal (desktop) / sheet (mobile) |
| Semester tab change | 150ms | Underline moves; table content updates seamlessly |
| Mobile menu | 200ms | Panel fade + translateY(−8px→0) |

## 3. Reveal-on-Scroll Rules

Use IntersectionObserver (threshold ~0.15), trigger once, never re-hide. Above-the-fold Hero content renders immediately with no delay. Content must be visible without JS animation (no hidden-until-animated risk): default state is visible, animation is progressive enhancement.

## 4. Reduced Motion

Under `prefers-reduced-motion: reduce`:
- Disable translate/scale and scroll reveals; show content immediately.
- Modals/sheets appear with a ≤100ms opacity fade only (or instantly).
- Hover transforms removed; color/border changes retained.
- Smooth scrolling disabled (`scroll-behavior: auto`).

## 5. Interaction States

| State | Rule |
|---|---|
| Hover | Only on `(hover: hover)` devices |
| Focus-visible | Always shown; never removed; 2px ring |
| Pressed | Slightly darker fill; scale ≥0.98 |
| Disabled | 50% opacity, no hover |
| Loading images | Reserve aspect ratio; fade in on load (150ms) |

## 6. Keyboard Interactions

| Context | Keys |
|---|---|
| Any interactive card/row | Enter/Space opens |
| Modal | Escape closes; Tab/Shift+Tab trapped inside; focus returns to opener |
| Tabs (Credentials, Semester) | Left/Right arrows move, Home/End, Enter/Space activates (manual or automatic activation: automatic) |
| Mobile menu | Escape closes; Tab cycles within panel |
| Gallery in popup | Left/Right arrows change screenshot if multiple |

## 7. Bottom Sheet Gestures (PROPOSED)

Drag handle at top; drag down past ~30% height or fast flick closes; no gesture is the only way to close (a visible Close button always exists). Gesture library not required; if too complex, ship buttons only.
