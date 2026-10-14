# Virat Gupta: portfolio

My portfolio: a fast main page plus a pannable `/canvas` desk of draggable cards, built with Next.js.

**Live:** _add the Vercel link here after the first deploy_

## What's in it
- **Main page:** hero, about, toolbox, experience, four selected projects with write-ups at `/work/<slug>`, education and awards, contact.
- **Canvas (`/canvas`):** an infinite desk. Drag the background to pan, drag cards by their title bar, open them from the dock, `⌘/Ctrl + K` for a quick menu, `F` to fit everything. Desktop only.
- Light and dark theme, reduced-motion support, mobile layout for the main page.

## Tech stack
Next.js 15 (App Router, static export), React 19, Lenis (smooth scroll), plain CSS, Space Grotesk via `next/font`.

## Run it
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```

## Deploy
Static export, so any static host works. On Vercel: import the repo, framework preset Next.js, no environment variables needed.

## License
© 2026 Virat Gupta. **All rights reserved.** Code is public for viewing only; reuse needs written permission.
