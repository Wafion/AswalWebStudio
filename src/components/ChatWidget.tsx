'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Award, Sparkles } from 'lucide-react';
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
            <div className="bg-gradient-to-r from-primary to-secondary px-4 py-4 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-success ring-2 ring-primary animate-pulse" />
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
                    href="https://wa.me/917304610459?text=Hi!%20I'm%20interested%20in%20a%20website%20quote%20from%20Aswal%20Web%20Studio."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors text-center shadow-sm"
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
                className="flex-1 text-sm bg-background border border-border px-3 py-2 rounded-xl focus:outline-none focus:border-primary text-foreground"
              />
              <button
                type="submit"
                className="p-2 bg-primary text-white rounded-xl hover:bg-primary-hover transition-colors cursor-pointer"
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
            <div className="bg-primary text-white rounded-full p-2 mt-0.5 shadow-md shadow-primary/20">
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
                className="text-xs text-primary font-bold hover:underline mt-1.5 block cursor-pointer"
              >
                Let's talk
              </button>
            </div>
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
        className="h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/20 cursor-pointer relative hover:bg-primary-hover transition-colors"
        aria-label="Toggle Live Chat"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        {!isOpen && showNotification && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-primary border border-white text-[9px] font-bold text-white items-center justify-center">
              1
            </span>
          </span>
        )}
      </motion.button>
      
    </div>
  );
}
