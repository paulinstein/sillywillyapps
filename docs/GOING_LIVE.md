# Going live

The steps to put sillywillyapps.com on GitHub Pages. Do them in order. Steps 1–3 can be done any time. Step 4 (DNS) is the moment the old Squarespace page is replaced.

## 1. Create the GitHub repo
- On GitHub, create a **public** repo named `sillywillyapps` under `paulinstein` (free GitHub Pages needs it public). Don't add a README or licence.
- Then, from this folder:

```bash
git remote add origin git@github.com:paulinstein/sillywillyapps.git
```

```bash
git push -u origin main
```

## 2. Turn on GitHub Pages
- Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
- Repo → **Actions**: the "Deploy to GitHub Pages" run should go green. It runs the tests first, so a broken build never publishes.
- The site is now live at `https://paulinstein.github.io/sillywillyapps/` (styles may look off at that address; that's expected until the custom domain is set).

## 3. Set the custom domain in GitHub
- Repo → **Settings → Pages → Custom domain:** `sillywillyapps.com` → Save. (`public/CNAME` already says this, so it stays set after every deploy.)
- Optional but recommended: in your GitHub account, **Settings → Pages → Add a verified domain** → `sillywillyapps.com`. GitHub gives you a TXT record to add in step 4. It stops anyone else from claiming your domain on GitHub.

## 4. Point the domain at GitHub (Squarespace Domains)
Before you start: check whether anything on the current private Squarespace site is worth saving. These changes replace it.

In Squarespace → **Domains → sillywillyapps.com → DNS settings**:
- Remove the Squarespace default records for the root (`@`) and `www` (the "Squarespace Defaults" preset).
- Add four **A** records for host `@`:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- Add a **CNAME** record: host `www` → `paulinstein.github.io`
- (From step 3) add the **TXT** verification record, if you made one.
- **Don't touch** the `dogstories` CNAME. Dog Stories keeps working as it is.

DNS can take a few minutes to a few hours to update. You can check it with:

```bash
dig +short sillywillyapps.com
```

When it shows the four 185.199.x.153 addresses, it's done.

## 5. Turn on HTTPS
- Back in repo → **Settings → Pages**, wait for the DNS check to pass, then tick **Enforce HTTPS**. The certificate can take up to an hour to appear.

## 6. Afterwards
- If you were paying for a Squarespace *website* plan (not just the domain), you can cancel it. Keep the domain registration.
- Share a link in Messages to check the preview card shows the sticker.
