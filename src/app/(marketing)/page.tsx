'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Laptop, 
  ShoppingBag, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  Rocket,
  Phone,
  Mail
} from 'lucide-react';
import Testimonials from '@/components/Testimonials';
import FaqSection from '@/components/FaqSection';

const STATS = [
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '100+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '15+', label: 'Design Awards' },
];

const HIGHLIGHTS = [
  {
    icon: Laptop,
    title: 'Business Websites',
    desc: 'High-conversion corporate sites designed to showcase services and establish digital authority.',
  },
  {
    icon: ShoppingBag,
    title: 'eCommerce Stores',
    desc: 'Ultra-fast storefronts with optimized checkout routes, product configurations, and Stripe integrations.',
  },
  {
    icon: Cpu,
    title: 'Web Applications',
    desc: 'SaaS platforms, member portals, and back-office apps engineered with secure databases.',
  },
  {
    icon: Zap,
    title: 'Performance Tuning',
    desc: 'Page speed improvements yielding 90+ Lighthouse scores for higher Google SEO rankings.',
  },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden transition-colors duration-200">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-36 bg-background">
        
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 text-xs font-semibold"
            >
              <Sparkles className="h-3.5 w-3.5" /> Premium Web Development Agency
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05]"
            >
              Professional Websites <br />
              <span className="text-gradient">That Grow Your Business</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-foreground/75 max-w-2xl mx-auto leading-relaxed"
            >
              Custom websites, eCommerce stores, business portals, and web applications built for success. Engineered for speed, accessibility, and high conversion.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-2xl transition-all shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:-translate-y-0.5 group"
              >
                Request a Website
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-foreground bg-card hover:bg-card/80 border border-border rounded-2xl transition-all hover:-translate-y-0.5"
              >
                View Portfolio
              </Link>
            </motion.div>

          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl border border-card-border bg-card/50 backdrop-blur-sm"
          >
            {STATS.map((stat, i) => (
              <div key={i} className="text-center space-y-1">
                <p className="text-3xl sm:text-4xl font-extrabold text-foreground">{stat.value}</p>
                <p className="text-xs sm:text-sm text-foreground/60 font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Core Services/Highlights Section */}
      <section className="py-20 bg-card/20 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              What We <span className="text-emerald-500">Specialize In</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              We design and construct digital products using cutting-edge web technologies, tailored for optimal performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {HIGHLIGHTS.map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl border border-card-border bg-card glass-panel-hover flex flex-col items-start space-y-4"
              >
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-500">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-foreground">{item.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Trust Badges / Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Designed for Performance, <br />
                <span className="text-gradient">Engineered for Success</span>
              </h2>
              <p className="text-base text-foreground/75 leading-relaxed">
                We believe a website should be more than a static catalog. It should serve as a dynamic sales engine, an operational dashboard, and a seamless portal that converts visitors into loyal customers.
              </p>
              
              <div className="space-y-3 pt-2">
                {[
                  'Lightning-fast page loads utilizing Next.js Server Components',
                  'Framer Motion micro-animations for high-end feel',
                  'Clean forms with real-time field validation',
                  'Robust dashboards with clean data export structures',
                ].map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-foreground/90">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Callout Box */}
            <div className="p-8 sm:p-12 rounded-3xl border border-emerald-500/25 bg-emerald-500/5 relative overflow-hidden flex flex-col justify-between h-full">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl" />
              <div className="space-y-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
                  <Rocket className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-extrabold text-foreground">
                  Ready to launch your project?
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Start configuring your custom design features, estimating pricing tiers, and compiling lists of custom features for your request.
                </p>
              </div>
              <div className="pt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-md shadow-emerald-500/15"
                >
                  Configure My Website Proposal
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FaqSection />

      {/* Professional Trust Section */}
      <section className="py-16 bg-card/25 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Why Businesses <span className="text-emerald-500">Trust Aswal Web Studio</span>
            </h2>
            <p className="text-sm text-foreground/70 max-w-xl mx-auto">
              We combine design excellence with robust engineering to deliver clean, scalable solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {[
              { label: 'Fast Delivery', desc: 'Projects in 3-10 days' },
              { label: 'Affordable Pricing', desc: 'Starting at just ₹3,000' },
              { label: 'Mobile Responsive', desc: 'Perfect responsive view' },
              { label: 'SEO Optimized', desc: 'Built for high rankings' },
              { label: 'Premium Support', desc: 'Dedicated dev warranty' },
              { label: 'Custom Development', desc: 'No templates or bloat' },
            ].map((item, index) => (
              <div 
                key={index} 
                className="p-5 bg-card border border-card-border rounded-2xl shadow-sm text-center flex flex-col items-center justify-between space-y-3 hover:border-emerald-500/30 transition-all group"
              >
                <div className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-bold text-foreground leading-tight">{item.label}</p>
                  <p className="text-[10px] text-foreground/50">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Conversion Section */}
      <section className="py-24 bg-background relative border-t border-border overflow-hidden">
        {/* Glow lights */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Ready to Build <span className="text-gradient">Your Website?</span>
          </h2>
          <p className="text-lg text-foreground/75 max-w-xl mx-auto leading-relaxed">
            Get a professional website tailored to your business starting at just ₹3,000. Contact Aswal Web Studio today for a clean, premium proposal.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {/* Call Now */}
            <a
              href="tel:+917304610459"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md hover:-translate-y-0.5 cursor-pointer"
            >
              <Phone className="mr-2 h-4 w-4" />
              Call Now
            </a>
            
            {/* Send Email */}
            <a
              href="mailto:aman9lion@gmail.com"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-md hover:-translate-y-0.5 cursor-pointer"
            >
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </a>

            {/* Request Website */}
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-all shadow-md hover:-translate-y-0.5 group cursor-pointer"
            >
              Request Website
              <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
