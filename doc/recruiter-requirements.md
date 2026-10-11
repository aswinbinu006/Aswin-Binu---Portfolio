# Recruiter Requirements — Aswin Binu Portfolio

**Purpose:** The strict list of things a recruiter or hiring manager checks when they open this portfolio. Every item here is a quality gate. If a blocking item fails, the site is not published.

**Where it fits:** Reference this file from `MODEL.md` and `docs/testing-and-quality.md`. It does not replace the PRD or the design documents; it defines what "good enough to show a recruiter" means.

**Caveat:** These requirements are based on common entry-level and campus screening practice, not on the policy of any specific company. A portfolio rarely decides shortlisting by itself. The resume does, and the site supports it. Treat this file as the standard the site must meet, not a guarantee of outcomes.

---

## 1. The 90-second screening path

A recruiter spends roughly 60 to 90 seconds. The site must pass this path without effort.

| Step | Time | What they look for | Where | Pass condition |
|---|---|---|---|---|
| 1 | 0–10s | Who this is, the role, availability | Hero | Name, role label, availability chip and one specific line are visible without scrolling |
| 2 | 10–20s | The resume | Hero | "Download Resume" opens a real, current PDF |
| 3 | 20–50s | What was built | Projects grid | Six project cards are scannable, each with a real screenshot and a one-line description |
| 4 | 50–75s | Proof and ownership | Project popup, GitHub, live demo | Role, year, duration, a true result, working links |
| 5 | 75–90s | Eligibility | Academics | Board, CGPA out of 10 and semester records are easy to find and correct |
| 6 | After | How to reach the candidate | Contact | Email, LinkedIn and GitHub work and match the resume |

---

## 2. Blocking requirements (any failure means do not publish)

- [ ] **B1. No fabricated content.** Every mark, CGPA, certificate, achievement, metric, URL, screenshot and event detail is real and verified.
- [ ] **B2. Every external link works.** Live demos, GitHub repositories, certificate verification links, LinkedIn and the resume return a valid page or file.
- [ ] **B3. The resume PDF exists, opens and is current.** It matches the site on every shared fact (see section 6).
- [ ] **B4. Contact details are real.** No placeholder handles, no `example.com` addresses.
- [ ] **B5. No placeholder or sample text anywhere.** No lorem ipsum, sample certificates, stock photos presented as real work, or "Project Name".
- [ ] **B6. Academics are exact.** Marks, boards, institutions, years, CGPA and semester records match the official marksheets and grade cards.
- [ ] **B7. Each featured project has at least a working GitHub repository** with a real README. A live demo is required where one is claimed.
- [ ] **B8. No invented metrics.** A number appears only if it was measured and its source is known.
- [ ] **B9. The site works on a mid-range phone.** It loads, scrolls and opens every popup without breaking.
- [ ] **B10. No console errors, broken images or horizontal scrolling** at 375px, 768px and 1440px.
- [ ] **B11. The popups are fully usable.** They open, close with the X, Escape and backdrop click, and scroll internally on small screens.
- [ ] **B12. Names, titles and dates are consistent** across the site, resume, LinkedIn and GitHub.

---

## 3. Section requirements

### Hero
- Name, role label ("AI & ML Engineer"), one specific line about what is built, availability chip, two buttons, three social icons, portrait photo.
- The line must be specific. It must not be a slogan that could describe any student.
- The availability chip states what is true today (for example "Open to AI/ML internships") and is removed or updated when the status changes.
- No paragraph, no location line, no filler words.

### About
- Two short paragraphs in first person: who you are and what you are aiming for.
- Facts for Location, Education and Focus appear once. Education is not repeated in the paragraphs.
- The featured project card (LearnPath AI) uses a real screenshot and opens the same popup as the Projects section.
- No clichés (see section 9).

### Projects (six cards)
LearnPath AI, Prashikshan, FinSight AI, CivicSetu, CareerPilot AI, SmartScholars.
- Each card has a real screenshot, a one-line description, relevant tags and an arrow action.
- Each popup has title, tags, role, year, duration, a short description, verified highlights, and valid View Live and GitHub links.
- Each popup includes a **My contribution** line, especially for team projects. A recruiter will ask what was personally built.
- A button is hidden when its link does not exist. A dead button is worse than no button.
- Remaining projects live behind "View all projects". Do not show all seventeen at once.

### Skills
- Six grouped cards: Programming Languages, Machine Learning & AI, Web Development, Data & Visualization, Databases & Cloud, Tools & Others.
- List only what can be discussed in an interview. Remove anything that cannot be defended.
- No graphs, no skill-to-project connections.
- Optional and simple: two labels, **Strong** and **Working knowledge**, applied honestly.

### Credentials
- Only certificates that really exist.
- Each has title, issuer, issue date, a real credential URL, skills covered and a credential ID if one exists.
- The **Verify** button appears only when a real URL exists.
- Use the real certificate image, or a plain text card. No stock images.

### Events and Leadership
- Leadership rows contain the exact title and organization as they appear on official letters or the organization's own pages.
- Event names and attribution are exact. For example, Stranger Tech 1.0 belongs to Enthusia 5.0.
- Role, team size and participant count appear only when verified.
- "View Photos" appears only when real photos exist and may be published.

### Academics
- Table: Stage, Institution, Year, Score, View details.
- Rows: 10th, 12th, B.Tech CSE (AI & ML). Each opens its popup.
- School popup: school name, location, board, year of passing, overall score, subject table (Subject, Marks, Max, Grade).
- University popup: institute, university, location, duration, current CGPA out of 10, backlogs, semester summary, semester tabs, subject table.
- Show **every** completed semester, not a selection.
- Show backlogs only if the status is true. Never write "None" or "0" to fill a field.
- Mark the current semester as current and update after each result.

### Contact and footer
- Email, LinkedIn and GitHub cards with real values that fit without breaking.
- No contact form. Direct links only.
- Footer shows only true information.

---

## 4. Project evidence standard (per featured project)

| Requirement | Standard |
|---|---|
| Live demo | Loads, works without errors, and does not require private credentials. Remove the link if it cannot be kept alive |
| GitHub repository | Public, with a meaningful commit history showing real work over time |
| README | Problem, solution, architecture overview, tech stack, setup steps, screenshots, results if verified, known limitations |
| My contribution | One or two plain sentences on what you personally built |
| Role, year, duration | Accurate and consistent with the resume |
| Result or metric | Measured, reproducible, source known. Otherwise omit |
| Screenshots | Real screenshots of the running project, with no invented data in the shots that could be mistaken for real results |
| Team projects | Contributors named correctly, with your own part stated clearly |

A "verified result" means you can explain how it was measured when asked. If you cannot, do not publish it.

---

## 5. Academics standard

| Item | Requirement |
|---|---|
| Board and institution names | Exactly as printed on the marksheet or certificate |
| Scores | Percentage or CGPA exactly as issued, with the scale (for example "out of 10") |
| CGPA | Current and labelled "up to Semester N" |
| Semester records | All completed semesters with SGPA and credits |
| Subjects | Names and grades from the official grade card |
| Years | Start year and expected graduation year, consistent with the resume |
| Backlogs | Stated only if verified |

Do not hide a CGPA. Eligibility filters often check it, so keep it easy to find and let the projects carry the first impression.

---

## 6. Consistency rule (site, resume, LinkedIn, GitHub)

These must be identical everywhere:

| Field | Rule |
|---|---|
| Full name and spelling | Same everywhere |
| Degree and specialization | Same wording |
| Institution | Same name |
| Start and graduation years | Same |
| CGPA and cut-off semester | Same |
| Role and leadership titles | Same exact title |
| Project names | Same spelling and capitalization |
| Dates | Same format |
| Email, LinkedIn, GitHub | Same links |

Keep one source of truth in the content data files and update the resume and profiles from it, not the other way round.

---

## 7. Technical quality gates

**Performance**
- Largest Contentful Paint 2.5 s or better, Interaction to Next Paint 200 ms or better, Cumulative Layout Shift 0.1 or better, measured on mobile.
- Images are properly sized, compressed and lazy-loaded below the first screen.

**Accessibility**
- Body text 16px or larger and secondary text 14px or larger.
- Contrast of at least 4.5:1 for body text. Gold text on ivory uses dark gold `#775C1B`; `#B89A54` is for lines and icons only.
- Touch targets 44px or larger. Visible focus states. Full keyboard operation.
- Respect `prefers-reduced-motion`.
- Popups trap focus while open and return it to the card on close.

**Responsive**
- Verified at 375px, 768px, 1440px and widths in between. No horizontal scroll, no clipped text.

**Technical hygiene**
- No console errors or failed network requests.
- Page title, meta description and Open Graph image set. Canonical URL points to the real domain.
- Favicon present. A sensible 404 page exists.
- All images have alt text.

---

## 8. Content and animation limits

- Backgrounds stay static. No gradients, glow, particles, background illustrations or 3D objects.
- Animation is limited to scroll reveals, card stagger, card hover, navigation underlines and popup transitions, each under 600 ms.
- Nothing may delay reading the first screen.

---

## 9. Language and copy rules

- First person, plain and specific. Say what was built, with what, and for whom.
- Avoid phrases that could describe any student: "student, builder and problem solver", "always curious", "passionate about technology", "real world impact" used alone.
- No superlatives without proof: "best", "cutting-edge", "world-class".
- Check spelling and grammar on every section before publishing.
- One consistent date format and one consistent spelling for names and technologies.

---

## 10. Automatic red flags

A recruiter is likely to lose trust immediately if they see:

- Placeholder text, sample certificates or stock images shown as real
- Metrics that do not match the resume or cannot be explained
- Dead demo links, empty or near-empty repositories, or a README with only a title
- A CGPA, title or date that differs between the site and the resume
- A skills list that includes tools never used in any project
- A slow, broken or jumpy mobile experience
- Popups that cannot be closed, or links that open the wrong page
- Spelling errors in headings or in the name

---

## 11. Pre-launch checklist

**Content**
- [ ] Resume PDF added and opened successfully
- [ ] Portrait photo added (natural, clearly lit)
- [ ] LinkedIn, GitHub and email confirmed
- [ ] Six featured projects with real screenshots, links, role, year, duration, contribution
- [ ] Verified highlights for each project, or highlights removed
- [ ] Real certificates added with working URLs, or the certificate list hidden
- [ ] Leadership roles and events confirmed with exact titles and fest attribution
- [ ] Academic records entered from official documents, including all completed semesters

**Quality**
- [ ] Every link clicked and working
- [ ] Every popup opened and closed (X, Escape, backdrop, keyboard)
- [ ] Layouts checked at 375px, 768px and 1440px
- [ ] No console errors, no broken images
- [ ] Mobile performance measured against section 7
- [ ] Copy checked against section 9
- [ ] Consistency checked against section 6

**Release**
- [ ] Domain and canonical URL set
- [ ] Meta tags and share image checked by sharing the link in a chat
- [ ] Deployed build opened on a real phone

---

## 12. Open items needed from Aswin

| Item | Status |
|---|---|
| Resume PDF | Missing |
| Portrait photo | Needs the final photo |
| LinkedIn, GitHub, email | Confirm real links |
| Project screenshots | Need real screenshots |
| Verified project results | Provide with how each was measured |
| Real certificates and URLs | Provide, or hide the section |
| Leadership titles | Confirm exact titles (for example the IEEE role) |
| Academic records | Confirm all marks, boards and semester data from official documents |
| Domain | Decide which domain is canonical |
