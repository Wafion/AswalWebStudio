'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Tag, ShieldCheck, Cpu } from 'lucide-react';

const CATEGORIES = ['All', 'Websites', 'Brochure Designs', 'Business Card Designs'];

const PROJECTS = [
  {
    title: 'Nova SaaS Analytics Dashboard',
    category: 'Websites',
    description: 'A futuristic analytics platform that collects, processes, and displays real-time user engagement data for digital products.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Recharts'],
    image: '/saas_dashboard.png',
    demoUrl: '#',
  },
  {
    title: 'Maison Étoile E-commerce Store',
    category: 'Websites',
    description: 'A boutique luxury fashion digital storefront featuring highly optimized search paths, seamless checkout, and admin stock management.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Supabase'],
    image: '/ecommerce_shop.png',
    demoUrl: '#',
  },
  {
    title: 'GlobeTrek Travel Planner',
    category: 'Websites',
    description: 'An interactive travel booking portal and trip planner integrated with map visualizations, route outlines, and flight booking updates.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Leaflet Maps', 'PostgreSQL'],
    image: '/booking_portal.png',
    demoUrl: '#',
  },
  {
    title: 'Aerospace Tech Corporate Brochure',
    category: 'Brochure Designs',
    description: 'A modern, high-tech corporate brochure designed for a next-generation aerospace parts manufacturer.',
    technologies: ['Graphic Design', 'Adobe Illustrator', 'Brand Identity', 'Print Layout', 'CMYK Print-Ready'],
    image: '/brochure_mockup_1.png',
    demoUrl: '#',
  },
  {
    title: 'Solas Green Energy Booklet',
    category: 'Brochure Designs',
    description: 'An elegant 8-page promotional business brochure outlining clean energy initiatives and solar hardware catalogs.',
    technologies: ['Graphic Design', 'Adobe InDesign', 'Typography', 'Color Theory', 'PDF Booklet'],
    image: '/brochure_mockup_2.png',
    demoUrl: '#',
  },
  {
    title: 'Minimalist Matte Executive Card',
    category: 'Business Card Designs',
    description: 'Ultra-clean front & back executive business card design using elegant fonts and generous white space.',
    technologies: ['Graphic Design', 'Vector Illustration', 'Corporate Identity', 'Print Specifications'],
    image: '/business_card_mockup_1.png',
    demoUrl: '#',
  },
  {
    title: 'Apex Venture Capital Premium Card',
    category: 'Business Card Designs',
    description: 'Sleek dark-themed business card with gold foil accent mockups, tailored for a premium venture firm.',
    technologies: ['Graphic Design', 'Foil Stamping Layout', 'Adobe Illustrator', 'Premium Print-Ready'],
    image: '/business_card_mockup_2.png',
    demoUrl: '#',
  },
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(project => project.category === selectedCategory);

  return (
    <div className="py-20 bg-background transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Our Featured <span className="text-primary">Portfolio</span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Explore a curated selection of our premium custom designs, fast eCommerce portals, and complex SaaS applications.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === category
                  ? 'bg-primary text-white shadow-md shadow-primary/15'
                  : 'bg-card border border-border text-foreground/80 hover:text-foreground hover:bg-card/85'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                key={project.title}
                className="flex flex-col rounded-3xl border border-card-border bg-card overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group"
              >
                
                {/* Image block */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900 border-b border-border">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-w-7xl) 100vw, 50vw"
                    priority={idx === 0}
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <a
                      href={project.demoUrl}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg shadow hover:bg-primary-hover transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> Launch Live Demo
                    </a>
                  </div>
                </div>

                {/* Content block */}
                <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                      <Tag className="h-3.5 w-3.5" />
                      {project.category}
                    </div>
                    
                    <h3 className="font-extrabold text-2xl text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-sm text-foreground/75 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack tags */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map(tech => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 bg-navy-500/5 dark:bg-navy-500/10 text-foreground/80 border border-border text-[11px] font-semibold rounded-lg"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs text-foreground/50 font-medium">
                        <ShieldCheck className="h-4 w-4 text-success" /> Fully Responsive
                      </span>
                      <a
                        href={project.demoUrl}
                        className="text-sm font-bold text-primary hover:text-primary-hover flex items-center gap-1 group/link"
                      >
                        Live Demo
                        <ExternalLink className="h-4 w-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>

                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}
