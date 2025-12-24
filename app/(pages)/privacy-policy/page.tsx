// app/privacy-policy/page.tsx
import PrivacyPolicyPage from "@/components/PrivacyPolicyPage";
import { Metadata } from "next";

// Server-side metadata for SEO
export const metadata: Metadata = {
  title: "Privacy Policy | LearnSet.in | Data & Cookie Usage",
  description:
    "Review the comprehensive Privacy Policy for LearnSet.in. Learn how we collect, use, protect, and handle your personal data and information when you use our educational website services.",

  // Open Graph metadata for social sharing
  openGraph: {
    title: "Privacy Policy | LearnSet.in",
    description:
      "Understand how LearnSet handles your data, cookie usage, and privacy rights.",
    url: "https://learnset.in/privacy-policy",
    siteName: "LearnSet",
    type: "website",
  },

  // Canonical link to prevent duplicate content issues
  alternates: {
    canonical: "https://learnset.in/privacy-policy",
  },
};

function JsonLd() {
  return {
    __html: `{
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Privacy Policy | LearnSet.in",
      "description": "Review the Privacy Policy for using the LearnSet.in website and services.",
      "url": "https://learnset.in/privacy-policy",
      "publisher": {
        "@type": "Organization",
        "name": "LearnSet",
        "url": "https://learnset.in"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://learnset.in/search?query={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }`,
  };
}

// Server Component wrapper for the client component
export default function PrivacyPolicy() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={JsonLd()} />
      <PrivacyPolicyPage />
    </>
  );
}
