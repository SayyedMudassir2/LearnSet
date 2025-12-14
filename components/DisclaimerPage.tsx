"use client";

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  Info,
  ExternalLink,
  Copyright,
  AlertTriangle,
  FileText,
  Gavel, // Use Gavel for legal emphasis
  CheckCircle, // Use CheckCircle for consent/agreement
  type LucideIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator"; // Ensure Separator is imported

// --- Metadata Strategy (External to Component, but critical for SEO) ---
// Note: This needs to be defined in a `layout.tsx` or outside the component for Next.js 13+ app router
/*
export const metadata: Metadata = {
  title: "Official Disclaimer | LearnSet - Legal Information",
  description: "Official Disclaimer for LearnSet.in regarding content accuracy, liability, third-party links, and copyright. Effective Date: December 12, 2025.",
  keywords: ["LearnSet disclaimer", "educational platform liability", "website usage policy", "copyright information"],
};
*/

// --- Configuration & Content Strategy ---

const EFFECTIVE_DATE = "December 12, 2025";
const CONTACT_EMAIL = "learnset2569@gmail.com";
const WEBSITE_URL = "https://learnset.in";
const COMPANY_NAME = "LearnSet";

// Define the structure once for DRY principle and TOC generation
interface DisclaimerSection {
    id: string;
    title: string;
    icon: LucideIcon;
    content: React.ReactNode;
}

const SECTIONS: DisclaimerSection[] = [
  {
    id: "purpose-and-scope",
    title: "1. Purpose and Scope of the Disclaimer",
    icon: Gavel,
    content: (
      <>
        This document outlines the limitations of liability and the educational intent of all content provided by **{COMPANY_NAME}** on the Service. By accessing this platform, you acknowledge and agree to these terms.
        <br/><br/>
        **{COMPANY_NAME}** is an educational platform designed to supplement the learning experience for MSBTE students and **does not provide professional academic, legal, financial, or medical advice.**
      </>
    ),
  },
  {
    id: "educational-use",
    title: "2. Educational Use and No Warranty",
    icon: Info,
    content: (
      <>
        All information, materials, and resources provided on{" "}
        <Link
          href={WEBSITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline font-medium"
        >
          {WEBSITE_URL}
        </Link>{" "}
        are published **in good faith** and strictly for **general informational and educational purposes only**.
        <br />
        <br />
        We make no representations or warranties, express or implied, about the **accuracy, adequacy, validity, reliability, availability, or completeness** of any information on the Service.
      </>
    ),
  },
  {
    id: "accuracy-and-risk",
    title: "3. Accuracy, Completeness, and Reliance (Use at Your Own Risk)",
    icon: AlertTriangle,
    content: (
      <>
        While we strive for accuracy (especially in technical and syllabus-related content), the information may contain errors, omissions, or delays. Content may be updated or changed at any time without prior notice.
        <br/><br/>
        **Any reliance you place on the content is strictly at your own risk.** We strongly advise cross-referencing information with official MSBTE circulars, recognized textbooks, or qualified academic professionals.
      </>
    ),
  },
  {
    id: "liability-limitation",
    title: `4. Limitation of Liability`,
    icon: AlertTriangle,
    content: (
      <>
        In no event shall **{COMPANY_NAME}** be held liable for any direct, indirect, special, incidental, or consequential damages (including, but not limited to, damages for loss of profits, loss of data, or interruption of business) arising from the use or inability to use the website or its content.
      </>
    ),
  },
  {
    id: "third-party-links",
    title: "5. External Links and Third-Party Websites",
    icon: ExternalLink,
    content: (
      <>
        The Service may include links to external websites that are not owned, operated, or controlled by **{COMPANY_NAME}**. We do not endorse, warrant, or guarantee the information, products, or services offered by these third-party websites.
        <br/><br/>
        We are not responsible for the privacy practices or content of third-party sites. Clicking on external links is **at your own discretion and risk.**
      </>
    ),
  },
  {
    id: "copyright",
    title: "6. Copyright and Intellectual Property Rights",
    icon: Copyright,
    content: (
      <>
        All original content, text, graphics, logos, and materials created by **{COMPANY_NAME}** on the Service are the property of **{COMPANY_NAME}** and protected by intellectual property laws.
        <br/><br/>
        Unauthorized use, reproduction, or distribution of our proprietary content is strictly prohibited without explicit prior written consent. Where external materials (e.g., public domain images, licensed content) are used, credit is given where possible and appropriate licenses are maintained.
      </>
    ),
  },
  {
    id: "modifications",
    title: "7. Modifications and Updates to the Disclaimer",
    icon: FileText,
    content: (
      <>
        **{COMPANY_NAME}** reserves the right to update, amend, or modify this Disclaimer at any time. Any changes will be posted on this page with a revised effective date.
        <br/><br/>
        Users are encouraged to review this page periodically to stay informed about our commitments. Continued use of the Service after the effective date of any modification constitutes acceptance of the changes.
      </>
    ),
  },
];

// --- Helper Component: Anchor Link for TOC ---
const SectionAnchor: React.FC<{ section: DisclaimerSection }> = ({ section }) => (
    <div 
        id={section.id} 
        className="pt-10 -mt-10" // Padding and negative margin for smooth scrolling anchor target
    >
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
            <section.icon className="w-6 h-6 mr-3 text-primary" />
            {section.title}
        </h2>
        <div className="text-lg text-muted-foreground leading-relaxed space-y-4 border-l-4 border-border/60 pl-6 py-1">
            {section.content}
        </div>
    </div>
);


const DisclaimerPage: React.FC = () => {
  
  const currentYear = new Date().getFullYear();

  return (
    <>
    <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
      
      {/* 1. Header & Authority */}
      <header className="text-center mb-16">
        <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 mb-6 shadow-sm border border-primary/20">
          <Gavel className="mr-2 h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-primary uppercase tracking-widest">
            Legal Transparency
          </span>
        </div>
        
        <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl bg-gradient-to-r from-primary via-blue-500 to-foreground bg-clip-text text-transparent">
          Official Website Disclaimer
        </h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
          **{COMPANY_NAME}** is committed to clear communication. Please read these terms carefully before using our educational platform.
        </p>
        <p className="mt-2 text-sm text-foreground/70 font-medium">
          Effective Date: **{EFFECTIVE_DATE}**
        </p>
      </header>

      {/* 2. Layout: TOC (Left) and Content (Right) */}
      <div className="grid lg:grid-cols-4 gap-12">
        
        {/* Table of Contents (Sticky for UX) */}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-20 space-y-4 p-4 rounded-xl bg-muted/30 border border-border/50 shadow-inner">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-foreground">
                <FileText className="w-5 h-5"/> Table of Contents
            </h3>
            <nav className="space-y-2 text-sm">
              {SECTIONS.map((section) => (
                <Link
                  key={section.id}
                  href={`#${section.id}`}
                  className="block text-muted-foreground hover:text-primary transition-colors hover:translate-x-1"
                >
                  {section.title}
                </Link>
              ))}
            </nav>
            <Separator className="my-4 bg-border/50"/>
            <Link 
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-2 text-primary hover:underline text-sm font-medium"
            >
                <Mail className="w-4 h-4"/> Contact Us
            </Link>
          </div>
        </aside>

        {/* Main Content Sections */}
        <main className="lg:col-span-3 space-y-12">
          
          {/* Loop through sections */}
          {SECTIONS.map((section) => (
            <SectionAnchor key={section.id} section={section} />
          ))}

          <Separator className="my-10 bg-border/50" />

          {/* Consent and Conclusion */}
          <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl flex items-start gap-4 shadow-md">
            <CheckCircle className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
            <div>
                <h3 className="text-xl font-bold text-foreground">
                    Your Consent and Agreement
                </h3>
                <p className="text-lg text-muted-foreground mt-2">
                    By continuing to use our website, you **hereby consent** to our Disclaimer and agree to its terms. If you do not agree, your sole remedy is to cease use of the website immediately.
                </p>
            </div>
          </div>
        </main>
      </div>
    </div>
      <footer className="mt-20 py-8 border-t border-border/50 text-center text-muted-foreground text-sm w-full">
        <p>
            This Disclaimer was generated to ensure transparency and legal clarity for the <strong>{COMPANY_NAME}</strong> platform.
        </p>
        <p className="mt-2">
            © {currentYear} {COMPANY_NAME}. All rights reserved.
        </p>
      </footer>
      </>
  );
};

export default DisclaimerPage;