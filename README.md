# jcrj-portfolio

Personal portfolio for Julio Ramirez. Next.js (App Router, static), Tailwind, Keystatic.

## Develop

```bash
npm install
npm run dev        # site at http://localhost:3000, CMS at /keystatic (local mode)
```

## Checks

```bash
npm run lint && npm run typecheck && npm test
npm run build && npm run test:e2e   # Playwright + axe
npm run size                        # first-load JS budget (after build)
npm run lhci                        # Lighthouse CI (mobile)
```

## Content

All copy lives in `content/` and is edited at `/keystatic`. In production Keystatic runs in
GitHub mode: set the variables in `.env.example`. Every save is a commit that triggers a rebuild.
Diagrams are inline SVG components registered in `src/components/diagrams/`.

This repo is public: never add proprietary employer or client details. See `CLAUDE.md`.

## Analytics

Vercel Web Analytics and Speed Insights load only when `VERCEL_ENV === "production"`. They are
cookieless and aggregate, so there is no consent banner. Query strings and hashes are stripped
from every URL before it is sent.

Custom events (`resume_download` with its location variant, `start_project_click`, `contact_click`,
`case_study_view`, `theme_toggle`) are defined once in `src/lib/analytics.ts`. Components add
`data-track` attributes through `trackAttrs()` and never pass raw event names.

**Exclude your own visits:** open `/?notrack=1` once in each browser (sets a `localStorage` flag).
Events and page views are dropped while it is set. `/?notrack=0` turns tracking back on.

## Location variants

Visitors in Mexico and Spanish-speaking LATAM see the Mexico / LATAM wording; everyone else sees
Chicago. `src/proxy.ts` reads Vercel's `x-vercel-ip-country` header and rewrites to a prerendered
`/v/<variant>/...` page. The URL, canonical and sitemap always use the public path. Crawlers and link
previews (Googlebot, LinkedInBot, Slackbot, Twitterbot, facebookexternalhit, ...) always get Chicago.
Copy, the country list and the per-variant résumé files live in Keystatic ("Location variants");
the country list is copied to `src/lib/generated/` by `scripts/gen-geo.mjs` before `dev` and `build`.

**Override for testing:** `/?loc=mexico` or `/?loc=chicago` sets a 30-day `loc` cookie that beats
the IP; `/?loc=auto` clears it. Locally there is no geo header, so the default is Chicago. Responses
carry `x-loc-variant` and `x-loc-source` (`ip`, `query`, `cookie`, `bot`, `default`) for debugging.
