// app/upload-notes/page.tsx
import type { Metadata } from "next";
import UploadNotesPage from "@/components/UploadNotesPage";

export const metadata: Metadata = {
  title: "Upload & Share Your Notes | LearnSet MSBTE Community",
  description:
    "Contribute to the LearnSet community! Easily upload your high-quality MSBTE study notes, assignments, and previous year solutions to help thousands of other engineering and diploma students succeed.",
  
  // Add Open Graph/Social Media metadata
  openGraph: {
    title: 'Share Your Study Notes | LearnSet',
    description: 'Help the community by uploading your MSBTE notes and materials.',
    url: 'https://learnset.in/upload-notes',
    siteName: 'LearnSet',
    type: 'website',
  },
  // Add canonical URL
  alternates: {
    canonical: 'https://learnset.in/upload-notes',
  },
};

  function JsonLd() {
    return {
      __html: `{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Upload Notes Page | LearnSet",
        "description": "Share your MSBTE study materials with the community.",
        "url": "https://learnset.in/upload-notes",
        "contributor": {
            "@type": "Organization",
            "name": "LearnSet"
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
      <UploadNotesPage />
    </>
  );
}