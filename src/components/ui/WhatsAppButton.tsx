'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Array of messages that will be displayed in the floating bubble
const MESSAGES = [
  "Precisa de ajuda?",
  "Fale com nossos especialistas!",
  "Tire suas dúvidas agora",
  "Estamos online para te atender",
  "Como podemos ajudar?"
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

  // Rotate through messages when hovered
  useEffect(() => {
    if (isHovered) {
      messageTimer.current = setInterval(() => {
        setCurrentMessage(prev => (prev + 1) % MESSAGES.length);
      }, 3000);
    } else if (messageTimer.current) {
      clearInterval(messageTimer.current);
    }

    return () => {
      if (messageTimer.current) {
        clearInterval(messageTimer.current);
      }
    };
  }, [isHovered]);

  const handleClick = () => {
    const phoneNumber = '351912345678';
    const message = 'Olá, gostaria de mais informações sobre os serviços da Vista Nova.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Don't render anything during server-side rendering
  if (!isMounted) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '12px'
      }}
    >
      {/* Floating message bubble */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            key={currentMessage}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={messageVariants}
            style={{
              backgroundColor: 'white',
              color: '#1f2937',
              padding: '12px 16px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              maxWidth: '220px',
              fontSize: '14px',
              lineHeight: '1.4',
              marginRight: '12px'
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
        )}
      </AnimatePresence>

      {/* WhatsApp button */}
      <motion.button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={false}
        animate={{
          scale: isHovered ? 1.1 : 1,
          rotate: isHovered ? [0, 10, -10, 10, 0] : 0,
          backgroundColor: isHovered ? '#128C7E' : '#25D366'
        }}
        transition={{
          scale: { duration: 0.2 },
          rotate: { 
            duration: 0.8,
            repeat: isHovered ? Infinity : 0,
            repeatType: 'reverse' as const
          },
          backgroundColor: { duration: 0.2 }
        }}
        style={{
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
          outline: 'none'
        }}
        aria-label="Fale conosco pelo WhatsApp"
        title="Fale conosco pelo WhatsApp"
      >
        <span style={{ marginTop: '4px' }}>💬</span>
        
        {/* Pulsing notification dot */}
        <motion.div 
          style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            width: '12px',
            height: '12px',
            backgroundColor: '#ff0000',
            borderRadius: '50%',
            border: '2px solid white'
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
        />
      </motion.button>
    </div>
  );
}
