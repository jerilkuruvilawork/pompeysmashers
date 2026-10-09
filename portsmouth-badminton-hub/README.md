# Portsmouth Badminton Hub

Community directory of pay-and-play and social badminton sessions around Portsmouth (~25 miles).

Filter by **area**, **player level** (beginner → league), **shuttles** (plastic / feather / No Strings), **session type**, **format**, and **day**.

**Target URL:** [https://jerilkuruvilawork.github.io/portsmouth-badminton-hub/](https://jerilkuruvilawork.github.io/portsmouth-badminton-hub/)

## Create your GitHub repo and push (one time)

1. On GitHub: **New repository** → name it exactly **`portsmouth-badminton-hub`** → Public → **Create** (no README).

2. From your machine, in the **`portsmouth-badminton-hub`** folder (this project):

```bash
npm install
git init
git add .
git commit -m "Initial commit: Portsmouth Badminton Hub"
git branch -M main
git remote add origin https://github.com/jerilkuruvilawork/portsmouth-badminton-hub.git
git push -u origin main
```

3. **Settings → Pages → Build and deployment → Source:** GitHub Actions (the included workflow deploys on push to `main`).

Or deploy manually: `npm run deploy` (uses the `gh-pages` branch).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173/portsmouth-badminton-hub/](http://localhost:5173/portsmouth-badminton-hub/).

For root-path local dev: `VITE_SITE_BASE=/ npm run dev`

## Data and filters

- Session times and contacts: `src/data/sessions.ts`
- Area, levels, session type, format tags: `src/data/sessionDetails.ts`
- Filter logic: `src/utils/sessionFilters.ts`

## Corrections by email

**Suggest an edit** opens a `mailto:` draft to `jeril.kuruvila@gmail.com` (override with `VITE_SESSIONS_CONTACT_EMAIL` at build time).
