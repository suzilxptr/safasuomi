# SafaSuomi

Static cleaning company website built with React, Vite and TypeScript. Supports Finnish (default) and English. The contact form posts to a Vercel serverless function (`api/contact.ts`) that sends the message by SMTP using Nodemailer.

## Develop

```bash
npm install
cp .env.example .env   # then fill in your SMTP values
npm run dev            # http://localhost:5173
```

`npm run dev` also serves `api/contact.ts` at `/api/contact` (see `vite.config.ts`), so the contact form works locally using the values in `.env`. `npm run build && npm run preview` serves the production build without the API; use `npm run dev:vercel` (requires `npx vercel login`) to emulate Vercel exactly.

## Translations

Edit `src/locales/fi.json` and `src/locales/en.json`. Keep both files in the same key structure. The language is detected from the browser and saved in `localStorage`; the switcher is in the header.

Company name, phone, email and address are in `src/config.ts`.

## Deploy to Vercel

1. Push the repo to GitHub and import it in Vercel (Vite preset, configured in `vercel.json`).
2. In Project Settings -> Environment Variables add the values from `.env.example`:
   `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO` and optionally `CONTACT_FROM`.
3. Deploy. Pushes to `main` deploy automatically.

For Gmail, use `smtp.gmail.com`, port `465`, and an App Password (requires 2-step verification).