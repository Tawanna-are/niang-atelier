import Link from "next/link";
import { getWorks } from "@/lib/works";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Works — Handmade Objects & Small Sculptures | NiangAtelier",
  "Discover NiangAtelier's handmade objects, small sculptures and wool felt art. Explore tactile forms, unusual characters and wearable pieces made by hand.",
  "/works",
);

export const dynamic = "force-dynamic";

export default async function WorksPage() {
  const works = await getWorks();

  return (
    <main className="works-page">
      <header className="works-header">
        <Link className="works-wordmark" href="/" aria-label="NiangAtelier home">
          NiangAtelier
        </Link>
        <nav aria-label="Works navigation">
          <Link href="/">Home</Link>
          <span aria-current="page">Works</span>
        </nav>
      </header>

      <section className="works-intro" aria-labelledby="works-page-title">
        <p className="works-kicker">QUIET GALLERY / CHARACTER INDEX</p>
        <h1 id="works-page-title">Works</h1>
        <p className="works-lede">Handmade objects with unmistakable personalities.</p>
      </section>

      {works.length === 0 ? (
        <section className="works-empty" aria-live="polite">
          <p>No works have been added yet.</p>
          <span>The collection will appear here soon.</span>
        </section>
      ) : (
        <section className="works-index" aria-label="Works collection">
          {works.map((work, index) => (
            <Link className="works-entry" href={`/works/${work.id}`} key={work.id} aria-label={`View ${work.name}`}>
              <div className="works-entry-number">{String(index + 1).padStart(2, "0")}</div>
              <div className="works-entry-image">
                {work.cover_image?.trim() ? (
                  // Supabase Storage URLs are stored directly in cover_image.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={work.cover_image.trim()} alt={work.name} loading="lazy" decoding="async" />
                ) : (
                  <div className="works-image-empty" role="img" aria-label={`${work.name} image coming soon`} />
                )}
              </div>
              <div className="works-entry-copy">
                <h2>{work.name}</h2>
                {work.name_en && <p className="works-entry-en">{work.name_en}</p>}
              </div>
            </Link>
          ))}
        </section>
      )}

      <footer className="works-footer">
        <span>NiangAtelier</span>
        <span>Handmade archive</span>
      </footer>
    </main>
  );
}
