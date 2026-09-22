import type { Metadata } from "next";
import Link from "next/link";
import AdminWorks from "./admin-works";
import styles from "./admin.module.css";

export const metadata: Metadata = {
  title: "Studio administration — NiangAtelier",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main id="main" className={styles.page} lang="zh-CN">
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>NiangAtelier</Link>
        <nav aria-label="后台导航"><Link href="/">Home</Link><Link href="/works">Works ↗</Link></nav>
      </header>
      <div className={styles.intro}><p className={styles.eyebrow}>STUDIO / WORKS ARCHIVE</p><h1>New work</h1><p>记录一个新的角色。填写作品信息，留下它的细节。</p></div>
      <AdminWorks />
      <footer className={styles.footer}>NiangAtelier <span>Studio administration</span></footer>
    </main>
  );
}
