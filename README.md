# sillywillyapps.com

The website for Silly Willy Apps: fun, clean, useful apps and games. No ads.

Built with [Astro](https://astro.build) and published to GitHub Pages on every push to `main` (`.github/workflows/deploy.yml`). Going live for the first time: see [`docs/GOING_LIVE.md`](docs/GOING_LIVE.md). Brand rules: [`brand/index.html`](brand/index.html).

## Write a post

1. Add a file to `src/content/blog/`, named `YYYY-MM-DD-short-title.md`. The name becomes the web address.
2. Start it with:

   ```md
   ---
   title: How Pepper learned to sing
   date: 2026-11-27
   description: One sentence for the blog list, RSS and link previews.
   tags: [dog-stories, dev-story]
   # cover: ./images/pepper.png   (optional; put images next to the post)
   # coverAlt: Pepper singing at the piano
   # draft: true                  (hides the post until you remove it)
   ---
   ```

3. Write the post in Markdown underneath.
4. Preview it (below), then commit and push. It's live a couple of minutes later.

Useful tags: `announcement`, `dev-story`, and one per app (`dog-stories`).

Please keep `2026-11-13-draft-check.md`. It's a hidden post the tests use to prove drafts never publish.

## Add an app

Add an entry to `src/data/apps.ts` and put its icon in `src/assets/apps/`. Leave out `appStore` / `googlePlay` until the app is live, and the card will say "Coming soon".

## Preview and test

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:4321.

```bash
npm test
```

`npm test` builds the site and checks the result: drafts hidden, no third-party requests, no oversized images, all pages present.

Astro is pinned to 7.3.8 because newer versions need Node 22.22 or later. After updating Node, run `npm install astro@latest`.
