// app/page.tsx 

import type { Metadata } from "next";
import HomePageContent from "@/components/HomePage";


// Define comprehensive Metadata here
export const metadata: Metadata = {
  title: "LearnSet.in | Free MSBTE Study Materials, Notes, PYQs & AI Assistant",
  description:
    "LearnSet offers 100% free MSBTE study materials, engineering notes, previous year question papers (PYQs), solutions, and a powerful AI study assistant for all diploma students.",
  
  openGraph: {
    title: 'LearnSet.in | Your Free MSBTE Education Hub',
    description: 'Access top-quality free notes, PYQs, and AI assistance for MSBTE courses.',
    url: 'learnset.in',
    siteName: 'LearnSet',
    images: [
      {
        url: '/logo/logo-light.png',
        width: 1200,
        height: 630,
        alt: 'LearnSet - Free MSBTE Study Resources',
      },
    ],
    type: 'website',
  },
  // Add canonical URL
  alternates: {
    canonical: 'learnset.in',
  },

  keywords: ['MSBTE notes', '12 board', '12th board exam', '10 exam', '10th board exam', '10 board', 'free study material', 'engineering diploma notes', 'PYQs', 'AI assistant for students'],
};

function JsonLd() {
  return {
    __html: `{
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "LearnSet",
      "url": "https://learnset.in",
      "logo": "learnset.in",
      "sameAs": [
        "https://www.linkedin.com/in/sayyedmudassir",
        "https://www.github.com/SayyedMudassir2"
      ],
      "potentialAction": {
        "@type": "SearchAction",
        "target": "learnset.in{search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }`,
  };
}


export default function HomePage() {
    return(
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={JsonLd()}
            />
            <HomePageContent /> 
        </>
    )
}