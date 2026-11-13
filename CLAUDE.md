# jcrj-portfolio

Personal portfolio for Julio Ramirez, Senior React / React Native Engineer.
Goal: a recruiter decides "senior" in 30 seconds; an engineer decides "makes
architecture decisions" in 5 minutes. The site is itself the proof of
frontend quality, so performance, accessibility and code quality are
requirements, not nice-to-haves.

## Stack
- Next.js (App Router), static generation only (no server runtime needed)
- TypeScript strict mode (`strict: true`, `noUncheckedIndexedAccess: true`)
- Tailwind CSS; no UI kit, no CSS-in-JS
- Content managed in Keystatic (GitHub mode in production, local mode in dev):
  admin UI at /keystatic; content stored in the repo; every save is a commit
  that triggers a Vercel rebuild
- Jest + React Testing Library (unit), Playwright + @axe-core/playwright (e2e and a11y)
- ESLint (next/core-web-vitals + typescript), Prettier
- GitHub Actions: lint, typecheck, test, build, Lighthouse CI on every PR
- Deployed on Vercel

## Design (approved mockups in Claude Design; match them)
- Look: minimal, editorial, engineering-grade. Generous whitespace, hairline
  borders, one accent color used sparingly (links, focus, key numbers).
- Fonts: Geist (UI and headings), Geist Mono (labels, stack tags, metrics),
  via next/font. Max 2 families.
- Theme: dark and light via CSS variables, following prefers-color-scheme,
  plus a header toggle (sun/moon) that overrides it and persists.
- Tokens (dark / light):
  bg #0A0A0B / #FAFAF9 · surface #111114 / #FFFFFF · surface-alt #0E0E10 / #F7F7F8
  inset #0C0C0E / #F4F4F5 · fill #17171B / #F1F1F3 · divider #1F1F23 / #ECECEF
  border #26262B / #E4E4E7 · border-strong #2E2E33 / #D4D4D8 · line #3F3F46 / #A1A1AA
  subtle #8B8B94 / #63636B · muted #A1A1AA / #52525B · soft #C4C4CC / #3F3F46
  text #EDEDEF / #18181B · accent #6EA8FE / #2563EB
- Type scale: display 64/1.04 (-0.035em, 600), H1 52–56, H2 36 (-0.025em),
  H3 20 (-0.015em), body 17/1.7 for long reading, UI 14–15, mono labels 12
  uppercase with 0.08em tracking. Metrics: Geist Mono, 40–44px.
- Radius 6 (tags), 10–12 (buttons, inner boxes), 16 (cards). 8px spacing.
- Components: primary button (text-color fill, bg-color label), secondary
  (border), text link (accent), outline / filled / accent tags, metric tile,
  case-study card with a mini diagram, app card, segmented filter, timeline
  item, sticky "On this page" nav on case studies.
- Home: hero with eyebrow, headline, value line, two CTAs, location line,
  and a "Currently" card; proof row of 4 metric tiles; "Shipped at" text
  row; 3 featured case-study cards; shipped-apps strip; contact band.
- Motion: 150ms color/border transitions only; honor reduced motion.

## Quality bar (CI must enforce these)
- Lighthouse mobile: 95+ in Performance, Accessibility, Best Practices, SEO
- LCP < 2.5 s, CLS < 0.1
- First-load JS: framework baseline (~130 KB gzip on App Router + React 19)
  plus < 10 KB of our own code; CI guards against regressions.
- WCAG AA contrast, full keyboard navigation, visible focus, alt text everywhere
- Zero `any`, zero ESLint warnings, zero console errors
- Light and dark theme via `prefers-color-scheme`
- No heavy animation libraries, no 3D, no client-side data fetching on the home page

## Architecture rules
- All user-facing content is editable in Keystatic; never hard-code copy,
  dates or titles in components. Schema in `keystatic.config.ts`:
  - singleton `profile`: name, headline, value statement, location line,
    links, proof points, resume file
  - collection `experience`: company, title, start, end (or present),
    summary, highlights, order
  - collection `apps`: name, type (web/mobile), stack, role, links,
    screenshots, featured
  - collection `caseStudies`: title, slug, summary, body (Markdoc) following
    the template Context, Problem, Options considered, Decision,
    Architecture, Results, What I'd do differently; `diagram` (select from
    the diagram registry), `published` toggle, order
  - collection `skills`: group, items
- Pages read content with the Keystatic reader API at build time (fully
  static). Unpublished case studies never render or appear in the sitemap.
- Adding, editing or removing an entry must never require a code change.
- Diagrams are hand-authored inline SVG components in
  `src/components/diagrams/`, registered in `src/components/diagrams/index.ts`
  and picked per case study by key; themeable and accessible (`role="img"` + `aria-label`).
- Server Components by default; `"use client"` only where interaction needs it.
- Small, focused components; co-located tests (`Component.test.tsx`).
- Conventional commits; one logical change per commit.

## Content guardrails (NON-NEGOTIABLE)
- This repo is PUBLIC. Never add anything proprietary from Best Buy or any past
  client or employer: no internal package names, repo names, service names,
  team names, internal tool names, Confluence or Jira links, screenshots,
  internal URLs or code.
  Never include: internal package, repo, service, team and tool names, ticket
  IDs, colleague names, internal URLs and internal metrics not cleared for
  publishing.
- Describe patterns, not systems: "a React Native host app that composes
  feature modules", not the real package names.
- Performance numbers from employers are marked `TODO(julio): confirm OK to publish`
  until Julio confirms each one. Prefer relative wording over raw internal
  measurements.
- Nothing sensitive about Best Buy: no employer-internal metrics or
  measurements, no team sizes or org structure, no internal names, tickets,
  people, dates or decisions attributed to internal teams. Results about Best
  Buy work are qualitative, or about my own code only (e.g. tests written,
  dependencies reduced).
- Only claim skills Julio has confirmed. Do NOT add: Reanimated, Detox,
  Expo Router, React Query, WebSockets, Storybook.
- Never invent metrics, users, dates or titles. Unknown → `TODO(julio): ...`.
- No phone number and no work-authorization details on the site.
