import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "VJ SHAM | Visual Jockey",
  description: "Professional VJ services for clubs, festivals, corporate events, and private parties. Interactive visual experiences that captivate audiences.",
  keywords: ["VJ", "Visual Jockey", "DJ Visuals", "Live Visuals", "Festival Visuals", "Club Visuals"],
  authors: [{ name: "VJ SHAM" }],
  openGraph: {
    title: "VJ SHAM | Visual Jockey",
    description: "Professional VJ services for clubs, festivals, corporate events, and private parties.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
