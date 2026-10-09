# Portsmouth Badminton Hub

Community directory of pay-and-play and social badminton sessions around Portsmouth (~25 miles).

**Live site:** [https://jerilkuruvilawork.github.io/portsmouth-badminton-hub](https://jerilkuruvilawork.github.io/portsmouth-badminton-hub)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173/portsmouth-badminton-hub/](http://localhost:5173/portsmouth-badminton-hub/).

For root-path local dev: `VITE_SITE_BASE=/ npm run dev`

## Deploy

Push to `main` on this repository — GitHub Actions publishes to Pages — or run `npm run deploy`.

## Corrections by email

Visitors use **Suggest an edit** or **Report a change** — that opens a `mailto:` draft to `jeril.kuruvila@gmail.com`. Override with `VITE_SESSIONS_CONTACT_EMAIL` at build time.

Update listings in `src/data/sessions.ts`, then redeploy.
