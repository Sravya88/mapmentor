import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'MapMentor - Find Real Tutors Near You in Hyderabad',
  description: 'Find verified tutors in Gachibowli, Madhapur, Kondapur. JEE, NEET, CBSE, Coding. No commission.',
  metadataBase: new URL('https://mapmentor.vercel.app'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}