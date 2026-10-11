# Component Specifications

Interfaces are documentation, not source code. Shared rules: all interactive components are keyboard operable, show a visible focus ring, use tokens from `design-system.md`, and omit actions whose data is missing.

## 1. Shared Primitives

**Button** — `{ variant: "primary"|"outline"; href?: string; onClick?; icon?; children; external?: boolean; disabled? }`. Renders `<a>` when `href`, else `<button>`. External links: `target="_blank" rel="noopener noreferrer"` plus accessible hint. Min height 44px.

**Chip** — `{ label: string; tone?: "default"|"status" }`. Non-interactive by default.

**IconLink** — `{ icon; label: string; href: string }`. 44×44 target, `aria-label` required.

**Tabs** — `{ tabs: {id,label}[]; value; onChange }`. `role="tablist"`; arrow keys, Home/End; active gold underline.

**Modal / BottomSheet** — `{ open; onClose; title: string; variant: "dialog"|"sheet"; children }`. Behavior in `modal-and-popup-specifications.md`. Chooses dialog ≥768px and sheet <768px where specified.

## 2. Layout

**Navbar** — `{ links: {id,label}[]; activeId: string; ctaLabel: "Let's Connect" }`. Sticky; AB. logo links to `#home`; active gets gold underline; `aria-current="true"` on active link. CTA scrolls to Contact.

**Responsive navigation (MobileMenu)** — Below the desktop breakpoint, links collapse into a menu button (≥44px, `aria-expanded`, `aria-controls`). Panel is full-width under the bar (PROPOSED), lists all labels at ≥18px with ≥48px rows, includes Let's Connect; Escape or link selection closes it; focus returns to the button; page scroll locked while open.

**Footer** — `{ name; year; location?: string }`. Slim; location only if provided.

## 3. Sections

**Hero** — `{ statusChip; label; name; tagline; resumeUrl?; projectsAnchor; links: {linkedin?, github?, email?}; portrait?: ImageAsset }`. Download Resume hidden/disabled-with-notice (dev only) if `resumeUrl` missing. Icons only for provided links.

**About** — `{ portrait?: ImageAsset; paragraphs: [string, string]; facts: {location?, education, focus}; featured: Project }`. Location fact omitted if unconfirmed.

## 4. Projects

**ProjectCard** — `{ project: Project; onOpen(id) }`. Whole card is a button; shows image, title, summary, tags (max 4 visible, remainder hidden), arrow icon. Accessible name = title.

**FeaturedProjectCard** (About) — same data; "View Project" opens the same ProjectModal.

**ProjectModal** — `{ project: Project; onClose }`. Fields: screenshot gallery (if any), title, tags, role, year, duration, description, "My contribution", contributors (if team), highlights list, View Live / GitHub buttons only if valid URLs. Missing fields are omitted, not shown blank.

## 5. Skills

**SkillsGroup** — `{ title: string; items: string[] }`. Renders `<section aria-labelledby>` with a `<ul>`. No ratings.

## 6. Credentials & Activity

**CredentialListItem** — `{ certificate: Certificate; onOpen }`. Row: title, issuer, date; Verify link only if `credentialUrl`. Row opens CertificateModal; Verify is a separate link inside (not nested interactive inside a button: use row container with a primary button and a sibling link).

**CertificateModal** — fields: title, issuer, issue date, 1–2 line description, skills covered, credential ID, Verify (only with real URL), image if available.

**EventCard** — `{ event: EventItem; onOpen }`. Poster, title, subtitle, period (only if verified). Whole card is a button.

**EventModal** — poster, real supporting photos, event info, role, team size and participants only when verified, View Photos only when valid photos exist/`photosUrl` valid.

**LeadershipRow** — `{ role: LeadershipRole }`; exact title, organization, dates. Static row.

## 7. Academics

**AcademicTable** — `{ rows: {id; stage; institution; year; score}[]; onOpen(id) }`. Semantic `<table>`; each row has a button spanning the stage cell or a `role="button"` row with chevron; accessible name "View details: {stage}". Internal horizontal scroll container on narrow screens.

**SchoolRecordModal** — `{ record: SchoolRecord }`. Name, location, board, year, overall score, subject table (Subject, Marks, Max, Grade).

**UniversityRecordModal** — `{ record: UniversityRecord }`. Institute, university, location, duration, current CGPA (out of 10), backlogs, semester summary, SemesterTabs (horizontally scrollable, arrow-key navigation), subject table for selected semester.

**KeySubjectChips** — `{ subjects: string[] }` wrapped row.

## 8. Contact

**ContactCard** — `{ kind: "email"|"linkedin"|"github"; label; value; href }`. Entire card is a link; value uses `overflow-wrap:anywhere`; email uses `mailto:`; external links open new tab with `rel`.

## 9. State Summary

| Component | State |
|---|---|
| Navbar / MobileMenu | `activeId`, `menuOpen` |
| Credentials | `activeTab` |
| Modal host | `{type,id} | null` |
| UniversityRecordModal | `semesterIndex` |
