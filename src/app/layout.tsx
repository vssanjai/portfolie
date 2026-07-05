import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Background3D from "@/components/Background3D";
import CustomCursor from "@/components/CustomCursor";
import WelcomeSequence from "@/components/WelcomeSequence";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "Sanjay V.S - Cybersecurity Professional",
  description: "Portfolio of Sanjay V.S, Cybersecurity Professional and Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased text-white bg-black min-h-screen flex flex-col cursor-none`}>
        <CustomCursor />
        <WelcomeSequence>
          <Background3D />
          <Navbar />
          <main className="flex-grow pt-20">
            {children}
          </main>
        </WelcomeSequence>
      </body>
    </html>
  );
}
