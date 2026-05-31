'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Zap, Award, Sparkles, BookOpen, CreditCard } from 'lucide-react';

const DESIGN_SERVICES = [
  {
    name: 'Professional Brochure Design',
    icon: BookOpen,
    desc: 'Establish digital and print authority with high-fidelity custom brochures.',
    price: '3,000',
    features: [
      'Custom Layout Design',
      'High-Quality Layout Structure',
      'Brand Colors & Typography Match',
      'Print-Ready Files (CMYK)',
      'PDF Version for Web/Email',
      'Up to 3 Revision Rounds',
    ],
    cta: 'Order Brochure Design',
    popular: false,
  },
  {
    name: 'Brochure + Business Card Combo',
    icon: Sparkles,
    desc: 'Our ultimate branding toolkit. Get brochures and business cards designed together.',
    price: '3,500',
    regularPrice: '4,500',
    savings: '1,000',
    features: [
      'Everything in Brochure Design',
      'Everything in Business Card Design',
      'Unified Visual Brand Theme',
      'Save ₹1,000 instantly',
      'Priority Delivery',
    ],
    cta: 'Get Combo Package',
    popular: true,
  },
  {
    name: 'Professional Business Card Design',
    icon: CreditCard,
    desc: 'Premium front & back business cards designed to make a memorable impression.',
    price: '1,500',
    features: [
      'Front & Back Card Design',
      'Premium Modern Layout',
      'Brand Identity Matching',
      'Print-Ready Vector Files',
      'High-Resolution PDF/PNG Export',
      'Up to 3 Revision Rounds',
    ],
    cta: 'Order Business Card Design',
    popular: false,
  },
];

export default function DesignServicesPage() {
  return (
    <div className="py-20 bg-background transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold"
          >
            <Sparkles className="h-3.5 w-3.5" /> High-End Graphic Design Services
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground"
          >
            Professional <span className="text-primary">Design Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-foreground/70 leading-relaxed"
          >
            Build a strong brand identity with professionally designed brochures and business cards tailored to your business rules.
          </motion.p>
        </div>

        {/* Design Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
          {DESIGN_SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className={`flex flex-col justify-between p-8 rounded-3xl border relative transition-all duration-300 ${
                  service.popular
                    ? 'border-accent bg-card shadow-lg shadow-accent/5 md:-translate-y-4 z-10'
                    : 'border-card-border bg-card shadow-sm hover:shadow-md'
                }`}
              >
                {service.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-[10px] font-bold uppercase rounded-full tracking-widest shadow-md">
                    Most Popular Combo
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-2xl ${service.popular ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    {service.savings && (
                      <span className="text-[10px] bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        Save ₹{service.savings}
                      </span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-xl text-foreground mb-2">{service.name}</h3>
                  <p className="text-xs text-foreground/70 leading-relaxed mb-6 min-h-[40px]">{service.desc}</p>

                  <div className="mb-6 flex flex-col">
                    {service.regularPrice && (
                      <span className="text-xs font-semibold text-foreground/40 line-through mb-0.5">
                        Regular Price: ₹{service.regularPrice}
                      </span>
                    )}
                    <div className="flex items-baseline">
                      <span className="text-3xl sm:text-4xl font-extrabold text-foreground">₹{service.price}</span>
                      <span className="text-xs text-foreground/50 font-medium ml-1.5">/ project</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 border-t border-border/40 pt-6">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-foreground/90 leading-tight font-medium">
                        <Check className="h-4 w-4 text-success flex-shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/contact?plan=${encodeURIComponent(service.name)}`}
                  className={`w-full inline-flex items-center justify-center py-3.5 px-4 rounded-xl text-xs font-bold transition-all shadow-md group ${
                    service.popular
                      ? 'bg-accent hover:bg-accent-hover text-white shadow-accent/20'
                      : 'bg-background hover:bg-primary hover:text-white border border-border text-foreground hover:border-primary'
                  }`}
                >
                  {service.cta}
                  <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Branding Info Callout */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl border border-card-border bg-card/50 text-center space-y-6 max-w-4xl mx-auto shadow-sm">
          <h2 className="text-2xl font-extrabold text-foreground tracking-tight">Launch Your Business Online & Offline</h2>
          <p className="text-sm text-foreground/75 leading-relaxed max-w-2xl mx-auto">
            Combining high-speed Next.js websites with unified business card and brochure branding guarantees that your agency looks premium across every point of client contact.
          </p>
          <div className="pt-4">
            <Link
              href="/contact?plan=Website%20%2B%20Design%20Package"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl transition-all shadow-md shadow-accent/15"
            >
              Configure Website + Design Bundle
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
