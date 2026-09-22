export type ArtworkImageData = {
  /** Local path under public/, for example /images/the-watcher.jpg. */
  src: string | null;
  alt: string;
};

export type Work = {
  number: string;
  name: string;
  description: string;
  material: string;
  year: number;
  image: ArtworkImageData;
};

export const heroImage: ArtworkImageData = {
  src: null,
  alt: "A handmade object by NiangAtelier",
};

// Sample editorial content; replace with the artist's real work details.
export const featuredWorks: Work[] = [
  {
    number: "01",
    name: "THE WATCHER",
    description: "A small object with an unnecessarily serious gaze.",
    material: "Hand-felted wool",
    year: 2025,
    image: { src: null, alt: "The Watcher — a hand-felted wool object" },
  },
  {
    number: "02",
    name: "THE ODD ONE",
    description: "Soft, strange and slightly out of place.",
    material: "Hand-felted wool",
    year: 2025,
    image: { src: null, alt: "The Odd One — a hand-felted wool object" },
  },
  {
    number: "03",
    name: "THE LISTENER",
    description: "It looks quiet. It probably isn't.",
    material: "Hand-felted wool",
    year: 2025,
    image: { src: null, alt: "The Listener — a hand-felted wool object" },
  },
];

export const navigation = [
  { label: "Works", href: "/works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
