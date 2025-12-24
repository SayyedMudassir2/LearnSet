// app/page.tsx 

import type { Metadata } from "next";
import dynamic from 'next/dynamic';

import { Skeleton } from '@/components/ui/skeleton';

// --------------------
// SEO Metadata
// --------------------
export const metadata: Metadata = {
  title: "LearnSet.in | Free MSBTE Notes, PYQs, Study Materials & AI Study Assistant",
  description: "LearnSet.in offers 100% free MSBTE study materials, detailed engineering diploma notes, previous year question papers (PYQs), practical & theory solutions, and a smart AI assistant to help diploma students excel in exams. Prepare for MSBTE semesters, 10th & 12th board exams, and engineering subjects efficiently with our free resources.",
  
  keywords: [
    "MSBTE notes",
    "MSBTE study material",
    "MSBTE previous year questions",
    "MSBTE PYQs",
    "MSBTE solutions",
    "MSBTE syllabus",
    "MSBTE diploma notes",
    "MSBTE engineering notes",
    "free study material",
    "free engineering notes",
    "free diploma notes",
    "AI assistant for students",
    "online study assistant",
    "diploma engineering PYQs",
    "MSBTE exam preparation",
    "engineering exam notes",
    "technical notes",
    "study tips for MSBTE",
    "LearnSet study resources",
    "exam preparation online",
    "question papers for MSBTE",
    "free learning platform",
  ],

  openGraph: {
    title: "LearnSet.in | Your Free MSBTE Education Hub",
    description: "Access top-quality free MSBTE notes, previous year questions (PYQs), solutions, and AI assistance for all engineering diploma students. Learn smarter, prepare faster!",
    url: "https://learnset.vercel.app",
    siteName: "LearnSet",
    images: [
      {
        url: "/logo/logo-light.png",
        width: 1200,
        height: 630,
        alt: "LearnSet - Free MSBTE Study Resources",
      },
    ],
    type: "website",
  },

  alternates: {
    canonical: "https://learnset.vercel.app",
  },
};

// --------------------
// JSON-LD for Rich Results
// --------------------
function JsonLd() {
  return {
    __html: `{
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "LearnSet",
      "url": "https://learnset.vercel.app",
      "logo": "https://learnset.vercel/logo/logo-light.png",
      "description": "LearnSet.in provides free MSBTE notes, previous year questions (PYQs), engineering diploma study materials, and AI-powered study assistance for students.",
      "sameAs": [
        "https://www.linkedin.com/in/sayyedmudassir",
        "https://www.github.com/SayyedMudassir2"
      ],
      "founder": {
        "@type": "Person",
        "name": "Sayyed Mudassir"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "India",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Support",
        "email": "learnset2569@gmail.com",
        "url": "https://learnset.vercel.app/contact"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://learnset.vercel.app/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }`,
  };
}

// --------------------
// HomePage Component
// --------------------
const HomePageContent = dynamic(() => import('@/components/HomePage'), {
  loading: () => <Skeleton className="w-full h-screen" />,
});

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
