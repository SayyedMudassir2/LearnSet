// app/coming-soon/page.tsx
'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Briefcase,
  Stethoscope,
  DraftingCompass,
  ArrowLeft,
  Send,
  CheckCircle2,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* -------------------------------------------------------------------------- */
/*                              FLOATING ICONS                                */
/* -------------------------------------------------------------------------- */

const floatingIcons = [
  { Icon: Zap, color: "text-yellow-500", top: "12%", left: "18%", delay: 0 },
  { Icon: Briefcase, color: "text-blue-500", top: "22%", left: "78%", delay: 1.8 },
  { Icon: Stethoscope, color: "text-red-500", top: "72%", left: "14%", delay: 3.6 },
  { Icon: DraftingCompass, color: "text-green-500", top: "82%", left: "82%", delay: 5.4 },
];

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    console.log("Waitlist Signup:", email);
    setIsSubmitted(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-gray-950 flex items-center justify-center">
      
      {/* Ambient Glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 h-[420px] w-[420px] bg-blue-500/20 blur-[140px] rounded-full" />
        <div className="absolute -bottom-32 -right-32 h-[420px] w-[420px] bg-purple-500/20 blur-[140px] rounded-full" />
      </div>

      {/* Floating Academic Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map(({ Icon, color, top, left, delay }, i) => (
          <motion.div
            key={i}
            className={`absolute ${color} opacity-20 dark:opacity-30`}
            style={{ top, left }}
            animate={{ y: [0, -18, 0], rotate: [0, 8, -8, 0] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
          >
            <Icon size={52} strokeWidth={1.5} />
          </motion.div>
        ))}
      </div>

      {/* Main Card */}
      <motion.main
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-2xl px-6"
      >
        <div className="rounded-[28px] border border-white/20 dark:border-gray-800 bg-white/55 dark:bg-gray-900/55 backdrop-blur-xl shadow-2xl p-8 md:p-12 text-center">

          {/* Coming Soon Badge */}
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-bold tracking-widest mb-8"
          >
            <Clock size={14} />
            COMING SOON
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
            We’re Getting Things Ready.
          </h1>

          {/* Supporting Copy */}
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-10 leading-relaxed">
            LearnSet is currently under development.  
            We’re carefully building tools, notes, and resources for students — 
            and we’ll be opening access very soon.
          </p>

          {/* Waitlist */}
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubscribe}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex flex-col sm:flex-row gap-3 items-center"
              >
                <Input
                  type="email"
                  placeholder="Get notified when we launch"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl bg-white/80 dark:bg-gray-800/80 border-slate-200 dark:border-gray-700 focus:ring-orange-500"
                />
                <Button
                  type="submit"
                  className="
                    h-12 px-8 rounded-xl
                    bg-orange-600 dark:bg-orange-500
                    hover:bg-orange-700 dark:hover:bg-orange-600
                    text-white dark:text-black
                    font-semibold
                    shadow-lg shadow-orange-200 dark:shadow-orange-900/30
                    active:scale-95
                    transition-all
                  "
                >
                  Notify Me <Send className="ml-2 h-4 w-4" />
                </Button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 font-medium"
              >
                <CheckCircle2 className="h-5 w-5" />
                Thanks! We’ll notify you when we’re live.
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-12 flex justify-center">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-orange-600 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </div>
        </div>
      </motion.main>

      {/* Footer */}
      <footer className="absolute bottom-6 text-xs tracking-widest uppercase text-slate-400">
        © 2025 LearnSet • Launching Soon
      </footer>
    </div>
  );
}
