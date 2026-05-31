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
  'Professional Brochure Design',
  'Professional Business Card Design',
  'Brochure + Business Card Combo',
  'Website + Design Package',
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
  '₹1,500 (Professional Business Card Design)',
  '₹3,000 (Professional Business Brochure Design)',
  '₹3,500 (Brochure + Business Card Combo)',
  '₹3,000 - ₹10,000 (Starter / Pro Website)',
  '₹10,000 - ₹25,000 (Business Website)',
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
    budgetRange: '₹3,000 - ₹10,000 (Starter / Pro Website)',
    deadline: 'Standard (2 - 4 Weeks)',
    description: '',
    brandColors: '',
    logoStatus: 'Will Upload Logo',
    designPreferences: '',
    designNotes: '',
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
          budgetRange: '₹3,000 - ₹10,000 (Starter / Pro Website)',
        }));
      } else if (p.includes('professional website')) {
        setFormData(prev => ({
          ...prev,
          websiteType: 'Business Website',
          pageCount: '6 - 12 Pages',
          budgetRange: '₹10,000 - ₹25,000 (Business Website)',
        }));
      } else if (p.includes('business website')) {
        setFormData(prev => ({
          ...prev,
          websiteType: 'Business Website',
          pageCount: '25+ Pages (Custom)',
          budgetRange: '₹10,000 - ₹25,000 (Business Website)',
        }));
      } else if (p.includes('custom') || p.includes('app')) {
        setFormData(prev => ({
          ...prev,
          websiteType: 'Web Application',
          pageCount: '25+ Pages (Custom)',
          budgetRange: '₹50,000+ (Enterprise / Scale)',
        }));
      } else if (p.includes('brochure') && p.includes('card')) {
        setFormData(prev => ({
          ...prev,
          websiteType: 'Brochure + Business Card Combo',
          budgetRange: '₹3,500 (Brochure + Business Card Combo)',
        }));
      } else if (p.includes('brochure')) {
        setFormData(prev => ({
          ...prev,
          websiteType: 'Professional Brochure Design',
          budgetRange: '₹3,000 (Professional Business Brochure Design)',
        }));
      } else if (p.includes('card')) {
        setFormData(prev => ({
          ...prev,
          websiteType: 'Professional Business Card Design',
          budgetRange: '₹1,500 (Professional Business Card Design)',
        }));
      } else if (p.includes('bundle') || p.includes('package')) {
        setFormData(prev => ({
          ...prev,
          websiteType: 'Website + Design Package',
          budgetRange: '₹3,000 - ₹10,000 (Starter / Pro Website)',
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
          budgetRange: '₹3,000 - ₹10,000 (Starter / Pro Website)',
          deadline: 'Standard (2 - 4 Weeks)',
          description: '',
          brandColors: '',
          logoStatus: 'Will Upload Logo',
          designPreferences: '',
          designNotes: '',
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

  const isGraphicDesignSelected = 
    formData.websiteType.includes('Brochure') || 
    formData.websiteType.includes('Card') || 
    formData.websiteType.includes('Design') || 
    formData.websiteType.includes('Combo') ||
    formData.websiteType === 'Website + Design Package';

  return (
    <div className="bg-card rounded-3xl border border-card-border p-6 sm:p-10 shadow-xl max-w-4xl mx-auto">
      
      {submitStatus === 'success' && (
        <div className="mb-8 p-6 bg-success/10 border border-success/20 text-success rounded-2xl flex items-start gap-4">
          <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-extrabold text-lg">Request Submitted Successfully!</h4>
            <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
              We have received your custom proposal request. An email confirmation has been sent to you, and our design leads will contact you within 24 hours to schedule a proposal review.
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
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:border-primary text-foreground"
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
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:border-primary text-foreground"
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
                  placeholder="e.g. +91 7304610459"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:border-primary text-foreground"
                />
              </div>
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <label htmlFor="companyName" className="text-xs font-bold text-foreground/70 uppercase">Company / Brand Name</label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-foreground/40" />
                <input
                  id="companyName"
                  type="text"
                  name="companyName"
                  placeholder="e.g. Acme Corporation"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:border-primary text-foreground"
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
              <label htmlFor="websiteType" className="text-xs font-bold text-foreground/70 uppercase">Service Required *</label>
              <select
                id="websiteType"
                name="websiteType"
                value={formData.websiteType}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:border-primary text-foreground"
              >
                {WEBSITE_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
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
                className="w-full px-4 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:border-primary text-foreground"
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
                className="w-full px-4 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:border-primary text-foreground"
              >
                {TIMELINE_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Conditionally show Website Specs */}
            {!isGraphicDesignSelected && (
              <>
                {/* Page Count */}
                <div className="space-y-2">
                  <label htmlFor="pageCount" className="text-xs font-bold text-foreground/70 uppercase">Number of Pages</label>
                  <select
                    id="pageCount"
                    name="pageCount"
                    value={formData.pageCount}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:border-primary text-foreground"
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
                    className="w-full px-4 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:border-primary text-foreground"
                  >
                    {STYLE_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

          </div>
        </div>

        {/* Section 3: Integrated Features or Graphic Design Questionnaire */}
        {isGraphicDesignSelected ? (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
              3. Graphic Design Questionnaire
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Brand Colors */}
              <div className="space-y-2">
                <label htmlFor="brandColors" className="text-xs font-bold text-foreground/70 uppercase">
                  Brand Colors & Theme *
                </label>
                <input
                  id="brandColors"
                  type="text"
                  name="brandColors"
                  required={isGraphicDesignSelected}
                  placeholder="e.g. Royal Blue (#2563EB) and orange, white accents"
                  value={formData.brandColors}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:border-primary text-foreground"
                />
              </div>

              {/* Logo Status */}
              <div className="space-y-2">
                <label htmlFor="logoStatus" className="text-xs font-bold text-foreground/70 uppercase">
                  Logo Requirements *
                </label>
                <select
                  id="logoStatus"
                  name="logoStatus"
                  value={formData.logoStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:border-primary text-foreground"
                >
                  <option value="Will Upload Logo">I have a logo (will upload below)</option>
                  <option value="Need Logo Design">I need a new logo designed (₹1,500 add-on)</option>
                  <option value="Text Only">No logo, text only is fine</option>
                </select>
              </div>

              {/* Design Preferences */}
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="designPreferences" className="text-xs font-bold text-foreground/70 uppercase">
                  Design Preferences / Style *
                </label>
                <input
                  id="designPreferences"
                  type="text"
                  name="designPreferences"
                  required={isGraphicDesignSelected}
                  placeholder="e.g. Modern, minimalist, corporate, dark background, premium feel"
                  value={formData.designPreferences}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:border-primary text-foreground"
                />
              </div>

              {/* Design Notes */}
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="designNotes" className="text-xs font-bold text-foreground/70 uppercase">
                  Design Text Content & Copy *
                </label>
                <textarea
                  id="designNotes"
                  name="designNotes"
                  rows={4}
                  required={isGraphicDesignSelected}
                  placeholder="For Business Card: Name, Title, Email, Phone, Address. For Brochure: Outline of sections, headings, service descriptions, and any copy to include."
                  value={formData.designNotes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm bg-background border border-border rounded-xl focus:outline-none focus:border-primary text-foreground resize-y"
                />
              </div>
            </div>
          </div>
        ) : (
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
                        ? 'border-primary bg-primary/5 text-primary shadow-sm'
                        : 'border-border bg-background hover:bg-card/80 text-foreground/80'
                    }`}
                  >
                    <span className="text-xs font-bold leading-tight">{feature.label}</span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isChecked ? 'bg-primary border-primary text-white' : 'border-border bg-card'
                      }`}
                    >
                      {isChecked && <Check className="h-2.5 w-2.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

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
              className="w-full px-4 py-3 text-sm bg-background border border-border rounded-xl focus:outline-none focus:border-primary text-foreground resize-y"
            />
          </div>

          {/* File Upload zone */}
          <div className="space-y-4">
            <label className="text-xs font-bold text-foreground/70 uppercase">Supporting Attachments (Logo, Mockups, PDF briefs)</label>
            
            <div
              onDragOver={e => e.preventDefault()}
              onDrop={handleFileDrop}
              className="border-2 border-dashed border-border rounded-2xl p-6 text-center bg-background hover:border-primary transition-colors duration-200 cursor-pointer relative"
            >
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <Upload className="h-8 w-8 text-foreground/30 mx-auto mb-2" />
              <p className="text-sm font-semibold text-foreground">
                Drag and drop files here, or <span className="text-primary">browse folder</span>
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
                        <FileText className="h-4 w-4 text-primary flex-shrink-0" />
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
            className="w-full inline-flex items-center justify-center py-4 px-6 bg-accent hover:bg-accent-hover text-white font-bold rounded-2xl shadow-xl shadow-accent/20 hover:shadow-accent/35 transition-all text-base disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? 'Submitting Proposal...' : isGraphicDesignSelected ? 'Request Design Proposal' : 'Request My Website'}
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
            Let’s Initiate Your <span className="text-primary">Project Proposal</span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Fill out the form below to share your requirements, or reach out to us directly via phone, email, or Instagram.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Contact details (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card border border-card-border p-6 sm:p-8 rounded-3xl shadow-xl space-y-8 relative overflow-hidden">
              {/* Decorative Blur */}
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-2">
                <h3 className="font-extrabold text-2xl text-foreground">Get In Touch</h3>
                <p className="text-xs text-foreground/60 leading-relaxed">
                  Have questions about custom projects, features, or timelines? Reach out to our team directly.
                </p>
              </div>
              
              <div className="space-y-4">
                
                {/* Phone Card */}
                <a 
                  href="tel:+917304610459"
                  className="flex items-center gap-4 p-4 bg-background/50 hover:bg-primary/5 border border-border hover:border-primary/30 rounded-2xl transition-all group cursor-pointer"
                >
                  <div className="p-3 bg-primary/10 text-primary rounded-xl group-hover:scale-105 transition-transform duration-200">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold text-foreground/45 uppercase tracking-wider">Call Directly</p>
                    <p className="text-xs sm:text-sm font-bold text-foreground truncate mt-0.5">+91 7304610459</p>
                  </div>
                </a>

                {/* Email Card */}
                <a 
                  href="mailto:aman9lion@gmail.com"
                  className="flex items-center gap-4 p-4 bg-background/50 hover:bg-primary/5 border border-border hover:border-primary/30 rounded-2xl transition-all group cursor-pointer"
                >
                  <div className="p-3 bg-primary/10 text-primary rounded-xl group-hover:scale-105 transition-transform duration-200">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold text-foreground/45 uppercase tracking-wider">Send Email</p>
                    <p className="text-xs sm:text-sm font-bold text-foreground truncate mt-0.5">aman9lion@gmail.com</p>
                  </div>
                </a>

                {/* Instagram Card */}
                <a 
                  href="https://www.instagram.com/aswalwebstudio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-background/50 hover:bg-primary/5 border border-border hover:border-primary/30 rounded-2xl transition-all group cursor-pointer"
                >
                  <div className="p-3 bg-primary/10 text-primary rounded-xl group-hover:scale-105 transition-transform duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold text-foreground/45 uppercase tracking-wider">Follow Instagram</p>
                    <p className="text-xs sm:text-sm font-bold text-foreground truncate mt-0.5">@aswalwebstudio</p>
                  </div>
                </a>

              </div>

              {/* Quick WhatsApp Support */}
              <div className="p-4 bg-success/5 border border-success/20 rounded-2xl space-y-2">
                <span className="font-bold text-success text-[10px] uppercase tracking-wider">Instant Chat Support:</span>
                <p className="text-[11px] text-foreground/75 leading-relaxed">
                  Connect on WhatsApp for immediate feedback on design scopes and timelines.
                </p>
                <a
                  href="https://wa.me/917304610459?text=Hi!%20I'm%20interested%20in%20a%20website%20quote%20from%20Aswal%20Web%20Studio."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-emerald-600/10 mt-1 cursor-pointer"
                >
                  Message on WhatsApp
                </a>
              </div>

            </div>
          </div>

          {/* Right Column: Form (8 cols) */}
          <div className="lg:col-span-8 w-full">
            <Suspense fallback={
              <div className="p-10 border border-border rounded-3xl bg-card text-center font-medium">
                Loading project configurator...
              </div>
            }>
              <RequestForm />
            </Suspense>
          </div>

        </div>

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
