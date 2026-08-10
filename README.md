# King Owusu — Portfolio

A premium, single-page portfolio built for King Owusu — IT support specialist,
cybersecurity analyst, and SkillsUSA Texas State Champion, now extending into
applied AI. Content is drawn from his résumé and restructured into a
narrative rather than a literal reprint.

**Design concept:** dark mode is a "midnight vault" — true dark-blue
surfaces, a confident azure signal accent (verified/secure), a rare indigo
for gradient depth. Light mode is deliberately not a paler version of the
same thing — it's a warm parchment "ledger" surface with navy text, carrying
the same azure and gold accents across so the brand still reads as one
identity in either mode. Headlines are set in Fraunces, a premium editorial
serif, against Geist for body copy and Geist Mono for data/labels. The
circuit-grid background and "access log" styled experience timeline tie the
whole thing back to the subject: cybersecurity and systems.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (CSS-first `@theme` config, no `tailwind.config.js` needed)
- Framer Motion for motion design
- `next-themes` for dark/light mode
- `react-hook-form` + `zod` for the contact form
- Static export (`output: "export"`) for GitHub Pages

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

All copy and structured data live in `lib/data.ts` — update your bio,
experience, skills, projects, certifications, and awards there. Nothing is
hardcoded into components.

## The portrait

No headshot was supplied, so the hero currently ships an original
illustrated SVG portrait (`components/portrait.tsx`) as a stand-in — a
geometric, editorial-style vector bust in the same signal palette as the
rest of the site, with a toggle already wired for "Illustrated" vs "Photo"
modes.

To swap in a real photo:

1. Drop your headshot into `public/` (e.g. `public/headshot.jpg`).
2. In `components/portrait.tsx`, replace the placeholder block inside the
   `mode === "photo"` branch with:
   ```tsx
   <img src="/headshot.jpg" alt="Portrait" className="h-full w-full object-cover" />
   ```
   (Prefix the path with `NEXT_PUBLIC_BASE_PATH` if you're deploying under a
   repo subpath — see below.)
3. Optionally regenerate the illustrated version from the real photo using
   an image model, keeping the same geometric/editorial art direction, and
   replace the inline `<VectorPortrait />` SVG with the new asset.

## Contact form

The site is a static export, so there's no server to receive form
submissions. The form currently opens the visitor's email client with a
pre-filled message (`components/contact.tsx`). To collect submissions
without a mail client, point the `onSubmit` handler at a form backend
instead (Formspree, Getform, Resend, etc.) — swap the `mailto:` line for a
`fetch()` call to your endpoint.

## Deploying to GitHub Pages

This repo is pre-configured for GitHub Pages with a GitHub Actions workflow
(`.github/workflows/deploy.yml`) that builds and deploys automatically on
every push to `main`.

1. **Push this project to a GitHub repository.**

2. **Set the repo name for routing.** `next.config.mjs` reads a `REPO_NAME`
   environment variable to build the correct `basePath`/`assetPrefix` (since
   project pages are served at `username.github.io/repo-name/`). The
   workflow already passes this automatically via
   `${{ github.event.repository.name }}` — you don't need to edit anything
   if your repo name matches what you want as the path.

   - If you're deploying to a **user/org root page**
     (`username.github.io`), open `.github/workflows/deploy.yml` and set
     `REPO_NAME: ""` instead.

3. **Enable GitHub Pages via Actions.** In your repo: **Settings → Pages →
   Build and deployment → Source → GitHub Actions**.

4. **Push to `main`.** The workflow will install dependencies, run
   `next build` (which outputs a static site to `/out` thanks to
   `output: "export"`), and publish it via `actions/deploy-pages`.

5. Your site will be live at `https://<username>.github.io/<repo-name>/`
   (or `https://<username>.github.io/` for a root page).

### Local static build (optional)

```bash
NODE_ENV=production REPO_NAME=your-repo-name npm run build
```

The static site is output to `./out`.

## Accessibility & performance notes

- All interactive elements have visible focus states (`:focus-visible`).
- `prefers-reduced-motion` disables/shortens animation globally.
- Images use `next/image`-compatible config (`unoptimized: true` for static
  export) — replace the SVG portrait with an optimized raster image if you
  add a real photo, and keep dimensions explicit.
- Semantic landmarks (`header`, `main`, `section`, `footer`) and `aria-*`
  labels are used throughout for screen readers.

## License

Personal project — content and copy belong to King Owusu. Reuse the code
structure freely for your own portfolio.
