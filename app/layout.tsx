import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";
import CustomCursor from "@/components/cursor/CustomCursor";
import { Analytics } from "@vercel/analytics/next";

const Scene = dynamic(() => import("@/components/three/Scene"), { ssr: false });

export const metadata: Metadata = {
  title: "Sai Siddharth - Portfolio",
  description: "Interactive Ransom Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Big+Shoulders+Display:wght@900&family=Cormorant+Garamond:ital,wght@0,300;1,300&family=DM+Mono:wght@400;500&family=Josefin+Sans:wght@100;700&family=Permanent+Marker&family=Playfair+Display:ital,wght@0,900;1,400&family=Syne:wght@800&family=Teko:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Scene />
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
