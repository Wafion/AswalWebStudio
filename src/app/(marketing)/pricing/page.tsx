'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, X, Shield, ArrowRight, Zap, Award } from 'lucide-react';

const PLANS = [
  {
    name: 'Starter',
    icon: Zap,
    desc: 'Perfect for small businesses, landing campaigns, and portfolios.',
    priceMonthly: 1200,
    priceYearly: 960, // 20% discount
    features: [
      'Custom Design (Up to 5 Pages)',
      '100% Responsive Layout',
      'SEO Friendly Setup',
      'Contact Form & Map Integration',
      'Vercel Fast Deployment',
      '1 Month Post-Launch Support',
    ],
    cta: 'Choose Starter Plan',
    popular: false,
  },
  {
    name: 'Professional',
    icon: Award,
    desc: 'Ideal for growing businesses, startups, and advanced blogs.',
    priceMonthly: 2800,
    priceYearly: 2240,
    features: [
      'Custom Design (Up to 12 Pages)',
      'eCommerce Setup (Up to 100 products)',
      'Stripe & PayPal Integration',
      'Custom Admin Dashboard / CMS',
      'Lead Automation (CRM sync)',
      'Advanced Speed Auditing',
      '3 Months Post-Launch Support',
    ],
    cta: 'Choose Professional Plan',
    popular: true,
  },
  {
    name: 'Enterprise',
    icon: Shield,
    desc: 'Bespoke software, portals, and custom SaaS platforms.',
    priceMonthly: 5500,
    priceYearly: 4400,
    features: [
      'Unlimited Dynamic Pages',
      'Advanced Custom Web Application',
      'Database Integrations (PostgreSQL)',
      'Secure User Authorization (NextAuth)',
      'API Hookups & Backend Routers',
      'Full Security & Penetration Testing',
      '12 Months Priority Support & SLA',
    ],
    cta: 'Choose Enterprise Plan',
    popular: false,
  },
];

const COMPARISON_ROWS = [
  { feature: 'Page Layouts', starter: 'Up to 5', pro: 'Up to 12', enterprise: 'Unlimited' },
  { feature: 'Fully Custom UI Design', starter: true, pro: true, enterprise: true },
  { feature: 'eCommerce Capabilities', starter: false, pro: true, enterprise: true },
  { feature: 'Payment Gateway Setup', starter: false, pro: true, enterprise: true },
  { feature: 'Admin Dashboard / CMS', starter: false, pro: 'Standard', enterprise: 'Full Custom' },
  { feature: 'Secure User Registration', starter: false, pro: false, enterprise: true },
  { feature: 'Database Backend Integrations', starter: false, pro: 'Firebase/JSON', enterprise: 'Postgres/Supabase' },
  { feature: 'Page Speed Tuning (90+)', starter: true, pro: true, enterprise: true },
  { feature: 'SEO Best Practices Setup', starter: true, pro: true, enterprise: true },
  { feature: 'Support Warranty Period', starter: '1 Month', pro: '3 Months', enterprise: '12 Months' },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="py-20 bg-background transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Clear, Honest <span className="text-emerald-500">Pricing Tiers</span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Choose a tier that fits your scale. All projects include responsive coding, SEO metadata setup, and Vercel optimization support.
          </p>

          {/* Billing Cycle Switch */}
          <div className="flex items-center justify-center gap-3 pt-6">
            <span className={`text-sm font-semibold ${billingCycle === 'monthly' ? 'text-foreground' : 'text-foreground/50'}`}>
              Billed Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="w-12 h-6 rounded-full bg-border hover:bg-border/90 relative p-1 transition-colors duration-200 cursor-pointer"
              aria-label="Switch Billing Cycle"
            >
              <div
                className={`w-4 h-4 rounded-full bg-emerald-500 transition-transform duration-200 ${
                  billingCycle === 'yearly' ? 'transform translate-x-6' : ''
                }`}
              />
            </button>
            <span className={`text-sm font-semibold flex items-center gap-1.5 ${billingCycle === 'yearly' ? 'text-emerald-500' : 'text-foreground/50'}`}>
              Billed Annually <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase rounded-md">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 items-stretch">
          {PLANS.map((plan, index) => {
            const IconComp = plan.icon;
            const price = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;
            return (
              <div
                key={index}
                className={`flex flex-col justify-between p-8 rounded-3xl border relative transition-all duration-300 ${
                  plan.popular
                    ? 'border-emerald-500 bg-card shadow-lg shadow-emerald-500/5 lg:scale-103 z-10'
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
                    <span className="font-extrabold text-lg text-foreground/50 uppercase tracking-widest text-[11px]">
                      {plan.name}
                    </span>
                  </div>

                  <p className="text-sm text-foreground/75 leading-relaxed mb-6">{plan.desc}</p>

                  {/* Price */}
                  <div className="mb-8 flex items-baseline">
                    <span className="text-4xl sm:text-5xl font-extrabold text-foreground">${price}</span>
                    <span className="text-sm text-foreground/50 font-medium ml-2">/ month</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3.5 mb-8">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-foreground/95 leading-tight font-medium">
                        <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Link */}
                <Link
                  href={`/contact?plan=${plan.name}&cycle=${billingCycle}`}
                  className={`w-full inline-flex items-center justify-center py-4 px-6 rounded-2xl text-sm font-bold transition-all shadow-md group ${
                    plan.popular
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20'
                      : 'bg-background hover:bg-emerald-500 hover:text-white border border-border text-foreground hover:border-emerald-500'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>

              </div>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Compare <span className="text-emerald-500">Plan Features</span>
            </h2>
            <p className="text-sm text-foreground/75 mt-2">
              Compare design limits, database support, payment capabilities, and monitoring plans across tiers.
            </p>
          </div>

          <div className="border border-border rounded-3xl overflow-hidden bg-card/40 backdrop-blur-sm shadow-sm overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-border bg-card/60">
                  <th className="p-5 font-bold text-foreground">Plan Feature</th>
                  <th className="p-5 font-bold text-foreground text-center">Starter</th>
                  <th className="p-5 font-bold text-foreground text-center text-emerald-500">Professional</th>
                  <th className="p-5 font-bold text-foreground text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
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

                    {/* Enterprise value */}
                    <td className="p-5 text-center text-foreground/80 font-medium">
                      {typeof row.enterprise === 'boolean' ? (
                        row.enterprise ? <Check className="h-4.5 w-4.5 text-emerald-500 mx-auto" /> : <X className="h-4.5 w-4.5 text-foreground/20 mx-auto" />
                      ) : (
                        row.enterprise
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
