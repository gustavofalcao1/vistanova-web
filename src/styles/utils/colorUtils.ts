import colors from '../tokens/colors';

/**
 * Converts a hexadecimal color to HSL (Hue, Saturation, Lightness)
 * @param hex Hexadecimal color (e.g., #1F2C40)
 * @returns String in the format "H S% L%" (e.g., "215 31% 18%")
 */
export function hexToHSL(hex: string): string {
  // Remove # if it exists
  hex = hex.replace(/^#/, '');
  
  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  
  // Find max and min values to calculate lightness
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  
  let h = 0, s = 0, l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    
    h = Math.round(h * 60);
  }
  
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  
  return `${h} ${s}% ${l}%`;
}

/**
 * Generates an object with all colors in HSL format for use with Tailwind CSS
 */
export function generateHSLColors() {
  const hslColors: Record<string, string> = {};
  
  Object.entries(colors).forEach(([key, value]) => {
    if (typeof value === 'string' && value.startsWith('#')) {
      hslColors[key] = hexToHSL(value);
    }
  });
  
  return hslColors;
}

/**
 * Gets a color from the token in hexadecimal format
 * @param colorName The name of the color in the tokens
 * @param variant Optional variant of the color (e.g., 'light', 'dark', 'DEFAULT')
 * @returns The color in hexadecimal format or empty string if not found
 */
export function getColor(colorName: keyof typeof colors, variant?: string): string {
  const color = colors[colorName];
  
  // If color is a string, return it directly
  if (typeof color === 'string') {
    return color;
  }
  
  // If color is an object and variant is specified, try to get that variant
  if (color && typeof color === 'object' && variant) {
    const variantColor = color[variant as keyof typeof color];
    if (typeof variantColor === 'string') {
      return variantColor;
    }
  }
  
  // If color is an object but no variant specified or variant not found, try DEFAULT
  if (color && typeof color === 'object' && 'DEFAULT' in color) {
    const defaultColor = color.DEFAULT;
    if (typeof defaultColor === 'string') {
      return defaultColor;
    }
  }
  
  // Fallback
  return '';
}

/**
 * Gets a color from the token in HSL format
 * @param colorName The name of the color in the tokens
 * @param variant Optional variant of the color (e.g., 'light', 'dark', 'DEFAULT')
 * @returns The color in HSL format or empty string if not found
 */
export function getColorHSL(colorName: keyof typeof colors, variant?: string): string {
  const color = getColor(colorName, variant);
  if (color && color.startsWith('#')) {
    return hexToHSL(color);
  }
  return '';
}

/**
 * Main colors in HSL format for use with CSS variables
 */
export const hslColorTokens = {
  primary: getColorHSL('primary', 'DEFAULT'),
  primaryLight: getColorHSL('primary', 'light'),
  primaryDark: getColorHSL('primary', 'dark'),
  secondary: getColorHSL('secondary', 'DEFAULT'),
  secondaryLight: getColorHSL('secondary', 'light'),
  secondaryDark: getColorHSL('secondary', 'dark'),
  background: getColorHSL('background', 'DEFAULT'),
  backgroundDark: getColorHSL('background', 'dark'),
  text: getColorHSL('foreground', 'DEFAULT'),
  textLight: getColorHSL('foreground', 'light'),
  textOnDark: getColorHSL('foreground', 'onDark'),
};

/**
 * Color utility functions for harmonization and consistency
 * @param hex Hexadecimal color (e.g., #1F2C40)
 * @returns RGB values {r, g, b}
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Convert RGB to HSL
 */
export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Generate color variants with proper contrast
 */
export function generateColorVariants(baseHex: string) {
  const rgb = hexToRgb(baseHex);
  if (!rgb) return null;
  
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  return {
    base: baseHex,
    light: hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 15, 90)),
    lighter: hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 30, 95)),
    dark: hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 15, 10)),
    darker: hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 30, 5)),
    muted: hslToHex(hsl.h, Math.max(hsl.s - 20, 0), hsl.l),
    vibrant: hslToHex(hsl.h, Math.min(hsl.s + 20, 100), hsl.l),
  };
}

/**
 * Convert HSL to Hex
 */
export function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Calculate color contrast ratio
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 0;
  
  const luminance1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const luminance2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const brightest = Math.max(luminance1, luminance2);
  const darkest = Math.min(luminance1, luminance2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Calculate relative luminance
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Check if color meets WCAG contrast requirements
 */
export function isAccessibleContrast(foreground: string, background: string, level: 'AA' | 'AAA' = 'AA'): boolean {
  const ratio = getContrastRatio(foreground, background);
  return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
}

/**
 * Get best text color (black or white) for a background
 */
export function getBestTextColor(backgroundColor: string): string {
  const whiteContrast = getContrastRatio('#FFFFFF', backgroundColor);
  const blackContrast = getContrastRatio('#000000', backgroundColor);
  
  return whiteContrast > blackContrast ? '#FFFFFF' : '#000000';
}

/**
 * Convert hex to CSS HSL format
 */
export function hexToHslCss(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return 'hsl(0, 0%, 0%)';
  
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;
}

/**
 * Convert hex to CSS RGB format
 */
export function hexToRgbCss(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return 'rgb(0, 0, 0)';
  
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

/**
 * Create color with opacity
 */
export function withOpacity(hex: string, opacity: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return 'rgba(0, 0, 0, 0)';
  
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
}

/**
 * Harmonize colors based on Vista Nova brand palette
 */
export function harmonizeWithBrand(inputColor: string): {
  harmonized: string;
  category: 'primary' | 'secondary' | 'neutral' | 'accent';
  variants: ReturnType<typeof generateColorVariants>;
} {
  const brandColors = {
    primary: '#0E454E',
    secondary: '#E5FC2A',
    neutral: '#888A8C',
    background: '#F4F4ED',
  };
  
  const inputRgb = hexToRgb(inputColor);
  if (!inputRgb) {
    return {
      harmonized: brandColors.neutral,
      category: 'neutral',
      variants: generateColorVariants(brandColors.neutral),
    };
  }
  
  const inputHsl = rgbToHsl(inputRgb.r, inputRgb.g, inputRgb.b);
  
  // Determine best brand category based on hue and saturation
  let category: 'primary' | 'secondary' | 'neutral' | 'accent' = 'neutral';
  let harmonized = brandColors.neutral;
  
  if (inputHsl.s < 20) {
    // Low saturation = neutral
    category = 'neutral';
    harmonized = brandColors.neutral;
  } else if (inputHsl.h >= 170 && inputHsl.h <= 200) {
    // Blue-green range = primary
    category = 'primary';
    harmonized = brandColors.primary;
  } else if (inputHsl.h >= 50 && inputHsl.h <= 80) {
    // Yellow-green range = secondary
    category = 'secondary';
    harmonized = brandColors.secondary;
  } else {
    // Other colors = create accent variant
    category = 'accent';
    harmonized = hslToHex(inputHsl.h, 40, inputHsl.l > 50 ? 30 : 70);
  }
  
  return {
    harmonized,
    category,
    variants: generateColorVariants(harmonized),
  };
}
