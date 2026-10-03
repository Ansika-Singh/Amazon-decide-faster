'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User as UserIcon,
  ChevronDown,
  LogOut,
  Sparkles,
  Package,
  Heart,
  UserCheck,
  ShieldCheck,
  ArrowRight,
  Check,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';

export function AccountMenu() {
  const router = useRouter();
  const { user, isAuthenticated, logout, demoLogin } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const [sideKeepSignedIn, setSideKeepSignedIn] = React.useState(true);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Close when clicking outside
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleDemoLogin = (role: 'hiring_reviewer' | 'shopper') => {
    demoLogin(role);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const firstName = user?.name ? user.name.split(' ')[0] : '';

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-100/80 transition-all text-left select-none group min-h-[44px]"
        aria-label="Account & Lists"
        aria-expanded={isOpen}
      >
        <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-amber-100 flex items-center justify-center text-slate-700 group-hover:text-amber-700 transition-colors shrink-0">
          {isAuthenticated ? (
            <span className="text-xs font-black text-amber-800">
              {firstName.charAt(0).toUpperCase()}
            </span>
          ) : (
            <UserIcon className="h-4 w-4 text-slate-600" />
          )}
        </div>
        <div className="hidden xl:block leading-tight">
          <span className="block text-[11px] text-slate-500 font-medium truncate max-w-[100px]">
            {isAuthenticated ? `Hello, ${firstName}` : 'Hello, Sign in'}
          </span>
          <span className="block text-xs font-bold text-slate-900 flex items-center gap-0.5">
            Account & Lists
            <ChevronDown className="h-3 w-3 text-slate-400 group-hover:text-slate-700 transition-transform" />
          </span>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-88 rounded-2xl bg-white border border-slate-200 shadow-2xl z-50 p-4 space-y-4 animate-in fade-in zoom-in-95 duration-150">
          {isAuthenticated && user ? (
            /* Logged In View */
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200/80">
                <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-slate-950 font-black text-sm shadow-xs shrink-0">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-extrabold text-slate-900 truncate">{user.name}</p>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 shrink-0">
                      {user.role || 'Member'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                </div>
              </div>

              <div className="pt-1 border-t border-slate-100 space-y-1">
                <Link
                  href="/orders"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-950 transition-colors"
                >
                  <Package className="h-4 w-4 text-slate-500" />
                  <span>Your Orders & Timeline</span>
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-950 transition-colors"
                >
                  <Heart className="h-4 w-4 text-rose-500" />
                  <span>Your Saved Wishlist</span>
                </Link>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('hiring_reviewer')}
                  className="text-[11px] font-bold text-amber-700 hover:underline"
                >
                  Switch Account
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg transition-colors"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            /* Logged Out View */
            <div className="space-y-4">
              {/* Primary Sign In Button */}
              <div className="text-center space-y-2">
                <Link
                  href="/signin"
                  onClick={() => setIsOpen(false)}
                  className="w-full h-10 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <span>Sign In</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <p className="text-xs text-slate-500">
                  New customer?{' '}
                  <Link
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="font-bold text-amber-700 hover:text-amber-800 hover:underline"
                  >
                    Start here.
                  </Link>
                </p>
              </div>

              {/* Side Sign-in / Keep me signed in Checkbox */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <label className="flex items-start gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={sideKeepSignedIn}
                    onChange={(e) => setSideKeepSignedIn(e.target.checked)}
                    className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
                  />
                  <div className="text-[11px] leading-snug">
                    <span className="font-semibold text-slate-800 block">
                      Keep me signed in on this device
                    </span>
                    <span className="text-slate-400 block text-[10px]">
                      Saves your cart, orders, & wishlist across tabs.
                    </span>
                  </div>
                </label>
              </div>

              {/* 1-Click Hiring Reviewer Demo Login */}
              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2">
                <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                  <Sparkles className="h-3.5 w-3.5 text-amber-600 fill-amber-500" />
                  <span>Hiring Team 1-Click Access</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Skip typing — test registered account features instantly:
                </p>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('hiring_reviewer')}
                    className="px-2 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
                  >
                    <UserCheck className="h-3 w-3 text-amber-400" />
                    <span>Reviewer</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('shopper')}
                    className="px-2 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-950 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                  >
                    <ShieldCheck className="h-3 w-3" />
                    <span>Ansika</span>
                  </button>
                </div>
              </div>

              {/* Useful Links */}
              <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
                <Link
                  href="/orders"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-slate-950 hover:underline"
                >
                  Your Orders
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-slate-950 hover:underline"
                >
                  Your Wishlist
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
