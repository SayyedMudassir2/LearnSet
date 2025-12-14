"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils"; // Assuming a utility function for conditional classes
import {
  Mail,
  Lock,
  ArrowRight,
  Shield,
  Loader2,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Users, // Added for "Sign in with Google" simulation
} from "lucide-react";
import Link from "next/link";
import { z } from "zod";

// --- TypeScript Types ---
interface FormState {
  email: string;
  error: string;
  loading: boolean;
  success: string;
}

interface FieldErrors {
  email?: string;
  password?: string;
}

// --- Zod Validation Schema ---
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

// --- Login Page Component ---
export default function LoginPage() {
  const [state, setState] = useState<FormState>({
    email: "",
    error: "",
    loading: false,
    success: "",
  });

  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const { email, error, loading, success } = state;

  // Input change handler (Optimized with useCallback)
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    // Reset error/success messages on user interaction
    setState(prev => ({ ...prev, error: "", success: "" }));

    if (id === "email") {
      setState(prev => ({ ...prev, email: value }));
    } else if (id === "password") {
      setPassword(value);
    }
    // Clear specific field error as user types
    setFieldErrors(prev => ({ ...prev, [id]: undefined }));
  }, []);

  // Toggle password visibility (Optimized with useCallback)
  const handleTogglePassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  // Form submit handler (Optimized with useCallback)
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setState(prev => ({ ...prev, error: "", success: "" }));
      setFieldErrors({});

      const formData = { email, password };
      const validationResult = loginSchema.safeParse(formData);

      if (!validationResult.success) {
        const errors: FieldErrors = {};
        validationResult.error.issues.forEach(err => {
          const field = err.path[0] as keyof FieldErrors;
          errors[field] = err.message;
        });
        setFieldErrors(errors);
        return;
      }

      setState(prev => ({ ...prev, loading: true }));

      try {
        // STRATEGY: Performance Optimization - Simulate a fast API call
        await new Promise(resolve => setTimeout(resolve, 800)); 

        // Placeholder for successful login and subsequent redirection
        setState(prev => ({
          ...prev,
          success: "Login successful! Redirecting to dashboard...",
        }));
      } catch (err) {
        // STRATEGY: Ensure generic, user-friendly error message
        const errorMessage = "Invalid credentials. Please check your email and password.";
        setState(prev => ({ ...prev, error: errorMessage }));
      } finally {
        // Only set loading to false if not already successful (to prevent flicker during redirect)
        if (!state.success) {
            setState(prev => ({ ...prev, loading: false }));
        }
      }
    },
    [email, password, state.success] // Dependencies for useCallback
  );

  return (
    <div className="container mx-auto flex min-h-[80vh] max-w-5xl items-center justify-center px-4 py-12 md:py-20">
      <div className="w-full max-w-md">
        
        {/* Header (SEO & Branding) */}
        <header className="mb-10 text-center">
          <div className="mb-6 inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 border border-primary/20">
            <Shield className="mr-2 h-5 w-5 text-primary" aria-hidden="true" />
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
              Secure Access
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Welcome Back!
          </h1>

          <p className="mt-4 text-lg text-muted-foreground">
            Sign in to quickly access your personalized study materials.
          </p>
        </header>

        {/* Login Card (Modern, Elevated Design) */}
        <Card className="shadow-2xl border-border/50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign In to Your Account</CardTitle>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              
              {/* External Login Option (UX Pattern) */}
              <Button 
                variant="outline" 
                className="w-full text-base border-2 border-border/70 hover:bg-muted/50"
                type="button"
                disabled={loading || !!success}
              >
                <Users className="mr-2 h-5 w-5" />
                Continue with Google
              </Button>

              <div className="relative flex items-center">
                <div className="flex-grow border-t border-border/50"></div>
                <span className="flex-shrink mx-4 text-sm text-muted-foreground">OR</span>
                <div className="flex-grow border-t border-border/50"></div>
              </div>
              
              {/* Email Field (UX Feedback) */}
              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className={cn(
                        "pl-11 h-11 text-base transition-all duration-200", 
                        fieldErrors.email && "border-red-500 ring-red-500 focus-visible:ring-red-500"
                    )}
                    autoComplete="email"
                    value={email}
                    onChange={handleInputChange}
                    required
                    disabled={loading || !!success}
                  />
                </div>
                {fieldErrors.email && (
                  <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{fieldErrors.email}</span>
                  </p>
                )}
              </div>

              {/* Password Field (UX/Security Toggle) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="font-medium">Password</Label>
                  <Link 
                    href="/forgot-password" 
                    className="text-sm text-primary hover:underline transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={cn(
                        "pl-11 pr-11 h-11 text-base transition-all duration-200", 
                        fieldErrors.password && "border-red-500 ring-red-500 focus-visible:ring-red-500"
                    )}
                    autoComplete="current-password"
                    value={password}
                    onChange={handleInputChange}
                    required
                    disabled={loading || !!success}
                  />
                  {/* Password Toggle Button */}
                  <button
                    type="button"
                    onClick={handleTogglePassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    disabled={loading || !!success}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{fieldErrors.password}</span>
                  </p>
                )}
              </div>

              {/* Global Feedback Messages */}
              {error && (
                <div className="flex items-center gap-3 rounded-lg bg-red-50/70 dark:bg-red-900/20 p-3 text-sm text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium">{error}</span>
                </div>
              )}
              {success && (
                <div className="flex items-center gap-3 rounded-lg bg-green-50/70 dark:bg-green-900/20 p-3 text-sm text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium">{success}</span>
                </div>
              )}

              {/* Submit Button (Clear Loading UX) */}
              <Button size="lg" className="w-full h-11 text-base font-semibold" type="submit" disabled={loading || !!success}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Sign In Securely
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </>
                )}
              </Button>
            </CardContent>
          </form>

          <CardFooter className="flex flex-col items-center justify-center border-t border-border/50 pt-6">
            <p className="text-muted-foreground text-base">
              New to LearnSet?{" "}
              <Link href="/register" className="font-bold text-primary hover:underline transition-colors">
                Create a Free Account
              </Link>
            </p>
          </CardFooter>
        </Card>

        {/* Security Note (Prominent Alert) */}
        <div className="mt-8 p-4 bg-blue-50/70 dark:bg-blue-900/20 border-l-4 border-blue-500 text-blue-700 dark:text-blue-300 rounded-lg shadow-md">
            <p className="font-semibold text-sm flex items-center gap-2">
                <Lock className="h-4 w-4 flex-shrink-0" />
                Your Privacy is Guaranteed
            </p>
            <p className="mt-1 text-xs">
                We use secure, industry-standard encryption for your login credentials. Your data is safe and never shared.
            </p>
        </div>
      </div>
    </div>
  );
}