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
