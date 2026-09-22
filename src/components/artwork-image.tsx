import Image from "next/image";
import type { ArtworkImageData } from "@/data/home";

type ArtworkImageProps = {
  image: ArtworkImageData;
  className?: string;
  priority?: boolean;
  sizes: string;
};

export function ArtworkImage({
  image,
  className = "",
  priority = false,
  sizes,
}: ArtworkImageProps) {
  return (
    <div
      className={`artwork-image ${className}`}
      role={image.src ? undefined : "img"}
      aria-label={image.src ? undefined : "Artwork photograph to be added"}
    >
      {image.src ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
        />
      ) : null}
    </div>
  );
}
