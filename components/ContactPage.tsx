"use client";

import { useState, FormEvent, useCallback } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Send,
  MessageSquare,
  Clock,
  Briefcase,
  AlertTriangle,
  CheckCircle,
  Loader2,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming cn utility for conditional classes

// --- Configuration & Constants ---

const CONTACT_EMAIL = "learnset2569@gmail.com";

// --- Form State Management (Simulated Submission) ---

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

// --- Main Component ---

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // STRATEGY: Replace this block with actual API call to your backend/serverless function (e.g., /api/contact)
    // Example: const response = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
    
    try {
      // Simulate API latency and success
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      
      // In a real app, check response.ok
      if (formData.name.toLowerCase().includes('fail')) { // Simulate a failed response for testing
         throw new Error("Simulated network error.");
      }

      setStatus('success');
      // Clear form data after successful submission
      setFormData({ name: '', email: '', subject: '', message: '' });

    } catch (error) {
      console.error("Submission error:", error);
      setStatus('error');
    }
  };

  // --- Render Logic ---

  // UX: Determine button content based on submission status
  const buttonContent = {
    idle: <><Send className="mr-2 h-5 w-5" /> Send Message</>,
    loading: <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</>,
    success: <><CheckCircle className="mr-2 h-5 w-5" /> Message Sent!</>,
    error: <><AlertTriangle className="mr-2 h-5 w-5" /> Try Again</>,
  };

  const isFormDisabled = status === 'loading' || status === 'success';

  return (
    <div className="container mx-auto max-w-6xl px-4 py-16 md:py-28">
      
      {/* 1. Hero Header (Trust & Clarity) */}
      <div className="mb-16 text-center">
        <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 mb-6 shadow-sm border border-primary/20">
          <MessageSquare className="mr-2 h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-primary uppercase tracking-widest">
            Get In Touch
          </span>
        </div>

        <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl lg:text-7xl bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
          How Can We Help You Today?
        </h1>
        
        <p className="mt-6 text-xl text-muted-foreground max-w-4xl mx-auto font-light">
          Whether it’s a quick question, detailed content feedback, or a potential partnership, we value your communication.
        </p>

        {/* Strategic CTA for self-service */}
        <div className="mt-8">
            <Button variant="outline" size="lg" asChild className="gap-2 border-2 border-secondary hover:bg-secondary/10 transition-colors shadow-md">
                <Link href="/faq">
                    <HelpCircle className="h-5 w-5" />
                    Check Our FAQs First
                </Link>
            </Button>
        </div>
      </div>

      <div className="grid gap-16 lg:grid-cols-3">
        
        {/* 2. Contact Information & Quick Links (Left Column) */}
        <div className="lg:col-span-1 space-y-10">
            <h2 className="text-3xl font-bold tracking-tight border-b pb-3">Contact Details</h2>
            
            {/* Direct Email Card */}
            <Card className="border-border/40 shadow-xl transition-shadow hover:shadow-2xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                        <Mail className="h-6 w-6 text-primary" />
                        General Inquiries
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        For questions about content, technical issues, or general feedback.
                    </p>
                    <Button size="lg" className="w-full" asChild>
                        <a
                            href={`mailto:${CONTACT_EMAIL}`}
                            className="flex items-center justify-center gap-2"
                            aria-label={`Email LearnSet at ${CONTACT_EMAIL}`}
                        >
                            <Mail className="h-5 w-5" />
                            {CONTACT_EMAIL}
                        </a>
                    </Button>
                </CardContent>
            </Card>

            {/* Response Time Card */}
            <Card className="border-border/40 shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                        <Clock className="h-6 w-6 text-primary" />
                        Our Response Commitment
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg">
                        We aim to respond to all non-urgent emails within **24–48 business hours**.
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        Urgent issues (site down, security) are prioritized.
                    </div>
                </CardContent>
            </Card>
            
            {/* Partnerships Card (Strategic) */}
            <Card className="border-border/40 shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                        <Briefcase className="h-6 w-6 text-primary" />
                        Partnerships
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Interested in collaboration, content contributions, or advertising? Please mention **"Partnership Inquiry"** in your subject line.
                    </p>
                </CardContent>
            </Card>
        </div>

        {/* 3. Contact Form (Right Column) */}
        <Card className="lg:col-span-2 border-primary/40 shadow-2xl dark:shadow-primary/10">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Send us a secure message</CardTitle>
            <CardDescription className="text-lg">
              Use the form below for direct contact. All fields are required to ensure we can properly address your query.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="E.g., Rohan Sharma"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isFormDisabled}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isFormDisabled}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Content Feedback, Technical Issue, etc."
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={isFormDisabled}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Please provide details about your query..."
                  className="min-h-[180px]"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isFormDisabled}
                />
              </div>

              {/* Submission Status Message (UX Feedback) */}
              {status === 'success' && (
                <div className="p-4 bg-green-500/10 border border-green-500 text-green-700 dark:text-green-300 rounded-lg flex items-center gap-3">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">Success!</span> Your message has been sent. We will respond soon.
                </div>
              )}
              {status === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500 text-red-700 dark:text-red-300 rounded-lg flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="font-semibold">Error!</span> Failed to send message. Please try emailing us directly or check your connection.
                </div>
              )}
              
              <Button 
                size="lg" 
                className={cn("w-full transition-all duration-300", 
                            status === 'loading' && "bg-primary/80 cursor-not-allowed",
                            status === 'success' && "bg-green-600 hover:bg-green-700")}
                type="submit" 
                disabled={isFormDisabled}
              >
                {buttonContent[status]}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-20 bg-border/50" />

      {/* 4. Closing (Reinforcing Value) */}
      <div className="text-center">
        <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
          Every Query Helps Us Improve
        </h2>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
          We’re a community-driven platform. Your feedback is essential for maintaining high-quality, relevant content for all MSBTE students.
        </p>
      </div>
    </div>
  );
}