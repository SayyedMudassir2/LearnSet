'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, Sparkles } from 'lucide-react';

// --- Micro-copy for perceived performance ---
const LOADING_TIPS = [
  'Securing your learning environment...',
  'Verifying academic credentials...',
  'Syncing your saved resources...',
  'Optimizing your study dashboard...',
];

// --- Fake staged progress values ---
const PROGRESS_STAGES = [0, 30, 60, 90, 100];

export default function AuthLoaderPage() {
  const [tipIndex, setTipIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // --- Rotate tips slowly ---
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % LOADING_TIPS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // --- Fake staged loading ---
  useEffect(() => {
    let stage = 0;

    const interval = setInterval(() => {
      stage += 1;

      if (stage >= PROGRESS_STAGES.length) {
        clearInterval(interval);
        return;
      }

      setProgress(PROGRESS_STAGES[stage]);
    }, 2500); // controls how slow the loader feels

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center justify-center font-sans overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6">

        {/* Logo / Icon */}
        <motion.div
          className="relative mb-12"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          {/* Slow pulse */}
          <motion.div
            className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-xl"
            animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 p-6 rounded-[2.5rem] shadow-2xl shadow-blue-500/10">
            <Lock className="h-12 w-12 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />

            <motion.div
              className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1.5 border-4 border-white dark:border-gray-950"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <ShieldCheck className="h-4 w-4 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Status text */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Authenticating
          </h2>

          <div className="h-6 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={tipIndex}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="text-sm font-medium text-slate-500 dark:text-slate-400"
              >
                {LOADING_TIPS[tipIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-10 w-full h-1.5 bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-600 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          />
        </div>

        {/* Security reassurance */}
        <motion.div
          className="mt-12 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <Sparkles size={12} />
          <span>End-to-End Encrypted Session</span>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-8 text-slate-300 dark:text-slate-700 text-sm">
        LearnSet AI Security Protocol v2.4
      </footer>
    </div>
  );
}
