'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

/**
 * Error component displayed when an error occurs
 * Provides a user-friendly error message and a way to recover
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log the error to the console in development
  React.useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary p-4">
      <motion.div 
        className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-red-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Something went wrong
          </h2>
          
          <p className="text-gray-600 text-center mb-6">
            We apologize for the inconvenience. Please try again or return to the homepage.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              onClick={reset}
              className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Try again
            </motion.button>
            
            <Link href="/" passHref>
              <motion.span
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors text-center inline-block cursor-pointer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Return to homepage
              </motion.span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
