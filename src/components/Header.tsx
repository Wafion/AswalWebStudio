'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';
import { Menu, X, Sun, Moon, Terminal, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Web Services' },
  { href: '/design-services', label: 'Design Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="relative h-9 w-9 overflow-hidden rounded-xl group-hover:scale-105 transition-transform duration-200 bg-white border border-slate-200/80 p-0.5 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="AswalWebStudio Logo"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">
            Aswal<span className="text-emerald-500">WebStudio</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-200 py-1 hover:text-emerald-500 ${
                  isActive ? 'text-emerald-500 font-semibold' : 'text-foreground/80'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                     layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-emerald-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Instagram link */}
          <a
            href="https://www.instagram.com/aswalwebstudio/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl border border-border hover:bg-card text-foreground/80 hover:text-foreground transition-all duration-200 cursor-pointer"
            aria-label="Instagram Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
          </a>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-border hover:bg-card text-foreground/80 hover:text-foreground transition-all duration-200 cursor-pointer"
            aria-label="Toggle Theme"
          >
            {!mounted ? (
              <div className="h-5 w-5" />
            ) : theme === 'dark' ? (
              <Sun className="h-5 w-5 text-amber-400" />
            ) : (
              <Moon className="h-5 w-5 text-slate-700" />
            )}
          </button>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/917304610459?text=Hi!%20I'm%20interested%20in%20a%20website%20quote%20from%20Aswal%20Web%20Studio."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-600/15 hover:shadow-emerald-600/25 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-1.5 h-4 w-4">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.574 1.97 14.101.947 11.474.947c-5.443 0-9.866 4.372-9.87 9.802 0 1.772.46 3.473 1.332 4.968L1.9 21.053l5.097-1.346.35-.208zm11.082-7.534c-.29-.145-1.713-.845-1.978-.94-.266-.096-.459-.145-.653.146-.193.29-.749.94-.917 1.132-.168.193-.336.217-.626.072-2.825-1.413-4.67-2.314-6.545-5.528-.168-.29-.018-.45.124-.591.127-.128.29-.336.434-.504.145-.168.193-.29.29-.482.096-.193.048-.361-.024-.505-.072-.145-.653-1.57-.894-2.152-.236-.569-.475-.49-.653-.49-.168-.008-.362-.01-.555-.01-.193 0-.507.072-.772.361-.266.29-1.013.99-1.013 2.413 0 1.422 1.037 2.795 1.182 2.99.145.193 2.039 3.114 4.939 4.368.69.298 1.229.476 1.649.61.693.22 1.324.19 1.823.115.556-.084 1.713-.7 1.954-1.374.24-.674.24-1.253.168-1.374-.072-.121-.266-.193-.556-.338z"/>
            </svg>
            WhatsApp
          </a>

          {/* Contact Button */}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/15 hover:shadow-emerald-500/25 group"
          >
            Contact Us
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile controls (theme + instagram + hamburger) */}
        <div className="flex md:hidden items-center space-x-2">
          {/* Mobile Instagram Link */}
          <a
            href="https://www.instagram.com/aswalwebstudio/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl border border-border bg-card/50 text-foreground/80"
            aria-label="Instagram Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
          </a>

          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-border bg-card/50 text-foreground/80 cursor-pointer"
            aria-label="Toggle Theme"
          >
            {!mounted ? (
              <div className="h-5 w-5" />
            ) : theme === 'dark' ? (
              <Sun className="h-5 w-5 text-amber-400" />
            ) : (
              <Moon className="h-5 w-5 text-slate-700" />
            )}
          </button>

          {/* Hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-border bg-card/50 text-foreground/80 hover:text-foreground"
            aria-label="Open Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg"
          >
            <div className="space-y-1 px-4 py-6">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive ? 'bg-emerald-500/10 text-emerald-500' : 'text-foreground/80 hover:bg-card hover:text-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-border mt-4 px-4 flex flex-col gap-3">
                <a
                  href="https://wa.me/917304610459?text=Hi!%20I'm%20interested%20in%20a%20website%20quote%20from%20Aswal%20Web%20Studio."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center px-4 py-3 text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-md shadow-emerald-600/15"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-5 w-5">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.574 1.97 14.101.947 11.474.947c-5.443 0-9.866 4.372-9.87 9.802 0 1.772.46 3.473 1.332 4.968L1.9 21.053l5.097-1.346.35-.208zm11.082-7.534c-.29-.145-1.713-.845-1.978-.94-.266-.096-.459-.145-.653.146-.193.29-.749.94-.917 1.132-.168.193-.336.217-.626.072-2.825-1.413-4.67-2.314-6.545-5.528-.168-.29-.018-.45.124-.591.127-.128.29-.336.434-.504.145-.168.193-.29.29-.482.096-.193.048-.361-.024-.505-.072-.145-.653-1.57-.894-2.152-.236-.569-.475-.49-.653-.49-.168-.008-.362-.01-.555-.01-.193 0-.507.072-.772.361-.266.29-1.013.99-1.013 2.413 0 1.422 1.037 2.795 1.182 2.99.145.193 2.039 3.114 4.939 4.368.69.298 1.229.476 1.649.61.693.22 1.324.19 1.823.115.556-.084 1.713-.7 1.954-1.374.24-.674.24-1.253.168-1.374-.072-.121-.266-.193-.556-.338z"/>
                  </svg>
                  WhatsApp Chat
                </a>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center px-4 py-3 text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-all shadow-md shadow-emerald-500/15"
                >
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
