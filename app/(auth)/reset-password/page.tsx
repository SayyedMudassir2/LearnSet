'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    setToken(token);
    setEmail(email);

    if (!token || !email) {
        setError("Invalid or expired password reset link.");
    }
  }, [searchParams]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!token || !email) {
        setError("Missing token or email. Please use the link from your email again.");
        return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.message || 'An unexpected error occurred.');
      }
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset Your Password</CardTitle>
          <CardDescription>
            Enter your new password below.
          </CardDescription>
        </CardHeader>

        <CardContent>
            {!message ? (
                <form onSubmit={handleResetPassword} className="space-y-4">
                    <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading || !token}
                    />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={loading || !token}
                    />
                    </div>

                    {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <Button type="submit" className="w-full" disabled={loading || !token}>
                    {loading ? 'Resetting...' : 'Reset Password'}
                    </Button>
                </form>
            ) : (
                <div className="text-center space-y-4">
                    <p className="text-green-500">{message}</p>
                    <Link href="/login">
                        <Button className="w-full">Back to Login</Button>
                    </Link>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
