# Project Log — El Locutorio

> Shared context for all contributors (humans and AI). Update after every significant change.
> Read this file at the start of every session to understand current state.

---

## Current state

- **Hero + sección "Qué es" built.** The homepage now has the opening brand statement and its first supporting section.
- **Next.js 16 App Router** + React 19 + TypeScript 6. Migrated from static HTML on 2026-04-02.
- **CSS vanilla** (no Tailwind). Self-hosted fonts (Vampiro One, Staatliches, Rubik Dirt, Outfit).
- **Deploy**: Vercel project `el-locutorio-site` (connected to `FLOC-Stack/el-locutorio`, auto-deploy on push to main).
- **Figma**: [Design file](https://www.figma.com/design/UMmGChrYUfYEMtF5HBAIW2/EL-Locutorio---Vibe-Design)
- **Responsive V2 lab**: `/v2` duplicates the current homepage as a safe parallel route for Figma-responsive iteration.
- **Next step**: Payload CMS integration (Postgres via Neon, pending).

---

## Recent changes

| Date       | Who    | What                                                        |
|------------|--------|-------------------------------------------------------------|
| 2026-03-31 | gsus   | Refine mobile hero: 3-line title/tagline, text +20%, portrait -10%, logo 80px, card spacing |
| 2026-03-31 | gsus   | Hero mobile rewrite to match Figma v2 (flex layout, phone visible, ÚNETE fixed bottom) |
| 2026-03-31 | gsus   | Center nav logo on mobile, hide texture overlay on mobile   |
| 2026-03-31 | javi   | Enforce `font-weight: 100` on Rubik Dirt (font-accent)      |
| 2026-04-02 | gsus   | Migrate to Next.js 16 App Router (index.html → app/page.tsx, fix asset paths, remove vercel.json static config) |
| 2026-04-02 | codex  | Add "Qué es" section under hero, move homepage copy to typed content object, enable nav anchor to the new section |
| 2026-04-03 | gsus   | Fix about cards: blue card z-index in front across all breakpoints, reduce overlap to ~50px so green card content stays visible |
| 2026-04-03 | gsus   | Hero title: 2 lines on desktop ("Con Harold" / "Correa"), 3 lines on mobile via CSS-toggled br |
| 2026-04-25 | codex  | Create `/v2` as a duplicated homepage route for responsive iteration without replacing `/` |
| 2026-04-25 | codex  | Tune `/v2` mobile hero readability and stack show cards so both event posters remain visible |
| 2026-04-25 | codex  | Compact `/v2` tablet hero height and remove tablet CTA overlay from content flow |
| 2026-04-25 | codex  | Match `/v2` desktop hero height to the 1920×1080 Figma ratio instead of viewport height |
| 2026-04-25 | codex  | Fix `/v2` mobile anchor entry for "Qué es" so nav/hero CTA no longer obscure the section heading |
| 2026-04-25 | codex  | Fix `/v2` mobile anchor entry for Comunidad and Shows so decorative headings remain visible |
| 2026-04-25 | codex  | Fix `/v2` mobile anchor entry for Por qué existimos so the black poster heading is not clipped |
| 2026-04-25 | codex  | Fix `/v2` mobile Episodes mini cards as a centered horizontal slider that preserves card proportions |
| 2026-04-25 | codex  | Compact `/v2` mobile Comunidad posters into a 2×2 collage grid to reduce scroll while preserving poster proportions |
| 2026-04-25 | codex  | Refine `/v2` mobile Comunidad poster frames and titles so the vector shape holds in the 2×2 layout |
| 2026-04-25 | codex  | Move `/v2` mobile Comunidad microphone up into the headline area while keeping poster grid spacing controlled |
| 2026-04-25 | codex  | Compact `/v2` mobile Shows event posters as two visible stacked cards instead of hiding one in a slider |
| 2026-04-26 | codex  | Compact `/v2` mobile Por qué existimos spacing and flower scale while preserving the black poster composition |
| 2026-04-26 | codex  | Reposition `/v2` mobile Por qué existimos flower beside the claims, partially cropped outside the viewport |
| 2026-04-26 | codex  | Align `/v2` mobile Por qué existimos flower base with the third claim while keeping the flower cropped laterally |
| 2026-04-26 | codex  | Re-align `/v2` mobile Por qué existimos flower against Figma node `178:10` |
| 2026-04-26 | codex  | Re-align `/v2` mobile Comunidad headline and microphone against Figma node `179:12` |
| 2026-04-26 | codex  | Add mobile-first placeholder legal pages for privacy policy and terms, linked from both footers |
| 2026-04-26 | codex  | Restore `/v2` mobile ÚNETE CTA as a fixed bottom control so it does not drift through the viewport on scroll |
| 2026-04-26 | codex  | Add responsive mobile nav toggle with collage-style anchor panel while keeping desktop/tablet nav unchanged |

---

## Decisions

- **Mobile layout**: Flex column (not grid) for hero on ≤720px. Phone visible top-right, ÚNETE as fixed bottom CTA.
- **Texture overlays**: Hidden on mobile (::after on blue shape = `display: none`) to avoid rendering artifacts with rotated shapes.
- **No scaleY(-1) on phone**: The phone image must NOT be flipped vertically. Corrected twice.
- **Figma source of truth**: `1920 - Landing` is the canonical desktop reference. Detached section frames mirror that composition for responsive work.
- **Branch strategy**: Push direct to main. Validation is visual via Vercel deploy, not code review PRs. Revisit if project grows or adds logic/tests.
- **Next.js migration**: Kept CSS vanilla (no Tailwind), self-hosted fonts, same grid/overlap architecture. Asset paths changed from `/public/X` to `/X`.

---

## In progress

- Payload CMS integration: Postgres/Neon DB setup pending
- Desktop hero refinement pending (current focus was mobile)

---

## How to update this file

After completing work, add a row to "Recent changes" and update "Current state" or "In progress" if needed. Keep it concise — one line per change. Move completed items out of "In progress".
