// app/forgot-password/page.tsx
import type { Metadata } from "next";
import ForgotPasswordPage from "@/components/ForgotPasswordPage";

export const metadata: Metadata = {
  // Title: Keep it concise and clear
  title: "Forgot Password | LearnSet Account Recovery",
  
  // Description: Clear instructions for the user
  description: "Securely reset your LearnSet account password. Enter your email address to receive a secure password reset link.",
  
  // Add noindex directive: This is crucial for a secure utility page
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },

  // Add canonical URL (still good practice even with noindex)
  alternates: {
    canonical: 'https://learnset.vercel.app/forgot-password',
  },
};

export default function Page() {
  return (
    <ForgotPasswordPage />
  );
}
