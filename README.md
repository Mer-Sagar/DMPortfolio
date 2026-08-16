# Atelier Professional

A production-quality, JSON-driven professional services website. Visual language is inspired by editorial, document-like professional sites (large serif headlines, thin rules, numbered sections, floating header) — implemented as an original React codebase.

## Stack

- React + TypeScript
- Vite
- Tailwind CSS v4
- React Router
- Framer Motion
- Lucide React

## Quick start

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

## To customize this website, edit these JSON files

All business copy, navigation, theme colours, and media paths live under `src/data/`. Components never hard-code client names, statistics, or service lists.

| File | What it controls |
| --- | --- |
| `src/data/site.json` | Brand name, logo/mark, tagline, description, **theme colours**, contact, social, hours, copyright, legal links, `baseUrl` for SEO |
| `src/data/navigation.json` | Header/footer links and CTA button. Set `enabled: false` to hide a route |
| `src/data/home.json` | Home hero, highlights, pipeline, CTAs, philosophy, reasons, process, and **section enable/disable** |
| `src/data/services.json` | Service directory, categories, explorer copy, and every service (including detail pages via `slug`) |
| `src/data/team.json` | People. `featured: true` appears as partners on Home/About |
| `src/data/statistics.json` | Animated counters |
| `src/data/testimonials.json` | Quotes. Empty array hides the section |
| `src/data/projects.json` | Portfolio listing + `/projects/:slug` |
| `src/data/articles.json` | Journal listing + `/articles/:slug` (including `pdfUrl`) |
| `src/data/contact.json` | Contact page copy, phones, form fields and messages |
| `src/data/about.json` | About hero, origin quote, milestones, mission/vision, values |
| `src/data/pages.json` | 404 copy |

### Content replacement test

Change `site.json` → `brand.name` from the current seed to another firm name. The header, footer, titles, and SEO update with no component edits.

Replace `services.json` → `items` to swap the entire service catalogue. Detail routes follow each item’s `slug`.

### Theme

`site.json` → `theme` is mapped to CSS variables on boot (`src/lib/theme.ts`):

- `--site-primary`
- `--site-secondary`
- `--site-accent`
- `--site-background`
- `--site-surface`
- `--site-text`
- `--site-muted`
- `--site-border`

### Images

Put files in `public/assets/images/...` and reference them from JSON, for example:

```json
"photo": "/assets/images/team/person-1.webp"
```

Seed art is original SVG placeholders. Replace with photography without touching React.

### Contact form

UI calls `submitContactForm()` in `src/lib/contact.ts`. Replace that function with your API. The form does not pretend a backend exists.

### Empty content

Optional blocks hide themselves when arrays are empty (team, projects, articles, testimonials, social links).

## Routes

- `/`
- `/services`
- `/services/:slug`
- `/about`
- `/projects`
- `/projects/:slug`
- `/articles`
- `/articles/:slug`
- `/contact`
- 404 for anything else

## Architecture

```
JSON  →  TypeScript types  →  reusable components  →  pages  →  UI
```

See `src/types/index.ts` for the contracts.

## Accessibility and motion

- Semantic landmarks, skip link, visible focus, labelled form fields
- Mobile menu: escape to close, body scroll lock, `aria-expanded`
- `prefers-reduced-motion` disables Framer Motion reveals and counter animation
