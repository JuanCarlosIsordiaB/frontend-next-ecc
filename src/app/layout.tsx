import type { Metadata } from "next";
import {Outfit} from 'next/font/google'
import "./globals.css";

const outfit = Outfit({subsets: ['latin']})

export const metadata: Metadata = {
  title: "Fullstack Next.js and Nest.js",
  description: "Fullstack Next.js and Nest.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${outfit.className} bg-gray-200`}
      >
        {children}
      </body>
    </html>
  );
}
