import { Variants } from "framer-motion";

// Fade In Up animation variants
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

// Fade In animation variants
export const fadeIn: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Stagger children animation
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Scale animation for hover effects
export const scaleHover: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.3
    }
  }
};

// Animation for accordion
export const accordionAnimation: Variants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  open: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

// Animation for rotating accordion icons
export const rotateAnimation: Variants = {
  closed: { rotate: 0 },
  open: { rotate: 180 }
};

// Card hover animation with shadow
export const cardHoverAnimation: Variants = {
  initial: {
    y: 0,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
  },
  hover: {
    y: -5,
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    transition: {
      duration: 0.3
    }
  }
};
