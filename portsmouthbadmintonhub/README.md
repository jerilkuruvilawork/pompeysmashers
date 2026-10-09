# Portsmouth Badminton Hub

Community directory of pay-and-play and social badminton sessions around Portsmouth (~25 miles).

**Live site:** [https://jerilkuruvilawork.github.io/portsmouthbadmintonhub/](https://jerilkuruvilawork.github.io/portsmouthbadmintonhub/)

## Correction form (email hidden from visitors)

Visitors use the on-site form. Your email is **not** in the code.

1. Sign up at [Web3Forms](https://web3forms.com) and create an access key (your email stays in their dashboard).
2. **Local:** copy `.env.example` to `.env` and set `VITE_WEB3FORMS_ACCESS_KEY`.
3. **GitHub Pages:** in repo **Settings → Secrets and variables → Actions**, add secret **`WEB3FORMS_ACCESS_KEY`** with the same value.
4. Rebuild / push to `main` so the deploy workflow picks up the secret.

## Run locally

```bash
npm install
cp .env.example .env   # then add your Web3Forms key
npm run dev
```

Open [http://localhost:5173/portsmouthbadmintonhub/](http://localhost:5173/portsmouthbadmintonhub/).

## Data

- `src/data/sessions.ts` — times, venues, club contacts
- `src/data/sessionDetails.ts` — area, levels, types, formats
