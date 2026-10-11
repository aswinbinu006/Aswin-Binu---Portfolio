# UI / UX Direction

> Design reference images were not available when this document was written (see `decision-log.md` §4). Layouts below derive from the written specification. References are visual guidance only; their text is never data.

## 1. Visual Direction

Editorial, calm, high-contrast. Warm ivory page, light cards with a faint gold border, Midnight sections with ivory text, thin gold hairlines. High-contrast serif headings, clean sans body, small uppercase monospace labels. Backgrounds are static; no gradients, glow, particles, illustrations, 3D or graph visuals. Tokens in `design-system.md`.

## 2. Global Layout

- Content max-width: 1360px (approved A-16), centered; responsive horizontal gutters: ~40px desktop (1440px), 32px tablet (768px), 20px mobile (375px).
- Section vertical padding: 56–96px desktop (py-14 to py-24), 48–72px tablet, 40–56px mobile.
- Section header pattern: mono uppercase label (dark gold), serif H2, optional one-line intro.
- Alternation: Ivory sections; Midnight Contact section. A warm-secondary wash grounds card interiors and tables.

## 3. Navigation (all breakpoints)

Approved handwritten AB signature WebP mark (`logo.webp`) · Home · About · Projects · Skills · Credentials · Academics · Contact · **Let's Connect** (outline button → scrolls to Contact).

- Sticky top bar, ivory background with a 1px gold hairline at 35% opacity along the bottom.
- Logo: Approved handwritten Deep Atlas Navy script `AB.` mark with small Gold dot (`logo.webp`), responsive width (50–62px), vertically centered, linked to `#home` with alt text `Aswin Binu logo`.
- Active section: thin (2px) gold `#B89A54` underline beneath the label with smooth scale and opacity transitions.
- Labels identical everywhere. Mobile drawer with full list and Let's Connect button.

## 4. Sections

### 4.1 Hero
- **Desktop:** two columns. Left: status chip ("Open to internships", with optional green `#2E7D5B` dot), mono label "AI & ML ENGINEER", H1 "Aswin Binu.", one concise line, buttons [View Projects] (navy filled) and [Download Resume] (outline), then LinkedIn / GitHub / email icon links. Right: portrait photo in a card-style frame with thin gold border.
- **Not included:** paragraph, location line, vertical filler words, decorative backgrounds.
- **Tablet/Mobile:** stacked; portrait placement per approved design (PROPOSED: portrait above text on mobile, ~min(80vw, 320px)).

### 4.2 About
- **Desktop:** left portrait; right two short paragraphs and a facts list (Location, Education, Focus) in mono-label/value rows. Below: featured LearnPath AI card (screenshot, title, concise description, tags, "View Project" action).
- Paragraphs must not repeat education details already in facts.
- **Mobile:** single column: portrait, paragraphs, facts, featured card.
- LearnPath AI also appears in Projects (deliberate exception, P-09).

### 4.3 Projects
- Six cards: LearnPath AI, Prashikshan, FinSight AI, CivicSetu, CareerPilot AI, SmartScholars.
- Card: screenshot (top, 16:10), title, one-line description, tag chips, arrow action (bottom-right).
- Grid: 3 columns desktop, 2 tablet, 1 mobile.
- Click/Enter opens project popup (desktop dialog / mobile bottom sheet).
- "View all projects" link: destination undefined (U-05); omit until decided.

### 4.4 Skills
- Six cards in a 3×2 grid (2×3 tablet, 1×6 mobile): Programming Languages, Machine Learning & AI, Web Development, Data & Visualization, Databases & Cloud, Tools & Others.
- Each: serif/uppercase group title, thin gold divider, plain readable list (min 14–16px). No bars, ratings, graphs or links to projects.

### 4.5 Credentials & Activity
- Tab switch (segmented control): **Certificates** | **Events & Leadership**; active tab has gold underline; arrow keys switch tabs.
- **Certificates:** list of CredentialListItem rows (title, issuer, date, Verify action only if real URL); click opens certificate popup. Empty state if none verified: do not ship placeholder items.
- **Events & Leadership:** leadership rows (title, organization, dates) above/beside a grid of EventCards (poster thumbnail, title, short meta). Cards: Tech Escape, Stranger Tech 1.0 (Enthusia 5.0), SITNovate, IEEE Technical Workshops, Blockchain = Money, Cyber Security Hackathon. Click opens event popup.
- A design reference for the Events tab may not exist (U-11); layout here is PROPOSED.

### 4.6 Academics
- Clean table: Stage · Institution · Year · Score · chevron. Rows: 10th, 12th, B.Tech CSE (AI & ML).
- Row hover: warm surface; entire row is a button; chevron indicates detail.
- Below: wrapped row of key-subject chips. No charts.
- Mobile: table scrolls horizontally inside its container, or collapses to stacked rows (PROPOSED; see responsive doc).

### 4.7 Contact + Footer
- Full-width Midnight `#070F38` background (decision: Midnight, as in the finalized identity), ivory text, gold hairlines.
- Mono label "GET IN TOUCH"; serif H2 "Let's build something meaningful."; one short supporting line.
- Three cards (Email, LinkedIn, GitHub): icon (gold), label, value, arrow. Long emails/URLs wrap or truncate safely with the full value as accessible name.
- Slim footer: copyright; location only when confirmed. No form.

## 5. Reference Status

| Area | Reference available? |
|---|---|
| Desktop sections | Unknown / not provided to this phase |
| Tablet and mobile (non-popup) | Proposals only |
| Popup mobile frames | Believed to exist; unverified |
| Events & Leadership tab | Unknown (U-11) |
