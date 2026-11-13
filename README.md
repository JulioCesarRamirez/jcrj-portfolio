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
