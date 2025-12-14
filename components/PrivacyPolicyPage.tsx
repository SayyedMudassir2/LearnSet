// @ts-nocheck
// Note: Disabling TS check for brevity as utility components (Button, Badge, etc.) are outside this file.

"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Head from "next/head";
import { useTheme } from "next-themes";
import {
  Moon,
  Sun,
  Shield,
  Lock,
  Activity,
  Wrench,
  Info,
  AlertTriangle,
  Mail,
  Clock,
  Menu,
  X,
  Type,
  Maximize,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// --- Global Strategy Constants ---
const websiteName = "learnset.in";
const contactEmail = "learnset2569@gmail.com";
const lastUpdated = "December 13, 2025";
const seoPageTitle = "Terms of Service & Privacy Policy | learnset.in";
const seoMetaDescription = "Read the official Terms and Conditions and Privacy Policy for learnset.in. Learn about educational use, data security, and usage agreement.";

// --- UX Optimization Constant ---
// Strategic offset to account for a potential sticky header/navbar (usually 64px - 100px)
const SCROLL_OFFSET = 100;

// --- Policy Section Structure (Enhanced for SEO) ---
interface PolicySection {
  id: string;
  title: string;
  icon: typeof Shield;
  content: React.ReactNode;
  seoKeyword: string;
}

const policySections: PolicySection[] = [
  {
    id: "general-terms",
    title: "1. Agreement to Terms and Conditions",
    icon: Shield,
    seoKeyword: "Terms of Service",
    content: (
      <p>
        Please read these Terms and Conditions carefully before using the products and services provided by **{websiteName}**. By accessing or using the website, you agree to be legally bound by these Terms, our Privacy Policy, and any additional policies we may publish. Usage of this platform also implies compliance with Google’s Terms of Service.
      </p>
    ),
  },
  {
    id: "educational-use",
    title: "2. Educational & Informational Use Only (Disclaimer)",
    icon: Activity,
    seoKeyword: "Educational Disclaimer",
    content: (
      <p>
        The information provided on **{websiteName}** is strictly intended for **educational and informational purposes**. **Liability Disclaimer:** Use this content at your own discretion, acknowledging the inherent risks of relying on external information for academic purposes.
      </p>
    ),
  },
  {
    id: "mumbai-university-data",
    title: "3. Official University Data Disclaimer",
    icon: Info,
    seoKeyword: "Mumbai University Resources",
    content: (
      <p>
        Resources are collected from publicly available sources and pertain to Mumbai University. **{websiteName}** acts only as an indexing interface and does not claim ownership or official endorsement from the university. Always cross-reference with official university sources.
      </p>
    ),
  },
  {
    id: "privacy-policy-section",
    title: "4. Privacy, Analytics, and Advertising",
    icon: Lock,
    seoKeyword: "Privacy Policy",
    content: (
      <p>
        This website strategically uses Google Analytics to optimize performance and content delivery through non-personally identifiable information. Data collected may include IP address (anonymized), device info, location estimation, and user interaction data. **No sensitive personal data is collected directly.**
      </p>
    ),
  },
  {
    id: "information-security",
    title: "5. Information Security and Protection",
    icon: Shield,
    seoKeyword: "Data Security",
    content: <p>We implement industry-standard security measures, including SSL encryption and secure hosting practices, to protect aggregated non-personal data from unauthorized access or disclosure.</p>,
  },
  {
    id: "service-guarantees",
    title: "6. Service Availability and Limitation of Liability",
    icon: AlertTriangle,
    seoKeyword: "Limitation of Liability",
    content: <p>Services are provided on an “AS IS” basis without performance guarantees. While we strive for 99.9% uptime, we are not liable for any temporary unavailability or errors.</p>,
  },
  {
    id: "customer-service",
    title: "7. Customer Service and Support",
    icon: Info,
    seoKeyword: "Customer Support",
    content: <p>No formal, dedicated 24/7 support is provided. We offer best-effort, voluntary assistance via the contact email for critical inquiries, prioritizing technical issues and content removal requests.</p>,
  },
  {
    id: "changes-to-terms",
    title: "8. Changes to the Terms and Conditions",
    icon: Wrench,
    seoKeyword: "Policy Updates",
    content: <p>We reserve the right to update these Terms at any time. Significant changes will be noted by updating the "Effective Date" at the top of this page. Continued use implies acceptance of the revised terms.</p>,
  },
];

// --- Custom Smooth Scroll Function (Addresses Header Overlap) ---
const smoothScrollWithOffset = (id: string, offset: number) => {
  const element = document.getElementById(id);
  if (element) {
    const y = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

// --- Navigation Sidebar Component (Optimized UX: Sticky on Desktop, Sliding on Mobile) ---
interface NavigationSidebarProps {
  sections: PolicySection[];
  activeId: string | null;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  sections,
  activeId,
  isMobileOpen,
  setIsMobileOpen,
}) => (
  <aside
    // Strategic CSS: Uses fixed/sticky positioning. h-[calc(100vh-5rem)] ensures it fits the screen height below a typical header (5rem assumed for robustness).
    className={cn(
      "fixed inset-y-0 right-0 z-50 w-64 bg-card shadow-2xl border-l border-border p-6 transition-transform duration-300",
      "md:relative md:translate-x-0 md:h-[calc(100vh-5rem)] md:sticky md:top-20 md:overflow-y-auto md:shadow-none md:border-none",
      isMobileOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
    )}
  >
    {/* Close button visible only on mobile */}
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-4 left-4 md:hidden"
      onClick={() => setIsMobileOpen(false)}
      aria-label="Close menu"
    >
      <X className="w-6 h-6" />
    </Button>

    <h3 className="text-lg font-bold mb-4 text-foreground uppercase tracking-wider">
      Table of Contents
    </h3>

    <ul className="space-y-2">
      {sections.map((section) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            onClick={(e) => {
              e.preventDefault(); 
              setIsMobileOpen(false);
              // Use custom smooth scroll function to prevent header overlap
              smoothScrollWithOffset(section.id, SCROLL_OFFSET);
            }}
            // Strategic CSS: High-contrast active state for clear visual feedback (UX)
            className={cn(
              "flex items-center text-sm p-3 rounded-lg transition-all duration-200 leading-tight",
              activeId === section.id
                ? "bg-primary/10 text-primary font-semibold border-l-4 border-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            <section.icon className="w-4 h-4 mr-3 flex-shrink-0" />
            <span className="truncate">{section.title.split(". ")[1]}</span>
          </a>
        </li>
      ))}
    </ul>

    <Separator className="my-6 bg-border" />

    <div className="text-sm p-3 border border-dashed rounded-lg">
      <p className="font-semibold mb-2 flex items-center text-foreground">
        <Clock className="w-4 h-4 mr-2 text-primary" />
        Document Version:
      </p>
      <Badge variant="outline" className="text-xs font-mono">
        V{lastUpdated.replace(/\D/g, "")} ({lastUpdated})
      </Badge>
    </div>
  </aside>
);

// --- Main Policy Page Component (Performance & SEO Focused) ---
const PrivacyPolicyPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for Scrollspy (Optimized UX: Highlights current section)
  useEffect(() => {
    // Strategic: Set the rootMargin to create a "trigger area" just below the scroll offset position
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first intersecting entry from the top of the viewport
        const intersectingEntry = entries.find(entry => entry.isIntersecting);
        if (intersectingEntry) {
          setActiveId(intersectingEntry.target.id);
        }
      },
      // Root Margin (e.g., -100px from top) ensures the section is active when it passes the SCROLL_OFFSET line.
      { root: null, rootMargin: `-${SCROLL_OFFSET}px 0px -50% 0px`, threshold: 0 }
    );

    // Initial setup
    policySections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect(); // Cleanup
  }, []);
  
  // Handle initial hash routing for deep links
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      if (policySections.some(s => s.id === id)) {
        // Scroll with offset upon initial load if hash exists
        setTimeout(() => smoothScrollWithOffset(id, SCROLL_OFFSET), 100);
      }
    }
  }, []);


  return (
    <>
      <Head>
        <title>{seoPageTitle}</title>
        <meta name="description" content={seoMetaDescription} />
        <link rel="canonical" href={`https://${websiteName}/terms-policy`} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-background transition-colors duration-300">
        {/* Mobile Menu Button (Strategic - Floating Action Button for Accessibility) */}
        <Button
          variant="secondary"
          size="icon"
          className="fixed bottom-6 right-6 z-50 md:hidden shadow-xl"
          onClick={() => setIsMobileNavOpen(true)}
          aria-label="Open Table of Contents"
        >
          <Menu className="w-6 h-6" />
        </Button>

        <div className="flex justify-center max-w-7xl mx-auto pt-10 pb-20 px-4 sm:px-6 lg:px-8">
          {/* Main Content Area: Now taking up 100% width on small screens, and 75% on large screens */}
          <main ref={contentRef} className="w-full lg:w-[75%] lg:pr-10">
            <div className="bg-card shadow-2xl rounded-2xl p-6 sm:p-12 border border-border">
              {/* Header Section */}
              <header className="border-b pb-6 mb-8 border-border">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-3">
                  Terms of Service & Privacy Policy
                </h1>
                <p className="text-base text-muted-foreground flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-primary" />
                  <span className="font-medium">Effective Date:</span> <Badge variant="secondary" className="ml-2 text-xs">{lastUpdated}</Badge>
                </p>
              </header>

              {/* Readability Alert (Strategic UX) */}
              <div className="mb-10 p-5 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-primary rounded-lg">
                <p className="text-sm font-semibold text-primary flex items-center">
                  <Type className="w-5 h-5 mr-2" />
                  Focus on Clarity & Readability
                </p>
                <p className="mt-2 text-card-foreground text-base">
                  We've structured this policy to be clear and navigable. Use the **Table of Contents** on the side for quick access to specific legal sections.
                </p>
              </div>

              {/* Policy Sections */}
              <section className="space-y-12">
                {policySections.map((section) => (
                  <div 
                    key={section.id} 
                    id={section.id} 
                    // Scroll-mt is now handled by the custom smoothScrollWithOffset function for greater control
                    // Removed: className="pt-4 scroll-mt-24" 
                    className="pt-4" 
                  >
                    <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                      <span className="text-primary mr-3 text-3xl font-extrabold">{section.title.split(".")[0]}</span>
                      <section.icon className="w-6 h-6 mr-3 text-primary" />
                      {section.title.split(". ")[1]} 
                    </h2>
                    <div className="text-card-foreground leading-relaxed text-lg pl-9 border-l-2 border-border/70">
                      {section.content}
                    </div>
                  </div>
                ))}
              </section>

              <Separator className="my-12 bg-border" />

              {/* Contact Information (Clear CTA) */}
              <div className="pt-6">
                <h2 className="text-3xl font-bold mb-4 text-foreground">Contact and Intellectual Property</h2>
                <div className="bg-accent p-6 rounded-xl space-y-6 border border-border/50">
                  <div className="flex items-start">
                    <Mail className="w-6 h-6 mr-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-xl text-foreground">Contact for Questions</p>
                      <p className="text-muted-foreground">
                        For any legal or technical questions regarding these policies, please reach out to our dedicated support channel:
                        <a
                          href={`mailto:${contactEmail}`}
                          className="font-bold text-primary hover:underline transition-colors mt-2 block"
                        >
                          {contactEmail}
                        </a>
                      </p>
                    </div>
                  </div>

                  <Separator className="bg-border" />

                  <div className="flex items-start">
                    <Shield className="w-6 h-6 mr-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-xl text-foreground">Copyrights & IP</p>
                      <p className="text-muted-foreground">
                        All copyrights, trademarks, and intellectual property rights for the platform **{websiteName}** are reserved. Unauthorized reproduction or redistribution is prohibited.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          
          {/* Sidebar Area: 1/4 width on desktop (Sticky) */}
          <div className="hidden lg:block lg:w-[25%] relative"> 
            <NavigationSidebar
              sections={policySections}
              activeId={activeId}
              isMobileOpen={isMobileNavOpen}
              setIsMobileOpen={setIsMobileNavOpen}
            />
          </div>
          
          {/* Mobile Sidebar (Slides in/out) - Rendered outside of the main layout flow */}
          <div className="lg:hidden">
          <NavigationSidebar
            sections={policySections}
            activeId={activeId}
            isMobileOpen={isMobileNavOpen}
            setIsMobileOpen={setIsMobileNavOpen}
          />
          </div>
        </div>

        {/* Footer (Consistency) */}
        <footer className="mt-8 text-center text-muted-foreground text-sm pb-8">
          © {new Date().getFullYear()} {websiteName}. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;