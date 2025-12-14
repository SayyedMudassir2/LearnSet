// app/register/page.tsx
import type { Metadata } from "next";
import RegisterPage from "@/components/RegisterPage";

export const metadata: Metadata = {
  title: "Create a Free Account | LearnSet - MSBTE Notes & AI Access",
  description:
    "Sign up today for your free LearnSet account. Unlock access to personalized dashboards, save favorite MSBTE study notes and PYQs, track progress, and utilize advanced AI learning features.",
  
  openGraph: {
    title: 'Create Your LearnSet Account Today',
    description: 'Sign up for free access to all educational resources.',
    url: 'https://learnset.in/register',
    siteName: 'LearnSet',
    type: 'website',
  },

  alternates: {
    canonical: 'https://learnset.in/register',
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
        url: "https://learnset.in/register",
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
      <RegisterPage />
    </>
  );
}
