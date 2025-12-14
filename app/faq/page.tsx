// app/faq/page.tsx
'use client'; 

import { useState, useMemo } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Search, Mail, Zap, Database, Tablet, User, Code, FileText } from "lucide-react";
import { Input } from "@/components/ui/input"; // Assuming Input component exists
import { cn } from "@/lib/utils"; // Utility for class composition

// 1. Data Structure Enhancement (for SEO/UX Categorization)
export interface FAQ {
    value: string;
    question: string;
    answer: string | React.ReactNode; // Allow JSX for rich text links
    category: 'Platform & Usage' | 'Content & Quality' | 'Technical & Future' | 'Support & Community';
}

const allFaqs: FAQ[] = [
    // --- Platform & Usage ---
    {
        value: "free",
        question: "Are all resources completely free to use?",
        answer: "Yes, 100%! Every study material, including notes, PYQs, solutions, formulas, and AI assistance, is provided free of charge. Our core mission is democratizing quality education for all MSBTE students.",
        category: 'Platform & Usage',
    },
    {
        value: "account",
        question: "Do I need to create an account to access resources?",
        answer: "No account is strictly required to view or download content. However, creating a free account allows you to save favorite notes, track your progress, and receive personalized resource recommendations.",
        category: 'Platform & Usage',
    },
    {
        value: "mobile",
        question: "Is LearnSet available as a mobile app?",
        answer: "Currently, LearnSet is a **fully responsive web application** optimized for fast page load times and excellent performance across all devices (phones, tablets, and desktops). Dedicated iOS and Android apps are in development — stay tuned for updates!",
        category: 'Technical & Future',
    },
    // --- Content & Quality (SEO keywords) ---
    {
        value: "affiliation",
        question: "Is LearnSet officially affiliated with MSBTE?",
        answer: "No, LearnSet is an independent platform built by dedicated educators and students. We are not officially affiliated with MSBTE, but we meticulously follow the latest **MSBTE syllabus and exam patterns** to ensure our content is accurate and relevant.",
        category: 'Content & Quality',
    },
    {
        value: "updates",
        question: "How often are the study materials and PYQs updated?",
        answer: "We prioritize freshness and accuracy. New Previous Year Questions (PYQs), solutions, and notes are typically added and reviewed immediately after every semester exam session to align with the latest trends and curriculum changes.",
        category: 'Content & Quality',
    },
    {
        value: "ai-assistant",
        question: "How comprehensive is the AI assistant coverage?",
        answer: "Our AI model is custom-trained on the entire MSBTE curriculum, supporting **all branches and subjects**. It specializes in generating step-by-step solutions, clarifying complex theories, and summarizing technical topics instantly.",
        category: 'Content & Quality',
    },
    // --- Support & Community ---
    {
        value: "contribute",
        question: "Can I contribute my own high-quality notes or solutions?",
        answer: (
            <>
                Absolutely! Community contributions are the backbone of LearnSet. If you have well-structured notes, original solutions, or practical diagrams, please submit them for review by reaching out to us at <a href="mailto:contact@learnset.com" className="font-semibold text-primary hover:underline">contact@learnset.com</a>. We ensure proper credit for all accepted materials.
            </>
        ),
        category: 'Support & Community',
    },
    {
        value: "feedback",
        question: "How can I give feedback or report an error in the notes?",
        answer: (
            <>
                Your feedback is essential for maintaining quality. Please report any issues, errors, or suggestions immediately by emailing us at <a href="mailto:contact@learnset.com" className="font-semibold text-primary hover:underline">contact@learnset.com</a>. You can also use the integrated feedback button available on most content pages.
            </>
        ),
        category: 'Support & Community',
    },
];

// Map categories to icons for visual distinction
const categoryIcons = {
    'Platform & Usage': User,
    'Content & Quality': FileText,
    'Technical & Future': Code,
    'Support & Community': Mail,
};

// --- Main Component ---
export default function FAQPage() {
    const [searchTerm, setSearchTerm] = useState('');

    // Analytics/Performance: Client-side filtering is fast due to small data set.
    const filteredFaqs = useMemo(() => {
        if (!searchTerm) return allFaqs;
        const lowercasedTerm = searchTerm.toLowerCase();
        
        return allFaqs.filter(faq =>
            faq.question.toLowerCase().includes(lowercasedTerm) ||
            (typeof faq.answer === 'string' && faq.answer.toLowerCase().includes(lowercasedTerm))
        );
    }, [searchTerm]);

    // Grouping by category after filtering (UX structure)
    const groupedFaqs = useMemo(() => {
        return filteredFaqs.reduce((acc, faq) => {
            if (!acc[faq.category]) {
                acc[faq.category] = [];
            }
            acc[faq.category].push(faq);
            return acc;
        }, {} as Record<string, FAQ[]>);
    }, [filteredFaqs]);

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
                
                {/* 1. Hero Header & Search Bar (High Engagement) */}
                <div className="mb-16 text-center">
                    <div className="inline-flex items-center justify-center rounded-full bg-primary/10 border border-primary/20 px-4 py-2 mb-4 shadow-sm">
                        <Zap className="mr-2 h-5 w-5 text-primary" />
                        <span className="text-sm font-semibold text-primary uppercase tracking-widest">
                            Instant Answers
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-gray-900 via-primary to-blue-600 dark:from-white dark:via-primary dark:to-blue-400 bg-clip-text text-transparent">
                        Your FAQs, Solved.
                    </h1>
                    <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light">
                        Quickly find comprehensive answers to all common questions about LearnSet, content quality, and platform features.
                    </p>
                </div>
                
                {/* 2. Search Component (Performance & UX) */}
                <div className="mb-16">
                    <div className="relative max-w-3xl mx-auto shadow-xl rounded-full">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-primary" />
                        <Input
                            type="text"
                            placeholder="Search by topic, e.g., 'free notes', 'mobile app', 'updates'..."
                            className="w-full rounded-full border-2 border-primary/30 bg-white dark:bg-gray-800 pl-16 pr-6 py-6 text-lg text-gray-800 dark:text-white placeholder:text-gray-400 focus-visible:ring-4 focus-visible:ring-primary/50 transition duration-200 shadow-md"
                            aria-label="Search for frequently asked questions"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* 3. Main FAQ Accordion Area (Structured by Category) */}
                <div className="space-y-12">
                    {Object.keys(groupedFaqs).length === 0 && searchTerm ? (
                         <div className="text-center bg-white dark:bg-gray-800 p-12 rounded-xl shadow-lg border border-border">
                            <HelpCircle className="mx-auto h-12 w-12 text-primary mb-4" />
                            <h3 className="text-2xl font-semibold">No Results Found</h3>
                            <p className="text-lg text-muted-foreground mt-2">
                                Your search **"{searchTerm}"** did not match any current FAQs. Please try a shorter query or contact us directly.
                            </p>
                        </div>
                    ) : (
                        // Map through categories for structured presentation
                        Object.keys(groupedFaqs).map((category) => {
                            const CategoryIcon = categoryIcons[category as keyof typeof categoryIcons];
                            
                            return (
                                <section key={category} className="space-y-6">
                                    <h2 className="text-3xl font-bold mb-4 flex items-center text-gray-900 dark:text-white border-b border-primary/20 pb-2">
                                        {CategoryIcon && <CategoryIcon className="h-7 w-7 mr-3 text-primary" />}
                                        {category} 
                                        {searchTerm && (
                                            <span className="ml-3 text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{groupedFaqs[category].length} Results</span>
                                        )}
                                    </h2>
                                    
                                    <Accordion type="single" collapsible className="w-full space-y-3">
                                        {groupedFaqs[category].map((faq) => (
                                            <AccordionItem 
                                                key={faq.value} 
                                                value={faq.value} 
                                                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 px-4"
                                            >
                                                <AccordionTrigger className="text-lg font-semibold text-gray-800 dark:text-gray-100 hover:no-underline py-4">
                                                    {faq.question}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-base text-gray-600 dark:text-gray-300 leading-relaxed pt-0 pb-4">
                                                    {faq.answer}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </section>
                            );
                        })
                    )}
                </div>
                
                {/* 4. Still Have Questions CTA (High Conversion) */}
                <div className="mt-20">
                    <div className="bg-primary-foreground/5 dark:bg-gray-800/50 p-10 rounded-2xl text-center border-2 border-dashed border-primary/30 shadow-2xl">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                            Need Personalized Assistance?
                        </h2>
                        <p className="text-xl text-gray-900 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                            If your question wasn't answered here, don't hesitate to reach out. Our support team is ready to help you succeed.
                        </p>
                        <a 
                            href="mailto:contact@learnset.com" 
                            className="inline-flex items-center justify-center gap-3 rounded-full bg-primary text-white dark:text-gray-900 text-lg px-10 py-4 font-bold shadow-lg shadow-primary/30 transition-all duration-300 hover:bg-primary/90 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary/50"
                        >
                            <Mail className="h-6 w-6" />
                            Email Our Support Team
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}