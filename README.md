# PowerBill Website

The official marketing website for [PowerBill](https://github.com/sandeep008/powerbill-releases) —
offline-first retail billing & POS software. Built with React, TypeScript, Vite, and
Tailwind CSS v4; deployed to GitHub Pages.

## What's here

- Landing page: hero, features, POS-style showcase, pricing, FAQ, and a support/demo-request
  section (WhatsApp + email, no backend needed).
- **Live download button**: fetches the latest release directly from the public
  [`powerbill-releases`](https://github.com/sandeep008/powerbill-releases) repo's GitHub API
  at page load (`src/hooks/useLatestRelease.ts`) — the same source PowerBill's own in-app
  "Check for Updates" reads from — so the site never advertises a stale version.
- No backend, no CMS: everything is static, content lives directly in the component files
  under `src/components/`.

## Development

```
npm install
npm run dev
```

## Build

```
npm run build
```

Output goes to `dist/`. `vite.config.ts` sets `base: '/powerbill-website/'` to match this
repo's GitHub Pages URL — update that if the repo is ever renamed or a custom domain is set up.

## Deployment

`.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages automatically on
every push to `main` (or via manual dispatch from the Actions tab). Pages must be set to
"GitHub Actions" as its source in the repo's Settings → Pages (already configured for this repo).

## Updating content

Company details, pricing structure, and feature copy live directly in the relevant component
under `src/components/`. See `docs/PowerBill-Business-Features.md` in the main
[`smart_ai_PowerBill`](https://github.com/sandeep008/smart_ai_PowerBill) repo for the
original source content this site was built from.
