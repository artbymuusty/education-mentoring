---
name: rtg-ui-review
description: "Mandatory design-review workflow for any visual/UI/UX work on the RTG Danışmanlık site — layout, navigation, typography, color, motion, responsive, accessibility, or perceived-quality changes. Use before touching a component's markup or styles when the request is about how something looks, feels, moves, or is interacted with. Skip for pure content edits, backend/Supabase logic, or non-visual scripts."
---

# RTG UI/UX Review

This is a **frontend/visual-only** workflow. It never runs for database,
Supabase, auth, or backend-logic work — only for changes that affect what a
visitor sees, reads, or interacts with.

## When to apply

Trigger this skill for requests like: "tasarımı güzelleştir", "navbarı
düzelt", "homepage'i iyileştir", "section ekle", "pricing tasarla",
"responsive düzelt", "motion ekle", "UI polish" — or their English
equivalents. If the request only changes copy/content values with no layout
or style change, this skill is unnecessary.

## Workflow: INSPECT → SEARCH → SCORE → IMPLEMENT → VERIFY

### 1. INSPECT
- Read `DESIGN_SYSTEM.md` (project root) — this is the real, implemented
  source of truth. Never contradict it without a stated reason.
- Read the actual component(s) involved — don't assume structure from memory.
- Open the live page in the browser (`npm run dev` if not already running)
  and look at it before proposing anything.

### 2. SEARCH (ui-ux-pro-max)
Use the skill installed at:
```
/Users/muusty/.claude/plugins/cache/ui-ux-pro-max-skill/ui-ux-pro-max/2.13.0/.claude/skills/ui-ux-pro-max/scripts/search.py
```
Run `python3 <path> "<query>" --domain <domain>` with a narrow, 2-5 word
query for the *specific* concern (e.g. `"navigation hierarchy contrast"
--domain ux`) — not a full audit checklist in one query. Use `--stack
nextjs` for implementation-specific guidance. Only use `--design-system`
for genuinely new, system-wide direction, not a targeted fix.

**Known divergence:** this skill's generic `--design-system` output for
"premium/education/consultancy" defaults toward a black+gold luxury-fashion
palette (Cormorant/Montserrat, Liquid Glass, heavy shadows/rounded-lg).
RTG's actual system (Fraunces/Public Sans/Plex Mono, warm paper + pine +
muted gold, `rounded-[3px]`, no shadows) intentionally rejects this — see
`design-system/rtg-danismanlik/MASTER.md`'s header for the full reasoning.
Do not silently re-apply the luxury defaults; if a new search surfaces them
again, treat DESIGN_SYSTEM.md as the tiebreaker.

Category-agnostic guidance from the skill (contrast ratios, touch target
size, focus visibility, reduced-motion, hover timing) **should** be applied
regardless of style — those aren't aesthetic opinions, they're baseline
correctness.

### 3. SCORE
Give an honest, qualitative before-score. Don't manipulate criteria to hit
a target — if something is genuinely weak, say so. A handful of relevant
perspectives (not all of them, every time) is enough for a normal task:
visual hierarchy, typography, spacing, interaction states, responsive
behavior, accessibility. Reserve a full multi-perspective review (art
director / product / UX / brand / typography / interaction / responsive /
accessibility / performance / conversion) for genuinely large design
passes, not routine fixes.

### 4. IMPLEMENT
Every change needs: a **problem**, **evidence** (what you saw, what the
skill search said), and an **expected impact**. No "this might look nicer"
edits. Respect Design Freeze Protection below.

### 5. VERIFY
- `npm run build` and `npm run lint` clean.
- Real browser check at the widths that matter for the change (never skip
  mobile). Confirm `document.documentElement.scrollWidth === window.innerWidth`
  — no horizontal overflow, ever.
- Re-read the component to confirm the diff matches intent before calling
  it done.

## Design Freeze Protection

Don't touch these without a specific, measured problem in them:
WorldMap, the EditorialPhoto placeholder/photo system, HumanConnection,
the Student Stories featured+carousel structure, Final CTA, the photo
credit system (`PHOTO_CREDITS.md`), the color/type/radius tokens in
`DESIGN_SYSTEM.md`, the responsive breakpoint architecture (`sm`/`lg`
only — no ad hoc `md:` additions).

## Database boundary

This skill never touches `supabase/migrations/*`, Supabase schema, or
Server Action logic. If a UI request seems to need a data-model change,
stop and flag it — that's a different, explicit conversation.
