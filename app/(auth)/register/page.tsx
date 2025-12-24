"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserPlus, Eye, EyeOff } from "lucide-react"; // Add icons

// --- Zod Schema for Registration Form with Confirm Password ---
const formSchema = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters long." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  confirmPassword: z.string().min(8, { message: "Please confirm your password." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

const otpSchema = z.object({
  otp: z.string().length(6, { message: "Your OTP must be 6 digits." }),
});

// --- Component ---
export default function RegisterPage() {

  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<z.infer<typeof formSchema> | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "", fullName: "", confirmPassword: "" },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const handleSendOTP = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      setFormData(values);

      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email }),
      });

      if (response.ok) {
        toast.success("An OTP has been sent to your email address.");
        setStep(2);
      } else {
        const data = await response.json();
        toast.error(data.message || "There was an error sending the OTP.");
      }
    });
  };

  const handleRegister = (otpValues: z.infer<typeof otpSchema>) => {
    if (!formData) return;

    startTransition(async () => {
      const finalData = { ...formData, ...otpValues };

      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        router.push('/');
      } else {
        toast.error(data.message);
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-md shadow-2xl border-border/20">

        {/* Step 1: Registration Form */}
        {step === 1 && (
          <>
            <CardHeader className="text-center">
              <UserPlus className="mx-auto h-5 w-5 text-primary" />
              <CardTitle>Create an Account</CardTitle>
              <CardDescription>
                Enter your details to get started. We'll send an OTP to your email.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSendOTP)} className="space-y-4">
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="John Doe" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="you@example.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="password" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                          >
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Sending OTP..." : "Send OTP & Continue"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <>
            <CardHeader>
              <CardTitle>Verify Your Email</CardTitle>
              <CardDescription>
                Enter the 6-digit OTP sent to <strong>{formData?.email}</strong>.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...otpForm}>
                <form onSubmit={otpForm.handleSubmit(handleRegister)} className="space-y-4">
                  <FormField control={otpForm.control} name="otp" render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="123456" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </>
        )}

      </Card>
    </div>
  );
}
