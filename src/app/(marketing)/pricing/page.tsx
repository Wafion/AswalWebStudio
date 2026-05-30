'use client';

import React from 'react';
import Link from 'next/link';
import { Check, X, Shield, ArrowRight, Zap, Award, Cpu, Sparkles } from 'lucide-react';

const PLANS = [
  {
    name: 'Starter Website',
    icon: Zap,
    desc: 'Perfect for small businesses, landing campaigns, and portfolios.',
    price: '3,000',
    features: [
      'Up to 5 Pages',
      'Mobile Responsive',
      'Contact Form',
      'Basic SEO',
      'Delivery in 3-5 Days',
    ],
    cta: 'Choose Starter Plan',
    popular: false,
  },
  {
    name: 'Professional Website',
    icon: Award,
    desc: 'Ideal for growing businesses, startups, and advanced blogs.',
    price: '10,000',
    features: [
      'Up to 15 Pages',
      'Premium Design',
      'SEO Optimized',
      'Blog Integration',
      'WhatsApp Integration',
      'Delivery in 5-10 Days',
    ],
    cta: 'Choose Professional Plan',
    popular: true,
  },
  {
    name: 'Business Website',
    icon: Shield,
    desc: 'Complete digital presence with advanced features and speed optimization.',
    price: '25,000',
    features: [
      'Unlimited Pages',
      'Custom Design',
      'Admin Dashboard',
      'Performance Optimization',
      'Advanced SEO',
      'Priority Support',
    ],
    cta: 'Choose Business Plan',
    popular: false,
  },
  {
    name: 'Custom Web Application',
    icon: Cpu,
    desc: 'Bespoke software, portals, and scalable database applications.',
    price: '50,000',
    prefix: 'Starting from ',
    features: [
      'Custom Features',
      'Database Integration',
      'User Authentication',
      'API Integration',
      'Scalable Architecture',
    ],
    cta: 'Request Custom App',
    popular: false,
  },
];

const COMPARISON_ROWS = [
  { feature: 'Page Layouts', starter: 'Up to 5', pro: 'Up to 15', business: 'Unlimited', custom: 'Unlimited' },
  { feature: 'Fully Custom UI Design', starter: 'Basic Template', pro: 'Premium Custom', business: 'Fully Bespoke', custom: 'Bespoke UI' },
  { feature: 'eCommerce Capabilities', starter: false, pro: 'Optional Addon', business: 'Included', custom: 'Bespoke Logic' },
  { feature: 'Payment Gateway Setup', starter: false, pro: 'Optional', business: true, custom: true },
  { feature: 'Admin Dashboard / CMS', starter: false, pro: false, business: 'Included', custom: 'Bespoke Panel' },
  { feature: 'WhatsApp Chat Integration', starter: false, pro: true, business: true, custom: true },
  { feature: 'Secure User Registration', starter: false, pro: false, business: false, custom: true },
  { feature: 'Database Backend', starter: false, pro: false, business: false, custom: 'PostgreSQL / Supabase' },
  { feature: 'SEO Configuration', starter: 'Basic', pro: 'Optimized', business: 'Advanced', custom: 'Advanced' },
  { feature: 'Support Warranty Period', starter: '1 Month', pro: '3 Months', business: '6 Months', custom: '12 Months' },
];

export default function PricingPage() {
  return (
    <div className="py-20 bg-background transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Clear, Honest <span className="text-emerald-500">Pricing Plans</span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Choose a tier that fits your scale. All projects include responsive coding, SEO best practices, and clean source code.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 items-stretch">
          {PLANS.map((plan, index) => {
            const IconComp = plan.icon;
            return (
              <div
                key={index}
                className={`flex flex-col justify-between p-6 sm:p-8 rounded-3xl border relative transition-all duration-300 ${
                  plan.popular
                    ? 'border-emerald-500 bg-card shadow-lg shadow-emerald-500/5 z-10'
                    : 'border-card-border bg-card shadow-sm hover:shadow-md'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-500 text-white text-[10px] font-bold uppercase rounded-full tracking-widest shadow-md">
                    Most Popular
                  </span>
                )}

                <div>
                  {/* Card Icon & Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl">
                      <IconComp className="h-6 w-6" />
                    </div>
                    <span className="font-extrabold text-[11px] text-foreground/50 uppercase tracking-widest">
                      {plan.name.split(' ')[0]}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-lg text-foreground mb-2 leading-snug">{plan.name}</h3>
                  <p className="text-xs text-foreground/75 leading-relaxed mb-6 min-h-[40px]">{plan.desc}</p>

                  {/* Price */}
                  <div className="mb-6 flex flex-col">
                    {plan.prefix && (
                      <span className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-1">
                        {plan.prefix}
                      </span>
                    )}
                    <div className="flex items-baseline">
                      <span className="text-3xl sm:text-4xl font-extrabold text-foreground">₹{plan.price}</span>
                      {!plan.prefix && <span className="text-xs text-foreground/50 font-medium ml-1.5">/ project</span>}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 border-t border-border/40 pt-6">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-foreground/90 leading-tight font-medium">
                        <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Link */}
                <Link
                  href={`/contact?plan=${plan.name}`}
                  className={`w-full inline-flex items-center justify-center py-3.5 px-4 rounded-xl text-xs font-bold transition-all shadow-md group ${
                    plan.popular
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20'
                      : 'bg-background hover:bg-emerald-500 hover:text-white border border-border text-foreground hover:border-emerald-500'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>

              </div>
            );
          })}
        </div>

        {/* Special Graphic Design Combo Package Callout */}
        <div className="relative mt-12 p-8 sm:p-12 rounded-3xl border border-emerald-500 bg-card overflow-hidden shadow-xl shadow-emerald-500/5 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Most popular badge */}
          <span className="absolute top-4 left-4 sm:left-8 px-3.5 py-1 bg-emerald-500 text-white text-[9px] font-extrabold uppercase rounded-full tracking-widest shadow-sm">
            Special Promo Offer
          </span>

          <div className="space-y-4 flex-1 mt-4 md:mt-0 text-left">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl">
                <Sparkles className="h-5 w-5" />
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
                Brochure + Business Card Combo
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
              Equip your brand offline and online! Get professionally designed business cards (front & back layout) and corporate brochures designed together. Unified brand colors, typography, print-ready files.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold text-foreground/90">
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-500" /> Print-Ready Formats (CMYK)
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-500" /> Vector Source Files
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-500" /> Up to 3 Revision Rounds
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-6 bg-background/60 border border-border/40 rounded-2xl min-w-[200px] w-full md:w-auto shadow-sm">
            <span className="text-xs font-semibold text-foreground/45 line-through mb-1">
              Regular Price: ₹4,500
            </span>
            <div className="flex items-baseline mb-4">
              <span className="text-3xl sm:text-4xl font-extrabold text-foreground">₹3,500</span>
              <span className="text-xs text-foreground/50 font-medium ml-1.5">/ project</span>
            </div>
            <span className="text-[10px] bg-red-500/15 text-red-500 border border-red-500/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider mb-4">
              Save ₹1,000 Instantly
            </span>
            <Link
              href="/contact?plan=Brochure%20%2B%20Business%20Card%20Combo"
              className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white transition-all shadow-md shadow-emerald-500/15"
            >
              Get Combo Offer
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 animate-pulse" />
            </Link>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className="mt-16 mb-20 p-8 rounded-3xl border border-card-border bg-card/45 backdrop-blur-sm text-center space-y-6 max-w-4xl mx-auto shadow-sm">
          <h3 className="font-extrabold text-lg text-foreground">India-Friendly Secure Payments</h3>
          <p className="text-xs sm:text-sm text-foreground/75 max-w-xl mx-auto leading-relaxed">
            We accept UPI transfers, bank transfers, and leading digital wallets. Convenient milestone-based payment plans are available for larger applications.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-[10px] font-bold text-foreground/70">
            <span className="px-3.5 py-2 bg-background border border-border rounded-xl shadow-sm text-emerald-500">UPI Transfer</span>
            <span className="px-3.5 py-2 bg-background border border-border rounded-xl shadow-sm text-blue-500">Google Pay</span>
            <span className="px-3.5 py-2 bg-background border border-border rounded-xl shadow-sm text-indigo-500 font-semibold">PhonePe</span>
            <span className="px-3.5 py-2 bg-background border border-border rounded-xl shadow-sm text-sky-500">Paytm</span>
            <span className="px-3.5 py-2 bg-background border border-border rounded-xl shadow-sm text-emerald-600">Razorpay</span>
            <span className="px-3.5 py-2 bg-background border border-border rounded-xl shadow-sm">IMPS / NEFT / RTGS</span>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Compare <span className="text-emerald-500">Plan Features</span>
            </h2>
            <p className="text-sm text-foreground/75 mt-2">
              Compare design limits, database integration, admin backends, and SLAs across tiers.
            </p>
          </div>

          <div className="border border-border rounded-3xl overflow-hidden bg-card/40 backdrop-blur-sm shadow-sm overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm min-w-[700px]">
              <thead>
                <tr className="border-b border-border bg-card/60 text-xs">
                  <th className="p-5 font-bold text-foreground">Plan Feature</th>
                  <th className="p-5 font-bold text-foreground text-center">Starter</th>
                  <th className="p-5 font-bold text-foreground text-center text-emerald-500">Professional</th>
                  <th className="p-5 font-bold text-foreground text-center">Business</th>
                  <th className="p-5 font-bold text-foreground text-center">Custom App</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-xs">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-card/25 transition-colors">
                    <td className="p-5 font-semibold text-foreground">{row.feature}</td>
                    
                    {/* Starter value */}
                    <td className="p-5 text-center text-foreground/80 font-medium">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? <Check className="h-4.5 w-4.5 text-emerald-500 mx-auto" /> : <X className="h-4.5 w-4.5 text-foreground/20 mx-auto" />
                      ) : (
                        row.starter
                      )}
                    </td>

                    {/* Pro value */}
                    <td className="p-5 text-center font-bold text-emerald-500">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? <Check className="h-4.5 w-4.5 text-emerald-500 mx-auto" /> : <X className="h-4.5 w-4.5 text-foreground/20 mx-auto" />
                      ) : (
                        row.pro
                      )}
                    </td>

                    {/* Business value */}
                    <td className="p-5 text-center text-foreground/80 font-medium">
                      {typeof row.business === 'boolean' ? (
                        row.business ? <Check className="h-4.5 w-4.5 text-emerald-500 mx-auto" /> : <X className="h-4.5 w-4.5 text-foreground/20 mx-auto" />
                      ) : (
                        row.business
                      )}
                    </td>

                    {/* Custom App value */}
                    <td className="p-5 text-center text-foreground/80 font-medium">
                      {typeof (row as any).custom === 'boolean' ? (
                        (row as any).custom ? <Check className="h-4.5 w-4.5 text-emerald-500 mx-auto" /> : <X className="h-4.5 w-4.5 text-foreground/20 mx-auto" />
                      ) : (
                        (row as any).custom
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
