#!/usr/bin/env node
/**
 * Script to check color usage in the project.
 * Verifies if colors are being used correctly according to the theme.
 * Reports hardcoded colors that are not part of the defined theme.
 */

import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

import themeColorsDefinition from '../src/styles/tokens/colors';

const DIRECTORIES_TO_SCAN: string[] = [
  'src/app',
  'src/components',
  'src/styles',
];

const FILE_EXTENSIONS_TO_SCAN: string[] = ['.tsx', '.ts', '.css', '.scss'];

const HEX_COLOR_REGEX = /#([a-f0-9]{3}){1,2}\b/gi;
const RGB_COLOR_REGEX = /rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(?:\s*,\s*(?:0|1|0?\.\d+)\s*)?\)/gi;

// Allow list for specific hex/rgb/other CSS values that are known and accepted
const ALLOWED_HARDCODED_COLORS: Set<string> = new Set([
  // Basic allowed colors
  '#000', '#000000', // Black
  '#fff', '#ffffff', // White
  'transparent',    // Allow 'transparent' keyword
  
  // WhatsApp Button specific colors
  '#25d366',       // WhatsApp green (lowercase)
  '#128c7e',       // WhatsApp dark green (hover, lowercase)
  '#ff0000',       // Notification dot red
  '#1f2937',       // Text color in WhatsApp button bubble (lowercase)
  
  // Box shadows (RGBA values used in CSS variable definitions or specific design choices)
  'rgba(0,0,0,0.1)',   // Note: script converts to lowercase before check, so 'rgba(0,0,0,0.1)'
  'rgba(0,0,0,0.15)', // Note: script converts to lowercase before check

  // Recharts specific
  '#ccc',

  // CSS definitions from globals.css that use hsl(var(...)) or gradients with hsl(var(...))
  "hsl(var(--section-alt-bg))",
  "hsl(var(--primary-dark))",
  "hsl(var(--primary-light))",
  "hsl(var(--secondary))",
  "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-dark)) 100%)",
  "linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--secondary-gradient-dark-stop)) 100%)",

  // Example color in JSDoc in colorUtils.ts
  '#1f2c40', 
]);

interface ColorIssue {
  type: 'hex' | 'rgb' | 'other-css';
  value: string;
  file: string;
  line: number;
  text: string;
}

// Correct Stats interface
interface Stats {
  filesScanned: number;
  colorIssuesFound: number;
  issues: ColorIssue[];
}

const stats: Stats = {
  filesScanned: 0,
  colorIssuesFound: 0,
  issues: [],
};

// Correct getFlatThemeColors function
function getFlatThemeColors(colorsDefinition: Record<string, any>): Set<string> {
  const flatColors = new Set<string>();
  function recurse(obj: Record<string, any>) {
    for (const key in obj) {
      const value = obj[key];
      if (typeof value === 'string' && value.startsWith('#')) {
        flatColors.add(value.toLowerCase());
      } else if (typeof value === 'object' && value !== null) {
        recurse(value);
      }
    }
  }
  recurse(colorsDefinition);
  return flatColors;
}

const THEME_COLOR_HEX_VALUES: Set<string> = getFlatThemeColors(themeColorsDefinition);

function analyzeLineForColors(text: string, filePath: string, lineNumber: number): void {
  let match;
  const trimmedLine = text.trim();

  if (trimmedLine.startsWith('//') ||
      (trimmedLine.startsWith('/*') && trimmedLine.endsWith('*/')) ||
      (trimmedLine.startsWith('/*') && !trimmedLine.includes('*/')) ||
      (trimmedLine.startsWith('*') && !filePath.endsWith('.css') && !filePath.endsWith('.scss'))) {
    HEX_COLOR_REGEX.lastIndex = 0;
    let allHexInCommentAllowed = true;
    let foundHexInComment = false;
    while ((match = HEX_COLOR_REGEX.exec(trimmedLine)) !== null) {
      foundHexInComment = true;
      if (!ALLOWED_HARDCODED_COLORS.has(match[0].toLowerCase()) && !THEME_COLOR_HEX_VALUES.has(match[0].toLowerCase())) {
        allHexInCommentAllowed = false;
        break;
      }
    }
    if (foundHexInComment && allHexInCommentAllowed) return;
  }

  HEX_COLOR_REGEX.lastIndex = 0;
  while ((match = HEX_COLOR_REGEX.exec(text)) !== null) {
    const color = match[0].toLowerCase();
    if (!THEME_COLOR_HEX_VALUES.has(color) && !ALLOWED_HARDCODED_COLORS.has(color)) {
      stats.colorIssuesFound++;
      stats.issues.push({ type: 'hex', value: match[0], file: filePath, line: lineNumber, text: trimmedLine });
    }
  }

  // Check for RGB/RGBA colors
  RGB_COLOR_REGEX.lastIndex = 0; 
  while ((match = RGB_COLOR_REGEX.exec(text)) !== null) {
    const colorValueForReporting = match[0]; // Original value for reporting
    let colorValueLower = colorValueForReporting.toLowerCase();
    colorValueLower = colorValueLower.replace(/\s/g, ''); // Normalize: remove all spaces
    
    // DEBUG line: (descomente se o problema persistir)
    // console.log(`Found RGB (normalized): '${colorValueLower}', Allowed: ${ALLOWED_HARDCODED_COLORS.has(colorValueLower)}, Set content for 'rgba(0,0,0,0.1)': ${ALLOWED_HARDCODED_COLORS.has('rgba(0,0,0,0.1)')}`);
    
    if (!ALLOWED_HARDCODED_COLORS.has(colorValueLower)) {
      stats.colorIssuesFound++;
      stats.issues.push({ type: 'rgb', value: colorValueForReporting, file: filePath, line: lineNumber, text: trimmedLine });
    }
  }

  if (path.extname(filePath) === '.css' || path.extname(filePath) === '.scss') {
    const cssColorPropertyRegex = /(?:color|background(?:-color)?|border(?:-color)?|fill|stroke)\s*:\s*([^;!]+);?/gi;
    cssColorPropertyRegex.lastIndex = 0;
    while ((match = cssColorPropertyRegex.exec(text)) !== null) {
      const colorValue = match[1].trim();
      const colorValueLower = colorValue.toLowerCase();

      if (ALLOWED_HARDCODED_COLORS.has(colorValue) || ALLOWED_HARDCODED_COLORS.has(colorValueLower)) {
        continue;
      }
      if (colorValueLower.startsWith('var(') || colorValueLower.includes('var(')) continue;
      if (colorValueLower === 'inherit' || colorValueLower === 'currentColor' || colorValueLower === 'transparent') continue;
      
      HEX_COLOR_REGEX.lastIndex = 0; // Reset before test
      if (HEX_COLOR_REGEX.test(colorValue) && (THEME_COLOR_HEX_VALUES.has(colorValueLower) || ALLOWED_HARDCODED_COLORS.has(colorValueLower))) continue;
      
      RGB_COLOR_REGEX.lastIndex = 0; // Reset before test
      if (RGB_COLOR_REGEX.test(colorValue) && ALLOWED_HARDCODED_COLORS.has(colorValueLower)) continue;

      if (colorValueLower.match(/^[a-z]+$/i) ||
          (colorValue.includes('hsl(') && !colorValue.includes('var(')) ||
          (colorValue.includes('linear-gradient(') && !colorValue.includes('var('))) {
        stats.colorIssuesFound++;
        stats.issues.push({ type: 'other-css', value: colorValue, file: filePath, line: lineNumber, text: trimmedLine });
      }
    }
  }
}

async function processFile(filePath: string): Promise<void> {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      analyzeLineForColors(line, filePath, index + 1);
    });
    stats.filesScanned++;
  } catch (error) {
    const err = error as Error;
    console.error(chalk.red(`Error processing file ${filePath}: ${err.message}`));
  }
}

async function walkDirectoryAndProcessFiles(dir: string): Promise<Promise<void>[]> {
  let collectedPromises: Promise<void>[] = [];
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === 'dist') continue;
        const subDirPromises = await walkDirectoryAndProcessFiles(fullPath);
        collectedPromises = collectedPromises.concat(subDirPromises);
      } else if (FILE_EXTENSIONS_TO_SCAN.includes(path.extname(fullPath).toLowerCase())) {
        collectedPromises.push(processFile(fullPath));
      }
    }
  } catch (error) {
    const err = error as Error;
    console.error(chalk.red(`Error reading directory ${dir}: ${err.message}`));
  }
  return collectedPromises;
}

function showThemeColors(): void {
  console.log(chalk.bold.underline('\n🎨 Defined Theme Colors (Normalized Hex from Tokens):'));
  if (THEME_COLOR_HEX_VALUES.size === 0) {
    console.log(chalk.yellow('No theme colors loaded or found.'));
    return;
  }
  const sortedColors = Array.from(THEME_COLOR_HEX_VALUES).sort();
  sortedColors.forEach(color => {
    console.log(`  ${chalk.hex(color)('■')} ${color}`);
  });
}

function showIssuesReport(): void {
  if (stats.issues.length === 0) {
    console.log(chalk.green('\n✅ No non-theme hardcoded color issues found!'));
    return;
  }
  console.log(chalk.red.bold.underline('\n⚠️ Non-Theme Hardcoded Color Issues Found:'));
  const issuesByFile: Record<string, ColorIssue[]> = {};
  stats.issues.forEach(issue => {
    if (!issuesByFile[issue.file]) {
      issuesByFile[issue.file] = [];
    }
    issuesByFile[issue.file].push(issue);
  });
  for (const file in issuesByFile) {
    console.log(chalk.yellow(`\n📄 File: ${file}`));
    issuesByFile[file].forEach((issue: ColorIssue) => {
      let colorizedValue = issue.value;
      if (issue.type === 'hex' && /^#([a-f0-9]{3}){1,2}$/i.test(issue.value)) {
        try {
          colorizedValue = chalk.hex(issue.value)(issue.value);
        } catch (e) { /* ignore */ }
      }
      console.log(
        `  ${chalk.cyan(`L${issue.line}`)}: ${chalk.magenta(issue.type.toUpperCase())} ${colorizedValue}`
      );
      console.log(`     ${chalk.gray(issue.text)}`);
    });
  }
}

function showScanSummary(): void {
  console.log(chalk.bold.underline('\n📊 Scan Summary:'));
  console.log(`📂 Files Scanned: ${chalk.blue(stats.filesScanned)}`);
  const issuesColor = stats.colorIssuesFound > 0 ? chalk.red : chalk.green;
  console.log(`⚠️ Non-Theme Hardcoded Colors: ${issuesColor(stats.colorIssuesFound)}`);

  if (stats.colorIssuesFound > 0) {
    console.log(chalk.yellow('\n💡 Suggestion: Replace hardcoded colors with theme variables or Tailwind classes.'));
    console.log(chalk.dim('   (e.g., use `text-primary` or `hsl(var(--primary-color))` instead of direct hex/rgb values)'));
    console.log(chalk.dim('   Add intentional hardcoded colors to `ALLOWED_HARDCODED_COLORS` in this script if they are exceptions.'));
  }
}

async function main(): Promise<void> {
  console.log(chalk.blue.bold('🔍 Starting project color usage scan...\n'));
  let allProcessingPromises: Promise<void>[] = [];
  for (const dir of DIRECTORIES_TO_SCAN) {
    const fullDir = path.resolve(process.cwd(), dir);
    if (await fs.pathExists(fullDir)) {
      const dirPromises = await walkDirectoryAndProcessFiles(fullDir);
      allProcessingPromises = allProcessingPromises.concat(dirPromises);
    } else {
      console.warn(chalk.yellow(`⚠️ Directory not found, skipping: ${fullDir}`));
    }
  }
  await Promise.all(allProcessingPromises);
  showThemeColors();
  showIssuesReport();
  showScanSummary();
  if (stats.colorIssuesFound > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main().catch(error => {
  const err = error as Error;
  console.error(chalk.red.bold('\n❌ An unexpected error occurred during the scan:'), err.message);
  if (err.stack) {
    console.error(err.stack);
  }
  process.exit(1);
});
