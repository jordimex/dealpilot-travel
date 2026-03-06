# DealPilot Travel

SEO-first Next.js (App Router) site for a global travel deals brand with static pages, markdown blog system, and conversion-focused contact workflow.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- ESLint
- npm
- Markdown blog content via `gray-matter` + `remark`

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint

## Environment Variables

Create a local `.env.local` using `.env.example` and set:

- `TRAVELPAYOUTS_TOKEN` for server-side Travelpayouts API usage
- `NEXT_PUBLIC_TRAVELPAYOUTS_MARKER` for affiliate flight-search redirects
- `NEXT_PUBLIC_TRAVELPAYOUTS_WIDGET_SRC` for the widget script URL copied from your Travelpayouts dashboard
```

## Project Structure

- `app/` routes and UI
- `content/blog/` markdown blog posts
- `lib/config.ts` brand + site configuration
- `lib/blog.ts` markdown parsing and blog utilities
- `lib/seo.ts` metadata helper

## Add a New Blog Post

1. Create a markdown file in `content/blog` named with your slug, for example: `my-new-post.md`.
2. Add required frontmatter:

```md
---
title: "Your post title"
description: "Short SEO description"
date: "2026-02-27"
tags: ["Tag One", "Tag Two"]
author: "DealPilot Editorial"
---
```

3. Write post body content below frontmatter.
4. The post automatically appears on `/blog` and in sitemap output.

## Brand and URL Configuration

Edit `lib/config.ts` to update:

- `siteName`
- `siteUrl`
- `socialLinks`

## SEO Features Included

- Global metadata with title template
- Per-page metadata and canonicals
- Open Graph + Twitter cards
- Dynamic `sitemap.xml` with blog URLs
- `robots.txt`
- JSON-LD
  - Organization + WebSite on homepage
  - Article schema on blog post pages

## Contact Form

The `/contact` page includes client-side validation and prints a copyable request summary after submit.
If a tier query parameter is present (e.g. `/contact?tier=deal-check`), the form preselects it.
