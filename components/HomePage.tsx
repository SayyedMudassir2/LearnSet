"use client";

import Link from "next/link";
import { useState } from "react"; // Added useState for interactive elements
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Search,
  Sparkles,
  BookOpen,
  Upload,
  Zap,
  Star,
  Users,
  Shield,
  Clock,
  TrendingUp,
  Heart,
  GraduationCap,
  Building,
  Briefcase,
  Stethoscope,
  Calculator,
  ArrowRight,
  School,
  Monitor, // New icon for visual design
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming a utility function for conditional classes

// --- Data Structures (Refined) ---

interface Category {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  keywords: string;
}

interface FeaturedResource {
  type: "PYQ" | "Diagram" | "Notes" | "Syllabus";
  title: string;
  description: string;
  href: string;
}

const COURSE_CATEGORIES: Category[] = [
  // ... (Data remains the same for content consistency)
  {
    title: "School Education",
    description: "8th–10th (Maharashtra Board)",
    icon: School,
    href: "/school",
    keywords: "Browse School Resources",
  },
  {
    title: "Higher Secondary",
    description: "11th & 12th (Science / Commerce / Arts)",
    icon: BookOpen,
    href: "/higher-secondary",
    keywords: "Browse 11th & 12th Resources",
  },
  {
    title: "College (UG)",
    description: "BSc IT, BSc CS, BMS, BA, BCom",
    icon: GraduationCap,
    href: "/college-ug",
    keywords: "Explore UG Courses",
  },
  {
    title: "College (PG)",
    description: "MCA, MBA, MTech",
    icon: Building,
    href: "/college-pg",
    keywords: "Explore PG Courses",
  },
  {
    title: "Engineering & Technical",
    description: "Diploma CSE, BTech (CSE, ECE, Mechanical), MTech",
    icon: Calculator,
    href: "/engineering",
    keywords: "Browse Engineering",
  },
  {
    title: "Entrance Exams",
    description: "NEET, JEE, MHT-CET, MCA-CET, MBA-CET",
    icon: Zap,
    href: "/entrance-exams",
    keywords: "Prepare for Entrance",
  },
  {
    title: "Commerce & Management",
    description: "BMS, BBA, MBA Entrance, MCom",
    icon: Briefcase,
    href: "/commerce",
    keywords: "Explore Commerce",
  },
  {
    title: "Medical & Health Sciences",
    description: "BUMS, NEET, Allied Health Courses",
    icon: Stethoscope,
    href: "/medical",
    keywords: "Browse Medical Resources",
  },
];

const FEATURED_RESOURCES: FeaturedResource[] = [
  // ... (Data remains the same)
  {
    type: "PYQ",
    title: "Digital Electronics – Winter 2024",
    description: "Most attempted question paper with detailed solutions",
    href: "/resources/digital-electronics-winter-2024",
  },
  {
    type: "Diagram",
    title: "Full Adder Logic Circuit",
    description: "Clear, labeled diagram + truth table",
    href: "/resources/full-adder-diagram",
  },
  {
    type: "Notes",
    title: "Applied Mathematics – Unit 1 to 5",
    description: "Handwritten-style notes with formulas & examples",
    href: "/resources/applied-math-notes",
  },
];

const SELECT_FILTERS = [
  // ... (Data remains the same)
  {
    placeholder: "Standard",
    options: ["10th", "12th", "Diploma", "BTech"],
  },
  {
    placeholder: "Subject",
    options: ["Mathematics", "Physics", "Chemistry", "Electronics", "Mechanics"],
  },
  {
    placeholder: "Type",
    options: ["Notes", "PYQs", "Diagrams", "Solutions"],
  },
];

const HERO_QUICK_LINKS = ["10th", "12th", "NEET", "JEE", "BTech", "MSBTE", "Diploma"];

const HERO_FEATURES = [
  { icon: Star, text: "100% Free", color: "text-yellow-500 fill-yellow-500" },
  { icon: Users, text: "Trusted by Students", color: "text-primary" },
  { icon: Shield, text: "Secure & Ad-Free", color: "text-primary" },
];

// --- Reusable Components (Enhanced UX) ---

const CategoryCard: React.FC<Category> = ({ title, description, icon: Icon, href, keywords }) => (
  <Card className="border-border/40 bg-card/70 backdrop-blur-sm shadow-xl hover:shadow-2xl transition duration-300 hover:scale-[1.03] h-full flex flex-col group cursor-pointer">
    <CardHeader className="text-center pb-4">
      <Icon className="h-12 w-12 mx-auto text-primary mb-4 group-hover:rotate-3 transition-transform" />
      <CardTitle className="text-xl font-bold">{title}</CardTitle>
    </CardHeader>
    <CardContent className="text-center flex flex-col flex-1">
      <CardDescription className="mb-6 text-base">{description}</CardDescription>
      <Button
        variant="outline"
        className="w-full gap-2 mt-auto border-2 border-primary/50 text-primary hover:bg-primary hover:text-white"
        asChild
      >
        <Link href={href}>
          {keywords}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
    </CardContent>
  </Card>
);

const FeaturedResourceCard: React.FC<FeaturedResource> = ({ type, title, description, href }) => (
  <Card className="border-border/40 shadow-lg hover:shadow-xl transition h-full flex flex-col">
    <CardHeader className="pb-4">
      <Badge 
        variant="secondary" 
        className={cn("mb-2 font-bold text-sm", 
            type === 'PYQ' && "bg-orange-500/20 text-orange-600 dark:text-orange-400",
            type === 'Notes' && "bg-green-500/20 text-green-600 dark:text-green-400",
            type === 'Diagram' && "bg-blue-500/20 text-blue-600 dark:text-blue-400"
        )}
      >
        {type}
      </Badge>
      <CardTitle className="text-xl font-bold">{title}</CardTitle>
      <CardDescription className="text-base">{description}</CardDescription>
    </CardHeader>
    <CardContent className="pt-0 mt-auto">
      <Button variant="default" className="w-full gap-2" asChild>
        <Link href={href}>
          Access {type}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </CardContent>
  </Card>
);

// --- Main Component ---

export default function HomePageContent() {
  // Local state for filter simulation (Future-proofing for Analytics/Behavior)
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    // STRATEGY: In a real app, this state change would trigger an API call to load filtered resources
    // and log an Analytics event (e.g., trackEvent('filter_applied', { filter_name: key, value }))
  };

  return (
    <div className="min-h-screen">
      
      {/* 1. Hero Section (H1, Search, Value Prop) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background pt-20 pb-16 md:pt-32 md:pb-24" aria-labelledby="hero-title">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          
          {/* Tagline */}
          <div className="inline-flex items-center justify-center rounded-full bg-primary/15 px-4 py-2 mb-6 shadow-md border border-primary/30">
            <Sparkles className="mr-2 h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              100% Free Educational Resources
            </span>
          </div>

          {/* H1 (SEO Focus) */}
          <h1 id="hero-title" className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Master Your Exams
            </span>
            <span className="block text-foreground/80"> with Official MSBTE Study Materials</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 font-light">
            Access thousands of **PYQs, Solutions, Notes, and AI-powered help**—all designed for optimal performance.
          </p>

          {/* Prominent Search Bar (Primary CTA) */}
          <div className="max-w-4xl mx-auto mb-14">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground group-focus-within:text-primary transition" aria-hidden="true" />
              <Input
                placeholder="Search notes, PYQs, solutions... (e.g., 'Applied Mechanics PYQ Winter 2024')"
                className="pl-14 py-8 text-lg rounded-full shadow-2xl border-2 border-border/70 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                aria-label="Search for study materials"
              />
              <Button size="lg" className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full h-[calc(100%-10px)] hidden sm:flex gap-2">
                <Search className="h-5 w-5" />
                Search
              </Button>
            </div>
          </div>

          {/* Quick Links to Popular Courses & Features */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap justify-center gap-3">
                <span className="font-semibold text-foreground/70 mr-2 hidden sm:inline">Popular Searches:</span>
                {HERO_QUICK_LINKS.map((course) => (
                    <Button key={course} variant="secondary" size="sm" asChild className="hover:bg-primary/10 hover:text-primary transition font-medium text-base">
                        <Link href={`/courses/${course.toLowerCase()}`}>{course}</Link>
                    </Button>
                ))}
            </div>

            <Separator className="bg-border/50 max-w-xl mx-auto" />

            {/* Value Propositions (Trust Signals) */}
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-base pt-2">
              {HERO_FEATURES.map(({ icon: Icon, text, color }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className={`h-6 w-6 ${color}`} aria-hidden="true" />
                  <span className="font-bold text-foreground">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* 2. Explore by Category (Content Pillar) */}
      <section className="py-20 bg-muted/40" aria-labelledby="category-title">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 id="category-title" className="text-4xl md:text-5xl font-bold text-center mb-6">
            Explore Study Paths
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto">
            Find materials organized by the academic level and stream relevant to your studies.
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {COURSE_CATEGORIES.map((category) => (
              <CategoryCard key={category.title} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Resources & Live Filters (Interactivity & Fresh Content) */}
      <section className="py-20 bg-background" aria-labelledby="featured-title">
        <div className="container mx-auto max-w-7xl px-4">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <h2 id="featured-title" className="text-4xl md:text-5xl font-bold">
              <TrendingUp className="inline-block h-8 w-8 text-primary mr-3" />
              Popular & New Resources
            </h2>

            {/* Filters - Enhanced Interaction */}
            <div className="flex flex-wrap gap-3">
              {SELECT_FILTERS.map((filter) => (
                <Select 
                    key={filter.placeholder}
                    onValueChange={(value) => handleFilterChange(filter.placeholder.toLowerCase(), value)}
                    value={filters[filter.placeholder.toLowerCase()] || ''} // Control the value
                >
                  <SelectTrigger className="w-[150px] md:w-[180px] border-primary/50 font-medium">
                    <SelectValue placeholder={filter.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {filter.options.map((option) => (
                      <SelectItem 
                        key={option} 
                        value={option.toLowerCase().replace(' ', '-')}
                        className="font-medium"
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}
              <Button 
                variant="outline" 
                onClick={() => setFilters({})}
                className={cn("transition-colors", Object.keys(filters).length > 0 ? "border-red-500 text-red-500 hover:bg-red-500/10" : "text-muted-foreground")}
                aria-label="Clear all applied filters"
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Featured Cards Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {FEATURED_RESOURCES.map((resource) => (
              <FeaturedResourceCard key={resource.title} {...resource} />
            ))}
          </div>

          <div className="text-center mt-16">
            <Button size="lg" variant="secondary" asChild className="gap-2 text-lg font-semibold border-2 border-secondary/50 hover:bg-secondary/80 shadow-lg">
              <Link href="/resources/all">
                Dive Deeper into All Materials
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 4. Core Call to Action (Focus on AI/Community) */}
      <section className="py-24 bg-gradient-to-b from-primary/10 to-background" aria-labelledby="cta-title">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h2 id="cta-title" className="text-4xl md:text-5xl font-extrabold mb-8">
            Stop Searching, Start Solving.
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-4xl mx-auto">
            Get instant, personalized help for your toughest academic questions, or contribute to the community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
            {/* Primary CTA: AI Solver (Unique Selling Proposition) */}
            <Button size="lg" className="gap-3 bg-primary hover:bg-primary/90 shadow-2xl text-xl font-bold transition-transform duration-300 hover:scale-[1.05]" asChild>
              <Link href="/ask-ai">
                <Zap className="h-6 w-6" />
                Ask LearnSet AI Now
              </Link>
            </Button>
            
            {/* Secondary CTA: Community Contribution */}
            <Button size="lg" variant="outline" className="gap-3 text-xl border-2 border-primary/50 text-primary hover:bg-primary/10" asChild>
              <Link href="/upload-notes">
                <Upload className="h-6 w-6" />
                Contribute & Earn Recognition
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 5. Footer & Legal Links */}
      <footer className="bg-muted py-12 text-muted-foreground" aria-labelledby="footer-heading">
        <div className="container mx-auto max-w-7xl px-4 text-center">
            <p id="footer-heading" className="text-lg font-semibold mb-4 text-foreground">
              <School className="inline-block h-6 w-6 mr-2 text-primary"/>
              **LearnSet: Dedicated to Student Success in Maharashtra.**
            </p>
            <p className="text-base text-muted-foreground mb-6">
                Disclaimer: We are an independent educational resource and are not officially affiliated with MSBTE or any examination board.
            </p>

            <Separator className="bg-border/50 mb-6" />

            <p className="text-sm space-x-4">
                <span className="font-semibold text-foreground">&copy; {new Date().getFullYear()} LearnSet. All rights reserved.</span>
                <span className="mx-2 text-primary">|</span>
                <Link href="/about" className="hover:text-primary transition font-medium">About Us</Link>
                <span className="mx-2 text-primary">|</span>
                <Link href="/privacy-policy" className="hover:text-primary transition font-medium">Privacy Policy</Link>
                <span className="mx-2 text-primary">|</span>
                <Link href="/terms" className="hover:text-primary transition font-medium">Terms of Use</Link>
                <span className="mx-2 text-primary">|</span>
                <Link href="/disclaimer" className="hover:text-primary transition font-medium">Legal Disclaimer</Link>
            </p>
        </div>
      </footer>
    </div>
  );
}