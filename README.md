# TNT Fitness

Website for TNT Athletics & Wellness — a results-focused gym in Sidney, OH.

## What’s in this repo

- **Site files (root):** `index.html`, `styles.css`, `script.js`, `logo_small.jpg` — open `index.html` or serve the root folder to view the site.
- **notes/** — Project notes, instructions, and reference (TODO, Instructions, SKILL, Style.png).

## Run locally

Open `index.html` in a browser, or serve the project root:

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then visit `http://localhost:3000` (or `http://localhost:8000`).

## Deploy

Use the **project root** as the site root (e.g. GitHub Pages, Netlify, or Vercel with root = `.`).

## PushPress

Lead capture and strategy session flow use PushPress. The signup URL is set in `index.html` on the `<body>` tag: `data-pushpress-signup-url`. Update it there to change where “I’m interested” and “Share your info” buttons point.
