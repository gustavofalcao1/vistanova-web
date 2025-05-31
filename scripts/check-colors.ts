#!/usr/bin/env node
/**
 * Script to check color usage in the project.
 * Verifies if colors are being used correctly according to the theme.
 * Reports hardcoded colors that are not part of the defined theme.
 */

import fs from 'fs-extra'; // Using fs-extra for promise-based fs and ensureDir
import path from 'path';
import chalk from 'chalk'; // For colored console output

// --- Configuration ---
// Adjust this path if your script is located elsewhere relative to src/
import themeColorsDefinition from '../src/styles/tokens/colors'; // [cite: uploaded:gustavofalcao1/vistanova-web/vistanova-web-f5b0e89799904e23933420989f1177a093271f38/src/styles/tokens/colors.ts]

const DIRECTORIES_TO_SCAN: string[] = [
  'src/app',
  'src/components',
  'src/styles', // Also scan styles to find hardcoded values not using CSS variables if applicable
];

const FILE_EXTENSIONS_TO_SCAN: string[] = ['.tsx', '.ts', '.css', '.scss']; // Removed .js, .jsx assuming a TS-first project

// Regex for finding colors
const HEX_COLOR_REGEX = /#([a-f0-9]{3}){1,2}\b/gi; // Matches #rgb, #rrggbb
const RGB_COLOR_REGEX = /rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(?:\s*,\s*(?:0|1|0?\.\d+)\s*)?\)/gi; // Matches rgb() and rgba()

// Allow list for specific hex/rgb values that are known and accepted (e.g., black/white not part of theme)
const ALLOWED_HARDCODED_COLORS: Set<string> = new Set([
  '#000', '#000000', // Black
  '#fff', '#ffffff', // White
  'transparent',    // Allow 'transparent' keyword
  // Add any other specific color values you want to ignore
]);

// --- Types ---
interface ColorIssue {
  type: 'hex' | 'rgb' | 'other-css'; // 'other-css' for non-hex/rgb in CSS properties
  value: string; // The detected color string
  file: string;
  line: number;
  text: string; // The line of code where it was found
}

interface Stats {
  filesScanned: number;
  colorIssuesFound: number;
  issues: ColorIssue[];
  // Optional: could track unique non-theme colors found
}

// --- Script Logic ---

// Flatten theme colors into a Set of normalized hex values for quick lookup
function getFlatThemeColors(colors: Record<string, any>): Set<string> {
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
  recurse(colors);
  return flatColors;
}

const THEME_COLOR_VALUES: Set<string> = getFlatThemeColors(themeColorsDefinition);

const stats: Stats = {
  filesScanned: 0,
  colorIssuesFound: 0,
  issues: [],
};

/**
 * Extracts and validates colors from a line of text.
 * @param text Text content of the line.
 * @param filePath Path to the file.
 * @param lineNumber Line number in the file.
 */
function analyzeLineForColors(text: string, filePath: string, lineNumber: number): void {
  let match;

  // Check for HEX colors
  while ((match = HEX_COLOR_REGEX.exec(text)) !== null) {
    const color = match[0].toLowerCase();
    if (!THEME_COLOR_VALUES.has(color) && !ALLOWED_HARDCODED_COLORS.has(color)) {
      stats.colorIssuesFound++;
      stats.issues.push({
        type: 'hex',
        value: match[0],
        file: filePath,
        line: lineNumber,
        text: text.trim(),
      });
    }
  }

  // Check for RGB/RGBA colors
  // Normalizing RGB to check against theme is harder, so this will primarily flag them
  // unless you add specific RGB strings to ALLOWED_HARDCODED_COLORS or THEME_COLOR_VALUES (if theme uses RGB)
  while ((match = RGB_COLOR_REGEX.exec(text)) !== null) {
    const color = match[0];
    // Simple check: if your theme doesn't use RGB strings, any RGB is an issue
    // More advanced: convert RGB to HEX and check against theme (complex)
    if (!ALLOWED_HARDCODED_COLORS.has(color.toLowerCase())) { // Basic allow list check
        stats.colorIssuesFound++;
        stats.issues.push({
            type: 'rgb',
            value: color,
            file: filePath,
            line: lineNumber,
            text: text.trim(),
        });
    }
  }
  
  // Basic check for color properties in CSS/SCSS files that might use hardcoded values
  // This is a very simplistic check and might need refinement or a proper CSS parser for accuracy
  if (path.extname(filePath) === '.css' || path.extname(filePath) === '.scss') {
    const cssColorPropertyRegex = /(?:color|background(?:-color)?|border(?:-color)?|fill|stroke)\s*:\s*([^;]+);?/gi;
    while((match = cssColorPropertyRegex.exec(text)) !== null) {
        const colorValue = match[1].trim().toLowerCase();
        // Avoid flagging CSS variables or keywords like 'inherit', 'currentColor'
        if (!colorValue.startsWith('var(') && 
            !THEME_COLOR_VALUES.has(colorValue) && 
            !ALLOWED_HARDCODED_COLORS.has(colorValue) &&
            colorValue !== 'inherit' && colorValue !== 'currentColor' && colorValue !== 'transparent' &&
            !RGB_COLOR_REGEX.test(colorValue) && // Already handled by RGB check
            !HEX_COLOR_REGEX.test(colorValue) // Already handled by HEX check
        ) {
            // This flags named colors (red, blue) or other functions if not in theme/allowed
            if (colorValue.match(/^[a-z]+$/i) || colorValue.includes('hsl(')) { // Example: catch named colors or HSL
                 stats.colorIssuesFound++;
                 stats.issues.push({
                    type: 'other-css',
                    value: match[1].trim(),
                    file: filePath,
                    line: lineNumber,
                    text: text.trim(),
                });
            }
        }
    }
  }
}

/**
 * Processes a single file to check for color usage.
 * @param filePath Path to the file.
 */
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

/**
 * Traverses a directory recursively and collects promises for file processing.
 * @param dir Path to the directory.
 * @returns A promise that resolves to an array of promises for file processing.
 */
async function walkDirectoryAndProcessFiles(dir: string): Promise<Promise<void>[]> {
  let collectedPromises: Promise<void>[] = [];
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === 'dist') continue; // Skip common large dirs
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


/**
 * Displays a summary of the theme colors.
 */
function showThemeColors(): void {
  console.log(chalk.bold.underline('\n🎨 Defined Theme Colors (Normalized Hex):'));
  if (THEME_COLOR_VALUES.size === 0) {
    console.log(chalk.yellow('No theme colors loaded or found.'));
    return;
  }
  THEME_COLOR_VALUES.forEach(color => {
    // Attempt to find the original key for better display (optional, can be complex)
    console.log(`  ${chalk.hex(color)('■')} ${color}`);
  });
}

/**
 * Displays a summary of the issues found.
 */
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
    issuesByFile[file].forEach(issue => {
      console.log(
        `  ${chalk.cyan(`L${issue.line}`)}: ${chalk.magenta(issue.type.toUpperCase())} ${chalk.hex(issue.type === 'hex' ? issue.value : '#CCCCCC')(issue.value)}`
      );
      console.log(`     ${chalk.gray(issue.text)}`);
    });
  }
}

/**
 * Displays a final summary of the scan.
 */
function showScanSummary(): void {
  console.log(chalk.bold.underline('\n📊 Scan Summary:'));
  console.log(`📂 Files Scanned: ${chalk.blue(stats.filesScanned)}`);
  const issuesColor = stats.colorIssuesFound > 0 ? chalk.red : chalk.green;
  console.log(`⚠️ Non-Theme Hardcoded Colors: ${issuesColor(stats.colorIssuesFound)}`);

  if (stats.colorIssuesFound > 0) {
    console.log(chalk.yellow('\n💡 Suggestion: Replace hardcoded colors with theme variables or Tailwind classes.'));
    console.log(chalk.dim('   (e.g., use `text-primary` or `var(--primary-color)` instead of direct hex/rgb values)'));
    console.log(chalk.dim('   Add intentional hardcoded colors to `ALLOWED_HARDCODED_COLORS` in this script if they are exceptions.'));
  }
}

// Main execution function
async function main(): Promise<void> {
  console.log(chalk.blue.bold('🔍 Starting project color usage scan...\n'));

  let allProcessingPromises: Promise<void>[] = [];
  for (const dir of DIRECTORIES_TO_SCAN) {
    const fullDir = path.resolve(process.cwd(), dir); // Ensure absolute path from CWD
    if (await fs.pathExists(fullDir)) { // fs-extra's pathExists
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
    process.exit(1); // Exit with error code if issues are found
  } else {
    process.exit(0); // Exit with success
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
