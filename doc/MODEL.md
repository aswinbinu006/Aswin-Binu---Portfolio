# MODEL.md — Canonical Instructions for Google Antigravity

This file is the master instruction document for the Aswin Binu personal engineering portfolio. It is named `MODEL.md` (not `CLAUDE.md`).

> **Loading note.** Do not assume Antigravity loads this file automatically. Before the first task, check the project-instruction mechanism supported by the current Antigravity environment (for example, workspace rules or an agent rules directory) and configure it to reference `MODEL.md`. If no mechanism exists, begin every task by reading this file explicitly. Record the mechanism actually used in `docs/decision-log.md`.

## 1. Current Phase

**Documentation phase.** Application code must NOT be written until the owner explicitly approves the documentation (see the approval gate in `docs/implementation-plan.md`). Until then, the only permitted outputs are Markdown documents and read-only inspection.

## 2. Mandatory Reading

Before any implementation task, read the documents relevant to that task:

| Task area | Read first |
|---|---|
| Any task | `MODEL.md`, `docs/decision-log.md`, `docs/PRD.md` |
| Layout, sections | `docs/UI-UX.md`, `docs/responsive-and-accessibility.md` |
| Colors, type, tokens | `docs/design-system.md` |
| Components | `docs/component-specifications.md`, `docs/architecture.md` |
| Popups, bottom sheets | `docs/modal-and-popup-specifications.md` |
| Motion | `docs/animation-and-interactions.md` |
| Text, images, links, marks | `docs/content-and-assets.md` |
| Tooling, build | `docs/TRD.md` |
| Verification | `docs/testing-and-quality.md` |
| Sequencing | `docs/implementation-plan.md` |

State which documents you read at the start of each task report.

## 3. Conflict Hierarchy

When requirements conflict, the higher item wins:

1. Explicit approvals recorded in `docs/decision-log.md`.
2. Blocking items in `docs/recruiter-requirements.md`, if the owner supplies that file (it is not yet in the repository; see decision log).
3. `docs/PRD.md` and `docs/UI-UX.md`.
4. Design reference images — visual guidance only. Text inside images is never data.
5. All other documents, then general best practice.

If a conflict cannot be resolved by this hierarchy, stop and ask the owner. Do not choose silently.

## 4. Protected Decisions

The following are protected. Do not change them without written approval recorded in the decision log:

- Framework and core libraries (once approved)
- Color palette and token values (`docs/design-system.md`)
- Section list and order: Hero, About, Projects, Skills, Credentials & Activity, Academics, Contact + Footer
- Navigation labels: AB. logo, Home, About, Projects, Skills, Credentials, Academics, Contact, Let's Connect
- Established interaction patterns (tab switch, modals, bottom sheets, table-row dialogs)
- The "static background, no decorative effects" rule

Proposals must be labelled **PROPOSED** and are never treated as approved.

## 5. Content Integrity Rules

- **Never fabricate** content: marks, grades, CGPA/SGPA, credits, certificates, certificate IDs, issuers, achievements, metrics, participant counts, team sizes, project results, screenshots, photos or URLs.
- Mockup values and text inside design images are not verified data.
- Anything unverified stays marked **MISSING** or **UNVERIFIED** in `docs/content-and-assets.md` and must not ship. Placeholders must be visibly identified and blocked from production builds.
- Show "Verify" and "View Live / GitHub / View Photos" actions only when a real, valid URL or asset exists. Otherwise hide the action.
- If a legacy repository exists, treat it as a **read-only content source**: do not reuse its visual layer, effects, WebGL, intro overlay or animation code, and do not import sample data files (e.g. `certificates.ts`). Treat its metrics and marks as unverified until the owner confirms.

## 6. Engineering Rules

1. **Inspect before modifying.** Read repository structure, dependencies, Git state and existing docs before touching code. Never delete, overwrite or restructure existing work without approval.
2. **Separate content from presentation.** All real content lives in typed data modules (see `docs/architecture.md`); components receive data via props.
3. **Reuse components.** Build shared primitives (buttons, chips, icons, modal/bottom-sheet) once; do not duplicate.
4. **Use design tokens.** No hard-coded hex values in components.
5. **Accessibility is a requirement,** not a polish step (`docs/responsive-and-accessibility.md`).
6. **Approval required** before changing the framework, adding or swapping libraries, altering the palette, changing the section structure, or changing established interaction patterns.

## 7. Verification Before Reporting Completion

Do not report a task complete until you have:

- Run the build, type-check and lint commands with no errors.
- Run the tests defined in `docs/testing-and-quality.md` that apply.
- Visually verified at 1440px, 768px and 375px (and one intermediate width), including open modal states.
- Checked the browser console for errors and warnings.
- Confirmed no placeholder or unverified content is visible in the production build.

## 8. Documentation Maintenance

When an approved decision changes, update every affected document and add a dated entry to `docs/decision-log.md` in the same change.

## 9. Honest Reporting

Every task report must state plainly: what was done, what was not done, missing assets, errors, test failures, known limitations, and any assumption made. Never describe partial work as complete. Never claim to have inspected a file or image you could not open.

## 10. Documentation Map

`README.md` · `docs/PRD.md` · `docs/UI-UX.md` · `docs/design-system.md` · `docs/TRD.md` · `docs/architecture.md` · `docs/component-specifications.md` · `docs/content-and-assets.md` · `docs/animation-and-interactions.md` · `docs/responsive-and-accessibility.md` · `docs/modal-and-popup-specifications.md` · `docs/testing-and-quality.md` · `docs/implementation-plan.md` · `docs/decision-log.md`
