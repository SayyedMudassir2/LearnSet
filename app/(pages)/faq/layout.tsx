// app/faq/layout.tsx

import { faqs } from "./faq-data";

export const metadata = {
  title: "Frequently Asked Questions (FAQ) | LearnSet.in | MSBTE Resources & AI",
  description: "Find instant answers to common questions about LearnSet. Access free MSBTE study materials, understand our AI assistant features, and learn about contribution and support options.",
  // Add Open Graph/Social Meta Tags
  openGraph: {
    title: 'FAQ | LearnSet - Frequently Asked Questions',
    description: 'Find answers to common questions about LearnSet, our free MSBTE study materials, AI assistant, and more.',
    url: 'learnset.in',
    siteName: 'LearnSet',
    type: 'website',
  },
  // Add Canonical Link
  alternates: {
    canonical: 'learnset.in',
  },
};

function generateFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  const schema = generateFaqSchema();
  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}
