# NiangAtelier

Phase one: a single, responsive artist homepage. Next.js 15, React 19, TypeScript and native CSS. No external fonts, imagery, UI libraries, database or commerce integrations.

## Run locally

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000. For a production preview, run `npm run build` then `npm start`. TypeScript can also be checked with `npm run typecheck`.

## Structure

- `src/app/page.tsx`: homepage composition only.
- `src/app/layout.tsx`: metadata, document language and skip link.
- `src/app/globals.css`: palette, typography, responsive layout and reduced-motion support.
- `src/components/home.tsx`: Header, Hero, Featured Works, About teaser and Footer.
- `src/components/artwork-image.tsx`: empty photographic surface or optimized local Next Image.
- `src/data/home.ts`: editable sample work descriptions and image sources.

## Add real photographs

Place images in `public/images/`. In `src/data/home.ts`, change `heroImage.src` or a work's `image.src` from `null` to a path such as `/images/the-watcher.jpg`, and supply accurate alt text. No component edits are required. Images keep their natural colors and fit within the reserved space without forced cropping. Hero is 4:5; works alternate 4:5 and 1:1.

All current names, descriptions, materials and years are sample content supplied in the brief. Blank warm-white surfaces intentionally contain no pictures or visible placeholder labels.

## Navigation scope

Works, About and Contact navigate to the corresponding homepage sections (Contact targets the footer). The full studio page and Instagram/email addresses have not been supplied: these entries are disabled, marked accessibly as coming soon, and do not navigate to invented routes or addresses. Replace them with real links when those destinations exist.

## Verification

- `npm run build`: passed, exit 0; Next.js 15.5.25, statically prerendered homepage. No build warnings.
- `npm run typecheck`: passed, exit 0.
- Codex in-app browser: inspected desktop (1440px) and mobile (390px) full-page rendering and mobile footer. Header, Hero, three work entries, About teaser and Footer are present in the requested order.
- Overflow checks at 320, 375, 390, 768, 1024, 1440 and 1920px: document scroll width does not exceed client width.
- Navigation: Explore works, About and Contact reach the homepage anchors; wordmark returns home. Pending links are disabled rather than pointing at nonexistent pages.
- Browser warning/error log: empty during inspection.
- Reduced motion: verified the browser-loaded CSS media rule disables transitions, animations, hover transforms and smooth scrolling. The browser tool does not expose reduced-motion emulation; an emulated reduce-mode runtime test was not performed.
- npm install emitted only an npm version-update notice, not a dependency warning.

### Design verification

Compared the rendered page with the approved written specification (no generated concept image was requested): exact hero copy, separate text/image columns, warm-white background, system sans-serif typography, 4:5 hero image area, staggered two-column works, single-column mobile layout, generous section spacing and no commerce UI. The only intentional unfinished content is the requested blank image areas and unavailable studio/social destinations.
