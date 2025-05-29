'use client';

import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

// Array of messages that will be displayed in the floating bubble
const MESSAGES = [
  "Precisas de ajuda?",
  "Fala com nossos especialistas!",
  "Tira tuas dúvidas agora",
  "Estamos online para atender-te",
  "Como podemos ajudar-te?"
];

// Animation variants for the floating message
const messageVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: 'spring',
      damping: 25,
      stiffness: 300
    }
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    scale: 0.8,
    transition: { 
      duration: 0.2 
    } 
  }
};

export default function WhatsAppButton() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const messageTimer = useRef<NodeJS.Timeout | null>(null);

  // Set component as mounted (client-side only)
  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (messageTimer.current) {
        clearTimeout(messageTimer.current);
      }
    };
  }, []);

  // Memoize message rotation logic
  const rotateMessage = useCallback(() => {
    setCurrentMessage(prev => (prev + 1) % MESSAGES.length);
  }, []);

  // Handle automatic message rotation
  useEffect(() => {
    // Initial message change after delay
    const initialTimer = setTimeout(rotateMessage, 3000);
    
    // Set up interval for subsequent changes
    messageTimer.current = setInterval(rotateMessage, 3000);
    
    return () => {
      clearTimeout(initialTimer);
      if (messageTimer.current) {
        clearInterval(messageTimer.current);
      }
    };
  }, [rotateMessage]);
  
  // Handle hover state changes
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleClick = useCallback(() => {
    const phoneNumber = '351924967148';
    const message = 'Olá, gostaria de mais informações sobre a Vista Nova';
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`, 
      '_blank', 
      'noopener,noreferrer'
    );
  }, []);
  
  // Handle keyboard interaction
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  // Button base styles
  const buttonBaseStyles: React.CSSProperties = {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#25D366',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '32px',
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    position: 'relative',
    outline: 'none',
    padding: 0,
    lineHeight: 1,
    transition: 'background-color 0.2s, transform 0.15s',
    WebkitTapHighlightColor: 'transparent',
  };

  // Container base styles
  const containerBaseStyles: React.CSSProperties = {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    zIndex: 99,
    display: 'flex',
    flexDirection: 'column-reverse', // Changed to column-reverse to position messages above button
    alignItems: 'flex-end',
    gap: '8px', // Small gap between elements
    pointerEvents: 'none' // Allow clicks to pass through container
  };
  
  // Mobile styles
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // Apply mobile styles conditionally
  const containerStyles = useMemo(() => ({
    ...containerBaseStyles,
    ...(isMobile ? {
      bottom: '16px',
      right: '16px'
    } : {})
  }), [isMobile]);
  
  const buttonStyles = useMemo(() => ({
    ...buttonBaseStyles,
    ...(isMobile ? {
      width: '56px',
      height: '56px',
      fontSize: '30px'
    } : {})
  }), [isMobile]);

  // Don't render anything during server-side rendering
  if (!isMounted) return null;

  return (
    <div style={containerStyles}>
      {/* Button and message container with fixed positioning */}
      <div style={{
        position: 'relative',
        display: 'inline-block'
      }}>
        {/* Floating message bubble - positioned absolutely above the button */}
        <div style={{
          position: 'absolute',
          bottom: '96px',
          right: '12px',
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          pointerEvents: 'none'
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMessage}
              initial="hidden"
              exit="exit"
              variants={messageVariants}
              style={{
                backgroundColor: 'white',
                color: '#1f2937',
                padding: '12px 16px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                minWidth: '240px',
                maxWidth: '320px',
                fontSize: '14px',
                lineHeight: '1.4',
                position: 'relative',
                transformOrigin: 'bottom right',
                marginRight: '0px',
                pointerEvents: 'none'
              }}
              animate={{
                opacity: isHovered ? 1 : 0.98,
                scale: isHovered ? 1.02 : 1
              }}
              transition={{
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 }
              }}
            >
              <div style={{
                position: 'absolute',
                bottom: '-6px',
                right: '12px',
                width: '12px',
                height: '12px',
                backgroundColor: 'white',
                transform: 'rotate(45deg)'
              }} />
              {MESSAGES[currentMessage]}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* WhatsApp button - with its own animation */}
        <motion.div
          animate={{
            y: isHovered ? 0 : [0, -3, 0]
          }}
          transition={{
            y: {
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatType: 'reverse'
            }
          }}
        >
      <motion.button
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        initial={false}
        animate={{
          scale: isHovered ? 1.05 : 1,
          rotate: isHovered ? [0, 2, -2, 2, 0] : 0,
          backgroundColor: isHovered ? '#128C7E' : '#25D366'
        }}
        whileTap={{ scale: 0.98 }}
        transition={{
          scale: { duration: 0.2 },
          rotate: { 
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            repeatType: 'reverse' as const,
            ease: 'easeInOut'
          },
          backgroundColor: { duration: 0.3 }
        }}
        style={{...buttonStyles, pointerEvents: 'auto'}} // Enable pointer events on button
        aria-label="Fale connosco pelo WhatsApp"
        title="Fale connosco pelo WhatsApp"
        role="button"
        tabIndex={0}
      >
        <MessageCircle size={32} aria-hidden="true" />
        
        {/* Pulsing notification dot */}
        <motion.span 
          style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            width: '12px',
            height: '12px',
            backgroundColor: '#ff0000',
            borderRadius: '50%',
            border: '2px solid white',
            pointerEvents: 'none'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          aria-hidden="true"
        />
      </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
