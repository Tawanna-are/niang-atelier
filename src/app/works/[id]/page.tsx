import Link from "next/link";
import { notFound } from "next/navigation";
import { getWorkById, normalizeDetailImages } from "@/lib/works";

export const dynamic = "force-dynamic";

export default async function WorkDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const work = await getWorkById(id);
  if (!work) notFound();
  const images = normalizeDetailImages(work.detail_images);
  return <main className="work-detail-page">
    <header className="work-detail-header"><Link className="works-wordmark" href="/" aria-label="NiangAtelier home">NiangAtelier</Link><Link className="back-to-works" href="/works"><span aria-hidden="true">↖</span> Back to Works</Link></header>
    <article className="work-detail">
      <div className="work-detail-cover">{work.cover_image ? <img src={work.cover_image} alt={work.name} /> : <div className="work-detail-image-empty" role="img" aria-label={`${work.name} image coming soon`} />}<span className="work-detail-index">01 / OBJECT</span></div>
      <div className="work-detail-info"><p className="work-detail-kicker">HANDMADE OBJECT <span aria-hidden="true">/</span> {work.featured ? "FEATURED" : "ARCHIVE"}</p><h1>{work.name}</h1>{work.name_en && <p className="work-detail-name-en">{work.name_en}</p>}<dl className="work-detail-meta">{work.technique && <div><dt>Technique</dt><dd>{work.technique}</dd></div>}{work.materials && <div><dt>Materials</dt><dd>{work.materials}</dd></div>}</dl>{work.story && <div className="work-detail-story"><p className="work-detail-label">THE STORY</p><p>{work.story}</p></div>}</div>
    </article>
    {images.length > 0 && <section className="work-detail-gallery" aria-label="Work detail images"><div className="work-detail-gallery-heading"><p className="work-detail-label">DETAILS</p><span>{String(images.length).padStart(2, "0")} IMAGES</span></div><div className="work-detail-images">{images.map((src, index) => <figure key={`${src}-${index}`}><img src={src} alt={`${work.name} detail ${index + 1}`} loading="lazy" decoding="async" /><figcaption>{String(index + 1).padStart(2, "0")}</figcaption></figure>)}</div></section>}
    <footer className="works-footer"><span>NiangAtelier</span><span>Handmade archive</span></footer>
  </main>;
}
