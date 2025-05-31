import sharp from 'sharp';
import fs from 'fs-extra'; // Using fs-extra for mkdirs and robust file system operations
import path from 'path';
// No need for promisify if using fs-extra's promise-based functions or Node's native fs.promises

// Type for favicon configuration
interface FaviconConfig {
  size: number | [number, number]; // Can be a single number for square or [width, height]
  filename: string;
  format: 'png' | 'ico'; // Extend as needed
  // Add other specific options if necessary for certain icons
}

// Configurations
const CWD = process.cwd(); // Get current working directory once
const inputSvg = path.resolve(CWD, 'public/assets/brand/icone.svg');
const outputDir = path.resolve(CWD, 'public/icons');

// Favicon sizes and filenames
const faviconConfig: FaviconConfig[] = [
  // Standard favicons (PNG)
  { size: 16, filename: 'favicon-16x16.png', format: 'png' },
  { size: 32, filename: 'favicon-32x32.png', format: 'png' },
  { size: 48, filename: 'favicon-48x48.png', format: 'png' },
  
  // Apple Touch Icons (PNG)
  { size: 180, filename: 'apple-touch-icon.png', format: 'png' },
  
  // Android/Chrome (PNG)
  { size: 192, filename: 'android-chrome-192x192.png', format: 'png' },
  { size: 512, filename: 'android-chrome-512x512.png', format: 'png' },
  
  // Windows Metro (PNG)
  { size: 70, filename: 'mstile-70x70.png', format: 'png' },
  { size: 144, filename: 'mstile-144x144.png', format: 'png' },
  { size: 150, filename: 'mstile-150x150.png', format: 'png' },
  { size: 310, filename: 'mstile-310x310.png', format: 'png' },
  // Example for non-square: { size: [310, 150], filename: 'mstile-310x150.png', format: 'png' },

  // ICO format
  { size: 32, filename: 'favicon.ico', format: 'ico' },
];

// Helper function to generate a single image
async function generateImage(config: FaviconConfig): Promise<void> {
  const { size, filename, format } = config;
  const outputPath = path.join(outputDir, filename);
  
  const baseSharpInstance = sharp(inputSvg);

  let resizeOptions: sharp.ResizeOptions = {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 }, // Transparent background
  };

  if (typeof size === 'number') {
    resizeOptions.width = size;
    resizeOptions.height = size;
  } else {
    resizeOptions.width = size[0];
    resizeOptions.height = size[1];
  }

  try {
    let sharpOperation = baseSharpInstance.resize(resizeOptions);

    if (format === 'png') {
      sharpOperation = sharpOperation.png({ quality: 90, adaptiveFiltering: true });
    }
    // Sharp infers ICO format from the .ico extension in toFile.

    await sharpOperation.toFile(outputPath);
    console.log(`Generated: ${outputPath}`);
  } catch (error) {
    const err = error as Error;
    console.error(`Error generating ${outputPath}:`, err.message);
    throw err; // Re-throw to be caught by Promise.all
  }
}

// Generate site.webmanifest
async function generateManifest(): Promise<void> {
  const manifest = {
    name: 'Vista Nova',
    short_name: 'Vista Nova',
    description: 'Especialista em intermediação de crédito', // Make sure this is accurate
    start_url: '/',
    display: 'standalone',
    background_color: '#0E454E', // Ensure this matches your brand's dark theme or primary color
    theme_color: '#0E454E',      // Ensure this matches your brand and viewport.themeColor
    orientation: 'portrait',
    icons: [
      {
        src: '/icons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable' // 'maskable' is good for adaptive icons
      },
      {
        src: '/icons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: "/icons/apple-touch-icon.png", // For PWAs on iOS
        sizes: "180x180",
        type: "image/png"
      },
    ]
  };
  
  const manifestPath = path.resolve(CWD, 'public/site.webmanifest');
  try {
    await fs.writeJson(manifestPath, manifest, { spaces: 2 }); // fs-extra's writeJson
    console.log(`Generated: ${manifestPath}`);
  } catch (error) {
    const err = error as Error;
    console.error(`Error generating ${manifestPath}:`, err.message);
    throw err;
  }
}

// Main function to generate all assets
async function generateAssets(): Promise<void> {
  console.log('🚀 Starting icon and manifest generation...\n');

  // Check if input file exists
  if (!fs.existsSync(inputSvg)) {
    console.error(`Error: Input SVG file not found at ${inputSvg}`);
    process.exit(1); // Exit if input is missing
  }

  // Create output directory if it doesn't exist
  try {
    await fs.ensureDir(outputDir); // fs-extra's ensureDir creates if not exists
    console.log(`Output directory ensured: ${outputDir}`);
  } catch (error) {
    const err = error as Error;
    console.error(`Error ensuring output directory ${outputDir}:`, err.message);
    process.exit(1);
  }

  try {
    // Generate all favicons in parallel
    const imageGenerationPromises = faviconConfig.map(config => generateImage(config));
    await Promise.all(imageGenerationPromises);
    
    // Generate the manifest file
    await generateManifest();
    
    console.log('\n✅ All icons and manifest generated successfully!');
    console.log(`📁 Check the folder: ${outputDir} and public/site.webmanifest`);

  } catch (error) {
    // Errors from generateImage or generateManifest will be caught here
    console.error('\n❌ Error during asset generation. See details above.');
    process.exit(1); // Exit with error code
  }
}

// Execute the generation process
generateAssets().catch(() => {
  // Catch unhandled rejections from generateAssets itself, though inner try/catches should handle most.
  process.exit(1);
});