# Content and Assets Inventory

**Rule:** nothing in this file is approved for publication unless the "Approved" column says **Yes**. Mockup values and design-image text are never verified data. No content has been verified as of 2026-10-11, except items taken directly from the owner's written specification (marked "Owner spec").

Legend — Status: **KNOWN** (from owner spec) · **MISSING** · **UNVERIFIED**.

## 1. Identity and Links

| Item | Known | Source / verification | Missing | Asset / URL needed | Approved |
|---|---|---|---|---|---|
| Name | Aswin Binu | Owner spec | — | — | Yes |
| Role label | AI & ML Engineer | Owner spec | — | — | Yes |
| Status chip | Open to internships | Owner spec | Owner to confirm still true at launch | — | Yes (reconfirm at launch) |
| One-line description | None | — | Owner-written line | — | No |
| Portrait photo | None | Owner must supply | Image, alt text | Hero + About portrait (high-res, web-optimized) | No |
| Resume PDF | None | Owner must supply | File, filename, hosting path | `/resume/…pdf` | No |
| Email | None | Owner must supply | Real address | `mailto:` | No |
| LinkedIn | None | Owner must supply | Real profile URL | URL | No |
| GitHub | None | Owner must supply | Real profile URL | URL | No |
| Location | None | Owner must confirm | Text for About fact and footer | — | No |
| Canonical domain | None | Owner | Domain | — | No |

## 2. About

| Item | Known | Missing | Approved |
|---|---|---|---|
| Two short paragraphs | None | Owner-written copy; must not repeat education details | No |
| Fact: Location | — | Confirmed value | No |
| Fact: Education | B.Tech CSE (AI & ML) (Owner spec) | Institute name, batch years (U-02) | Partly |
| Fact: Focus | AI & ML (Owner spec) | Exact phrasing | Partly |

## 3. Projects

Six projects: LearnPath AI, Prashikshan, FinSight AI, CivicSetu, CareerPilot AI, SmartScholars. For **each** project:

| Field | Status for all six | Notes |
|---|---|---|
| Title | KNOWN (name only) | |
| One-line description | MISSING | Owner or verified legacy repo wording |
| Tags | MISSING | Only technologies actually used |
| Card screenshot | MISSING | Real screenshot, 16:10 recommended |
| Popup screenshots | MISSING | One or more real screenshots |
| Role | MISSING | |
| "My contribution" | MISSING | One line |
| Contributors (team projects) | MISSING | |
| Year | MISSING | |
| Duration | MISSING | |
| Short description | MISSING | |
| Key highlights | MISSING | Verified only; no invented metrics |
| Live URL | MISSING | Show button only if real |
| GitHub URL | MISSING | Show button only if real |
| Approved | No | |

LearnPath AI additionally appears as the About featured card: needs real screenshot, title, concise description, tags (same data as its Projects entry).

## 4. Skills

| Group | Items | Status |
|---|---|---|
| Programming Languages | MISSING | Owner to list real skills |
| Machine Learning & AI | MISSING | |
| Web Development | MISSING | |
| Data & Visualization | MISSING | |
| Databases & Cloud | MISSING | |
| Tools & Others | MISSING | |

Group names are KNOWN (Owner spec). Proficiency labels are not approved (decision P-10).

## 5. Certificates

| Field | Status |
|---|---|
| List of certificates | MISSING |
| Per certificate: title, issuer, issue date, 1–2 line description, skills covered, credential ID, credential URL, certificate image | MISSING for every certificate |
| Verify button | Only if a real credential URL exists |
| Approved | No. Legacy sample data (`certificates.ts`) must not be used. |

## 6. Events and Leadership

| Event / role | Known | Missing | Approved |
|---|---|---|---|
| Tech Escape | Name | Date/year, role, poster, photos, description, team size, participants | No |
| Stranger Tech 1.0 (Enthusia 5.0) | Name; "4th semester" only | Year (do not add unless confirmed), role, poster, photos, description | No |
| SITNovate | Name | Same as above | No |
| IEEE Technical Workshops | Name | Exact role/title, dates, organization, poster, photos | No |
| Blockchain = Money | Name | Same as above | No |
| Cyber Security Hackathon | Name | Same as above | No |
| Leadership rows | None | Exact title, organization, dates for each | No |

Team size and participant counts: show **only** when verified. "View Photos" only when valid photos exist.

## 7. Academics

| Record | Known | Missing | Approved |
|---|---|---|---|
| 10th | Stage name | Institution, location, board, year, overall score, subject table (subject, marks, max, grade) | No |
| 12th | Stage name | Same | No |
| B.Tech CSE (AI & ML) | Stage name | Institute, university, location, duration, current CGPA /10, backlogs, semester summary, per-semester subjects with grades and credits | No |
| Key-subject chips | — | Real subject list | No |

No marks, institutions, CGPA, SGPA, credits, grades or backlogs may be invented. Placeholders must be visibly marked and blocked from production.

## 8. Contact and Footer

| Item | Status |
|---|---|
| "GET IN TOUCH" label, headline "Let's build something meaningful." | KNOWN (Owner spec) |
| One short supporting line | MISSING |
| Email / LinkedIn / GitHub cards | Blocked on real URLs |
| Footer copyright year and name | Name KNOWN; year at build time |
| Footer location | Only when confirmed |

## 9. Asset Requirements

| Asset | Format | Notes |
|---|---|---|
| Portrait | WebP/AVIF + JPEG fallback | Two crops if needed (Hero, About); alt text |
| Project screenshots | WebP/AVIF | Consistent aspect ratio; width ≥ 1200px for popup |
| Event posters/photos | WebP/AVIF | Real only |
| Certificate images | WebP/AVIF | Real only |
| Resume | PDF | Filename decided (U-06) |
| Favicon / OG image | SVG/PNG | AB. mark; OG image 1200×630 using palette only |
| Images in design references | — | Visual guidance only; never ship |
