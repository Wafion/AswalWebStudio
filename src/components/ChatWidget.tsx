'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Award, Sparkles, Phone, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Show a gentle prompt notification bubble after 5 seconds
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Prefill the contact page with this requirement description and navigate there
    router.push(`/contact?desc=${encodeURIComponent(message)}`);
    setMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Expanded Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-80 sm:w-96 rounded-2xl shadow-2xl glass-panel overflow-hidden border border-border mb-4 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-4 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-300 ring-2 ring-emerald-500 animate-pulse" />
                  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white border border-slate-200 flex items-center justify-center p-0.5">
                    <Image
                      src="/logo.png"
                      alt="AswalWebStudio Logo"
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight">AswalWebStudio</h4>
                  <p className="text-xs text-white/80 flex items-center">
                    <Sparkles className="h-3 w-3 mr-1" /> Typically replies instantly
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Conversation Area */}
            <div className="flex-1 p-4 max-h-64 overflow-y-auto space-y-4 bg-card/10">
              <div className="flex items-start space-x-2">
                <div className="bg-card px-3 py-2.5 rounded-2xl text-sm border border-border text-foreground max-w-[85%] rounded-tl-none">
                  Hello! 👋 We craft high-converting websites and modern custom web applications. How can we help you today?
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="bg-card px-3 py-2.5 rounded-2xl text-sm border border-border text-foreground max-w-[85%] rounded-tl-none flex flex-col space-y-2">
                  <span>🚀 Looking for a quote? You can start by typing a quick brief of your project below:</span>
                  <a
                    href="https://wa.me/1234567890?text=Hi!%20I'm%20interested%20in%20a%20website%20quote%20from%20AswalWebStudio."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center py-1.5 px-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs rounded-lg transition-colors text-center shadow-sm"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSend} className="p-3 border-t border-border bg-card/50 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your brief & get a quote..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 text-sm bg-background border border-border px-3 py-2 rounded-xl focus:outline-none focus:border-emerald-500 text-foreground"
              />
              <button
                type="submit"
                className="p-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Prompt Notification */}
      <AnimatePresence>
        {showNotification && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-3 max-w-xs bg-card border border-border p-3.5 rounded-2xl shadow-xl flex items-start space-x-3 relative"
          >
            <button 
              onClick={() => setShowNotification(false)}
              className="absolute top-2 right-2 text-foreground/40 hover:text-foreground/70"
            >
              <X className="h-3 w-3" />
            </button>
            <div className="bg-emerald-500 text-white rounded-full p-2 mt-0.5 shadow-md shadow-emerald-500/20">
              <Award className="h-4 w-4" />
            </div>
            <div>
              <h5 className="font-semibold text-xs text-foreground">Need a website?</h5>
              <p className="text-xs text-foreground/75 mt-0.5 leading-tight">
                Click here to get a custom quote and design brief in 2 minutes!
              </p>
              <button 
                onClick={() => {
                  setIsOpen(true);
                  setShowNotification(false);
                }}
                className="text-xs text-emerald-500 font-bold hover:underline mt-1.5 block cursor-pointer"
              >
                Let's talk
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Stack */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col gap-3 mb-3 items-center"
          >
            {/* WhatsApp Floating */}
            <a
              href="https://wa.me/917304610459?text=Hi!%20I'm%20interested%20in%20a%20website%20quote%20from%20Aswal%20Web%20Studio."
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200 group relative cursor-pointer"
              aria-label="WhatsApp Chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.574 1.97 14.101.947 11.474.947c-5.443 0-9.866 4.372-9.87 9.802 0 1.772.46 3.473 1.332 4.968L1.9 21.053l5.097-1.346.35-.208zm11.082-7.534c-.29-.145-1.713-.845-1.978-.94-.266-.096-.459-.145-.653.146-.193.29-.749.94-.917 1.132-.168.193-.336.217-.626.072-2.825-1.413-4.67-2.314-6.545-5.528-.168-.29-.018-.45.124-.591.127-.128.29-.336.434-.504.145-.168.193-.29.29-.482.096-.193.048-.361-.024-.505-.072-.145-.653-1.57-.894-2.152-.236-.569-.475-.49-.653-.49-.168-.008-.362-.01-.555-.01-.193 0-.507.072-.772.361-.266.29-1.013.99-1.013 2.413 0 1.422 1.037 2.795 1.182 2.99.145.193 2.039 3.114 4.939 4.368.69.298 1.229.476 1.649.61.693.22 1.324.19 1.823.115.556-.084 1.713-.7 1.954-1.374.24-.674.24-1.253.168-1.374-.072-.121-.266-.193-.556-.338z"/>
              </svg>
              <span className="absolute right-12 scale-0 group-hover:scale-100 transition-all duration-200 bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow whitespace-nowrap">WhatsApp Chat</span>
            </a>

            {/* Phone Call Floating */}
            <a
              href="tel:+917304610459"
              className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200 group relative cursor-pointer"
              aria-label="Phone Call"
            >
              <Phone className="h-4.5 w-4.5" />
              <span className="absolute right-12 scale-0 group-hover:scale-100 transition-all duration-200 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow whitespace-nowrap">Call Directly</span>
            </a>

            {/* Email Floating */}
            <a
              href="mailto:aman9lion@gmail.com"
              className="h-10 w-10 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200 group relative cursor-pointer"
              aria-label="Email Us"
            >
              <Mail className="h-4.5 w-4.5" />
              <span className="absolute right-12 scale-0 group-hover:scale-100 transition-all duration-200 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow whitespace-nowrap">Send Email</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setShowNotification(false);
        }}
        className="h-14 w-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-500/20 cursor-pointer relative hover:bg-emerald-600 transition-colors"
        aria-label="Toggle Live Chat"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        {!isOpen && showNotification && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border border-white text-[9px] font-bold text-white items-center justify-center">
              1
            </span>
          </span>
        )}
      </motion.button>
      
    </div>
  );
}
