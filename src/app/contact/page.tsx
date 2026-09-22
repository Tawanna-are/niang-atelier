import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { contact } from "@/data/contact";
import styles from "./contact.module.css";

export const metadata = pageMetadata(
  "Contact — Studio & Collaboration Enquiries | NiangAtelier",
  "Contact NiangAtelier about handmade objects, small sculptures and wool felt art, or start a conversation about exhibitions and creative collaborations.",
  "/contact",
);

export default function ContactPage() {
  const collaborationHref = contact.email
    ? `mailto:${contact.email}?subject=${encodeURIComponent("NiangAtelier — Collaboration enquiry")}&body=${encodeURIComponent("Hello NiangAtelier,\n\nName / 姓名：\nProject / 合作想法：\nTimeline / 预计时间：\n\n")}`
    : null;

  return (
    <main id="main" className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/">NiangAtelier</Link>
        <nav aria-label="Contact navigation"><Link href="/">Home</Link><Link href="/works">Works</Link><Link href="/about">About</Link><span aria-current="page">Contact</span></nav>
      </header>
      <section className={styles.intro} aria-labelledby="contact-title">
        <p className={styles.label}>LETTERS TO THE STUDIO</p>
        <div><h1 id="contact-title">Contact</h1><p className={styles.statement}>A conversation<br />can begin here.</p><p className={styles.chinese} lang="zh-CN">关于一件作品，或一个尚未成形的想法。<br />欢迎与 NiangAtelier 联系。</p></div>
      </section>
      <section className={styles.section} aria-labelledby="write-title">
        <h2 id="write-title"><span>01 / CONTACT</span>Write to the studio</h2>
        <div className={styles.copy}><p>Questions about a piece, its materials, or the way it is made — we would love to hear from you.</p><p className={styles.chinese} lang="zh-CN">作品咨询、材料与制作过程，都可以从一封邮件开始。</p>
          {contact.email ? <a className={styles.email} href={`mailto:${contact.email}`}>{contact.email}<span aria-hidden="true">↗</span></a> : <p className={styles.pending} lang="zh-CN">工作室联系邮箱即将公布。</p>}
        </div>
      </section>
      <section className={styles.section} aria-labelledby="collaboration-title">
        <h2 id="collaboration-title"><span>02 / COLLABORATIONS</span>Make something together</h2>
        <div className={styles.copy}><p className={styles.collaboration}>Objects, images,<br />unexpected encounters.</p><p>For exhibitions, editorial projects and creative collaborations, tell us a little about your idea and when you hope to bring it to life.</p><p className={styles.chinese} lang="zh-CN">展览邀请、艺术拍摄或创作合作，欢迎分享项目想法、合作方式与预计时间。</p>
          {collaborationHref ? <><a className={styles.link} href={collaborationHref}>Start a conversation <span aria-hidden="true">↗</span></a><p className={styles.caption} lang="zh-CN">通过邮件发送合作咨询。</p></> : <p className={styles.pending} lang="zh-CN">合作咨询将在联系邮箱公布后开放。</p>}
        </div>
      </section>
      <footer className={styles.footer}><Link href="/">NiangAtelier</Link><span>Handmade archive</span></footer>
    </main>
  );
}
