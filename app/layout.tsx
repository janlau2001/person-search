import type { Metadata } from "next";
import { Geist, Azeret_Mono as Geist_Mono } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { DigitalTwinInitializer } from "@/components/digital-twin-initializer";
import { ClerkProvider } from '@clerk/nextjs';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jan Laurence Olarte - Portfolio",
  description: "Personal portfolio showcasing skills, experience, and projects with an AI-powered digital twin assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >          
          <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
            <DigitalTwinInitializer />
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Toaster />

            <Footer />
          </ThemeProvider>
      </body>

    </html>
    </ClerkProvider>
  );
}

