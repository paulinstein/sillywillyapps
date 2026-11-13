# sillywillyapps.com: website design

Agreed in conversation on 2026-11-13. It builds on `brand/DESIGN.md` and the brand guide (`brand/index.html`).

## Why
Silly Willy Apps is Paul's after-hours hobby label for fun, clean, useful apps and games with no ads, ever. The site is its home: what he's made, what he's working on, and who he is. Success means someone finds an app, enjoys a dev story, or feels the "made with joy" spirit. It is not a sales funnel.

## Goals
- Home, Apps, Blog and About pages in the Silly Willy brand.
- A blog of dev stories and new-app announcements, posted about every two weeks, written as Markdown files in this repo.
- An RSS feed, so readers can follow along (and so a newsletter could be added later without a rebuild).
- Free hosting on GitHub Pages, published automatically on every push to `main`.

## Non-goals
- No email newsletter, comments or accounts at launch.
- No CMS or web editor. Posts are Markdown files.
- No store or payments on the site.
- The Dog Stories site stays where it is (see below).

## Anti-goals
- No ads, trackers or cookie banners. It's a kids'-friendly brand with a no-ads promise.
- No salesy copy (see the voice rules in the brand guide).
- Nothing that makes posting a chore. If writing a post takes more than "add a file, push", that's a failure.

## Decisions (made by Paul)
- **Approach B:** a static site generator built by a GitHub Action (chosen over Jekyll and over a hosted blog).
- **Dog Stories site stays separate:** `dogstories.sillywillyapps.com` (repo `paulinstein/dog-stories-site`) is unchanged. The new site only links to it. Its privacy and support pages, which the app stores link to, don't move.
- **Blog content:** dev stories and app announcements, about every two weeks.
- **Logo system:** wordmark plus sticker plus SW monogram, from the brand kit.

## Approaches considered
- **A. Jekyll on GitHub Pages:** zero build setup, but an old Ruby toolchain and weak image handling.
- **B. Astro, built by a GitHub Action (chosen):** modern, resizes images, has typed content collections and reusable components. It costs a Node toolchain and a build step.
- **C. Hosted blog (Ghost or Substack):** a nice editor and a newsletter, but a monthly cost or someone else's branding, and the blog would look separate from the site.

## Claude's calls (open to change)
- **Generator:** Astro (current stable version), static output, `@astrojs/rss`, `@astrojs/sitemap`, and Markdown posts in a content collection. Paul has Node 22 installed.
- **Repo layout:** the site lives at the root of `~/github_projs/sillywillyapps`. `brand/` stays as source material, and logo masters are imported through Astro's image pipeline so visitors download small WebP/PNG copies, not the 1.5–2 MB masters.
- **Pages:**
  - `/` Home: tagline, promise line, app cards, the latest three posts.
  - `/apps/` App cards: icon, name, one-line pitch, links (website, App Store, Google Play). Apps come from a small data file so adding one is one entry. A "next app: coming someday" card is optional, controlled by a flag.
  - `/blog/` lists posts newest first. `/blog/<slug>/` is a post page. `/blog/tags/<tag>/` lists posts by tag.
  - `/about/` uses the About Me draft from the brand guide.
  - `/rss.xml`, `/sitemap-index.xml`, a 404 page and `/privacy/` (a short "this site collects nothing" note).
- **Post format:** `src/content/blog/YYYY-MM-DD-slug.md` with frontmatter `title`, `date`, `description`, `tags` (for example `dog-stories`, `announcement`, `dev-story`), an optional `cover` image and `draft: true` to hide a post. Drafts never publish.
- **Look:** the brand kit as is. Paper cream backgrounds and navy ink, with Fraunces for headings, DM Sans for body text and Caveat Brush for tiny accents (fonts self-hosted, so nothing loads from Google). Wordmark in the header on light backgrounds; in dark mode the header uses the sticker, because the wordmark's scribble has a bright fringe on dark backgrounds. SW monogram for the favicon and the social preview image. Dark mode follows the device setting.
- **Analytics:** none at launch.
- **Launch content:** one welcome post ("Hello from Silly Willy") written in the brand voice, for Paul to edit. Dog Stories is the only app card.
- **Social previews:** an Open Graph image built from the sticker, so links shared in messages show the brand.

## Domain and hosting
- DNS for `sillywillyapps.com` is managed through Squarespace Domains (Google Domains name servers). The apex currently points to a **private Squarespace site**.
- Going live means: GitHub Pages for this repo with custom domain `sillywillyapps.com`. The apex A records change to GitHub's four IPs (185.199.108–111.153), `www` becomes a CNAME to `paulinstein.github.io`, and HTTPS is turned on in Pages.
- The `dogstories` record stays untouched.
- The repo needs a GitHub home (for example `paulinstein/sillywillyapps`). It must be public for free GitHub Pages, so `docs/` and `brand/` will be public too. That's fine; nothing in them is secret. Creating and pushing it happens only with Paul's go-ahead.
- Dog Stories' store links: the card shows only the links that exist. Until the app is live, that's just its website, with "Coming soon to the App Store and Google Play".
- Paul makes the DNS change in Squarespace himself. Building and previewing don't depend on it.

## Open for Paul
- Is anything on the private Squarespace site worth keeping? Switching the DNS replaces it, and a paid Squarespace website plan could be cancelled afterwards.

## Left to the builder
- Component structure, CSS organisation, exact spacing and type sizes within the brand guide's rules.
- Image sizes and formats for the logo copies.
- Wording of the welcome post, 404 page and privacy note, in the brand voice.
