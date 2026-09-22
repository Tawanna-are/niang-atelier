import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
export function getCollageAssets() {
  const dir = path.join(process.cwd(), 'public/images/works');
  const files = existsSync(dir) ? readdirSync(dir, { withFileTypes: true })
    .filter(entry => entry.isFile() && /\.(jpe?g|png|webp|avif)$/i.test(entry.name))
    .map(entry => entry.name)
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true })) : [];
  const portrait = '/images/hero/hero-background.jpg';
  return { portrait: existsSync(path.join(process.cwd(), 'public', portrait)) ? portrait : null,
    works: Array.from({length:4}, (_,i) => ({src: files[i] ? `/images/works/${files[i]}` : null, alt: `NiangAtelier handmade work ${i+1}`})) };
}
