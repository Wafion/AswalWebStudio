'use client';

import React from 'react';
import { ShieldAlert, Award, Star, Compass, Users, CheckCircle2, MonitorPlay } from 'lucide-react';

const CORE_VALUES = [
  {
    icon: Compass,
    title: 'Client-Centric Mission',
    desc: 'We construct designs geared to solve business problems first. A site must generate leads and scale operations, not just display graphics.',
  },
  {
    icon: Award,
    title: 'Engineering Excellence',
    desc: 'We avoid bloated templates. Every project is coded utilizing modern Next.js servers and vanilla CSS configurations for ultra-fast performance.',
  },
  {
    icon: Star,
    title: 'Absolute Transparency',
    desc: 'No hidden setup fees or surprise hosting surcharges. We provide clear pricing plans, timeline projections, and explicit updates.',
  },
];

const TEAM = [
  {
    name: 'Aman Aswal',
    role: 'Principal Engineer & Founder',
    bio: 'Specialist in full-stack web architectures, Next.js optimization, and secure database schemas with 8+ years experience.',
    tag: 'Founder',
  },
  {
    name: 'Sophia Miller',
    role: 'Lead UI/UX Designer',
    bio: 'Passionate about creating premium digital interfaces, typography, and fluid micro-animations that capture attention.',
    tag: 'Design',
  },
  {
    name: 'Marcus Vance',
    role: 'SEO & Growth Strategist',
    bio: 'Focused on metadata structure, load speed auditing, analytics pipelines, and search engine positioning metrics.',
    tag: 'Marketing',
  },
];

export default function AboutPage() {
  return (
    <div className="py-20 bg-background transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 text-xs font-semibold">
              <Users className="h-3.5 w-3.5" /> Our Story
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-[1.1]">
              We Build Premium Websites That <span className="text-gradient">Accelerate Your Scale</span>
            </h1>
            <p className="text-base text-foreground/75 leading-relaxed">
              At **AswalWebStudio**, we design and construct bespoke digital platforms. Founded with a vision to deliver premium, agency-quality custom web apps at clear pricing tiers, we bridge the gap between creative visual designers and high-speed software engineers.
            </p>
            <p className="text-base text-foreground/75 leading-relaxed">
              We leverage modern web standards like Next.js Server Components, Tailwind CSS, TypeScript, and Supabase to engineer sites that render instantly and convert visitors into clients.
            </p>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl border border-card-border bg-card shadow-sm space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />
            <h3 className="text-xl font-bold text-foreground">Our Core Promise</h3>
            <div className="space-y-4">
              {[
                'We do not use cheap WordPress site builders or templates.',
                '100% hand-crafted clean source code with TypeScript.',
                'Interactive dashboard status tools for client inquiries.',
                'Search engine optimized (SEO) metadata ready out-of-the-box.',
              ].map((promise, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-foreground/80">{promise}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="mb-24">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Our Core <span className="text-emerald-500">Values</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Our culture is built around absolute reliability, clean engineering, and premium craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CORE_VALUES.map((val, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl border border-card-border bg-card flex flex-col items-start space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl">
                  <val.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-foreground">{val.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Meet Our <span className="text-emerald-500">Experts</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              The designers, coders, and search engine strategists driving success at AswalWebStudio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between p-8 rounded-3xl border border-card-border bg-card hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-6 right-6 px-2.5 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded-md uppercase tracking-wider">
                  {member.tag}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-extrabold text-lg text-foreground">{member.name}</h4>
                    <p className="text-xs text-foreground/50 font-semibold">{member.role}</p>
                  </div>
                  <p className="text-sm text-foreground/75 leading-relaxed pt-2">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-6 border-t border-border mt-8 flex items-center space-x-2 text-xs text-foreground/50 font-semibold uppercase tracking-wider">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  Available for Projects
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
