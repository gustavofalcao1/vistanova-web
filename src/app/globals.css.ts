import { hslColorTokens } from '../styles/utils/colorUtils';

export const globalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Tailwind CSS */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles */
:root {
  --radius: 0.75rem;
  --background: ${hslColorTokens.background};
  --foreground: ${hslColorTokens.text};
  --muted: 210 40% 96.1%;
  --muted-foreground: ${hslColorTokens.textLight};
  --popover: ${hslColorTokens.background};
  --popover-foreground: ${hslColorTokens.text};
  --card: ${hslColorTokens.background};
  --card-foreground: ${hslColorTokens.text};
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --primary: ${hslColorTokens.primary};
  --primary-foreground: ${hslColorTokens.textOnDark};
  --secondary: ${hslColorTokens.secondary};
  --secondary-foreground: ${hslColorTokens.text};
  --accent: 210 40% 96.1%;
  --accent-foreground: ${hslColorTokens.text};
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: ${hslColorTokens.textOnDark};
  --ring: ${hslColorTokens.primary};
  
  /* Specific colors */
  --header-bg: ${hslColorTokens.background};
  --footer-bg: ${hslColorTokens.primary};
  --section-alt-bg: 210 40% 98%;
}

.dark {
  --radius: 0.75rem;
  --background: ${hslColorTokens.primary};
  --foreground: ${hslColorTokens.textOnDark};
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 75%;
  --popover: ${hslColorTokens.primary};
  --popover-foreground: ${hslColorTokens.textOnDark};
  --card: ${hslColorTokens.primary};
  --card-foreground: ${hslColorTokens.textOnDark};
  --border: 217.2 32.6% 25%;
  --input: 217.2 32.6% 25%;
  --primary: ${hslColorTokens.primary};
  --primary-foreground: ${hslColorTokens.textOnDark};
  --secondary: ${hslColorTokens.secondary};
  --secondary-foreground: ${hslColorTokens.text};
  --accent: 217.2 32.6% 25%;
  --accent-foreground: ${hslColorTokens.textOnDark};
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: ${hslColorTokens.textOnDark};
  --ring: ${hslColorTokens.secondary};
  
  /* Dark mode specific colors */
  --header-bg: ${hslColorTokens.primary};
  --footer-bg: ${hslColorTokens.primaryDark};
  --section-alt-bg: ${hslColorTokens.primaryLight};
}

@layer base {
  * {
    @apply border-border;
  }
  
  html {
    @apply scroll-smooth;
    font-family: 'Inter', sans-serif;
  }

  body {
    @apply bg-background text-foreground font-sans antialiased;
  }
}

@layer utilities {
  .backdrop-blur {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
  
  /* Color classes */
  .bg-primary-gradient {
    background: linear-gradient(135deg, hsl(${hslColorTokens.primary}) 0%, hsl(${hslColorTokens.primaryDark}) 100%);
  }
  
  .bg-secondary-gradient {
    background: linear-gradient(135deg, hsl(${hslColorTokens.secondary}) 0%, hsl(${hslColorTokens.secondaryDark}) 100%);
  }
  
  .bg-section-alt {
    background-color: hsl(var(--section-alt-bg));
  }
  
  .text-primary-dark {
    color: hsl(${hslColorTokens.primaryDark});
  }
  
  .text-primary-light {
    color: hsl(${hslColorTokens.primaryLight});
  }
  
  .border-primary-light {
    border-color: hsl(${hslColorTokens.primaryLight});
  }
  
  .border-secondary {
    border-color: hsl(${hslColorTokens.secondary});
  }
}

/* Animation classes */
@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

.animate-scroll {
  animation: scroll 25s linear infinite;
}
`;

export default globalStyles;
