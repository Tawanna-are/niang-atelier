import { pageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = pageMetadata(
  "About — An Independent Art Studio | NiangAtelier",
  "Meet NiangAtelier, a studio for handmade objects, small sculptures and wool felt art. Discover the philosophy, materials and process behind each character.",
  "/about",
);

export default function AboutPage() {
  return (
    <main className="about-page">
      <header className="about-header">
        <Link className="about-wordmark" href="/">NiangAtelier</Link>
        <nav aria-label="About navigation">
          <Link href="/">Home</Link>
          <Link href="/works">Works</Link>
          <span aria-current="page">About</span>
        </nav>
      </header>

      <section className="about-intro" aria-labelledby="about-title">
        <p className="about-label">NOTES FROM THE STUDIO</p>
        <div>
          <h1 id="about-title">About <span>NiangAtelier</span></h1>
          <p className="about-intro-text" lang="zh-CN">一个关于手工物件、小型雕塑、纤维艺术和独特角色创造的工作室。</p>
        </div>
      </section>

      <section className="about-section" aria-labelledby="studio-title">
        <h2 id="studio-title"><span>01</span> Studio introduction</h2>
        <div className="about-copy">
          <p className="about-statement">Small objects.<br />Distinct personalities.</p>
          <p>NiangAtelier explores the space between handmade objects, small sculptures and wearable art. Soft surfaces and unexpected proportions give each piece a character of its own.</p>
          <p lang="zh-CN">从可以佩戴的小物件，到握在手中的小型雕塑，我们关注材料的触感，也关注一个角色如何在手中慢慢出现。</p>
        </div>
      </section>

      <section className="about-section" aria-labelledby="philosophy-title">
        <h2 id="philosophy-title"><span>02</span> Philosophy</h2>
        <div className="about-copy">
          <p className="about-statement">A little strange.<br />Entirely itself.</p>
          <p>A curious expression. A slightly awkward silhouette. A trace of the hand that made it. These small differences are where a character begins.</p>
          <p lang="zh-CN">保留一点不对称、一点幽默和手工留下的痕迹。让每件作品拥有自己的表情，而不是相同的答案。</p>
        </div>
      </section>

      <section className="about-section" aria-labelledby="process-title">
        <h2 id="process-title"><span>03</span> Materials &amp; Process</h2>
        <div className="about-copy">
          <p className="about-statement">Fiber, form<br />and the human hand.</p>
          <p>Wool and fiber invite a slow way of making: building a form, adjusting its proportions, and discovering its expression through touch. The surface keeps a record of that process.</p>
          <p lang="zh-CN">以羊毛与纤维探索形态，在塑形与细节调整之间寻找作品的性格。柔软的表面，也记录着制作的过程。</p>
          <Link className="about-return" href="/works">Explore the works <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <footer className="about-footer"><span>NiangAtelier</span><span>Handmade archive</span></footer>
    </main>
  );
}
