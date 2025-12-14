'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Sparkles, Zap, MessageSquare, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

/* =======================
   Types
======================= */
type ChatMessage = {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: number;
};

/* =======================
   Suggested Prompts
======================= */
const suggestedPrompts = [
  'Explain the working principle of the DC shunt motor in detail, with a focus on practical applications and potential diagrams.',
  "Provide a step-by-step solution to the 2023 PYQ on Thevenin's Theorem, explaining the underlying theory.",
  'What are the 5 most important formulas for Fluid Mechanics? Format the answer as a table for clarity.',
  'Summarize the applications of Python in IoT, including code snippets and multimedia suggestions.',
];

/* =======================
   UI Components
======================= */
const AiResponse = ({ children }: { children: string }) => (
  <div className="w-full py-6 px-4 md:px-6 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
    <div className="mx-auto max-w-3xl flex items-start gap-4">
      <div className="rounded-full p-2 bg-blue-600 text-white">
        <Zap className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="font-semibold mb-1">AI Study Assistant</p>
        <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
          <ReactMarkdown>{children}</ReactMarkdown>
        </div>
      </div>
    </div>
  </div>
);

const UserQuery = ({ children }: { children: string }) => (
  <div className="w-full py-6 px-4 md:px-6 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
    <div className="mx-auto max-w-3xl flex items-start gap-4">
      <div className="rounded-full p-2 bg-gray-300 dark:bg-gray-700">
        <MessageSquare className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="font-semibold mb-1">You</p>
        <p>{children}</p>
      </div>
    </div>
  </div>
);

/* =======================
   Main Page
======================= */
export default function AskAIPage() {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isInitialState = chatHistory.length === 0;

  /* Auto-scroll only inside chat */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    setChatHistory(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (!res.ok) throw new Error('Failed');

      const data = await res.json();

      setChatHistory(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'ai',
          content: data.responseText,
          timestamp: Date.now(),
        },
      ]);
    } catch {
      setChatHistory(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'ai',
          content: 'Sorry, something went wrong. Please try again.',
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);

  return (
    /* 🔒 Fixed height to account for navbar (mt-16) */
    <div className="flex flex-col bg-white dark:bg-gray-950 h-[calc(100vh-4rem)] overflow-hidden">

      {/* ================= Chat Area ================= */}
      <div className="flex-1 overflow-y-auto pb-40">
        {isInitialState && (
          <div className="flex flex-col items-center justify-center pt-24 text-center px-4">
            <div className="p-4 rounded-full bg-blue-600/10 mb-6">
              <Sparkles className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-4xl font-extrabold mb-3">LearnSet AI Assistant</h1>
            <p className="text-xl text-gray-500 max-w-lg">
              High-quality, relevant content that engages your audience.
            </p>
          </div>
        )}

        {chatHistory.map(msg =>
          msg.role === 'user' ? (
            <UserQuery key={msg.id}>{msg.content}</UserQuery>
          ) : (
            <AiResponse key={msg.id}>{msg.content}</AiResponse>
          )
        )}

        {isLoading && (
          <div className="flex justify-center py-6 text-blue-600">
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            AI is thinking…
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ================= Input Area ================= */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-950 border-t p-4">
        <div className="max-w-4xl mx-auto">
          {isInitialState && (
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {suggestedPrompts.map((p, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  onClick={() => setInput(p)}
                  className="rounded-full"
                >
                  {p.length > 60 ? p.slice(0, 60) + '…' : p}
                </Button>
              ))}
            </div>
          )}

          <div className="flex gap-3 border rounded-xl p-3">
            <Textarea
              value={input}
              placeholder="Message AI Study Assistant…"
              rows={1}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="resize-none border-none focus:ring-0"
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>

          <p className="text-xs text-center text-gray-500 mt-2">
            AI-generated responses. Verify critical information.{" "} 
            <a href="/safety" className="text-blue-600 hover:underline">
              Learn more about our safety guidelines.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
