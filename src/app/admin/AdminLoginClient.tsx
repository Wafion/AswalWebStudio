'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Terminal, Lock, Mail, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError('Invalid admin credentials. Please try again.');
      } else {
        router.refresh();
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200 flex flex-col justify-center items-center px-4 relative">
      
      {/* Background lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Back button */}
      <div className="absolute top-6 left-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        
        {/* Logo and Header */}
        <div className="text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-xl shadow-primary/20">
            <Terminal className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
            Secure Admin Portal
          </h2>
          <p className="text-sm text-foreground/50">
            AswalWebStudio Lead Tracker
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-card border border-card-border p-8 rounded-3xl shadow-2xl space-y-6">
          
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 text-xs rounded-xl flex items-start gap-2.5 font-medium leading-relaxed">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-bold text-foreground/60 uppercase">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-foreground/45" />
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="admin@aswalwebstudio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:border-primary text-foreground"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-xs font-bold text-foreground/60 uppercase">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-foreground/45" />
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:border-primary text-foreground"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center py-3 px-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl transition-all shadow-md shadow-accent/15 disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>

          </form>

          {/* Credentials Help Box */}
          <div className="p-4 bg-background border border-border rounded-2xl space-y-2.5 text-xs text-foreground/80 font-medium">
            <span className="font-bold text-primary text-[10px] uppercase tracking-wider">Default Dev Credentials:</span>
            <div className="grid grid-cols-2 gap-2 text-foreground/65">
              <div>Email:</div>
              <div className="text-right text-foreground font-semibold">admin@aswalwebstudio.com</div>
              <div>Password:</div>
              <div className="text-right text-foreground font-semibold">admin123</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
