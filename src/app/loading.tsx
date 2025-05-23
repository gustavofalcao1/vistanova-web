'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Loading component displayed during page transitions
 * Provides a smooth loading experience
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/90 backdrop-blur-sm">
      <motion.div
        className="flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
            willChange: "transform"
          }}
        />
        <motion.p
          className="mt-4 text-white font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
}
