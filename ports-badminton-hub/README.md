# Ports Badminton Hub

Community directory of pay-and-play and social badminton sessions around Portsmouth (~25 miles).

**Suggested live URL:** [https://jerilkuruvilawork.github.io/ports-badminton-hub](https://jerilkuruvilawork.github.io/ports-badminton-hub)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173/ports-badminton-hub/](http://localhost:5173/ports-badminton-hub/) (matches GitHub Pages base path).

For root-path local dev: `VITE_SITE_BASE=/ npm run dev`

## Publish as its own GitHub site

1. Create a new GitHub repository named **`ports-badminton-hub`** (must match the base path in `vite.config.ts`).
2. Copy **this folder’s contents** (not the parent Pompey Smashers repo) into that repo’s root.
3. Push to `main`, then either:
   - `npm run deploy` (uses `gh-pages` branch), or
   - GitHub Actions → Pages from `gh-pages` / workflow in `.github/workflows/deploy.yml`.

## Corrections by email

Visitors use **Suggest an edit** or **Report a change** — that opens a `mailto:` draft to `jeril.kuruvila@gmail.com`. Override with `VITE_SESSIONS_CONTACT_EMAIL` at build time.

Update listings in `src/data/sessions.ts`, then redeploy.
