"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
  User,
  ArrowRight,
  Shield,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  CheckCircle,
  Users, // Icon for Social Login
} from "lucide-react";
import Link from "next/link";
import { z } from "zod";

// --- TypeScript Types & State ---
interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

interface FieldErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  termsAccepted?: string;
}

interface FormState {
  formData: FormData;
  globalError: string;
  loading: boolean;
  success: string;
  fieldErrors: FieldErrors; // Use dedicated field error state
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  termsAccepted: false,
};

// --- Validation Schema (Zod) ---
const registerSchema = z
  .object({
    fullName: z.string().min(2, "Your full name is required."),
    email: z.string().email("Please enter a valid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Must contain at least one number.")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character."),
    confirmPassword: z.string(),
    termsAccepted: z
      .boolean()
      .refine((val) => val === true, "You must accept the terms."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

// --- Main Component ---
export default function RegisterPage() {
  const [state, setState] = useState<FormState>({
    formData: initialFormData,
    globalError: "",
    loading: false,
    success: "",
    fieldErrors: {},
  });

  const { formData, globalError, loading, success, fieldErrors } = state;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // --- Inline password validation state (UX) ---
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordValidity, setPasswordValidity] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  // --- Handle input changes (Optimized) ---
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    
    setState((prevState) => ({
      ...prevState,
      formData: {
        ...prevState.formData,
        [id]: type === "checkbox" ? checked : value,
      },
      globalError: "", // Clear global error on user input
      fieldErrors: {
        ...prevState.fieldErrors,
        [id]: undefined, // Clear specific field error
      },
    }));
  }, []);

  // --- Update password validity (Performance/UX) ---
  useEffect(() => {
    const { password, confirmPassword } = formData;

    // Password strength check
    setPasswordValidity({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[^A-Za-z0-9]/.test(password),
    });

    // Confirmation check
    if (confirmPassword.length > 0 || password.length > 0) {
        setState(prev => ({
            ...prev,
            fieldErrors: {
                ...prev.fieldErrors,
                confirmPassword: (password === confirmPassword || confirmPassword.length === 0) ? undefined : "Passwords do not match.",
            }
        }));
    }
    
  }, [formData.password, formData.confirmPassword]);


  // --- Handle form submission (Strategy) ---
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setState((prevState) => ({ ...prevState, globalError: "", success: "", fieldErrors: {} }));

      const validationResult = registerSchema.safeParse(formData);

      if (!validationResult.success) {
        const errors: FieldErrors = {};
        validationResult.error.issues.forEach(err => {
            const field = err.path[0] as keyof FieldErrors;
            errors[field] = err.message;
        });
        setState((prevState) => ({ ...prevState, fieldErrors: errors }));
        return;
      }

      setState((prevState) => ({ ...prevState, loading: true }));

      try {
        // STRATEGY: Performance Optimization - Simulate a fast API call (under 1.5s)
        await new Promise((resolve) => setTimeout(resolve, 1200));

        // STRATEGY: Conversion Success - Clear data only on successful registration
        setState((prevState) => ({
          ...prevState,
          success: "Account created successfully! Welcome aboard. Redirecting...",
          // Optionally clear form data or manage redirection here
        }));
      } catch (err) {
        // STRATEGY: Clear, user-friendly error message
        setState((prevState) => ({
          ...prevState,
          globalError: "Registration failed due to a server error or email already in use. Please check your details and try again.",
        }));
      } finally {
        setState((prevState) => ({ ...prevState, loading: false }));
      }
    },
    [formData]
  );

  // Helper for password validation list item styling
  const PasswordCheckItem: React.FC<{ isValid: boolean, text: string }> = ({ isValid, text }) => (
    <li
      className={cn(
        "flex items-center gap-2 text-sm transition-colors duration-200",
        isValid ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400 opacity-80"
      )}
    >
      {isValid ? <CheckCircle className="h-4 w-4 flex-shrink-0" /> : <AlertCircle className="h-4 w-4 flex-shrink-0" />}
      {text}
    </li>
  );


  return (
    <div className="container mx-auto flex min-h-[80vh] max-w-5xl items-center justify-center px-4 py-12 md:py-20">
      <div className="w-full max-w-md">
        
        {/* Header (SEO & Branding) */}
        <header className="mb-10 text-center">
          <div className="mb-6 inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 border border-primary/20">
            <Shield className="mr-2 h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
              Secure Sign Up
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Unlock Your Study Power
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Get started instantly with free resources and AI learning tools.
          </p>
        </header>

        {/* Register Card (Modern, Elevated Design) */}
        <Card className="shadow-2xl border-border/50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Create Your Free Account</CardTitle>
            <CardDescription>A quick setup is all it takes to join the community.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
             {/* Social Login (CRO Strategy) */}
             <Button 
                variant="outline" 
                className="w-full text-base border-2 border-border/70 hover:bg-muted/50"
                type="button"
                disabled={loading || !!success}
              >
                <Users className="mr-2 h-5 w-5" />
                Sign up with Google
              </Button>

              <div className="relative flex items-center">
                <div className="flex-grow border-t border-border/50"></div>
                <span className="flex-shrink mx-4 text-sm text-muted-foreground">OR</span>
                <div className="flex-grow border-t border-border/50"></div>
              </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    className={cn("pl-11 h-11 text-base", fieldErrors.fullName && "border-red-500")}
                    autoComplete="name" // SEO/UX/Security
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    disabled={loading || !!success}
                  />
                </div>
                {fieldErrors.fullName && <p className="text-sm text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{fieldErrors.fullName}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className={cn("pl-11 h-11 text-base", fieldErrors.email && "border-red-500")}
                    autoComplete="email" // SEO/UX/Security
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={loading || !!success}
                  />
                </div>
                {fieldErrors.email && <p className="text-sm text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{fieldErrors.email}</p>}
              </div>

              {/* Password */}
              <div className="space-y-2 relative">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={cn("pl-11 pr-10 h-11 text-base", fieldErrors.password && "border-red-500")}
                    autoComplete="new-password" // SEO/UX/Security
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={() => setPasswordTouched(true)}
                    onBlur={() => setPasswordTouched(false)}
                    required
                    disabled={loading || !!success}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>

                {/* Password Validation (UX/Security) */}
                {(passwordTouched || formData.password.length > 0) && (
                  <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                    <PasswordCheckItem isValid={passwordValidity.length} text="8 characters min" />
                    <PasswordCheckItem isValid={passwordValidity.uppercase} text="1 uppercase letter" />
                    <PasswordCheckItem isValid={passwordValidity.lowercase} text="1 lowercase letter" />
                    <PasswordCheckItem isValid={passwordValidity.number} text="1 number" />
                    <PasswordCheckItem isValid={passwordValidity.specialChar} text="1 special character" />
                  </ul>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2 relative">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={cn("pl-11 pr-10 h-11 text-base", fieldErrors.confirmPassword && "border-red-500")}
                    autoComplete="new-password" // SEO/UX/Security
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    disabled={loading || !!success}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>

                {/* Match Feedback */}
                {fieldErrors.confirmPassword && (
                    <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {fieldErrors.confirmPassword}
                    </p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  className={cn(
                    "h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary transition-colors",
                    fieldErrors.termsAccepted ? "border-red-500" : ""
                  )}
                  required
                  disabled={loading || !!success}
                />
                <Label htmlFor="termsAccepted" className="text-sm text-muted-foreground cursor-pointer select-none">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline font-semibold" target="_blank" rel="noopener noreferrer">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" className="text-primary hover:underline font-semibold" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              {fieldErrors.termsAccepted && <p className="text-sm text-red-600 -mt-2 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{fieldErrors.termsAccepted}</p>}


              {/* Global Feedback Messages */}
              {globalError && (
                <div className="flex items-center gap-3 rounded-lg bg-red-100 dark:bg-red-900/20 p-3 text-sm text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium">{globalError}</span>
                </div>
              )}
              {success && (
                <div className="flex items-center gap-3 rounded-lg bg-green-100 dark:bg-green-900/20 p-3 text-sm text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium">{success}</span>
                </div>
              )}

              {/* Submit Button (CRO/Performance) */}
              <Button size="lg" className="w-full h-11 text-base font-semibold group" type="submit" disabled={loading || !!success}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account Securely
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col items-center justify-center border-t border-border/50 pt-6">
            <p className="text-muted-foreground text-base">
              Already a member?{" "}
              <Link href="/login" className="font-bold text-primary hover:underline transition-colors">
                Log in here
              </Link>
            </p>
          </CardFooter>
        </Card>

        {/* Security Note (Prominent Trust Signal) */}
        <div className="mt-8 p-4 bg-blue-50/70 dark:bg-blue-900/20 border-l-4 border-primary/70 text-gray-700 dark:text-gray-300 rounded-lg shadow-md">
            <p className="font-semibold text-sm flex items-center gap-2 text-primary">
                <Lock className="h-4 w-4 flex-shrink-0" />
                Data Security Commitment
            </p>
            <p className="mt-1 text-xs">
                We use strict encryption and protocols to protect your password. Your information is safe and never shared for commercial purposes.
            </p>
        </div>
      </div>
    </div>
  );
}