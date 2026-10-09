# Portsmouth Badminton Hub

Community directory of pay-and-play and social badminton sessions around Portsmouth (~25 miles).

Filter by **area**, **player level**, **shuttles**, **session type**, **format**, and **day**.

**Live site:** [https://jerilkuruvilawork.github.io/portsmouthbadmintonhub/](https://jerilkuruvilawork.github.io/portsmouthbadmintonhub/)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173/portsmouthbadmintonhub/](http://localhost:5173/portsmouthbadmintonhub/).

For root-path local dev: `VITE_SITE_BASE=/ npm run dev`

## Deploy

Push to `main` — GitHub Actions publishes to Pages — or run `npm run deploy`.

## Data

- `src/data/sessions.ts` — times, venues, contacts
- `src/data/sessionDetails.ts` — area, levels, types, formats

Corrections via **Suggest an edit** → `jeril.kuruvila@gmail.com` (`VITE_SESSIONS_CONTACT_EMAIL` to override).
