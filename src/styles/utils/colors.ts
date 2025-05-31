import { css } from 'styled-components';
import { theme } from '../theme';

/**
 * Get a color value from the theme
 * @param path - Path to the color in the theme (e.g., 'primary', 'secondary.light')
 * @returns The color value
 */
// Define a type to represent the nested color structure
type NestedColors = {
  [key: string]: string | NestedColors;
};

export const getColor = (path: string): string => {
  const keys = path.split('.');
  let result: NestedColors = { ...theme.colors as NestedColors };
  
  for (const key of keys) {
    if (typeof result !== 'object' || result === null || !(key in result)) {
      console.warn(`Color '${path}' not found in theme`);
      return '#000000'; // Fallback color
    }
    result = result[key] as NestedColors;
  }
  
  // If the result is an object, return black as fallback
  if (typeof result === 'object') {
    console.warn(`Color '${path}' is an object, not a color string`);
    return '#000000';
  }
  
  return String(result);
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
  const colors = theme.colors as Record<string, unknown>;
  const cssVarsList: string[] = [];
  
  const processObject = (obj: Record<string, unknown>, prefix = '') => {
    Object.entries(obj).forEach(([key, value]) => {
      const varName = prefix ? `${prefix}-${key}` : key;
      
      if (typeof value === 'object' && value !== null) {
        // Type assertion to ensure it's a valid object for recursive processing
        const nestedObj = value as Record<string, unknown>;
        processObject(nestedObj, varName);
      } else if (typeof value === 'string') {
        cssVarsList.push(`--color-${varName}: ${value};`);
      }
    });
  };
  
  processObject(colors);
  return css`
    ${cssVarsList.join('\n    ')}
  `;
};

/**
 * Generate a color style with fallback for older browsers
 * @param path - Path to the color in the theme
 * @param property - CSS property to apply the color to (default: 'color')
 * @returns CSS with color and fallback
 */
export const color = (path: string, property = 'color') => {
  const colorValue = getColor(path);
  // Usando uma abordagem alternativa para evitar problemas de sintaxe CSS
  const normalProp = `${property}: ${colorValue};`;
  const varProp = `${property}: var(--color-${path.replace('.', '-')}, ${colorValue});`;
  
  return css`
    ${normalProp}
    ${varProp}
  `
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
