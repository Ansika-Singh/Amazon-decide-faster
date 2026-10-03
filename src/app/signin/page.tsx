'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ShieldCheck,
  Zap,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  UserCheck,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  const { login, demoLogin, isAuthenticated, user } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [keepSignedIn, setKeepSignedIn] = React.useState(true);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  // If already authenticated, offer quick continue
  React.useEffect(() => {
    if (isAuthenticated && user) {
      toast({
        title: `Welcome back, ${user.name}!`,
        description: 'You are currently signed in.',
        variant: 'default',
      });
    }
  }, [isAuthenticated, user, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email or mobile phone number.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = login(email, password, keepSignedIn);
      setLoading(false);

      if (res.success) {
        toast({
          title: 'Signed in successfully!',
          description: `Logged in as ${email}`,
          variant: 'success',
        });
        router.push(redirectUrl);
      } else {
        setError(res.error || 'Invalid credentials. Please try again.');
      }
    }, 400);
  };

  const handleDemoSignIn = (role: 'hiring_reviewer' | 'shopper') => {
    demoLogin(role);
    toast({
      title: role === 'hiring_reviewer' ? 'Signed in as Hiring Reviewer!' : 'Signed in as Ansika Singh!',
      description: 'Full account access and order history unlocked.',
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

      {/* Main Sign In Card */}
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl p-7 sm:p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Sign In</h1>
          <p className="text-xs text-slate-500 mt-1">
            Access your orders, saved wishlist, and personalized AI shopping recommendations.
          </p>
        </div>

        {/* 1-Click Hiring Team Fast Pass */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-300/80 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
            <Sparkles className="h-4 w-4 text-amber-600 fill-amber-500 shrink-0" />
            <span>8x Hiring Reviewer Fast Pass</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Evaluating this submission? Click below to instantly log in without typing credentials:
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
            <label className="text-xs font-bold text-slate-700 block">
              Email or mobile phone number
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. hiring@decidefaster.com"
              className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-slate-50/50 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
              autoFocus
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 block">Password</label>
              <span className="text-[11px] text-amber-600 hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (e.g. demo123)"
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
          </div>

          {/* Side Sign-in / Keep me signed in Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer select-none group">
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
              />
              <div className="text-xs leading-snug">
                <span className="font-semibold text-slate-800 group-hover:text-slate-950">
                  Keep me signed in on this device
                </span>
                <span className="block text-[11px] text-slate-400 mt-0.5">
                  Uncheck if using a shared workstation or public computer.
                </span>
              </div>
            </label>
          </div>

          <Button
            type="submit"
            variant="accent"
            size="lg"
            disabled={loading}
            className="w-full text-slate-950 font-bold h-11 rounded-xl shadow-sm text-sm"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>

          <p className="text-[11px] text-slate-500 leading-relaxed text-center pt-2">
            By continuing, you agree to DecideFaster's{' '}
            <span className="text-amber-700 underline cursor-pointer">Conditions of Use</span> and{' '}
            <span className="text-amber-700 underline cursor-pointer">Privacy Notice</span>.
          </p>
        </form>

        {/* Create Account Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 text-slate-400 font-medium">New to DecideFaster?</span>
          </div>
        </div>

        <div>
          <Link
            href={`/signup${redirectUrl !== '/' ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`}
            className="w-full h-11 rounded-xl border border-slate-300 hover:border-slate-400 bg-slate-50 hover:bg-slate-100/80 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
          >
            <span>Create your DecideFaster account</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Footer reassurance */}
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
