// faq-data.ts

export interface FAQ {
  value: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    value: "affiliation",
    question: "Is LearnSet officially affiliated with MSBTE?",
    answer:
      "No, LearnSet is an independent educational platform created by students, educators, and developers. We are not officially affiliated with MSBTE, but we carefully follow the latest syllabus and exam patterns to provide accurate, up-to-date resources.",
  },
  {
    value: "free",
    question: "Are all resources completely free?",
    answer:
      "Yes! Every study material — syllabus, notes, previous year questions (PYQs), solutions, formulas, diagrams, and AI assistance — is 100% free for everyone. Our mission is to make quality education accessible to all MSBTE students.",
  },
  {
    value: "ai-assistant",
    question: "What subjects does the AI assistant support?",
    answer:
      "Our AI assistant is trained on the entire MSBTE curriculum and supports all branches and subjects. Whether you need help with mathematics, engineering subjects, programming, or theory — just ask your question and get instant, accurate answers.",
  },
  {
    value: "updates",
    question: "How often are the study materials updated?",
    answer:
      "We regularly update our resources to match the latest MSBTE syllabus, new question papers, and exam trends. New PYQs, solutions, and notes are typically added after every semester.",
  },
  {
    value: "contribute",
    question: "Can I contribute notes or solutions?",
    answer:
      'Absolutely! We welcome contributions from students and educators. Reach out to us at <a href="mailto:contact@learnset.com" class="text-primary hover:underline">contact@learnset.com</a> with your materials — we\'ll review them and include them with proper credit.',
  },
  {
    value: "mobile",
    question: "Is there a mobile app for LearnSet?",
    answer:
      "Currently LearnSet is a fully responsive web platform that works great on phones, tablets, and desktops. We are actively working on dedicated iOS and Android apps — stay tuned!",
  },
  {
    value: "account",
    question: "Do I need to create an account to use LearnSet?",
    answer:
      "No account is required! All resources and AI assistance are available without signing up. However, creating a free account lets you save favorite notes, track progress, and get personalized recommendations.",
  },
  {
    value: "feedback",
    question: "How can I give feedback or report an issue?",
    answer:
      'We love hearing from you! Please email us at <a href="mailto:contact@learnset.com" class="text-primary hover:underline">contact@learnset.com</a> or use the feedback button available on every page.',
  },
];
