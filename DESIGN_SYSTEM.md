# RTG Danışmanlık — Design System

This documents the system as it actually exists in code. If this file and
the code disagree, the code is right — update this file, don't "fix" the
code to match a stale doc. Source of truth for tokens: `app/globals.css`.

## 1. Brand

Warm, human, calm, experienced, European, trustworthy. Not a bank, not a
SaaS product, not a luxury fashion house. The site should read as a
person-led consultancy that happens to have a well-made website, not a
startup that generated a website and is looking for a business to attach
to it. Turkey→Germany is a real, single visual thread (WorldMap, Hero
photography, city imagery) — not decoration, the actual subject.

## 2. Colors

Defined once in `app/globals.css` under `:root`, re-exposed as Tailwind
utilities via `@theme inline`. Use the token names below (`bg-ink`,
`text-muted`, `border-line`, …) — never hardcode a hex value in a
component.

| Token | Hex | Use |
|---|---|---|
| `ink` | `#1E2A22` | Primary text; dark section backgrounds (Final CTA, Hero overlay) |
| `paper` | `#FAF7F1` | Default page background |
| `paper-raised` | `#F3EEE3` | Slightly-lifted surface: cards, callout boxes, alternating section bg |
| `accent` | `#2E6156` | Primary interactive color (buttons, links, focus ring, map routes) |
| `accent-ink` | `#F5F1E6` | Text/icon color placed on top of `accent` |
| `gold` | `#8A6A26` | Eyebrows, numbering, quote marks, map pins — a secondary accent, never a primary CTA color |
| `line` | `#E1DACB` | All borders and dividers (`* { border-color: var(--color-line) }` is set globally) |
| `muted` | `#6B6459` | Secondary/supporting text |
| `danger` | `#9C4A3C` | Form errors only |

Dark sections (Hero photo overlay, Final CTA) use `bg-ink` + `text-paper`
— this is the one deliberate break from the paper palette, reserved for
moments that should read as a distinct, cinematic beat, not the default.

## 3. Typography

Three font roles, set as CSS variables and mapped in `@theme inline`:

- `font-display` → Fraunces (headings, pull-quotes, display numerals). Italic is used for quotes and intro ledes specifically — not for regular headings.
- `font-body` (default body) → Public Sans.
- `font-mono` → IBM Plex Mono — eyebrows, labels, metadata, numbering, timestamps. Always `uppercase tracking-[0.08em]` to `tracking-[0.14em]` and small (`text-[10px]`–`text-xs`).

Scale in practice (Tailwind size classes actually used, not a new scale
to invent):

| Role | Classes |
|---|---|
| Hero H1 | `font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.08]` |
| Section H2 | `font-display text-3xl sm:text-4xl font-semibold` (see `SectionHeading`) |
| Card/item H3 | `font-display text-xl sm:text-2xl font-semibold` |
| Eyebrow | `font-mono text-xs uppercase tracking-[0.14em] text-gold` |
| Body | default `text-base`, `text-muted` for secondary |
| Quote | `font-display text-lg sm:text-2xl italic leading-snug` |
| Metadata / caption | `font-mono text-[10px] uppercase tracking-[0.08em]` |

Line measure: long-form body copy stays inside `max-w-2xl`/`max-w-3xl`
containers (≈65–75 characters per line). Hero and quote text intentionally
use a shorter `max-w-md`/`max-w-lg` measure for impact, not readability.

## 4. Spacing & Container

- `Container` (`components/ui/Container.tsx`): `mx-auto w-full max-w-6xl px-5 sm:px-8`. Every section wraps its content in this — never a bare `<div>` with ad hoc padding.
- Section vertical rhythm: `py-16 sm:py-20` for normal sections, `py-24 sm:py-32 lg:py-40` for Hero, `py-20 sm:py-28` for the dark Final CTA (it earns more room because it's the last word).
- Grid gaps use Tailwind's `gap-*` scale (`gap-4`, `gap-8`, `gap-10`, `gap-14`, `gap-16`) — never manual margins between siblings in a flex/grid row.

## 5. Radius, Borders, Shadows

- Radius is **`rounded-[3px]`** everywhere — cards, buttons, inputs, photo frames, pills use `rounded-full` only for pill-shaped labels/badges. This small radius (not Tailwind's default `rounded-lg`) is a deliberate brand choice: crisp, editorial, not "rounded SaaS card."
- Borders: `border border-line`, 1px, no heavier weights.
- Shadows: used exactly twice — the "Daha Fazla" nav dropdown and the mobile menu panel (`shadow-lg`). Content sections never use drop shadows; separation comes from `border-line` and background-tone changes, not elevation.

## 6. Buttons

`components/ui/Button.tsx` — three variants, one base class string:

```
base: inline-flex items-center justify-center gap-2 rounded-[3px] px-5 py-3
      text-sm font-medium tracking-tight transition-colors
primary:   bg-accent text-accent-ink → hover:bg-ink
secondary: bg-transparent border border-ink → hover:bg-ink hover:text-paper
ghost:     bg-transparent text-accent, no border, no horizontal padding
```

Renders as a Next `<Link>` when given `href`, a native `<button>`
otherwise — same visual component either way. Never build a one-off
button style in a page; add a variant to `Button` if a new treatment is
truly needed.

## 7. Forms

Text inputs/textareas: `w-full rounded-[3px] border border-line bg-paper
px-4 py-3 text-sm text-ink outline-none focus-visible:border-accent`.
Labels: `mb-2 block text-sm font-medium text-ink`. Every field has a
real, stable `id`/`htmlFor` pair. Errors render as `role="alert"
text-danger`. Forms are client components (`"use client"`) with local
`FormState`, submitting through a `"use server"` action — never a raw
`<form action="/api/...">`.

## 8. Cards & "not everything is a card"

`components/ui/Card.tsx` exists for simple info-grouping
(`rounded-[3px] border border-line bg-paper-raised p-6`) — channel
cards on `/iletisim`, small stat-style groupings. It is **not** the
default answer for repeating content:

- Student stories, mentors, and service items are laid out as editorial
  photo+text rows (see `FeaturedStudentStory`, `MentorProfile`), not
  boxed cards.
- Reach for `Card` only when the content is genuinely a short,
  self-contained info group with no photo.

## 9. Images — `EditorialPhoto`

`components/ui/EditorialPhoto.tsx` is the only way a photo (real or
placeholder) enters the page:

- Pass `src` → renders a real `next/image` at the given `ratio`
  (`aspectRatio` CSS, e.g. `"4 / 5"`, `"16 / 10"`), `object-cover`,
  `rounded-[3px] border border-line`.
- Omit `src` → renders the map-contour placeholder: a faint dot grid
  plus a set of concentric rings anchored at a focal point hashed from
  the `alt` text, so multiple placeholders on one page (e.g. a 12-story
  archive) don't look like copies of the same empty box. Never a plain
  gray box, never a broken-image icon.
- Real photography currently in `public/images/{hero,cities,germany}`
  is licensed and credited in `PHOTO_CREDITS.md` — see that file's own
  rules before adding more. No photo of an identifiable person is ever
  attached to a fabricated student/mentor name or quote; `students/` and
  `mentors/` stay empty until real, consented photos exist, and
  `Avatar`/`EditorialPhoto` fall back cleanly when `photoSrc` is absent.
- Always pass `sizes` matching the real rendered width; pass `priority`
  only for the single largest above-the-fold image on a page (Hero).

## 10. Motion

- Global: `prefers-reduced-motion: reduce` collapses all CSS animation/
  transition durations to ~0 (`app/globals.css`). Component-level JS
  animation (WorldMap, carousel) additionally checks
  `useReducedMotion()` from Framer Motion and switches to instant/no
  animation rather than relying on the CSS override alone.
- Micro-interactions: `transition-colors` on every link/button hover;
  no scale/shadow hover effects — the brand is calm, not bouncy.
- WorldMap: route lines draw in once on scroll-into-view
  (`useInView`, `once: true`), destination pulse rings loop softly
  afterward. Never re-triggers on re-scroll.
- Carousel (`StudentStoryCarousel`): native `overflow-x-auto` +
  `scroll-snap`, `scrollBy({ behavior: reduceMotion ? "auto" : "smooth" })`.
- Nothing on the site auto-plays indefinitely at attention-grabbing
  speed — every loop (map pulse) is slow and low-opacity.

## 11. Responsive

Tailwind default breakpoints, used consistently: `sm` (640px) for the
first mobile→tablet step, `lg` (1024px) for two-column layouts
switching to a single column. Checked at 1440 / 1024 / 768 / 390.
Mobile is never "desktop shrunk" — grids collapse to `grid-cols-1`,
the nav collapses into `MobileMenu`, and image aspect ratios stay fixed
(no cropping surprises) via `aspectRatio` rather than fixed pixel
heights.

## 12. Accessibility

- Every icon-only control has `aria-label` (nav toggle, carousel
  arrows, social icons).
- Carousel: `role="region"`, `aria-roledescription="carousel"`,
  keyboard `ArrowLeft`/`ArrowRight` on the focusable track, visible
  `aria-live="polite"` position indicator.
- Focus: global `:focus-visible { outline: 2px solid accent; outline-offset: 2px }` — never removed, never replaced with only a color change.
- Decorative SVGs/patterns get `aria-hidden="true"`; the
  `EditorialPhoto` placeholder uses `role="img"` + `aria-label` since it
  stands in for real content.
- Color contrast: body text is `ink` on `paper`/`paper-raised`
  (dark-on-light, verified sufficient); Hero/Final CTA reverse to
  `paper` on `ink` with a photo-darkening overlay ensuring the same
  contrast floor over a photograph.

## 13. Section variants (background rhythm)

Most sections are `bg-paper` (default, no class needed) or
`bg-paper-raised` (`Journey`, alternating emphasis). Two sections
deliberately break the palette for a "beat": Hero (full-bleed photo +
`bg-ink/55` overlay) and Final CTA (`bg-ink`, `text-paper`). This is a
rhythm, not a rule to extend everywhere — a third dark section would
cancel the effect.

## 14. What NOT to do

- Don't invent a new radius, border color, or shadow style per
  component — extend the tokens above instead.
- Don't add a card wrapper just because a list needs "something around
  each item" — check section 8 first.
- Don't add stock photography of a specific identifiable person next
  to a name/quote that isn't real — see `PHOTO_CREDITS.md`.
- Don't ship a new migration for something that can stay in
  `lib/content/*.ts` — see the DB rule in `AGENTS.md`/project
  instructions: `supabase/migrations/0001` and `0002` are frozen, new
  needs get their own numbered file.
