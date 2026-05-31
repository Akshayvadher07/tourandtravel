import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Madhav Tours and Travels | Gujarat tours & travel plans",
    template: "%s | Madhav Tours and Travels",
  },
  description:
    "Gujarat tour packages and custom travel plans—Dwarka, Sasan Gir, Diu, Junagadh, Somnath, and the Kathiawar coast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="site-body min-h-full flex flex-col bg-[#f6f1e6] font-sans text-slate-900">{children}</body>
    </html>
  );
}
