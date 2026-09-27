import Image from 'next/image';
import Link from 'next/link';
import { ArtworkImage } from './artwork-image';
import { getCollageAssets } from '@/data/collage';
import { navigation } from '@/data/home';
import type { ReactNode } from 'react';
export function Header() {
 return <header className="site-header"><div className="brand-lockup"><Link className="wordmark" href="/" aria-label="NiangAtelier home">NIANG<br/>ATELIER</Link><p className="brand-note handwriting">Unusual<br/>Handmade<br/>Objects</p></div><nav aria-label="Main navigation"><ul className="navigation">{navigation.map(n=><li key={n.label}><Link href={n.href}>{n.label}</Link></li>)}</ul><span className="edition">01 / 05</span></nav></header>;
}
export function Hero({ children }: { children?: ReactNode }) {
 const {portrait,works}=getCollageAssets();
 return <section className="hero" aria-labelledby="hero-title"><div className="portrait" aria-hidden="true">{portrait ? <Image src={portrait} alt="" fill priority sizes="(max-width:760px) 100vw,70vw" unoptimized/> : <span className="portrait-note">PORTRAIT / TO COME</span>}</div><div className="collage" id="works" aria-label="Selected handmade works">{works.map((image,i)=><figure className={`paper paper-${i+1} ${image.src?'':'empty-paper'}`} key={i}><span className="tape" aria-hidden="true"/><ArtworkImage image={image} sizes="(max-width:760px) 43vw,25vw"/><figcaption><span>0{i+1}</span><span>{image.src?'HANDMADE OBJECT':'OBJECT / TO COME'}</span></figcaption></figure>)}</div><div className="hero-copy"><h1 id="hero-title"><span>STRANGE</span><span>HANDMADE</span><span>OBJECTS</span></h1><p className="hero-description">Objects with unmistakable<br/>personalities.</p><a className="explore" href="#works">EXPLORE <span aria-hidden="true">→</span></a></div><aside className="margin-note handwriting">Made<br/>by hand.<br/>Slightly<br/>wrong.<svg viewBox="0 0 140 65" aria-hidden="true"><path d="M5 55Q70 10 105 29L93 42M105 29L86 22"/></svg></aside><svg className="scribble" viewBox="0 0 100 100" aria-hidden="true"><path d="M48 6L59 76 13 29 89 41 26 82 48 6M8 93Q42 67 91 87"/></svg>{children}<AboutTeaser/></section>;
}
export function AboutTeaser(){return <aside className="studio-note" id="about" aria-label="About NiangAtelier"><span className="note-label">FROM THE STUDIO</span><p className="handwriting">Soft surfaces.<br/>Strange characters.<br/>Made slowly.</p><span className="note-signature">— NiangAtelier</span></aside>;}
export function Footer(){return <footer id="contact" className="site-footer"><Link href="/">NIANGATELIER</Link><span className="footer-rule" aria-hidden="true"/><p lang="zh-CN">一个安静的空间，制做一些奇怪的作品。</p><div className="contact-links"><span role="link" aria-disabled="true" title="Instagram address to be added">Instagram</span><span role="link" aria-disabled="true" title="Email address to be added">Email</span></div></footer>;}
