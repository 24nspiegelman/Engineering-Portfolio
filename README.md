# Engineering Portfolio

Mechanical engineering portfolio built with Next.js, React Three Fiber, and Tailwind CSS.

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to GitHub Pages

This repo is configured to deploy automatically when you push to `master` or `main`.

1. Push this repository to GitHub.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `master`/`main` (or run the **Deploy to GitHub Pages** workflow manually).

The site will be published at:

**https://24nspiegelman.github.io/Engineering-Portfolio/**

### How `index.html` is created

This is a Next.js app, so there is no hand-written `index.html` in source. During deployment, GitHub Actions runs `pnpm build`, which static-exports the site into the `out/` folder. That folder includes `index.html` and is what GitHub Pages serves.

### Adding your own assets

- **Project photos:** replace the SVG placeholders in `public/images/` with your own images (keep the same filenames or update the paths in `app/page.tsx` and `components/project-detail.tsx`).
- **3D model:** add `public/models/prosthetic-hand.glb` to enable the interactive model viewer.
