"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import {
  FileText,
  AlertTriangle,
  Globe,
  Lock,
  Wrench,
  Mail,
  Clock,
  Menu,
  X,
  Code,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// --- Constants ---
const websiteName = "LearnSet";
const websiteUrl = "https://learnset.vercel.app";
const contactEmail = "learnset2569@gmail.com";
const companyNameAlt = "LearnSet";
const lastUpdated = "December 13, 2025";

interface TermsSection {
  id: string;
  title: string;
  icon: typeof FileText;
  content: React.ReactNode;
}

const termsSections: TermsSection[] = [
  {
    id: "agreement",
    title: "1. Agreement to Terms and Acceptance",
    icon: FileText,
    content: (
      <>
        These Terms and Conditions govern your use of <strong>{websiteUrl}</strong>{" "}
        (hereafter, "the Website").
        <br />
        <br />
        By accessing or using the Website, you confirm that you have{" "}
        <strong>read, understood, and agreed</strong> to be bound by these Terms
        and our companion Privacy Policy. If you do not agree to these Terms in
        full, you must discontinue use immediately.
      </>
    ),
  },
  {
    id: "legal-compliance",
    title: "2. Legal and Regulatory Compliance",
    icon: Globe,
    content: (
      <>
        You agree to use the Website solely for lawful purposes. You must comply
        with all applicable local, national, and international laws, regulations,
        and guidelines, including those related to educational resources and
        digital content.
      </>
    ),
  },
  {
    id: "content-ownership",
    title: "3. Copyright and Intellectual Property Rights",
    icon: Lock,
    content: (
      <>
        Unless otherwise explicitly stated, all content (including text, notes,
        designs, logos, images, and study materials) is the property of{" "}
        <strong>{websiteName}</strong> and/or its licensors.
        <br />
        <br />
        The reproduction, modification, distribution, or republication of any
        content on this Website, in any form, is <strong>strictly prohibited</strong>{" "}
        without express written permission. Exceptions apply only to Mumbai
        University materials, which are sourced publicly for student assistance
        (see our Privacy Policy for the University Data Disclaimer).
      </>
    ),
  },
  {
    id: "website-integrity",
    title: "4. Website Integrity and Prohibited Conduct",
    icon: Code,
    content: (
      <>
        You are prohibited from using the Website in any manner that could impair,
        damage, disrupt, or interfere with its functionality, or the servers and
        networks connected to it. This includes, but is not limited to:
        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
          <li>Attempting to gain unauthorized access to protected areas or sensitive data.</li>
          <li>Uploading viruses, malware, or any destructive code.</li>
          <li>Using automated tools (bots, scrapers) to extract data without explicit permission.</li>
        </ul>
      </>
    ),
  },
  {
    id: "liability",
    title: "5. Limitation of Liability and User Responsibility",
    icon: AlertTriangle,
    content: (
      <>
        The content on <strong>{websiteName}</strong> is provided "AS IS" without
        guarantees of completeness, accuracy, timeliness, or results obtained from
        the use of this information. We are not liable for any losses or damages
        arising from your use of the content or the unavailability of the service.
        <br />
        <br />
        You agree to accept full responsibility for any claims, losses, or expenses
        (including legal fees) incurred by us resulting from your violation of these
        Terms or misuse of the Website.
      </>
    ),
  },
  {
    id: "modifications",
    title: "6. Changes to Terms and Site Modifications",
    icon: Wrench,
    content: (
      <>
        <strong>{companyNameAlt}</strong> reserves the exclusive right to update,
        modify, or remove any part of these Terms and Conditions at any time. Any
        changes will be published here with an updated <strong>Effective Date</strong>.
        <br />
        <br />
        Your continued use of the Website after the publication of revised Terms
        signifies your acceptance of those changes. We recommend checking this
        page regularly.
      </>
    ),
  },
];

// --- Navigation Sidebar Component ---
const NavigationSidebar: React.FC<{
  sections: TermsSection[];
  activeId: string | null;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}> = ({ sections, activeId, isMobileOpen, setIsMobileOpen }) => {
  const linkClasses = (id: string) =>
    cn(
      "flex items-center text-sm p-2 rounded-lg transition-colors duration-200",
      activeId === id
        ? "bg-primary/10 text-primary font-bold border-l-4 border-primary"
        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
    );

  return (
    <aside
      // Updated classes: Removed md:sticky and positioning logic. 
      // Added lg:relative and lg:translate-x-0 to make it flow naturally inside the sticky parent div on desktop.
      className={cn(
        // Mobile Layout Classes
        "fixed top-0 right-0 z-40 h-full w-full md:w-64 bg-gray-50 dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 transition-transform duration-300 p-6 pt-20",
        isMobileOpen ? "translate-x-0" : "translate-x-full",
        // Desktop (lg+) Layout Classes
        "lg:relative lg:translate-x-0 lg:bg-transparent lg:dark:bg-transparent lg:w-full lg:p-0 lg:pt-0 lg:border-none"
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 lg:hidden" // Change md:hidden to lg:hidden if needed, or keep md:hidden for mobile. Kept md:hidden for current logic.
        onClick={() => setIsMobileOpen(false)}
        aria-label="Close menu"
      >
        <X className="w-6 h-6" />
      </Button>
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white uppercase tracking-wider">
        Table of Contents
      </h3>
      <ul className="space-y-3">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={() => {
                setIsMobileOpen(false);
                document.getElementById(section.id)?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className={linkClasses(section.id)}
            >
              <span className="font-extrabold mr-2">{section.title.split(".")[0]}</span>
              {section.title.split(". ")[1]}
            </a>
          </li>
        ))}
      </ul>
      <Separator className="my-6" />
      <div className="text-sm p-2">
        <p className="font-semibold mb-2 flex items-center text-gray-700 dark:text-gray-300">
          <Clock className="w-4 h-4 mr-2" />
          Last Updated:
        </p>
        <Badge variant="outline" className="text-xs">
          {lastUpdated}
        </Badge>
      </div>
    </aside>
  );
};

// --- Main Terms Page ---
const TermsPage: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(termsSections[0].id);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Intersection Observer
  const observerCallback = useMemo(() => {
    return (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        // Only set active if intersecting and it's the first section, or if intersecting and not fully above a higher-order section
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          // This logic ensures that when multiple sections are in view, the one highest up is generally active.
          // By setting the threshold to 0.2, we activate the link when 20% of the section is visible.
          setActiveId(entry.target.id);
        }
      });
    };
  }, []);

  useEffect(() => {
    // Re-create observer on mount
    const observer = new IntersectionObserver(observerCallback, {
      root: null, // viewport as root
      rootMargin: "0px 0px -60% 0px", // Use a top margin to prioritize links higher up the page when scrolling down
      threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
    });

    termsSections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [observerCallback]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Mobile Menu Button */}
      <Button
        variant="secondary"
        size="icon"
        className="fixed bottom-4 right-4 z-50 lg:hidden shadow-lg"
        onClick={() => setIsMobileNavOpen(true)}
        aria-label="Open terms navigation"
      >
        <Menu className="w-6 h-6" />
      </Button>

      <div className="flex justify-center max-w-7xl mx-auto pt-10 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Sidebar Container (Fixed/Sticky on lg screens) */}
        {/* This wrapper ensures the sidebar stays fixed while its content scrolls (if the links exceed the height). */}
        <div className="hidden lg:block lg:w-[20rem] lg:flex-shrink-0">
          <div className="sticky top-20 h-[calc(100vh-8rem)] overflow-y-auto pr-8">
            <NavigationSidebar
              sections={termsSections}
              activeId={activeId}
              isMobileOpen={isMobileNavOpen}
              setIsMobileOpen={setIsMobileNavOpen}
            />
          </div>
        </div>

        {/* Main Content - Now takes w-full on lg because sidebar is a separate flex item. */}
        <main ref={contentRef} className="w-full lg:w-[calc(100%-20rem)] lg:pl-4">
          <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-xl p-6 sm:p-10 border border-gray-200 dark:border-gray-800">
            {/* Header */}
            <header className="border-b pb-6 mb-8 border-gray-200 dark:border-gray-700">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-3">
                Official Terms and Conditions
              </h1>
              <p className="text-base text-gray-500 dark:text-gray-400 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Effective Date:{" "}
                <span className="font-semibold ml-1">{lastUpdated}</span>
              </p>
            </header>

            {/* Introduction */}
            <section className="mb-10 p-5 bg-primary/5 dark:bg-primary/10 border-l-4 border-primary rounded-lg shadow-inner">
              <p className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                Welcome to {websiteName}.
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                By using this Website, you are entering into a legally binding
                agreement. Please review the Table of Contents (on desktop) or the
                navigation menu (on mobile) to find the relevant sections quickly.
              </p>
              <div className="mt-4 flex items-center text-sm text-primary">
                <Mail className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>
                  For questions, contact us directly at:{" "}
                  <a
                    href={`mailto:${contactEmail}`}
                    className="font-semibold hover:underline"
                  >
                    {contactEmail}
                  </a>
                </span>
              </div>
            </section>

            {/* Terms Sections */}
            <section className="space-y-12">
              {termsSections.map((section) => (
                <div key={section.id} id={section.id} className="pt-4 scroll-mt-20">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                    <span className="text-primary mr-3 text-3xl font-extrabold">
                      {section.title.split(".")[0]}
                    </span>
                    <section.icon className="w-6 h-6 mr-3 text-primary" />
                    {section.title.split(". ")[1]}
                  </h2>
                  <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg pl-9 border-l-2 border-gray-200 dark:border-gray-800">
                    {section.content}
                  </div>
                </div>
              ))}
            </section>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-gray-500 dark:text-gray-500 text-sm pb-8">
        © {new Date().getFullYear()} {websiteName}. All rights reserved.
      </footer>
    </div>
  );
};

export default TermsPage;