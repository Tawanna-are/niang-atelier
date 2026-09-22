import { AtelierVideo } from '@/components/atelier-video';
import { Footer, Header, Hero } from '@/components/home';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(
  'NiangAtelier — Handmade Objects & Wool Felt Art',
  'Explore NiangAtelier, an independent studio creating handmade objects, small sculptures and wool felt art with unmistakable personalities.',
  '/',
);

export default function Home(){return <div className="home-poster"><Header/><main id="main"><Hero><AtelierVideo /></Hero></main><Footer/></div>;}
