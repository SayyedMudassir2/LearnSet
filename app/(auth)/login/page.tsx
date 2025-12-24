'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import AuthLoaderPage from '@/components/auth/AuthLoaderPage';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingForm, setLoadingForm] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user) router.push('/');
  }, [user, router]);

  const validateFields = () => {
    const errors: typeof fieldErrors = {};
    if (!email) errors.email = 'Email is required';
    if (!password) errors.password = 'Password is required';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateFields()) return;

    setLoadingForm(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoadingForm(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed');
    }
  };

  const handleGitHubSignIn = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, new GithubAuthProvider());
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'GitHub sign-in failed');
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  if (loading) return <AuthLoaderPage />;
  if (user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Log In to Your Account</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loadingForm}
                  className={cn(
                    'pl-10',
                    fieldErrors.email && 'border-red-500 focus-visible:ring-red-500'
                  )}
                />
              </div>
              {fieldErrors.email && (
                <p className="text-sm text-red-500">{fieldErrors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loadingForm}
                  className={cn(
                    'pl-10 pr-20',
                    fieldErrors.password && 'border-red-500 focus-visible:ring-red-500'
                  )}
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground hover:text-primary"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {fieldErrors.password && (
                <p className="text-sm text-red-500">{fieldErrors.password}</p>
              )}
            </div>

            {/* Global Error */}
            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" className="w-full" disabled={loadingForm}>
              {loadingForm ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={handleGoogleSignIn}>
              <FaGoogle className="mr-2" /> Google
            </Button>
            <Button variant="outline" onClick={handleGitHubSignIn}>
              <FaGithub className="mr-2" /> GitHub
            </Button>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/register"
              className="text-sm text-muted-foreground hover:underline"
            >
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;
