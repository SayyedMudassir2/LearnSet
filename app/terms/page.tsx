// app/terms/page.tsx
import TermsPage from '@/components/TermsPage';
import { Metadata } from 'next';

// Server-side metadata for SEO
export const metadata: Metadata = {
  title: 'Terms and Conditions | learnset.in | Usage Agreement & Policies',
  description: 'Read the full Terms and Conditions for LearnSet. This agreement outlines the policies, terms of use, limitations of liability, and user obligations when accessing our educational resources and website services.',
  // Open Graph metadata
  openGraph: {
    title: 'Terms and Conditions | LearnSet',
    description: 'Review the terms and conditions for using the LearnSet website and services.',
    url: 'www.learnset.in',
    siteName: 'learnset.in',
    type: 'website',
  },
  // Canonical link to prevent duplicate contents
  alternates: {
    canonical: 'www.learnset.in',
  },
};

function JsonLd() {
  return {
    __html: `{
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Terms and Conditions | learnset.in",
      "description": "Review the terms and conditions for using the learnset.in website and services.",
      "url": "www.learnset.in",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "www.learnset.in{search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }`,
  };
}


// Server Component wrapper for the client component
export default function TermsAndConditions() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={JsonLd()}
      />
      <TermsPage />
    </>
  );
}