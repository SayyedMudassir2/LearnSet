// app/disclaimer/page.tsx
import DisclaimerPage from "@/components/DisclaimerPage";
import { Metadata } from "next";

// Server-side metadata for SEO
export const metadata: Metadata = {
  title: "Disclaimer | LearnSet.in | Educational Platform & Usage Policy",
  description:
    "Read the full disclaimer for LearnSet.in. All information is for educational purposes only and not professional advice. Review our policies regarding accuracy, liability, and external links.",

  openGraph: {
    title: "Disclaimer | LearnSet.in",
    description:
      "Review the educational disclaimer for LearnSet.in regarding website usage, accuracy, and limitations.",
    url: "https://learnset.vercel.app/disclaimer",
    siteName: "LearnSet",
    type: "website",
  },

  alternates: {
    canonical: "https://learnset.vercel.app/disclaimer",
  },
};

// JSON-LD Structured Data
function JsonLd() {
  return {
    __html: `{
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Disclaimer | LearnSet.in",
      "description": "Read the official disclaimer for using the LearnSet.in website and its educational services.",
      "url": "https://learnset.vercel.app/disclaimer",
      "publisher": {
        "@type": "Organization",
        "name": "LearnSet",
        "url": "https://learnset.vercel.app/disclaimer"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://learnset.vercel.app/search?query={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }`,
  };
}

// Server Component wrapper
export default function DisclaimerWrapper() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={JsonLd()}
      />
      <DisclaimerPage />
    </>
  );
}
