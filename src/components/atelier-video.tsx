export function AtelierVideo() {
  return (
    <section className="atelier-video" aria-labelledby="atelier-film-title">
      <div className="atelier-video-heading">
        <p className="atelier-video-kicker">ATELIER FILM</p>
        <h2 id="atelier-film-title">A quiet look inside the studio.</h2>
      </div>

      <video
        className="atelier-video-player"
        src="/videos/atelier-intro.mp4"
        autoPlay
        muted
        loop
        playsInline
        controls
        preload="metadata"
        aria-label="Atelier Film — a quiet look inside the NiangAtelier studio"
      />
    </section>
  );
}
