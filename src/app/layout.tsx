import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "VJ SHAM — Portfolio",
  description:
    "Interactive portfolio of VJ SHAM. Explore visuals through a virtual VJ setup.",
  keywords: ["VJ", "visual jockey", "portfolio", "SHAM", "visuals", "live performance"],
  openGraph: {
    title: "VJ SHAM — Portfolio",
    description: "Interactive portfolio of VJ SHAM",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
