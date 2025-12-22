"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { z, ZodError } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";

// --- Form Schema and State ---

const registerSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FieldErrors = Record<keyof z.infer<typeof registerSchema>, string | undefined>;

interface RegisterState {
  fieldErrors: FieldErrors;
  errorMessage: string;
  loading: boolean;
}

// --- Component ---

export default function RegisterPage() {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState<RegisterState>({
    fieldErrors: {
      fullName: undefined,
      email: undefined,
      password: undefined,
      confirmPassword: undefined
    },
    errorMessage: "",
    loading: false,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = Object.fromEntries(formData);

    startTransition(async () => {
      try {
        const validationResult = registerSchema.safeParse(body);

        if (!validationResult.success) {
          const errors: FieldErrors = {
            fullName: undefined,
            email: undefined,
            password: undefined,
            confirmPassword: undefined
          };
          validationResult.error.issues.forEach(err => {
            const field = err.path[0] as keyof FieldErrors;
            errors[field] = err.message;
          });
          setState(prevState => ({ ...prevState, fieldErrors: errors }));
          return;
        }

        setState(prevState => ({ ...prevState, loading: true, errorMessage: "" }));

        const response = await fetch('/api/register', { 
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body) 
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Registration failed');
        }

        toast.success("Registration successful! Please check your email for verification.");

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
        toast.error(errorMessage);
        setState(prevState => ({ ...prevState, errorMessage }));
      } finally {
        setState(prevState => ({ ...prevState, loading: false }));
      }
    });
  };

  const passwordInputType = useMemo(() => (showPassword ? 'text' : 'password'), [showPassword]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-md shadow-2xl border-border/40">
        <CardHeader className="text-center">
          <UserPlus className="mx-auto h-10 w-10 text-primary" />
          <CardTitle className="text-3xl font-bold">Create an Account</CardTitle>
          <CardDescription className="text-muted-foreground">
            Join our community to access exclusive content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {state.errorMessage && (
              <p className="text-red-500 text-center font-medium">{state.errorMessage}</p>
            )}

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" name="fullName" placeholder="John Doe" required disabled={isPending} />
              {state.fieldErrors.fullName && <p className="text-red-500 text-sm">{state.fieldErrors.fullName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="msbte@learnset.in" required disabled={isPending} />
              {state.fieldErrors.email && <p className="text-red-500 text-sm">{state.fieldErrors.email}</p>}
            </div>

            <div className="relative space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type={passwordInputType} placeholder="********" required disabled={isPending} />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-8 h-7 w-7"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              {state.fieldErrors.password && <p className="text-red-500 text-sm">{state.fieldErrors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" name="confirmPassword" type={passwordInputType} placeholder="********" required disabled={isPending} />
              {state.fieldErrors.confirmPassword && <p className="text-red-500 text-sm">{state.fieldErrors.confirmPassword}</p>}
            </div>

            <Button type="submit" className="w-full font-semibold" disabled={isPending || state.loading}>
              {state.loading ? "Creating Account..." : "Register"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Log in here
            </Link>
          </p>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Go to Login
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
