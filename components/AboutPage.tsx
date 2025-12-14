// app/about/page.tsx - Strategic Rewrite for High-Performance & Trust

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image"; // Crucial for visual branding and trust
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Users,
  Target,
  Heart,
  Globe,
  BookOpen,
  Sparkles, // Using Sparkles for AI/Innovation instead of the confusing Mail icon
  MessageSquare, // Alternative for social, but keeping branded ones for recognition
  ShieldCheck, // Better icon for commitment/trust
  type LucideIcon,
} from "lucide-react";
// Branded icons are strategically kept for instant social recognition, despite potential bundle size impact.
import { FaWhatsapp, FaInstagram, FaYoutube } from "react-icons/fa";
import type { IconType } from "react-icons";

// --- Configuration & Content Strategy ---

const CONTACT_EMAIL = "learnset2569@gmail.com";

const SOCIAL_LINKS = [
  {
    icon: FaWhatsapp,
    href: "https://whatsapp.com/channel/0029Vb7DlEVDZ4LfgDkAqv2P",
    ariaLabel: "Follow LearnSet on WhatsApp Channel for latest updates",
    className: "text-[#25D366] hover:text-[#128C7E]", 
  },
  {
    icon: FaInstagram,
    href: "https://instagram.com/LearnSet.In",
    ariaLabel: "Follow LearnSet on Instagram for daily tips",
    className: "text-[#E1306C] hover:text-[#C13584]",
  },
  {
    icon: FaYoutube,
    href: "https://youtube.com/c/learnset",
    ariaLabel: "Subscribe to LearnSet on YouTube for video tutorials",
    className: "text-[#FF0000] hover:text-[#CC0000]",
  },
];

const FEATURES = [
  {
    icon: BookOpen,
    title: "Curated Study Hub",
    description: "Syllabus, PYQs, solutions, notes, and diagrams — structured for MSBTE success and easy navigation.",
  },
  {
    icon: Globe,
    title: "100% Free & Accessible",
    description: "Removing financial barriers. Quality diploma education is provided free of charge, always and everywhere.",
  },
  {
    icon: Sparkles, 
    title: "AI-Powered Learning",
    description: "Get instant answers and complex concept breakdowns, turning passive study into efficient, active learning.",
  },
];

// --- SEO Metadata Strategy ---

export const metadata: Metadata = {
  title: "Our Mission | LearnSet – Empowering MSBTE Students with Free AI-Powered Education",
  description:
    "LearnSet is committed to providing free, high-quality, and AI-supported study materials for all MSBTE students. Discover our mission, values, and commitment to transparency.",
  keywords: ["LearnSet mission", "MSBTE study resources free", "AI learning platform", "Diploma education support", "Community-driven learning"],
  alternates: {
    canonical: "https://yourwebsite.com/about", // Ensure canonical URL is set
  },
  openGraph: {
    title: "The LearnSet Story: Free Education, Powered by AI.",
    description: "Our mission to empower MSBTE students with free, high-quality, AI-powered study materials.",
    url: "https://yourwebsite.com/about",
    siteName: "LearnSet",
    type: "website",
  },
};

// --- Modular Helper Components ---

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <div className="text-left p-6 rounded-xl border bg-card shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-primary/50 group">
    <Icon className="h-8 w-8 mb-4 text-primary transition-colors group-hover:text-blue-500" />
    <h3 className="text-xl font-bold mb-2 tracking-tight">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

interface SocialLinkProps {
  icon: IconType;
  href: string;
  ariaLabel: string;
  className: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon: Icon, href, ariaLabel, className }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`transition-transform duration-300 transform hover:scale-125 ${className}`}
    aria-label={ariaLabel}
  >
    <Icon className="h-9 w-9" />
  </Link>
);


// --- Main Component: AboutPage ---

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
      {/* 1. Hero Section (Visual and Emotional Hook) */}
      <section className="mb-16 text-center">
        <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 mb-6 shadow-md border border-primary/20">
          <Heart className="mr-2 h-5 w-5 text-primary animate-heartbeat" /> {/* Assuming a custom keyframe for pulse */}
          <span className="text-sm font-medium text-primary uppercase tracking-widest">
            The LearnSet Story
          </span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl lg:text-7xl bg-gradient-to-r from-primary via-blue-500 to-cyan-400 bg-clip-text text-transparent">
          Empowering Your Diploma Journey
        </h1>
        

        <p className="mt-6 text-xl text-muted-foreground max-w-4xl mx-auto font-light">
          We exist to eliminate the struggle of finding **reliable, structured, and free** study materials for every MSBTE student, leveraging community effort and cutting-edge technology.
        </p>
      </section>

      {/* 2. Welcome & Mission (The 'Why') */}
      <section className="grid md:grid-cols-2 gap-12 mb-20 items-center">
        {/* Visual Element Placeholder */}
        <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-2xl">
          {/* STRATEGY: Use a relevant, high-quality image demonstrating the product's value */}
          <Image
            src="/images/about-mission-illustration.png" // Placeholder image path
            alt="LearnSet team and resources working together"
            layout="fill"
            objectFit="cover"
            priority
            className="transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-foreground border-b pb-3">
            Our Core Mission
          </h2>
          <p className="text-lg text-muted-foreground">
            LearnSet was built on the belief that **financial status should never dictate educational quality**. We meticulously curate syllabus breakdowns, PYQs, detailed solutions, and concise notes to match the latest MSBTE requirements.
          </p>

          <blockquote className="border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded-r-lg">
            <p className="text-xl italic font-semibold text-foreground/90">
              "To transform the MSBTE learning landscape by making it structured, effective, and permanently free."
            </p>
          </blockquote>
          
          <Button asChild size="lg" className="mt-4 shadow-lg">
            <Link href="/study-materials">Explore Our Free Resources</Link>
          </Button>
        </div>
      </section>

      <Separator className="my-16 bg-border/50" />

      {/* 3. Key Value Proposition (The 'What') */}
      <section className="mb-20">
        <h2 className="text-4xl font-extrabold text-center mb-12 tracking-tight">
          Three Pillars of LearnSet
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      {/* 4. Trust & Community (The 'Who') */}
      <section className="grid gap-10 md:grid-cols-2 mb-20">
        
        {/* Our Team - Emphasizing Expertise and Community */}
        <Card className="border-border/40 shadow-xl dark:shadow-2xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl font-bold">
                The Community & Team
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 text-muted-foreground text-lg">
            <p>
              We are a passionate collective of **former MSBTE toppers, experienced educators, and cutting-edge developers**. Every piece of content is peer-reviewed and technology is utilized to scale quality.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {['Educators', 'Alumni Toppers', 'Web Developers', 'AI Engineers'].map(role => (
                <Badge key={role} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  {role}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Our Commitment - Emphasizing Transparency and Trust */}
        <Card className="border-border/40 shadow-xl dark:shadow-2xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-green-500" />
              <CardTitle className="text-2xl font-bold">
                Our Commitment to Transparency
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 text-muted-foreground text-lg">
            <p>
              We promise to keep our platform **free, up-to-date, and focused solely on student success**. Our commitment is to quality content and reliable resources, always.
            </p>

            <p className="p-3 border-l-4 border-destructive bg-destructive/5 rounded-r-lg">
              **Non-Affiliation Disclosure:** LearnSet is an **independent, community-driven initiative**. We are not officially affiliated with MSBTE or any government body. All resources are created based on publicly available syllabi.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 5. Call to Action & Connection */}
      <section className="text-center bg-muted/30 p-10 rounded-xl shadow-inner">
        <h2 className="text-3xl font-bold mb-4 tracking-wider">
          Let's Connect and Collaborate
        </h2>

        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Partner with us to improve the learning experience, submit content, or simply reach out with feedback. Your voice drives our platform forward.
        </p>

        {/* Primary Contact Button */}
        <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow w-full sm:w-auto mb-6" asChild>
          <Link href={`mailto:${CONTACT_EMAIL}`} className="flex items-center justify-center gap-2">
            <Mail className="h-5 w-5" />
            <span className="font-medium text-lg">Send us an Email</span>
          </Link>
        </Button>

        {/* Social Links */}
        <div className="mt-6 flex justify-center gap-8">
          {SOCIAL_LINKS.map((link) => (
            <SocialLink key={link.ariaLabel} {...link} />
          ))}
        </div>

        <p className="mt-10 text-lg text-muted-foreground italic">
          Thank you for choosing LearnSet. We are invested in your success.
        </p>
      </section>
    </div>
  );
}