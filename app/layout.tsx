import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/AuthContext";

const inter = Rethink_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LearnSet – Smart Study Materials & AI Learning",
    template: "%s | LearnSet",
  },
  description:
    "LearnSet helps students create, organize, and study smart notes with AI-powered learning tools.",
  keywords: [
    "LearnSet",
    "study material",
    "AI learning",
    "student notes",
    "exam preparation",
  ],
  authors: [{ name: "LearnSet Team" }],
  metadataBase: new URL("https://learnset.vercel.app"), 
  openGraph: {
    title: "LearnSet – Smart Study Materials",
    description:
      "Create, upload, and study notes with AI-powered learning on LearnSet.",
    type: "website",
    url: "https://learnset.vercel.app",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen bg-background`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="pt-16">{children}</main>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
