// app/safety/page.tsx
"use client";
import { ShieldCheck, Zap, Lightbulb, Ban, Lock, TrendingUp } from 'lucide-react';
import Link from 'next/link';

// --- SEO & Strategy: Metadata for search engine ranking (Crucial for high ranking) ---
// export const metadata = {
//   title: "Responsible AI Usage & Safety Guidelines | LearnSet Assistant",
//   description: "Official policies for safe, responsible, and ethical use of the LearnSet AI Study Assistant. Learn about data privacy, accuracy, academic integrity, and appropriate usage policies.",
//   keywords: "AI safety, academic integrity, data privacy, MSBTE, ethical AI, usage policy",
//   // Canonical links and Open Graph tags would be dynamically added in a real app context
// };

// --- Main Page Component (Planning Structure & UX Design) ---
export default function SafetyGuidelinesPage() {
  return (
    // High contrast, modern typography setting
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed">
      
      {/* Header Section (Clear, Trust-Building Visuals) */}
      <header className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="flex items-center space-x-4">
            <ShieldCheck className="h-10 w-10 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              AI Governance & Safety
            </h1>
          </div>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl font-light">
            Our commitment to providing a safe, accurate, and responsible learning experience, backed by clear usage policies.
          </p>
        </div>
      </header>

      {/* Main Content Area (Logical Planning Structure) */}
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        
        {/* 1. Content Reliability (Accuracy & Quality) */}
        <section id="accuracy" className="mb-16 border-l-4 border-yellow-500/50 pl-6">
          <h2 className="text-3xl font-bold mb-6 flex items-center text-gray-800 dark:text-gray-200">
            <Lightbulb className="mr-4 h-7 w-7 text-yellow-500 flex-shrink-0" />
            Accuracy, Hallucination, & Verification
          </h2>
          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
            <p className="text-lg">
              The LearnSet AI is trained on MSBTE curriculum data to ensure relevance. However, all AI models are prone to producing confidence-sounding inaccuracies ("hallucinations").
            </p>
            
            <h3>Our Commitment & Your Responsibility:</h3>
            <ul className="list-disc ml-6 space-y-2">
              <li>**Primary Source Check:** For high-stakes requirements (exams, submissions), *always* cross-reference formulas, numerical results, and diagrams against official textbooks.</li>
              <li>**Analytics for Quality ($A \to Q$):** We actively monitor user reports and conversation analytics to identify and retrain models on areas of frequent error, ensuring continuous content quality improvement.</li>
            </ul>
          </div>
        </section>

        {/* 2. Ethical Use & Academic Integrity (Security & Compliance) */}
        <section id="ethics" className="mb-16 border-l-4 border-red-500/50 pl-6">
          <h2 className="text-3xl font-bold mb-6 flex items-center text-gray-800 dark:text-gray-200">
            <Ban className="mr-4 h-7 w-7 text-red-500 flex-shrink-0" />
            Prohibited Use & Academic Integrity
          </h2>
          <div className="grid md:grid-cols-2 gap-6 prose dark:prose-invert max-w-none">
            
            {/* Allowed Use Card (Positive Reinforcement) */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl shadow-md border-t-4 border-blue-600">
              <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-3 text-xl">Allowed & Encouraged Use</h3>
              <ul className="list-disc ml-5 space-y-1 text-gray-700 dark:text-gray-400 text-base">
                <li>Concept reinforcement and theory summarization.</li>
                <li>Debugging personal code snippets.</li>
                <li>Generating study flashcards or revision notes.</li>
                <li>Exploring diagram ideas and visual learning aids.</li>
              </ul>
            </div>
            
            {/* Prohibited Use Card (Clear Guardrails) */}
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl shadow-md border-t-4 border-red-600">
              <h3 className="font-bold text-red-700 dark:text-red-400 mb-3 text-xl">Strictly Prohibited Uses</h3>
              <ul className="list-disc ml-5 space-y-1 text-gray-700 dark:text-gray-400 text-base">
                <li>Generation of hate speech, illegal, or harmful content.</li>
                <li>**Plagiarism:** Submitting AI-generated work as original coursework or exam answers.</li>
                <li>Sharing or soliciting Personally Identifiable Information (PII).</li>
                <li>Generating malware or instructions for cyber-attacks.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. Data Privacy & Security (Trust & Compliance) */}
        <section id="privacy" className="mb-16 border-l-4 border-gray-400/50 pl-6">
          <h2 className="text-3xl font-bold mb-6 flex items-center text-gray-800 dark:text-gray-200">
            <Lock className="mr-4 h-7 w-7 text-gray-600 dark:text-gray-400 flex-shrink-0" />
            Data Security & Privacy Commitment
          </h2>
          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
            <ul className="list-disc ml-6 space-y-2">
              <li>**Encryption:** All user interactions are protected using industry-standard encryption (TLS/SSL). Data is encrypted both in transit and at rest.</li>
              <li>**Data Usage:** Anonymized chat data is only used for model improvement and product development. Your personal information is *never* sold.</li>
              <li>**Full Policy:** For complete details on how we handle your information, please visit our detailed <Link href="/privacy" className="text-blue-600 hover:underline font-medium">Privacy Policy page</Link>.</li>
            </ul>
          </div>
        </section>
        
        {/* Multimedia Integration Note: Guides for Content Planning */}
        <div className="mt-12 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-300 dark:border-green-700 flex items-start space-x-4">
          <TrendingUp className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
          <p className="text-sm text-green-800 dark:text-green-300">
            **Content Planning & SEO Strategy:** We recommend integrating a static, high-quality **"AI Data Flow Diagram"** here. This visual content would enhance user understanding, reduce bounce rate, and provide rich image SEO opportunities.
          </p>
        </div>
      </main>

      {/* Footer CTA (Traffic Flow & Analytics) */}
      <footer className="bg-gray-100 dark:bg-gray-800 mt-16 py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Questions or Concerns?</h3>
          <p className="text-gray-600 dark:text-gray-400">
            If you believe you've encountered inaccurate or inappropriate content, please report it immediately to maintain the quality of our service.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            {/* Key Internal Links for SEO/Traffic */}
            <Link href="/ask-ai" className="mr-4 text-blue-600 hover:underline dark:text-blue-400 font-medium transition duration-150">
              Return to AI Assistant
            </Link>
            <a href="mailto:support@learnset.com" className="text-blue-600 hover:underline dark:text-blue-400 font-medium transition duration-150">
              Contact Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}