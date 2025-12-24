// app/contact/page.tsx
import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us | LearnSet - Get in Touch",
  description:
    "Have questions, feedback, or partnership ideas regarding MSBTE notes or our AI services? Reach out to the official LearnSet team via email or our contact form anytime for support.",
  // Open Graph/Social Media metadata
  openGraph: {
    title: 'Contact LearnSet | Support & Inquiries',
    description: 'Reach out to the LearnSet team for all questions, feedback, and support needs.',
    url: "https://learnset.vercel.app/contact",
    siteName: 'LearnSet',
    type: 'website',
  },
  // Canonical URL to prevent duplication issues
  alternates: {
    canonical: "https://learnset.vercel.app/contact",
  },
};

function JsonLd() {
  return {
    __html: `{
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "url": "https://learnset.vercel.app/contact",
      "name": "Contact Us | LearnSet",
      "description": "Reach out to the LearnSet team for support.",
      "mainContentOfPage": {
        "@type": "WebPageElement",
        "cssSelector": ".contact-form-section" 
      },
      "potentialAction": {
        "@type": "CommunicateAction",
        "target": {
          "@type": "EntryPoint",
          "actionPlatform": ["schema.org"],
          "inLanguage": "en-US",
          "encodingFormat": "application/ld+json",
          "httpMethod": "POST",
          "url": "https://learnset.vercel.app/contact" 
        },
        "instrument": {
          "@type": "Mail",
          "name": "General Inquiries Email"
        },
        "agent": {
            "@type": "Organization",
            "name": "LearnSet"
        }
      }
    }`,
  };
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={JsonLd()}
      />
      <ContactPage />
    </>
  );
}
