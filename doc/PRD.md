# Product Requirements Document

## 1. Product

A single-page personal engineering portfolio for **Aswin Binu**, an AI & ML engineering student seeking internships. It presents real projects, skills, credentials, leadership activity and academic records with restrained, editorial visual styling (ivory, navy, thin gold lines).

## 2. Target Audience

- Recruiters and hiring managers screening for AI/ML and software internships (primary).
- Engineers and academics reviewing technical depth.
- Peers and collaborators.

A visitor should understand who Aswin is, what he builds, and how to reach him within ~30 seconds, and be able to verify claims (live links, repos, credentials).

## 3. Objectives

1. Communicate identity and internship availability immediately.
2. Showcase six projects with real screenshots and honest detail.
3. Provide verifiable credentials and academic records.
4. Offer clear contact paths (email, LinkedIn, GitHub, resume).
5. Be fast, accessible and fully usable on mobile.

## 4. Sections (in order)

Hero → About → Projects → Skills → Credentials & Activity → Academics → Contact + Footer. Layout in `UI-UX.md`.

## 5. Functional Requirements

| ID | Requirement |
|---|---|
| F-01 | Shared navbar with AB. logo, Home, About, Projects, Skills, Credentials, Academics, Contact, and a "Let's Connect" outline button; active section shows a thin gold underline. |
| F-02 | Hero: status chip, AI & ML Engineer label, name "Aswin Binu.", one concise line, View Projects and Download Resume buttons, LinkedIn/GitHub/email icons, portrait right on desktop. |
| F-03 | About: portrait, two short paragraphs, facts (Location, Education, Focus), featured LearnPath AI card with View Project action. |
| F-04 | Projects: six cards (screenshot, title, one-line description, tags, arrow); three-column desktop grid; click opens project popup. |
| F-05 | Project popup: screenshots where available, title, tags, role, year, duration, short description, "My contribution", contributors (team projects), verified highlights, View Live/GitHub only with valid URLs. |
| F-06 | Skills: six grouped plain-list cards; no graphs. |
| F-07 | Credentials & Activity: Certificates / Events & Leadership tab switch. |
| F-08 | Certificates: verified items only; popup shows title, issuer, date, description, skills, credential ID; Verify only with real URL. |
| F-09 | Events & Leadership: leadership rows and event cards (Tech Escape, Stranger Tech 1.0 (Enthusia 5.0), SITNovate, IEEE Technical Workshops, Blockchain = Money, Cyber Security Hackathon); event popup with poster, photos if available, info, role, team size/participants only if verified, View Photos only if valid photos exist. |
| F-10 | Academics: table (Stage, Institution, Year, Score, chevron) for 10th, 12th, B.Tech CSE (AI & ML); row click opens popup. |
| F-11 | School popup: name, location, board, year, overall score, subject table (Subject, Marks, Max, Grade). |
| F-12 | University popup: institute, university, location, duration, current CGPA /10, backlogs, semester summary, semester tabs, subject table. |
| F-13 | Key-subject chips (wrapped row) in Academics; no charts. |
| F-14 | Contact: full-width Midnight band, "GET IN TOUCH" label, "Let's build something meaningful.", one supporting line, Email/LinkedIn/GitHub cards. |
| F-15 | Slim footer: copyright, location when confirmed. |
| F-16 | Resume download works from Hero (and Contact if specified later). |

## 6. Exclusions

- No contact form.
- No charts, skill graphs, or skill-project linking visuals.
- No gradients, glow, particles, background illustrations, 3D objects, decorative filler graphics.
- No Hero paragraph, location line, or vertical filler words.
- No fabricated content of any kind.
- No backend, CMS, authentication, or blog in this phase.
- No intro overlay/preloader.

## 7. Acceptance Criteria

1. All seven sections render in the specified order with approved palette and typography.
2. Every nav link and button works; active section underline tracks scroll.
3. All seven popup variants behave per `modal-and-popup-specifications.md`.
4. Layout has no horizontal page overflow at 375, 768, 1440px and intermediate widths.
5. Every displayed fact, link and image traces to an "Approved: Yes" entry in `content-and-assets.md`.
6. No placeholder content in the production build.
7. Keyboard-only users can reach and operate every control; focus is visible.
8. Contrast and text-size rules in `design-system.md` are met.
9. Build, type-check, lint and tests pass; no console errors.
10. Lighthouse targets in `testing-and-quality.md` met.

## 8. Non-Functional Requirements

- **Performance:** fast first load; optimized images; lazy-load below-fold media.
- **Accessibility:** WCAG 2.2 AA target.
- **SEO:** semantic HTML, meta/OG tags, sitemap, robots.
- **Privacy:** no tracking unless approved (U-04).
- **Maintainability:** content separated from UI; typed data.
- **Browser support:** current evergreen Chrome, Edge, Firefox, Safari (desktop and mobile).
