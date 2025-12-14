"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator"; // Added Separator for visual break
import { cn } from "@/lib/utils"; // Assuming a utility for conditional class merging
import { Mail, ArrowLeft, Shield, Loader2, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { z } from "zod";

// --- TypeScript Types ---

interface ForgotPasswordState {
  email: string;
  error: string;
  loading: boolean;
  success: string;
}

// --- Validation Schema (Zod) ---

const emailSchema = z.string().email("Please enter a valid email address.");

// --- Main Component ---

export default function ForgotPasswordPage() {
  const [state, setState] = useState<ForgotPasswordState>({
    email: "",
    error: "",
    loading: false,
    success: "",
  });

  const { email, error, loading, success } = state;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setState(prevState => ({ ...prevState, error: "", success: "" }));

    const validationResult = emailSchema.safeParse(email);
    if (!validationResult.success) {
      // Use the validation message directly
      setState(prevState => ({ ...prevState, error: validationResult.error.issues[0].message }));
      return;
    }

    setState(prevState => ({ ...prevState, loading: true }));

    try {
      // --- SECURITY & API STRATEGY ---
      // 1. Send the email request.
      // 2. The response should *always* be successful (status 200) to prevent email enumeration attacks.
      //    The actual email check happens server-side, and the "Success" message is shown regardless.
      // -------------------------------
      
      // Simulate API latency
      await new Promise(resolve => setTimeout(resolve, 1800));

      // Simulate a success scenario (Always show success to prevent enumeration)
      setState(prevState => ({
        ...prevState,
        success: "Success! We've sent a link if that email is in our system.",
        // Keep the email input visually filled to confirm which email was used
      }));

    } catch (err) {
      // Handle actual network/server failure
      setState(prevState => ({ ...prevState, error: "Network error occurred. Please try again." }));
    } finally {
      setState(prevState => ({ ...prevState, loading: false }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prevState => ({
      ...prevState,
      email: e.target.value,
      error: "", // Clear error/success messages immediately when user starts typing again
      success: ""
    }));
  };

  // --- Render Logic ---

  if (success) {
    // Dedicated Success View (Superior UX/Clarity)
    return (
      <div className="container mx-auto flex min-h-[80vh] max-w-5xl items-center justify-center px-4 py-12 md:py-20">
        <Card className="w-full max-w-md p-8 text-center border-green-500/50 shadow-2xl transition-all duration-500">
          <CheckCircle className="h-16 w-16 mx-auto mb-6 text-green-500 animate-bounce-once" />
          <CardTitle className="text-3xl font-extrabold text-green-600 dark:text-green-400">
            Link Sent!
          </CardTitle>
          <CardDescription className="mt-4 text-lg text-muted-foreground">
            If the email address **{state.email || 'you provided'}** is registered, you will receive a password reset link shortly.
          </CardDescription>
          <div className="mt-6 space-y-3">
            <p className="font-semibold text-foreground">
              Didn't receive it?
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 mx-auto max-w-xs">
                <li>Check your **Spam/Junk** folder.</li>
                <li>Wait up to 5 minutes.</li>
            </ul>
          </div>
          <Separator className="my-6" />
          <Link href="/login" passHref legacyBehavior>
            <Button size="lg" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back to Login
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex min-h-[80vh] max-w-5xl items-center justify-center px-4 py-12 md:py-20">
      <div className="w-full max-w-md">
        
        {/* Header Section */}
        <header className="mb-10 text-center">
          <div className="mb-6 inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 border border-primary/20">
            <Shield className="mr-2 h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-widest">
              Security Protocol
            </span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Account Recovery
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xs mx-auto">
            Enter your registered email to receive a secure reset link.
          </p>
        </header>

        {/* Forgot Password Card */}
        <Card className="shadow-2xl border-border/50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Trouble Logging In?</CardTitle>
            <CardDescription className="text-base">We've got you covered. Just tell us which email to send the reset link to.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email Field Group */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className={cn("pl-11 h-12 text-base transition-all duration-200", error && "border-red-500 ring-red-500 focus-visible:ring-red-500")}
                    value={email}
                    onChange={handleEmailChange}
                    required
                    disabled={loading}
                  />
                </div>
                
                {/* Error Message (Styled) */}
                {error && (
                    <div className="flex items-center gap-2 text-sm text-red-500 pt-1">
                        <XCircle className="h-4 w-4 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}
              </div>

              {/* Submit Button */}
              <Button size="lg" className="w-full font-semibold h-11" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing Request...
                  </>
                ) : (
                  "Send Secure Reset Link"
                )}
              </Button>
            </form>

            <Separator />

            {/* Back to Login Link */}
            <div className="text-center">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Wait, I Remembered My Password!
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Security Note Alert (Elevated Importance) */}
        <div className="mt-8 p-4 bg-yellow-500/10 border-l-4 border-yellow-500 text-yellow-700 dark:text-yellow-300 rounded-lg shadow-md">
            <p className="font-semibold text-base flex items-center gap-2">
                <Shield className="h-5 w-5 flex-shrink-0" />
                Security Note
            </p>
            <p className="mt-1 text-sm">
                For your safety, the reset link will expire quickly. Do not share it. We will never ask for your password via email.
            </p>
        </div>
      </div>
    </div>
  );
}