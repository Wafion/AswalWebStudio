'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    question: 'How long does it take to build a custom website?',
    answer: 'Standard business and portfolio websites typically take 2-4 weeks. Larger eCommerce stores and complex custom web applications usually take 6-12 weeks, depending on the number of pages and integrations. We always provide a clear project timeline before starting.',
  },
  {
    question: 'What is your website development process?',
    answer: 'Our process has four main stages: 1. Discovery & Design (aligning on layout, style, and structure); 2. Development (writing clean, optimized code on Next.js/Tailwind); 3. Testing & Review (checking responsiveness, links, and speed); 4. Launch & Support (deploying to Vercel and setting up SEO/Analytics).',
  },
  {
    question: 'Do you offer custom integrations like payment gateways and booking systems?',
    answer: 'Yes! We build bespoke integrations including payment processors (Stripe, PayPal), booking engines, user login/authorization, database connections, and custom content management systems (CMS) to suit your business requirements.',
  },
  {
    question: 'Are the websites you build search engine optimized (SEO)?',
    answer: 'Absolutely. Every site we build is engineered from the ground up to follow modern SEO best practices: semantic HTML, fast loading speeds, optimized images, sitemap generation, and schema metadata ready for search engines.',
  },
  {
    question: 'Can I update the website myself once it is finished?',
    answer: 'Yes. We can integrate admin panels or CMS systems (like Sanity, Strapi, or customized dashboards) so you can update blogs, services, and portfolios without writing a line of code. We also provide hands-on walkthrough videos upon project delivery.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-background transition-colors duration-200">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Frequently Asked <span className="text-emerald-500">Questions</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Got questions about working with AswalWebStudio? Here are answers to the most common queries.
          </p>
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-border bg-card/40 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-foreground hover:text-emerald-500 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-foreground/50 transition-transform duration-300 ${
                      isOpen ? 'transform rotate-180 text-emerald-500' : ''
                    }`}
                  />
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-5 pt-0 border-t border-border/50 text-foreground/75 text-sm leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
