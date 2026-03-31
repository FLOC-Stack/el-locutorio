# Project Log — El Locutorio

> Shared context for all contributors (humans and AI). Update after every significant change.
> Read this file at the start of every session to understand current state.

---

## Current state

- **Only the Hero section is built.** No other sections exist yet.
- **Static site**: `index.html` + CSS vanilla. No bundler, no JS framework, no GSAP yet.
- **Deploy**: Vercel (connected to `FLOC-Stack/el-locutorio`, pending verification).
- **Figma**: [Design file](https://www.figma.com/design/UMmGChrYUfYEMtF5HBAIW2/EL-Locutorio---Vibe-Design)

---

## Recent changes

| Date       | Who    | What                                                        |
|------------|--------|-------------------------------------------------------------|
| 2026-03-31 | gsus   | Hero mobile rewrite to match Figma v2 (flex layout, phone visible, ÚNETE fixed bottom) |
| 2026-03-31 | gsus   | Center nav logo on mobile, hide texture overlay on mobile   |
| 2026-03-31 | javi   | Enforce `font-weight: 100` on Rubik Dirt (font-accent)      |

---

## Decisions

- **Mobile layout**: Flex column (not grid) for hero on ≤720px. Phone visible top-right, ÚNETE as fixed bottom CTA.
- **Texture overlays**: Hidden on mobile (::after on blue shape = `display: none`) to avoid rendering artifacts with rotated shapes.
- **No scaleY(-1) on phone**: The phone image must NOT be flipped vertically. Corrected twice.
- **Branch strategy**: Agreed to use feature branches + PRs instead of pushing direct to main.

---

## In progress

- Vercel deploy verification (404 on el-locutorio.vercel.app — needs dashboard check)
- Desktop hero refinement pending (current focus was mobile)

---

## How to update this file

After completing work, add a row to "Recent changes" and update "Current state" or "In progress" if needed. Keep it concise — one line per change. Move completed items out of "In progress".
