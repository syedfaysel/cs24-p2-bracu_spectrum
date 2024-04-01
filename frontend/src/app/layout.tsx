import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EcoSync | DNCC",
  description:
    "Administrative system for Waste Collection and Management | DNCC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <main className="w-full h-full">
          <Navbar/>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
