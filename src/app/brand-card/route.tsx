import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "64px 80px", background: "#f5f3ee", color: "#262522" }}>
      <div style={{ fontSize: 20, letterSpacing: 5 }}>INDEPENDENT ART STUDIO</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 96, letterSpacing: -5 }}>NiangAtelier</div>
        <div style={{ fontSize: 28, color: "#6d6962" }}>Handmade objects. Small sculptures. Wool felt art.</div>
      </div>
      <div style={{ fontSize: 20, borderTop: "1px solid #dedad2", paddingTop: 24 }}>Objects with unmistakable personalities.</div>
    </div>,
    { width: 1200, height: 630 },
  );
}
