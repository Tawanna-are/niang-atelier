import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: "#f5f3ee", color: "#262522", fontSize: 130, fontWeight: 700 }}>N</div>,
    size,
  );
}
