# Architecture

Assumes the PROPOSED stack in `TRD.md`; structure is framework-neutral where possible.

## 1. Principles

1. Content is data; components are presentation.
2. One reusable component per pattern (no duplicated card/modal code).
3. Tokens, not literals, for color/spacing/type.
4. Every piece of data carries a verification flag.

## 2. Folder Structure

```text
src/
├── main.tsx
├── App.tsx
├── styles/
│   ├── tokens.css          # CSS variables from design-system.md
│   └── globals.css
├── data/
│   ├── site.ts             # name, role, links, resume path, metadata
│   ├── projects.ts
│   ├── skills.ts
│   ├── certificates.ts     # only verified items; may be empty
│   ├── events.ts
│   ├── leadership.ts
│   ├── academics.ts        # school + university records
│   └── types.ts            # shared interfaces
├── components/
│   ├── layout/ Navbar, MobileMenu, Footer, SectionHeader, Container
│   ├── ui/     Button, Chip, IconLink, Tabs, Card, Modal, BottomSheet, Table
│   ├── projects/ ProjectCard, ProjectModal, FeaturedProjectCard
│   ├── skills/ SkillsGroup
│   ├── credentials/ CredentialListItem, CertificateModal, LeadershipRow, EventCard, EventModal
│   ├── academics/ AcademicTable, SchoolRecordModal, UniversityRecordModal, SemesterTabs
│   └── contact/ ContactCard
├── sections/
│   Hero.tsx, About.tsx, Projects.tsx, Skills.tsx,
│   CredentialsActivity.tsx, Academics.tsx, Contact.tsx
├── hooks/  useActiveSection, useMediaQuery, useScrollLock, useReducedMotion
├── lib/    url.ts (validation), format.ts, a11y.ts
└── assets/ images (real only)
public/ resume, favicon, og image, robots.txt, sitemap.xml
tests/  unit/, e2e/
```

## 3. Data Models (interfaces, documentation only)

```ts
type Verification = "verified" | "unverified" | "placeholder";

interface ImageAsset { src: string; alt: string; width: number; height: number; }

interface Project {
  id: string; title: string; summary: string;      // one line
  tags: string[]; cardImage?: ImageAsset; screenshots: ImageAsset[];
  role?: string; contribution?: string; contributors?: string[];
  year?: string; duration?: string; description?: string; highlights: string[];
  liveUrl?: string; githubUrl?: string; featured?: boolean;
  verification: Verification;
}

interface SkillGroup { id: string; title: string; items: string[]; }

interface Certificate {
  id: string; title: string; issuer: string; issueDate: string;
  description?: string; skills: string[]; credentialId?: string;
  credentialUrl?: string; image?: ImageAsset; verification: Verification;
}

interface EventItem {
  id: string; title: string; subtitle?: string;     // e.g. "Enthusia 5.0"
  period?: string;                                   // year or "4th semester"; only verified
  role?: string; description?: string;
  teamSize?: number; participants?: number;          // only when verified
  poster?: ImageAsset; photos: ImageAsset[]; photosUrl?: string;
  verification: Verification;
}

interface LeadershipRole { id: string; title: string; organization: string; period: string; verification: Verification; }

interface SchoolRecord {
  id: "10th" | "12th"; institution: string; location: string; board: string;
  year: string; overallScore: string;
  subjects: { subject: string; marks: number; max: number; grade: string }[];
  verification: Verification;
}

interface Semester { label: string; sgpa?: number; credits?: number;
  subjects: { code?: string; name: string; credits?: number; grade: string }[]; }

interface UniversityRecord {
  institute: string; university: string; location: string; duration: string;
  cgpa: number; backlogs: number; semesters: Semester[]; keySubjects: string[];
  verification: Verification;
}

interface SiteConfig { name: string; role: string; statusChip: string;
  tagline: string; email?: string; linkedinUrl?: string; githubUrl?: string;
  resumeUrl?: string; location?: string; }
```
Rule: components render an action (Verify, View Live, GitHub, View Photos, Download Resume) only if its URL/asset exists and passes validation. Items with `verification !== "verified"` are excluded from production builds.

## 4. Shared Layout

`App` renders `Navbar` → `<main>` with the seven sections in order → `Footer`. A single modal host manages one open dialog at a time via context (`openModal({type, id})`). `useActiveSection` (IntersectionObserver) feeds Navbar.

## 5. Routing

Single page; section ids: `home`, `about`, `projects`, `skills`, `credentials`, `academics`, `contact`. Anchor links update the hash. Optional `#project=<id>` deep links to open a popup (PROPOSED). "View all projects" behaviour awaits U-05.

## 6. Separation of Content from UI

Content files contain no JSX. Sections import data and map to components. Copy changes never require component edits. Placeholder data lives only in `src/data/__fixtures__/` for tests and dev, and is excluded from production builds.
