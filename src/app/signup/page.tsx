'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Zap,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Lock,
  UserCheck,
  AlertCircle,
  Check,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  const { signup, demoLogin, isAuthenticated, user } = useAuth();
  const { toast } = useToast();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [keepSignedIn, setKeepSignedIn] = React.useState(true);
  const [agreeTerms, setAgreeTerms] = React.useState(true);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Passwords must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setError('You must agree to the Terms of Service to create an account.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = signup(name, email, password, keepSignedIn);
      setLoading(false);

      if (res.success) {
        toast({
          title: `Account created for ${name}!`,
          description: 'Welcome to DecideFaster Amazon.',
          variant: 'success',
        });
        router.push(redirectUrl);
      } else {
        setError(res.error || 'Failed to create account.');
      }
    }, 400);
  };

  const handleDemoSignIn = (role: 'hiring_reviewer' | 'shopper') => {
    demoLogin(role);
    toast({
      title: role === 'hiring_reviewer' ? 'Signed in as Hiring Reviewer!' : 'Signed in as Ansika Singh!',
      description: 'Full account privileges unlocked.',
      variant: 'success',
    });
    router.push(redirectUrl);
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-slate-50 via-slate-100/60 to-slate-50">
      {/* Brand Header */}
      <div className="mb-6 text-center">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Zap className="h-6 w-6 text-slate-950 fill-slate-950" />
          </div>
          <div className="text-left">
            <span className="text-2xl font-black tracking-tight text-slate-950 block leading-none">
              Decide<span className="text-amber-500">Faster</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold block mt-0.5">
              Amazon In 30 Seconds
            </span>
          </div>
        </Link>
      </div>

      {/* Main Sign Up Card */}
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl p-7 sm:p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Create Account</h1>
          <p className="text-xs text-slate-500 mt-1">
            Sign up to track purchases, save 90-day price drop alerts, and test registered member checkout.
          </p>
        </div>

        {/* 1-Click Fast Pass */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-300/80 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
            <Sparkles className="h-4 w-4 text-amber-600 fill-amber-500 shrink-0" />
            <span>Instant Hiring Reviewer Pass</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Skip filling forms — click below to immediately test the app as a logged-in user:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoSignIn('hiring_reviewer')}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              <UserCheck className="h-3.5 w-3.5 text-amber-400" />
              <span>Hiring Reviewer</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoSignIn('shopper')}
              className="px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Ansika (Shopper)</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First and last name"
              className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-slate-50/50 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
              autoFocus
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Mobile number or email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. yourname@domain.com"
              className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-slate-50/50 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-slate-300 bg-slate-50/50 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400">Passwords must be at least 6 characters.</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">Re-enter password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-slate-50/50 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
            />
          </div>

          {/* Side Sign-up / Keep me signed in Checkbox */}
          <div className="pt-1 space-y-2">
            <label className="flex items-start gap-2.5 cursor-pointer select-none group">
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
              />
              <div className="text-xs leading-snug">
                <span className="font-semibold text-slate-800 group-hover:text-slate-950">
                  Keep me signed in across sessions
                </span>
                <span className="block text-[11px] text-slate-400 mt-0.5">
                  Saves your session locally so you don't need to re-login.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer select-none group">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
              />
              <span className="text-xs text-slate-600 leading-snug">
                I agree to the <span className="text-amber-700 underline">DecideFaster Terms</span> &{' '}
                <span className="text-amber-700 underline">Privacy Notice</span>.
              </span>
            </label>
          </div>

          <Button
            type="submit"
            variant="accent"
            size="lg"
            disabled={loading}
            className="w-full text-slate-950 font-bold h-11 rounded-xl shadow-sm text-sm"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        {/* Existing user divider */}
        <div className="pt-4 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-600">
            Already have an account?{' '}
            <Link
              href={`/signin${redirectUrl !== '/' ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`}
              className="font-bold text-amber-700 hover:text-amber-800 hover:underline inline-flex items-center gap-1"
            >
              <span>Sign In</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-xs text-slate-400 space-y-1">
        <p className="flex items-center justify-center gap-1.5">
          <Lock className="h-3 w-3 text-emerald-600" />
          <span>Encrypted zero-friction demo authentication with persistent session state.</span>
        </p>
        <p>© {new Date().getFullYear()} DecideFaster Inc. Built for 8x Hiring Assignment.</p>
      </div>
    </div>
  );
}
