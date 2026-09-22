# SEO configuration

Home, Works, About and Contact each define their own title, description, Open Graph and Twitter large-image card in `src/lib/seo.ts` and their page metadata exports.

Before deployment, set `SITE_URL` in the hosting environment to the actual public origin (including https://), then rebuild. No domain has been invented. Until this is configured, canonical and og:url are omitted and image URLs use localhost for local preview only. Localhost preview URLs cannot be fetched by social networks.

The shared 1200 × 630 PNG share card is generated locally at `/brand-card` with Next.js ImageResponse. It is a typography-only brand graphic, not a fabricated artwork. The App Router automatically registers `/icon.svg` as the browser favicon and `/apple-icon` as a PNG Apple touch icon. No external fonts or additional packages are needed.

Admin retains its existing noindex/nofollow metadata. No public page layout or database query was changed.
