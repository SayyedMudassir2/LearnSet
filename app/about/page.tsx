// app/about/page.tsx
import type { Metadata } from "next";
import AboutPage from "@/components/AboutPage";

export const metadata: Metadata = {
  title: "About Us | LearnSet - Free MSBTE Study Materials & AI Assistant",
  description:
    "Discover LearnSet: Read about our mission to democratize education by providing 100% free, high-quality MSBTE study notes, previous year questions (PYQs), and innovative AI-powered learning assistance for students.",
  
  // Add Open Graph/Social Media metadata for better link previews
  openGraph: {
    title: 'About LearnSet | Mission, Values & Team',
    description: 'Learn about who we are and our commitment to providing free educational resources for MSBTE students.',
    url: 'learnset.in',
    siteName: 'LearnSet',
    type: 'website',
  },
  // Canonical URL to prevent duplication issues
  alternates: {
    canonical: 'learnset.in',
  },
};

function JsonLd() {
  return {
    __html: `{
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Us | LearnSet",
      "description": "Learn about LearnSet’s mission to provide free MSBTE study materials.",
      "url": "learnset.in",
      "mainEntity": {
        "@type": "Organization",
        "name": "LearnSet",
        "description": "An independent educational platform offering free MSBTE study notes, syllabus, PYQs, and AI assistance.",
        "url": "https://learnset.in",
        "logo": "learnset.in",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "contact@learnset.com",
          "contactType": "customer service"
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
      <AboutPage />
    </>
  );
}
