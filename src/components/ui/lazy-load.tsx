import React, { useState, useRef, useEffect } from 'react';

interface LazyLoadProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  fallback?: React.ReactNode;
  once?: boolean;
}

/**
 * LazyLoad component with Intersection Observer for performance optimization
 * Renders children only when the element is visible in the viewport
 */
export function LazyLoad({ 
  children, 
  className = '',
  threshold = 0.1,
  rootMargin = '50px',
  fallback = null,
  once = true
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers: render immediately
      setIsVisible(true);
      setHasBeenVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsVisible(isIntersecting);
        
        if (isIntersecting && once && !hasBeenVisible) {
          setHasBeenVisible(true);
          // If 'once' is true, stop observing after first intersection
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, once, hasBeenVisible]);

  // Render children if visible or if it has been visible (when once=true)
  const shouldRender = isVisible || (once && hasBeenVisible);

  return (
    <div ref={elementRef} className={className}>
      {shouldRender ? children : fallback}
    </div>
  );
}

export default LazyLoad;
