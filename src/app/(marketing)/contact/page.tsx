'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  CheckCircle, 
  Upload, 
  FileText, 
  X, 
  ChevronRight, 
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

const WEBSITE_TYPES = [
  'Business Website',
  'eCommerce Store',
  'Portfolio Website',
  'Landing Page',
  'Web Application',
  'Website Redesign',
  'Website Maintenance',
  'Other',
];

const PAGES_OPTIONS = ['1 - 5 Pages', '6 - 12 Pages', '13 - 25 Pages', '25+ Pages (Custom)'];

const STYLE_OPTIONS = [
  'Minimalist & Elegant',
  'Creative & Vibrant',
  'Corporate & Clean',
  'Dark Mode & Tech-focused',
  'Custom/Unspecified',
];

const BUDGET_OPTIONS = [
  '₹3,000 - ₹10,000 (Starter / Pro)',
  '₹10,000 - ₹25,000 (Business)',
  '₹25,000 - ₹50,000 (Custom Web App)',
  '₹50,000+ (Enterprise / Scale)',
];

const TIMELINE_OPTIONS = [
  'Urgent (Under 2 Weeks)',
  'Standard (2 - 4 Weeks)',
  'Flexible (1 - 2 Months)',
  'Not Sure / Open',
];

const FEATURE_LIST = [
  { id: 'contact', label: 'Contact Form' },
  { id: 'payment', label: 'Payment Gateway (Stripe/PayPal)' },
  { id: 'login', label: 'User Login / Auth Portal' },
  { id: 'booking', label: 'Booking / Scheduling System' },
  { id: 'chat', label: 'Chat System / Support Bot' },
  { id: 'blog', label: 'Blog / Content Section' },
  { id: 'admin', label: 'Admin Dashboard / Editor' },
  { id: 'custom', label: 'Custom Custom Integrations' },
];

function RequestForm() {
  const searchParams = useSearchParams();

  // Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    websiteType: 'Business Website',
    pageCount: '1 - 5 Pages',
    designStyle: 'Minimalist & Elegant',
    budgetRange: '₹3,000 - ₹10,000 (Starter / Pro)',
    deadline: 'Standard (2 - 4 Weeks)',
    description: '',
  });

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; size: number }>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Prefill fields from URL query params
  useEffect(() => {
    const typeParam = searchParams.get('type');
    const planParam = searchParams.get('plan');
    const descParam = searchParams.get('desc');

    if (typeParam) {
      const matchedType = WEBSITE_TYPES.find(t => t.toLowerCase().includes(typeParam.toLowerCase()) || typeParam.toLowerCase().includes(t.toLowerCase()));
      if (matchedType) setFormData(prev => ({ ...prev, websiteType: matchedType }));
    }

    if (planParam) {
      const p = planParam.toLowerCase();
      if (p.includes('starter')) {
        setFormData(prev => ({
          ...prev,
          websiteType: 'Business Website',
          pageCount: '1 - 5 Pages',
          budgetRange: '₹3,000 - ₹10,000 (Starter / Pro)',
        }));
      } else if (p.includes('professional')) {
        setFormData(prev => ({
          ...prev,
          websiteType: 'eCommerce Store',
          pageCount: '6 - 12 Pages',
          budgetRange: '₹3,000 - ₹10,000 (Starter / Pro)',
        }));
      } else if (p.includes('business')) {
        setFormData(prev => ({
          ...prev,
          websiteType: 'Business Website',
          pageCount: '25+ Pages (Custom)',
          budgetRange: '₹10,000 - ₹25,000 (Business)',
        }));
      } else if (p.includes('custom') || p.includes('app')) {
        setFormData(prev => ({
          ...prev,
          websiteType: 'Web Application',
          pageCount: '25+ Pages (Custom)',
          budgetRange: '₹50,000+ (Enterprise / Scale)',
        }));
      }
    }

    if (descParam) {
      setFormData(prev => ({ ...prev, description: decodeURIComponent(descParam) }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(f => f !== featureId) 
        : [...prev, featureId]
    );
  };

  // Drag-and-drop file mock handler
  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files).map(f => ({
        name: f.name,
        size: Math.round(f.size / 1024), // in KB
      }));
      setUploadedFiles(prev => [...prev, ...files]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).map(f => ({
        name: f.name,
        size: Math.round(f.size / 1024),
      }));
      setUploadedFiles(prev => [...prev, ...files]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          features: selectedFeatures,
          files: uploadedFiles,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          companyName: '',
          websiteType: 'Business Website',
          pageCount: '1 - 5 Pages',
          designStyle: 'Minimalist & Elegant',
          budgetRange: '₹3,000 - ₹10,000 (Starter / Pro)',
          deadline: 'Standard (2 - 4 Weeks)',
          description: '',
        });
        setSelectedFeatures([]);
        setUploadedFiles([]);
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card rounded-3xl border border-card-border p-6 sm:p-10 shadow-xl max-w-4xl mx-auto">
      
      {submitStatus === 'success' && (
        <div className="mb-8 p-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl flex items-start gap-4">
          <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-extrabold text-lg">Request Submitted Successfully!</h4>
            <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
              We have received your custom website request. An email confirmation has been sent to you, and our design leads will contact you within 24 hours to schedule a proposal review.
            </p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-8 p-6 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-start gap-4">
          <AlertCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-extrabold text-lg">Submission Error</h4>
            <p className="text-sm text-foreground/80 mt-1">
              There was a problem sending your inquiry. Please check your network connection and try again.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">
        
        {/* Section 1: Personal Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
            1. Contact & Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs font-bold text-foreground/70 uppercase">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-foreground/40" />
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Aman Aswal"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:border-emerald-500 text-foreground"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-bold text-foreground/70 uppercase">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-foreground/40" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. contact@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:border-emerald-500 text-foreground"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="text-xs font-bold text-foreground/70 uppercase">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-foreground/40" />
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="e.g. +1 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:border-emerald-500 text-foreground"
                />
              </div>
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <label htmlFor="companyName" className="text-xs font-bold text-foreground/70 uppercase">Company Name</label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-foreground/40" />
                <input
                  id="companyName"
                  type="text"
                  name="companyName"
                  placeholder="e.g. Acme Corporation"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:border-emerald-500 text-foreground"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Section 2: Project Specifications */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
            2. Project Specifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Website Type */}
            <div className="space-y-2">
              <label htmlFor="websiteType" className="text-xs font-bold text-foreground/70 uppercase">Type of Website *</label>
              <select
                id="websiteType"
                name="websiteType"
                value={formData.websiteType}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:border-emerald-500 text-foreground"
              >
                {WEBSITE_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Page Count */}
            <div className="space-y-2">
              <label htmlFor="pageCount" className="text-xs font-bold text-foreground/70 uppercase">Number of Pages</label>
              <select
                id="pageCount"
                name="pageCount"
                value={formData.pageCount}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:border-emerald-500 text-foreground"
              >
                {PAGES_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Design Style */}
            <div className="space-y-2">
              <label htmlFor="designStyle" className="text-xs font-bold text-foreground/70 uppercase">Preferred Design Style</label>
              <select
                id="designStyle"
                name="designStyle"
                value={formData.designStyle}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:border-emerald-500 text-foreground"
              >
                {STYLE_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Budget Range */}
            <div className="space-y-2">
              <label htmlFor="budgetRange" className="text-xs font-bold text-foreground/70 uppercase">Budget Range</label>
              <select
                id="budgetRange"
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:border-emerald-500 text-foreground"
              >
                {BUDGET_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Project Deadline */}
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="deadline" className="text-xs font-bold text-foreground/70 uppercase">Expected Project Deadline</label>
              <select
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:border-emerald-500 text-foreground"
              >
                {TIMELINE_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Section 3: Features Needed */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
            3. Integrated Features Needed
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {FEATURE_LIST.map(feature => {
              const isChecked = selectedFeatures.includes(feature.id);
              return (
                <button
                  type="button"
                  key={feature.id}
                  onClick={() => handleFeatureToggle(feature.id)}
                  className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col justify-between items-center h-24 ${
                    isChecked
                      ? 'border-emerald-500 bg-emerald-500/5 text-emerald-500 shadow-sm'
                      : 'border-border bg-background hover:bg-card/80 text-foreground/80'
                  }`}
                >
                  <span className="text-xs font-bold leading-tight">{feature.label}</span>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isChecked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-border bg-card'
                    }`}
                  >
                    {isChecked && <Check className="h-2.5 w-2.5" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Project Description */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
            4. Project Description & File Uploads
          </h3>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-xs font-bold text-foreground/70 uppercase">Requirements / Features Description</label>
            <textarea
              id="description"
              name="description"
              rows={5}
              placeholder="Describe your goals, targets, and any custom integrations needed..."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm bg-background border border-border rounded-xl focus:outline-none focus:border-emerald-500 text-foreground resize-y"
            />
          </div>

          {/* File Upload zone */}
          <div className="space-y-4">
            <label className="text-xs font-bold text-foreground/70 uppercase">Supporting Attachments (Logo, Mockups, PDF briefs)</label>
            
            <div
              onDragOver={e => e.preventDefault()}
              onDrop={handleFileDrop}
              className="border-2 border-dashed border-border rounded-2xl p-6 text-center bg-background hover:border-emerald-500 transition-colors duration-200 cursor-pointer relative"
            >
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <Upload className="h-8 w-8 text-foreground/30 mx-auto mb-2" />
              <p className="text-sm font-semibold text-foreground">
                Drag and drop files here, or <span className="text-emerald-500">browse folder</span>
              </p>
              <p className="text-xs text-foreground/50 mt-1">Supports PDF, PNG, JPG, DOCX (Max 10MB per file)</p>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-bold text-foreground/75">Uploaded Files ({uploadedFiles.length})</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {uploadedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-card border border-border rounded-xl flex items-center justify-between text-xs font-medium text-foreground/95"
                    >
                      <span className="flex items-center gap-2 truncate">
                        <FileText className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span className="truncate">{file.name}</span>
                        <span className="text-foreground/45 flex-shrink-0">({file.size} KB)</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(idx)}
                        className="p-1 hover:bg-background rounded-lg text-foreground/40 hover:text-foreground/70"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center py-4 px-6 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all text-base disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? 'Submitting Proposal...' : 'Request My Website'}
            <ChevronRight className="ml-1 h-5 w-5" />
          </button>
        </div>

      </form>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="py-20 bg-background transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Let’s Initiate Your <span className="text-emerald-500">Project Proposal</span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Fill out the form below to share your requirements. We will compile a custom feature proposal and pricing review.
          </p>
        </div>

        {/* Form component within Suspense boundary because it uses useSearchParams */}
        <Suspense fallback={
          <div className="p-10 border border-border rounded-3xl bg-card max-w-4xl mx-auto text-center font-medium">
            Loading project configurator...
          </div>
        }>
          <RequestForm />
        </Suspense>

      </div>
    </div>
  );
}

// Simple Helper component checkmark
function Check({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}
