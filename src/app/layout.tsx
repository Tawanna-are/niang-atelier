import type { Metadata } from "next";
import { metadataBase } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase,
  applicationName: "NiangAtelier",
  title: "NiangAtelier — Unusual Handmade Objects",
  description: "Explore NiangAtelier, an independent studio creating handmade objects, small sculptures and wool felt art with unmistakable personalities.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
