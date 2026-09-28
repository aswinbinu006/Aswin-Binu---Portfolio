# Aswin Binu — Portfolio (Phase 1 & Phase 2)

Continuous scroll-driven story across chapters:
- Chapter 1: The Statement (Spotlight + crack transition)
- Chapter 2: Introduction (Editorial bio + portrait placeholder)
- Chapter 3: Skill Constellation (Interactive SVG/GSAP neural skill graph)
- Chapter 4: Project Gallery (Morph Pill Cards & Living Expansion Cards)
- Chapter 5: Event Archive (Museum exhibition wall with accessible modal/sheet)
- Chapter 8: Contact (Restrained signal CTA)

Chapters 6 (Academic Dashboard) and 7 (Playground) belong to Phase 3.

## Run locally

```bash
npm install
npm i ogl
npm run dev
```

Open http://localhost:5174 (or configured dev port).

## Remaining Placeholders to Swap Before Final Production

Every placeholder is marked with `PLACEHOLDER` in the codebase:

0. **Nebula Photo Asset** (`public/nebula.webp` & `public/nebula.jpg`) — Currently a 1200 px crop placeholder. To be replaced with a high-resolution 2560 px export with identical framing.

1. **Additional Skills** (`lib/skills.ts`) — Current graph has 16 confirmed skills across Core, AI, Product, and Leadership. A data model slot is reserved for ~4 additional skills (e.g. PyTorch, CUDA, ROS 2, Docker) upon review.
2. **Event Copy & Narratives** (`lib/events.ts`) — The 7 exhibition events (`Tech Escape`, `Stranger Tech`, `SITNovate`, `IEEE Workshops`, `Blockchain = Money`, `Vibe to Reality`, `Doomsday Protocol`) have placeholder stories, summaries, and dates.
3. **Photos** (`lib/events.ts`, `components/events/EventDetailModal.tsx`) — All event gallery items are currently handcrafted SVG/CSS photo placeholder tiles.
4. **Participant Information** (`lib/events.ts`) — Attendee and reach counts across all events are estimated placeholders.
5. **Team Information** (`lib/events.ts`) — Organization committee counts and co-organizer credits are placeholders.
6. **Portrait Photo** (`components/intro/PortraitPlaceholder.tsx`) — Silhouette SVG standing in for high-res editorial portrait.
7. **Chip Labels** (`components/intro/Chapter2Intro.tsx`) — Four chips ("Nagpur", "AI/ML", "IEEE", "Builder") to be verified.
8. **Project Data & URLs** (`data/projects.ts`) — GitHub, demo, and case study links are placeholders.
9. **Contact Links** (`components/contact/Contact.tsx`) — Resume PDF and verified Proton email to be confirmed.

## Quality & Accessibility Guarantees

- **Single typeface**: Azeret Mono only.
- **Strict palette**: `#020814`, `#061A3A`, `#0F4C81`, `#5FA8FF`, `#F7FBFF`.
- **Background preservation**: Shared living universe background untouched. Constellation click interaction preserved.
- **Accessible & Responsive**: Fully tested down to ~375px width, keyboard navigable, and respects `prefers-reduced-motion`.
