'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';

export default function FloatingContacts() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3 pointer-events-auto">
      {/* Email Button */}
      <motion.a
        initial={{ opacity: 0, scale: 0.8, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href="mailto:aman9lion@gmail.com"
        className="h-10 w-10 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-lg transition-colors group relative cursor-pointer"
        aria-label="Email Us"
      >
        <Mail className="h-4.5 w-4.5" />
        <span className="absolute left-12 scale-0 group-hover:scale-100 transition-all duration-200 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow whitespace-nowrap z-50">
          Email Us
        </span>
      </motion.a>

      {/* WhatsApp Button */}
      <motion.a
        initial={{ opacity: 0, scale: 0.8, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href="https://wa.me/917304610459?text=Hi!%20I'm%20interested%20in%20a%20website%20or%20design%20quote%20from%20Aswal%20Web%20Studio."
        target="_blank"
        rel="noopener noreferrer"
        className="h-10 w-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg transition-colors group relative cursor-pointer"
        aria-label="WhatsApp Chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.574 1.97 14.101.947 11.474.947c-5.443 0-9.866 4.372-9.87 9.802 0 1.772.46 3.473 1.332 4.968L1.9 21.053l5.097-1.346.35-.208zm11.082-7.534c-.29-.145-1.713-.845-1.978-.94-.266-.096-.459-.145-.653.146-.193.29-.749.94-.917 1.132-.168.193-.336.217-.626.072-2.825-1.413-4.67-2.314-6.545-5.528-.168-.29-.018-.45.124-.591.127-.128.29-.336.434-.504.145-.168.193-.29.29-.482.096-.193.048-.361-.024-.505-.072-.145-.653-1.57-.894-2.152-.236-.569-.475-.49-.653-.49-.168-.008-.362-.01-.555-.01-.193 0-.507.072-.772.361-.266.29-1.013.99-1.013 2.413 0 1.422 1.037 2.795 1.182 2.99.145.193 2.039 3.114 4.939 4.368.69.298 1.229.476 1.649.61.693.22 1.324.19 1.823.115.556-.084 1.713-.7 1.954-1.374.24-.674.24-1.253.168-1.374-.072-.121-.266-.193-.556-.338z"/>
        </svg>
        <span className="absolute left-12 scale-0 group-hover:scale-100 transition-all duration-200 bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow whitespace-nowrap z-50">
          WhatsApp Chat
        </span>
      </motion.a>

      {/* Phone Button */}
      <motion.a
        initial={{ opacity: 0, scale: 0.8, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href="tel:+917304610459"
        className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition-colors group relative cursor-pointer"
        aria-label="Call Us"
      >
        <Phone className="h-4.5 w-4.5" />
        <span className="absolute left-12 scale-0 group-hover:scale-100 transition-all duration-200 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow whitespace-nowrap z-50">
          Call Now
        </span>
      </motion.a>
    </div>
  );
}
