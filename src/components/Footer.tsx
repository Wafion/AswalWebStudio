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
                Aswal <span className="text-primary">Web Studio</span>
              </span>
            </Link>
            <p className="text-sm text-foreground/70">
              We design and engineer bespoke web solutions that accelerate business growth and deliver high-impact digital experiences.
            </p>
            <div className="flex flex-col space-y-2.5 pt-2 text-xs text-foreground/80 font-medium">
              <a href="tel:+917304610459" className="flex items-center hover:text-primary transition-colors">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                +91 7304610459
              </a>
              <a href="mailto:aman9lion@gmail.com" className="flex items-center hover:text-primary transition-colors">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                aman9lion@gmail.com
              </a>
              <a href="https://wa.me/917304610459?text=Hi!%20I'm%20interested%20in%20a%20website%20quote%20from%20Aswal%20Web%20Studio." target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary transition-colors text-primary font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 mr-2">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.574 1.97 14.101.947 11.474.947c-5.443 0-9.866 4.372-9.87 9.802 0 1.772.46 3.473 1.332 4.968L1.9 21.053l5.097-1.346.35-.208zm11.082-7.534c-.29-.145-1.713-.845-1.978-.94-.266-.096-.459-.145-.653.146-.193.29-.749.94-.917 1.132-.168.193-.336.217-.626.072-2.825-1.413-4.67-2.314-6.545-5.528-.168-.29-.018-.45.124-.591.127-.128.29-.336.434-.504.145-.168.193-.29.29-.482.096-.193.048-.361-.024-.505-.072-.145-.653-1.57-.894-2.152-.236-.569-.475-.49-.653-.49-.168-.008-.362-.01-.555-.01-.193 0-.507.072-.772.361-.266.29-1.013.99-1.013 2.413 0 1.422 1.037 2.795 1.182 2.99.145.193 2.039 3.114 4.939 4.368.69.298 1.229.476 1.649.61.693.22 1.324.19 1.823.115.556-.084 1.713-.7 1.954-1.374.24-.674.24-1.253.168-1.374-.072-.121-.266-.193-.556-.338z"/>
                </svg>
                WhatsApp Quick Chat
              </a>
              <a href="https://www.instagram.com/aswalwebstudio/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2 text-primary">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                @aswalwebstudio
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Services</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/services" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/design-services" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Brochure Design
                </Link>
              </li>
              <li>
                <Link href="/design-services" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Business Card Design
                </Link>
              </li>
              <li>
                <Link href="/design-services" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Branding Combo Offer
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Agency</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Our Work
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-foreground/70 hover:text-primary transition-colors">
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
                className="w-full px-4 py-2 text-sm border border-border bg-background rounded-xl focus:outline-none focus:border-primary text-foreground"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-xl transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? '...' : <Send className="h-4 w-4" />}
              </button>
            </form>
            {subscribed && (
              <p className="flex items-center text-xs text-success mt-2 font-medium">
                <CheckCircle className="h-3 w-3 mr-1" />
                Thanks for subscribing!
              </p>
            )}
          </div>

        </div>

        <div className="mt-12 border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground/50">
            &copy; {new Date().getFullYear()} Aswal Web Studio. All Rights Reserved.
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
