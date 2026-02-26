import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Header, Footer, WhatsAppButton } from "@/components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dhinesh Sculpture Shop - Handcrafted Sculptures | Tamil Nadu, India",
  description:
    "Explore our collection of handcrafted sculptures including God statues, custom sculptures, and memorial pieces. Quality craftsmanship from Tamil Nadu, India.",
  keywords: [
    "sculpture shop",
    "god statues",
    "custom sculptures",
    "stone sculptures",
    "marble statues",
    "tamil nadu",
    "handcrafted",
    "granite sculptures",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        <Toaster position="top-right" />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton variant="fixed" />
      </body>
    </html>
  );
}
