'use client';

import React from 'react';
import { Star, Quote, ShieldCheck } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Sarah Jenkins',
    role: 'Founder, CloudScale Inc.',
    content: 'AswalWebStudio built our custom SaaS dashboard and landing page. Not only was the design breath-taking, but our conversion rate jumped by 35% in the first month. Their attention to performance and mobile layouts was impeccable.',
    rating: 5,
    logo: 'SaaS',
  },
  {
    name: 'Michael Chen',
    role: 'Marketing Director, Apex Logistics',
    content: 'We commissioned a full redesign of our enterprise portal. The studio delivered ahead of schedule, translating complex requirements into an intuitive, ultra-fast web portal. Worth every penny of our investment.',
    rating: 5,
    logo: 'Logistics',
  },
  {
    name: 'Elena Rostova',
    role: 'Owner, Aurelia Boutique',
    content: 'Our new WooCommerce shop feels like a premium luxury brand. Customers keep praising how fast the checkout process is. AswalWebStudio provided video manuals, making management a breeze for my team!',
    rating: 5,
    logo: 'eCommerce',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-card/25 border-y border-border transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 text-xs font-semibold">
            <ShieldCheck className="h-3.5 w-3.5" /> Client Success Stories
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Trusted by Growing <span className="text-emerald-500">Businesses</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            See how we help businesses, startups, and individuals build high-performing digital platforms.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-8 rounded-3xl border border-card-border bg-card shadow-sm hover:shadow-md transition-all duration-300 relative group"
            >
              <div className="absolute top-6 right-8 text-foreground/5 group-hover:text-emerald-500/10 transition-colors duration-300">
                <Quote className="h-12 w-12" />
              </div>
              
              <div>
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-foreground/80 text-sm leading-relaxed italic mb-8 relative z-10">
                  "{testimonial.content}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-between pt-6 border-t border-border/50">
                <div>
                  <h4 className="font-bold text-sm text-foreground">{testimonial.name}</h4>
                  <p className="text-xs text-foreground/60">{testimonial.role}</p>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-wider">
                  {testimonial.logo}
                </div>
              </div>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
