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
 */
export function getColor(colorName: keyof typeof colors): string {
  return colors[colorName];
}

/**
 * Gets a color from the token in HSL format
 */
export function getColorHSL(colorName: keyof typeof colors): string {
  const color = colors[colorName];
  if (typeof color === 'string' && color.startsWith('#')) {
    return hexToHSL(color);
  }
  return '';
}

/**
 * Main colors in HSL format for use with CSS variables
 */
export const hslColorTokens = {
  primary: hexToHSL(colors.primary),
  primaryLight: hexToHSL(colors.primaryLight),
  primaryDark: hexToHSL(colors.primaryDark),
  secondary: hexToHSL(colors.secondary),
  secondaryLight: hexToHSL(colors.secondaryLight),
  secondaryDark: hexToHSL(colors.secondaryDark),
  background: hexToHSL(colors.background),
  backgroundDark: hexToHSL(colors.backgroundDark),
  text: hexToHSL(colors.text),
  textLight: hexToHSL(colors.textLight),
  textOnDark: hexToHSL(colors.textOnDark),
};
