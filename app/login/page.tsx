// app/login/page.tsx
import type { Metadata } from "next";
import LoginPage from "@/components/LoginPage";

export const metadata: Metadata = {
  title: "Login to Your Account | LearnSet",
  description:
    "Log in securely to your LearnSet account. Save favorite study notes, track academic progress, and receive personalized MSBTE study features.",

  openGraph: {
    title: "Account Login | LearnSet",
    description: "Securely access your LearnSet account features.",
    url: "https://learnset.in/login",
    siteName: "LearnSet",
    type: "website",
  },

  alternates: {
    canonical: "https://learnset.in/login",
  },

  robots: {
    index: false,
    follow: false,
  },
};

  function JsonLd() {
    return {
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Login Page",
        description: "Log in to your LearnSet account.",
        url: "https://learnset.in/login",
      }),
    };
  }

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={JsonLd()}
      />
      <LoginPage />
    </>
  );
}
