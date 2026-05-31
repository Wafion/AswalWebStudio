'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building, 
  ShoppingBag, 
  User, 
  FileText, 
  Code, 
  RefreshCcw, 
  Wrench, 
  Search, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

const SERVICES = [
  {
    id: 'business',
    icon: Building,
    title: 'Business Websites',
    description: 'Corporate websites crafted to establish trust, demonstrate industry authority, and capture qualified business leads.',
    features: ['Custom design system', 'SEO schema integrations', 'Lead capture forms', 'Content management (CMS)'],
    badge: 'Popular',
  },
  {
    id: 'ecommerce',
    icon: ShoppingBag,
    title: 'eCommerce Stores',
    description: 'Lightning-fast digital storefronts with optimized checkouts, inventory synchronization, and secure payment setups.',
    features: ['Stripe & PayPal setup', 'Inventory management', 'Customer account portal', 'Sales reporting dashboard'],
    badge: 'Growth Engine',
  },
  {
    id: 'portfolio',
    icon: User,
    title: 'Portfolio Websites',
    description: 'Stunning visual portfolios designed for creative studios, designers, architects, and high-end freelancers.',
    features: ['Immersive galleries', 'Case study pages', 'Fluid page transitions', 'Optimized image pipelines'],
  },
  {
    id: 'landing',
    icon: FileText,
    title: 'Landing Pages',
    description: 'Focused single-page campaigns built for pay-per-click ads, product launches, or quick conversions.',
    features: ['A/B testing ready', 'Fast load speeds (<1s)', 'Analytics integration', 'High-impact CTA blocks'],
  },
  {
    id: 'webapp',
    icon: Code,
    title: 'Web Applications',
    description: 'Custom SaaS platforms, dashboard interfaces, booking engines, and database-driven software clients.',
    features: ['TypeScript & Next.js backend', 'Secure NextAuth setup', 'Relational database architecture', 'Interactive APIs'],
    badge: 'Enterprise',
  },
  {
    id: 'redesign',
    icon: RefreshCcw,
    title: 'Website Redesign',
    description: 'Modernize obsolete web layouts, improve core web vitals, and optimize outdated layouts for conversion.',
    features: ['Legacy data migration', 'Modern UX adjustments', 'SEO link preservation', 'Mobile layout overhaul'],
  },
  {
    id: 'maintenance',
    icon: Wrench,
    title: 'Website Maintenance',
    description: 'Ongoing technical support, database backups, module security updates, and performance checkups.',
    features: ['Weekly security patches', 'Daily automated backups', 'Content editing support', 'Uptime monitoring checks'],
  },
  {
    id: 'seo',
    icon: Search,
    title: 'SEO Optimization',
    description: 'Keyword research, metadata structuring, and speed engineering to push your website to page 1 of Google.',
    features: ['Site speed optimization', 'Google Analytics setup', 'XML sitemap creation', 'SEO keyword audits'],
  },
];

export default function ServicesPage() {
  return (
    <div className="py-20 bg-background transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Bespoke <span className="text-primary">Services</span> We Offer
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            From simple landing pages to advanced custom databases, we engineer clean, high-performance web systems tailored to your goals.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="flex flex-col justify-between p-8 rounded-3xl border border-card-border bg-card shadow-sm hover:shadow-lg transition-all duration-300 relative group"
              >
                {service.badge && (
                  <span className="absolute top-6 right-6 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                    {service.badge}
                  </span>
                )}
                
                <div>
                  {/* Icon */}
                  <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform duration-200">
                    <IconComponent className="h-6 w-6" />
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-xl text-foreground mb-3">{service.title}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Feature Bullets */}
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs font-medium text-foreground/80">
                        <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Request Button */}
                <Link
                  href={`/contact?type=${encodeURIComponent(service.title)}`}
                  className="w-full inline-flex items-center justify-center py-3 bg-background hover:bg-primary hover:text-white text-foreground font-semibold rounded-xl border border-border hover:border-primary transition-all text-sm group/btn"
                >
                  Request This Service
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
                
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
