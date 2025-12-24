// app/user-profile/page.tsx
'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import ProtectedPage from '@/components/ProtectedPage';
import { 
  User, 
  Mail, 
  ShieldCheck, 
  LogOut, 
  Calendar, 
  Fingerprint, 
  Settings2, 
  GraduationCap,
  ArrowRight
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

// --- Strategy: High-Quality Content Rendering ---
const InfoRow = ({ icon: Icon, label, value, isSensitive = false }: any) => (
  <div className="flex items-center justify-between group py-2">
    <div className="flex items-center space-x-3">
      <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500">
        <Icon size={18} />
      </div>
      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</span>
    </div>
    <span className={cn(
      "text-sm font-semibold text-slate-900 dark:text-white truncate max-w-[180px]",
      isSensitive && "font-mono text-xs opacity-60"
    )}>
      {value}
    </span>
  </div>
);

import { cn } from "@/lib/utils";

export default function UserProfilePage() {
  const { user, logout } = useAuth(); // Assuming logout is provided by context

  // --- Analytics: Log profile interaction ---
  const handleSignOut = async () => {
    // Analytics.track('user_logout');
    await logout();
  };

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-[#FBFBFE] dark:bg-gray-950 font-sans">
        <div className="container mx-auto py-16 px-4 max-w-5xl">
          
          {/* Header Section: Identity & Breadcrumbs */}
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Account Settings
            </h1>
            <p className="mt-2 text-slate-500 text-lg">
              Manage your identity, security preferences, and academic profile.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Sidebar Column: Identity Card */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-gray-900 overflow-hidden">
                <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-700" />
                <CardContent className="relative pt-0 text-center">
                  <div className="relative -top-12 inline-block">
                    <Avatar className="h-24 w-24 border-4 border-white dark:border-gray-900 shadow-lg">
                      <AvatarImage />
                      <AvatarFallback className="bg-blue-100 text-blue-700 text-2xl font-bold uppercase">
                        {user?.email?.charAt(0) || <User />}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="mt-[-40px] pb-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      {user?.displayName || "Student User"}
                    </h2>
                    <Badge variant="secondary" className="mt-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-none">
                      Active Member
                    </Badge>
                  </div>

                  <Separator />

                  <div className="py-6 space-y-1">
                    <Button variant="ghost" className="w-full justify-between hover:bg-slate-50" asChild>
                      <a href="/resources/saved">
                        <span className="flex items-center gap-2"><GraduationCap size={16}/> My Learning</span>
                        <ArrowRight size={14} />
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-between hover:bg-slate-50 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleSignOut}>
                      <span className="flex items-center gap-2"><LogOut size={16}/> Sign Out</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Column: Detailed Info & Security */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Profile Details Card */}
              <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <User className="text-blue-600" size={20} /> Personal Information
                  </CardTitle>
                  <CardDescription>Primary details associated with your LearnSet account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-1">
                  {!user ? (
                    <div className="space-y-4">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ) : (
                    <>
                      <InfoRow icon={Mail} label="Email Address" value={user.email} />
                      <Separator className="my-2 opacity-50" />
                      <InfoRow icon={Calendar} label="Member Since" value="Dec 2023" />
                      <Separator className="my-2 opacity-50" />
                      <InfoRow 
                        icon={Fingerprint} 
                        label="Account UID" 
                        value={user.uid} 
                        isSensitive 
                      />
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Security & Access Card (Strategic Trust Building) */}
              <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <ShieldCheck className="text-blue-600" size={20} /> Security & Privacy
                  </CardTitle>
                  <CardDescription>Control how your data is managed and secure your account.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                    <h4 className="font-bold text-sm mb-1">Two-Factor Authentication</h4>
                    <p className="text-xs text-slate-500 mb-3">Add an extra layer of security to your account.</p>
                    <Button size="sm" variant="outline" className="h-8 text-xs">Enable 2FA</Button>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                    <h4 className="font-bold text-sm mb-1">Password Management</h4>
                    <p className="text-xs text-slate-500 mb-3">Update your credentials to stay protected.</p>
                    <Button size="sm" variant="outline" className="h-8 text-xs">Update Password</Button>
                  </div>
                </CardContent>
                <CardFooter className="bg-slate-50 dark:bg-slate-800/30 py-3 border-t">
                  <p className="text-[11px] text-slate-500 italic">
                    All personal data is encrypted and managed according to our 
                    <a href="/privacy-policy" className="ml-1 text-blue-600 hover:underline">Privacy Policy</a>.
                  </p>
                </CardFooter>
              </Card>

            </div>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}