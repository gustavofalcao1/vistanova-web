import { css } from 'styled-components';
import { theme } from '../theme';

/**
 * Get a color value from the theme
 * @param path - Path to the color in the theme (e.g., 'primary', 'secondary.light')
 * @returns The color value
 */
export const getColor = (path: string): string => {
  const keys = path.split('.');
  let result: any = { ...theme.colors };
  
  for (const key of keys) {
    if (result[key] === undefined) {
      console.warn(`Color '${path}' not found in theme`);
      return '#000000'; // Fallback color
    }
    result = result[key];
  }
  
  return result as string;
};

/**
 * Generate a CSS variable for a color
 * @param name - Name of the color variable
 * @param path - Path to the color in the theme
 * @returns CSS variable declaration
 */
export const colorVar = (name: string, path: string) => {
  return `--color-${name}: ${getColor(path)};`;
};

/**
 * Generate CSS variables for all theme colors
 * @returns CSS variables for all colors
 */
export const colorVariables = () => {
  const colors = theme.colors as Record<string, any>;
  let cssVars = '';
  
  const processObject = (obj: Record<string, any>, prefix = '') => {
    Object.entries(obj).forEach(([key, value]) => {
      const varName = prefix ? `${prefix}-${key}` : key;
      
      if (typeof value === 'object' && value !== null) {
        processObject(value, varName);
      } else if (typeof value === 'string') {
        cssVars += `  --color-${varName}: ${value};\n`;
      }
    });
  };
  
  processObject(colors);
  return css`${cssVars}`;
};

/**
 * Generate a color style with fallback for older browsers
 * @param path - Path to the color in the theme
 * @param property - CSS property to apply the color to (default: 'color')
 * @returns CSS with color and fallback
 */
export const color = (path: string, property = 'color') => {
  const colorValue = getColor(path);
  return css`
    ${property}: ${colorValue};
    ${property}: color-mix(in srgb, ${colorValue}, transparent);
  `;
};

/**
 * Generate a background color style with fallback
 * @param path - Path to the color in the theme
 * @returns CSS with background color and fallback
 */
export const bgColor = (path: string) => color(path, 'background-color');

/**
 * Generate a border color style with fallback
 * @param path - Path to the color in the theme
 * @returns CSS with border color and fallback
 */
export const borderColor = (path: string) => color(path, 'border-color');

/**
 * Generate a text color style with fallback
 * @param path - Path to the color in the theme
 * @returns CSS with text color and fallback
 */
export const textColor = (path: string) => color(path, 'color');
