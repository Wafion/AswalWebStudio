'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Terminal, Send, MessageSquare, Phone, Mail, CheckCircle } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulate API call for newsletter subscription
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setSubscribed(true);
    setEmail('');
    
    // Auto reset subscription state after 5 seconds
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="border-t border-border bg-card/30 transition-colors duration-200 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="relative h-7 w-7 overflow-hidden rounded-lg bg-white border border-slate-200 p-0.5 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="AswalWebStudio Logo"
                  width={22}
                  height={22}
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-lg tracking-tight text-foreground">
                Aswal<span className="text-emerald-500">WebStudio</span>
              </span>
            </Link>
            <p className="text-sm text-foreground/70">
              We design and engineer bespoke web solutions that accelerate business growth and deliver high-impact digital experiences.
            </p>
            <div className="flex flex-col space-y-2 pt-2 text-sm text-foreground/80">
              <a href="mailto:hello@aswalwebstudio.com" className="flex items-center hover:text-emerald-500 transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                hello@aswalwebstudio.com
              </a>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-emerald-500 transition-colors text-emerald-500 font-medium">
                <MessageSquare className="h-4 w-4 mr-2" />
                WhatsApp Quick Chat
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Services</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/services" className="text-sm text-foreground/70 hover:text-emerald-500 transition-colors">
                  Business Websites
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-foreground/70 hover:text-emerald-500 transition-colors">
                  eCommerce Stores
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-foreground/70 hover:text-emerald-500 transition-colors">
                  Web Applications
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-foreground/70 hover:text-emerald-500 transition-colors">
                  SEO & Speed Optimization
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Agency</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-foreground/70 hover:text-emerald-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-sm text-foreground/70 hover:text-emerald-500 transition-colors">
                  Our Work
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-foreground/70 hover:text-emerald-500 transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-foreground/70 hover:text-emerald-500 transition-colors">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Subscription */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Stay Updated</h3>
            <p className="text-sm text-foreground/70">
              Subscribe to our newsletter for free guides on scaling your digital business and design insights.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 mt-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 text-sm border border-border bg-background rounded-xl focus:outline-none focus:border-emerald-500 text-foreground"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? '...' : <Send className="h-4 w-4" />}
              </button>
            </form>
            {subscribed && (
              <p className="flex items-center text-xs text-emerald-500 mt-2 font-medium">
                <CheckCircle className="h-3 w-3 mr-1" />
                Thanks for subscribing!
              </p>
            )}
          </div>

        </div>

        <div className="mt-12 border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground/50">
            &copy; {new Date().getFullYear()} AswalWebStudio. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-xs text-foreground/50 hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-foreground/50 hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
