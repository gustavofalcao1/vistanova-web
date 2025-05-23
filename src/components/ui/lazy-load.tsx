import React from 'react';

interface LazyLoadProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Simple LazyLoad component for better performance
 * This is a placeholder for future implementation
 */
export function LazyLoad({ 
  children, 
  className = '' 
}: LazyLoadProps) {
  // For now, just render the children directly
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export default LazyLoad;
