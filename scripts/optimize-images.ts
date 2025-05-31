import sharp from 'sharp';
import fs from 'fs-extra'; // Using fs-extra for its promise-based and convenient methods
import path from 'path';

// Interface for image processing results (optional, but good for typing)
interface ProcessedImageResult {
  originalSize: number;
  newSize: number;
  savings: string;
  outputFile: string;
}

// Configurations
const CWD = process.cwd();
const IMG_DIR = path.resolve(CWD, 'public', 'assets');
const OUTPUT_DIR = path.resolve(CWD, 'public', 'optimized-assets');
const MAX_WIDTH = 1920;
const QUALITY = 80; // General quality for lossy formats like WebP

// Function to process a single image
async function processImage(filePath: string, baseOutputDir: string): Promise<ProcessedImageResult | null> {
  const ext = path.extname(filePath).toLowerCase();
  const originalFileNameWithoutExt = path.basename(filePath, ext);

  // Determine target format and extension
  let targetFormat: 'jpeg' | 'png' | 'webp' | 'gif' | string = ext.replace('.', '');
  let outputExt = ext;

  if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
    targetFormat = 'webp';
    outputExt = '.webp';
  }

  const finalOutputFileName = originalFileNameWithoutExt + outputExt;
  // Construct the full output path maintaining the subdirectory structure relative to IMG_DIR
  const relativePathFromImgDir = path.relative(IMG_DIR, path.dirname(filePath));
  const finalOutputDir = path.join(baseOutputDir, relativePathFromImgDir);
  const finalOutputFile = path.join(finalOutputDir, finalOutputFileName);

  try {
    // Ensure the specific output directory for this file exists
    await fs.ensureDir(finalOutputDir);

    const image = sharp(filePath);
    const metadata = await image.metadata();

    if (!metadata.width) {
        console.warn(`⚠️ Could not read metadata for ${filePath}. Skipping.`);
        return null;
    }
    
    const width = metadata.width > MAX_WIDTH ? MAX_WIDTH : metadata.width;
    
    // Specific options for each format conversion
    let formatOptions: sharp.JpegOptions | sharp.PngOptions | sharp.WebpOptions | sharp.GifOptions | sharp.AvifOptions = { quality: QUALITY };
    
    if (targetFormat === 'webp') {
      formatOptions = {
        ...formatOptions, // Includes quality
        ...(ext === '.png' ? { lossless: false, alphaQuality: 100 } : {}), // WebP from PNG
      } as sharp.WebpOptions;
    } else if (targetFormat === 'jpeg' || targetFormat === 'jpg') {
      formatOptions = { ...formatOptions, mozjpeg: true } as sharp.JpegOptions;
    } else if (targetFormat === 'png') {
        formatOptions = { ...formatOptions, compressionLevel: 8, adaptiveFiltering: true } as sharp.PngOptions;
    }
    
    await image
      .resize(width, null, { withoutEnlargement: true })
      .toFormat(targetFormat as keyof sharp.FormatEnum, formatOptions) // Cast to keyof FormatEnum
      .toFile(finalOutputFile);
    
    const originalSize = (await fs.stat(filePath)).size;
    const newSize = (await fs.stat(finalOutputFile)).size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(2);
    
    console.log(`✅ ${path.basename(filePath)}: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB (${savings}% smaller) [Saved at: ${finalOutputFile}]`);
    
    return { originalSize, newSize, savings, outputFile: finalOutputFile };
  } catch (error) {
    const err = error as Error;
    console.error(`❌ Error processing ${filePath}:`, err.message);
    return null; // Return null or throw, depending on how you want to handle errors in Promise.all
  }
}

// Function to recursively traverse directories and collect image file paths
async function getImagePaths(dir: string): Promise<string[]> {
  let imagePaths: string[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      imagePaths = imagePaths.concat(await getImagePaths(fullPath));
    } else if (/\.(png|jpe?g|webp)$/i.test(entry.name)) {
      imagePaths.push(fullPath);
    }
  }
  return imagePaths;
}


// Main function to orchestrate the optimization
async function optimizeAllImages(): Promise<void> {
  console.log('🚀 Starting image optimization...\n');

  // Ensure the root output directory exists
  try {
    await fs.ensureDir(OUTPUT_DIR);
    console.log(`Output directory ensured: ${OUTPUT_DIR}`);
  } catch (error) {
    const err = error as Error;
    console.error(`Error ensuring output directory ${OUTPUT_DIR}:`, err.message);
    process.exit(1);
  }

  try {
    const allImageFiles = await getImagePaths(IMG_DIR);
    if (allImageFiles.length === 0) {
        console.log('No images found to optimize.');
        return;
    }

    console.log(`Found ${allImageFiles.length} images to process.`);

    // Process all images in parallel
    const processingPromises = allImageFiles.map(filePath => processImage(filePath, OUTPUT_DIR));
    const results = await Promise.all(processingPromises);

    const successfulOptimizations = results.filter(r => r !== null).length;
    console.log(`\nSuccessfully optimized ${successfulOptimizations} out of ${allImageFiles.length} images.`);
    
    console.log('\n✨ All images have been processed!');
    console.log(`📁 Check the folder: ${OUTPUT_DIR}`);

  } catch (error) {
    // This catch is for errors in getImagePaths or Promise.all setup,
    // individual image errors are caught in processImage
    const err = error as Error;
    console.error('\n❌ A critical error occurred during the optimization process:', err.message);
    process.exit(1);
  }
}

// Execute the optimization process
optimizeAllImages().catch(() => {
  // Catch unhandled rejections from optimizeAllImages itself
  process.exit(1);
});
