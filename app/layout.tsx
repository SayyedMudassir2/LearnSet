import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {default: "LearnSet – Smart Study Materials & AI Learning",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <main>
            {children}
            </main>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
