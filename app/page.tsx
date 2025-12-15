// app/page.tsx 

import type { Metadata } from "next";
import HomePageContent from "@/components/HomePage";

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
    "12th board exam notes",
    "12th board study material",
    "12th exam questions",
    "10th board exam notes",
    "10th board study material",
    "10th exam questions",
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
    "digital notes for students",
    "MSBTE semester notes",
    "subject-wise notes",
    "engineering tutorials",
    "AI study tools",
    "interactive learning platform",
    "learn engineering online",
    "top MSBTE resources",
    "exam revision notes",
    "practical and theory notes",
    "MSBTE mechanical engineering notes",
    "MSBTE civil engineering notes",
    "MSBTE electrical engineering notes",
    "MSBTE computer engineering notes",
    "MSBTE electronics notes",
    "MSBTE IT notes",
    "MSBTE exam tips",
    "best online study platform",
    "diploma study guide",
      "MSBTE mechanical engineering notes semester 1",
  "MSBTE mechanical engineering notes semester 2",
  "MSBTE mechanical engineering notes semester 3",
  "MSBTE mechanical engineering notes semester 4",
  "MSBTE mechanical engineering notes semester 5",
  "MSBTE mechanical engineering notes semester 6",
  "MSBTE mechanical engineering PYQs semester 1",
  "MSBTE mechanical engineering PYQs semester 2",
  "MSBTE mechanical engineering PYQs semester 3",
  "MSBTE mechanical engineering PYQs semester 4",
  "MSBTE mechanical engineering PYQs semester 5",
  "MSBTE mechanical engineering PYQs semester 6",
  "MSBTE mechanical practical notes",
  "MSBTE mechanical theory notes",
  "MSBTE mechanical previous year questions",
  "MSBTE mechanical exam preparation",
  "MSBTE mechanical free study material",

  "MSBTE civil engineering notes semester 1",
  "MSBTE civil engineering notes semester 2",
  "MSBTE civil engineering notes semester 3",
  "MSBTE civil engineering notes semester 4",
  "MSBTE civil engineering notes semester 5",
  "MSBTE civil engineering notes semester 6",
  "MSBTE civil engineering PYQs semester 1",
  "MSBTE civil engineering PYQs semester 2",
  "MSBTE civil engineering PYQs semester 3",
  "MSBTE civil engineering PYQs semester 4",
  "MSBTE civil engineering PYQs semester 5",
  "MSBTE civil engineering PYQs semester 6",
  "MSBTE civil practical notes",
  "MSBTE civil theory notes",
  "MSBTE civil previous year questions",
  "MSBTE civil exam preparation",
  "MSBTE civil free study material",

  "MSBTE electrical engineering notes semester 1",
  "MSBTE electrical engineering notes semester 2",
  "MSBTE electrical engineering notes semester 3",
  "MSBTE electrical engineering notes semester 4",
  "MSBTE electrical engineering notes semester 5",
  "MSBTE electrical engineering notes semester 6",
  "MSBTE electrical engineering PYQs semester 1",
  "MSBTE electrical engineering PYQs semester 2",
  "MSBTE electrical engineering PYQs semester 3",
  "MSBTE electrical engineering PYQs semester 4",
  "MSBTE electrical engineering PYQs semester 5",
  "MSBTE electrical engineering PYQs semester 6",
  "MSBTE electrical practical notes",
  "MSBTE electrical theory notes",
  "MSBTE electrical previous year questions",
  "MSBTE electrical exam preparation",
  "MSBTE electrical free study material",

  "MSBTE electronics engineering notes semester 1",
  "MSBTE electronics engineering notes semester 2",
  "MSBTE electronics engineering notes semester 3",
  "MSBTE electronics engineering notes semester 4",
  "MSBTE electronics engineering notes semester 5",
  "MSBTE electronics engineering notes semester 6",
  "MSBTE electronics engineering PYQs semester 1",
  "MSBTE electronics engineering PYQs semester 2",
  "MSBTE electronics engineering PYQs semester 3",
  "MSBTE electronics engineering PYQs semester 4",
  "MSBTE electronics engineering PYQs semester 5",
  "MSBTE electronics engineering PYQs semester 6",
  "MSBTE electronics practical notes",
  "MSBTE electronics theory notes",
  "MSBTE electronics previous year questions",
  "MSBTE electronics exam preparation",
  "MSBTE electronics free study material",

  "MSBTE computer engineering notes semester 1",
  "MSBTE computer engineering notes semester 2",
  "MSBTE computer engineering notes semester 3",
  "MSBTE computer engineering notes semester 4",
  "MSBTE computer engineering notes semester 5",
  "MSBTE computer engineering notes semester 6",
  "MSBTE computer engineering PYQs semester 1",
  "MSBTE computer engineering PYQs semester 2",
  "MSBTE computer engineering PYQs semester 3",
  "MSBTE computer engineering PYQs semester 4",
  "MSBTE computer engineering PYQs semester 5",
  "MSBTE computer engineering PYQs semester 6",
  "MSBTE computer practical notes",
  "MSBTE computer theory notes",
  "MSBTE computer previous year questions",
  "MSBTE computer exam preparation",
  "MSBTE computer free study material",

  "MSBTE diploma notes for all branches",
  "MSBTE previous year questions PDF free download",
  "MSBTE semester wise study material",
  "MSBTE practical and theory notes",
  "MSBTE AI study assistant",
  "MSBTE online learning resources free",
  "MSBTE exam tips and tricks",
  "MSBTE engineering question bank",
  "LearnSet free study materials",
  "LearnSet MSBTE notes online"
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
