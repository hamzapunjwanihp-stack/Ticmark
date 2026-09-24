# Ticmark Properties — Website

Marketing and property-discovery website for **Ticmark Properties**, Karachi.
Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 and Lucide icons.

- Every page is statically generated (51 pages at build time), plus two small API routes for forms.
- There is no database: all content lives in `/data` as typed TypeScript files.
- Fonts are bundled locally in `app/fonts`, so builds never need to reach Google Fonts.

---

## Requirements

- Node.js **20.9 or newer** (Vercel's default Node 22.x works)
- npm 10+

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Command             | What it does                                     |
| ------------------- | ------------------------------------------------ |
| `npm run dev`       | Development server with hot reload               |
| `npm run build`     | Production build (the same command Vercel runs)  |
| `npm run start`     | Serves the production build locally              |
| `npm run lint`      | ESLint                                           |
| `npm run typecheck` | Generates route types and runs `tsc --noEmit`    |
| `npm run format`    | Formats the codebase with Prettier               |

To use environment variables locally, copy `.env.example` to `.env.local` and fill in what you need. Every variable is optional.

---

## Deploying to Vercel

### Option A: Git import (recommended)

1. Push this folder to a GitHub, GitLab or Bitbucket repository. `.gitignore` already excludes `node_modules`, `.next` and local `.env` files.
2. In Vercel, go to **Add New… → Project** and import the repository.
3. Check the settings Vercel detects. They should be:
   - **Framework Preset:** Next.js
   - **Root Directory:** the folder that contains `package.json` (the repo root if this folder *is* the repo)
   - **Build Command:** `npm run build` (default)
   - **Install Command:** `npm install` (default)
   - **Output Directory:** leave empty (default)
   - **Node.js Version:** 22.x or 20.x (Project → Settings → General)
4. Under **Environment Variables**, add the values from `.env.example` that you want to use (see the table below). All are optional. `NEXT_PUBLIC_SITE_URL` is recommended once the domain is known.
5. Click **Deploy**.

After that, every push to the main branch deploys to production, and every other branch or pull request gets its own preview URL.

### Option B: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel            # creates the project and a preview deployment
vercel --prod     # deploys to production
```

Environment variables can be added with `vercel env add NAME production`, or in the dashboard.

### Custom domain

In **Project → Settings → Domains**, add `ticmarkproperties.com` (and `www.`) and follow the DNS instructions.
Then set `NEXT_PUBLIC_SITE_URL=https://www.ticmarkproperties.com` (or your chosen primary domain) and **redeploy**. `NEXT_PUBLIC_*` values are baked in at build time, so a redeploy is required after changing them.

### Environment variables

| Variable                            | Scope  | Purpose                                                                                                                                                                                                                        |
| ----------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`              | Public | Canonical URLs, `sitemap.xml`, `robots.txt`, Open Graph and structured data. If unset on Vercel, the production domain Vercel assigns is used.                                                                                 |
| `NEXT_PUBLIC_CONTACT_PHONE`         | Public | Phone number in international format, e.g. `923001234567`. Enables the Call buttons and replaces the `+92 XXX XXXXXXX` placeholder.                                                                                            |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`       | Public | WhatsApp number in the same format. Enables WhatsApp click-to-chat links, each with a pre-filled message.                                                                                                                      |
| `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL` | Public | Google Maps embed `src` URL for the Contact page map.                                                                                                                                                                          |
| `INQUIRY_WEBHOOK_URL`               | Server | Inquiry and contact forms are POSTed here as JSON.                                                                                                                                                                             |
| `NEWSLETTER_WEBHOOK_URL`            | Server | "Get Updates" email sign-ups are POSTed here as JSON.                                                                                                                                                                          |

**Forms:** without a webhook URL, forms still validate and show a confirmation, but the message says it is in demo mode and **nothing is delivered**. Before launch, point both webhooks at a service such as Formspree, Zapier, Make, n8n or a CRM endpoint. The inquiry payload looks like this:

```json
{
  "type": "inquiry",
  "receivedAt": "2026-09-23T10:00:00.000Z",
  "name": "…",
  "phone": "…",
  "email": "…",
  "interestedIn": "…",
  "preferredArea": "…",
  "message": "…",
  "subject": "Aurelia Residences",
  "page": "/projects/aurelia-residences"
}
```

### Vercel notes

- **Images:** placeholder photos are served and resized by Unsplash's own CDN through a custom loader (`components/ui/photo.tsx`), so they don't count against Vercel's Image Optimization quota. Images you add to `/public` use Next.js's built-in optimizer.
- **Indexing:** preview deployments return a `robots.txt` that blocks crawlers. Only the production deployment is indexable.
- **Security headers** are set in `next.config.ts`.

---

## Editing content

All content is kept separate from the components. Edit these files; no component changes are needed.

| File                   | Contents                                                                                                                                     |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `data/site-config.ts`  | Brand, contact details, social links, navigation, hero, newsletter, video section, How It Works, Why Choose Ticmark, final CTA, footer links |
| `data/projects.ts`     | Projects: gallery, overview, unit types, amenities, payment plan, video                                                                      |
| `data/properties.ts`   | Listings (Recently Added, All Properties, detail pages)                                                                                      |
| `data/areas.ts`        | Areas (Popular Areas, area pages)                                                                                                            |
| `data/developers.ts`   | Developers. Add `logo: "/developers/name.svg"` once real logos are supplied                                                                  |
| `data/categories.ts`   | Property types. To add one, also extend `CategorySlug` in `lib/types.ts`                                                                     |
| `data/testimonials.ts` | Testimonials. Only add a `rating` if it is real                                                                                              |
| `data/videos.ts`       | Featured video and Latest Videos. Paste any YouTube URL                                                                                      |

- **Demo badges:** sample projects, listings and developers show a small "Demo" tag. Set `isDemo: false` on real entries, or turn all tags off with `showDemoBadges: false` in `site-config.ts`.
- **Images:** use any `https://images.unsplash.com/…` URL, or put files in `/public` and reference them as `/images/file.jpg`. To use another image host, add it to `images.remotePatterns` in `next.config.ts`.
- **Logo:** `public/brand/ticmark-logo.webp` / `.png` is the supplied logo with only its empty margin cropped. The original file is kept as `ticmark-logo-original.webp`.

### Placeholder content to replace before launch

- Every project, listing, price, payment plan and developer profile is **fictional sample data**.
- Testimonials are placeholders. The About Us copy, the Why Choose copy and the "Verified Buyers / 24/7 Support" trust points are placeholders.
- Phone, WhatsApp and office address are placeholders.
- The YouTube videos are public placeholder videos, and the photography comes from Unsplash.
- The Privacy Policy and Terms & Conditions pages are templates and need legal review.

---

## Project structure

```
app/                 Routes (App Router), API routes, sitemap, robots, icons, fonts
  api/inquiry        Inquiry form endpoint → INQUIRY_WEBHOOK_URL
  api/subscribe      Newsletter endpoint → NEWSLETTER_WEBHOOK_URL
components/
  layout/            Header, dropdown menus, mobile menu, footer
  home/              Homepage sections
  sections/          Shared sections (final CTA, testimonials, why choose, page hero…)
  cards/             Project, property, area, developer, category, testimonial, video cards
  listing/           Filterable directories, filter sidebar, mobile filter drawer
  detail/            Gallery + lightbox, inquiry card, map placeholder, sticky mobile CTA
  search/            Search overlay (Ctrl/⌘ K or "/") and results
  forms/             Contact / inquiry form
  ui/                Buttons, badges, headings, image wrapper, reveal animation…
data/                Editable content (see above)
lib/                 Types, data helpers, search/filter logic, SEO helpers, YouTube helpers
```

## Routes

`/`, `/projects`, `/projects/[slug]`, `/areas`, `/areas/[slug]`, `/developers`, `/developers/[slug]`, `/properties`, `/properties/[slug]`, `/search`, `/about`, `/contact`, `/testimonials`, `/privacy-policy`, `/terms-and-conditions`, plus `/sitemap.xml` and `/robots.txt`.

Filters on `/projects`, `/properties` and `/search` are stored in the URL (for example `/properties?area=clifton&type=apartment&sort=price-asc`), so any filtered view can be shared or linked.
