const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// Configurations
const IMG_DIR = path.join(__dirname, '..', 'public', 'assets');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'optimized-assets');
const MAX_WIDTH = 1920;
const QUALITY = 80;

// Ensures the root output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Function to process a single image
async function processImage(filePath, outputPath) {
  const ext = path.extname(filePath).toLowerCase();
  // Adjustment to ensure the output extension is .webp for PNGs, or keep original for others.
  // And that the output filename preserves the original name before the extension.
  const outputFileName = path.basename(filePath, path.extname(filePath)) + (ext === '.png' ? '.webp' : ext);
  const finalOutputFile = path.join(path.dirname(outputPath), outputFileName); // outputPath here is the file path with the original extension

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Resize if larger than the maximum width
    const width = metadata.width > MAX_WIDTH ? MAX_WIDTH : metadata.width;
    
    // Optimization settings based on image type
    const options = {
      quality: QUALITY,
      ...(ext === '.png' ? { lossless: false, alphaQuality: 100 } : {}), // For webp from png
      ...(ext === '.jpg' || ext === '.jpeg' ? { mozjpeg: true } : {}),
    };
    
    await image
      .resize(width, null, { withoutEnlargement: true })
      .toFormat(ext === '.png' ? 'webp' : ext.replace('.', ''), options)
      .toFile(finalOutputFile); // Use finalOutputFile
    
    const originalSize = (await stat(filePath)).size;
    const newSize = (await stat(finalOutputFile)).size; // Use finalOutputFile
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(2);
    
    console.log(`✅ ${path.basename(filePath)}: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB (${savings}% smaller) [Saved at: ${finalOutputFile}]`);
    
    return { originalSize, newSize, savings };
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return null;
  }
}

// Function to recursively traverse directories
async function processDirectory(dir, currentOutputDir) { // Renamed outputDir to currentOutputDir for clarity
  const files = await readdir(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const fileStat = await stat(filePath);
    
    if (fileStat.isDirectory()) {
      const newSubInputDir = filePath;
      const newSubOutputDir = path.join(currentOutputDir, file); // Creates the corresponding subdirectory in the output
      
      if (!fs.existsSync(newSubOutputDir)) {
        fs.mkdirSync(newSubOutputDir, { recursive: true });
      }
      await processDirectory(newSubInputDir, newSubOutputDir); // Passes the new directories
    } else if (/\.(png|jpe?g|webp)$/i.test(file)) {
      // 'currentOutputDir' is already the correct output directory for this file.
      // The processImage function now handles the extension and filename change.
      const outputPathForImageProcessing = path.join(currentOutputDir, file); 
      
      // Ensures the directory actually exists (should have been created in the directory step)
      if (!fs.existsSync(currentOutputDir)) {
         fs.mkdirSync(currentOutputDir, { recursive: true });
      }
      
      await processImage(filePath, outputPathForImageProcessing);
    }
  }
}

// Start the process
console.log('🚀 Starting image optimization...\n');

processDirectory(IMG_DIR, OUTPUT_DIR) // Start with the root OUTPUT_DIR
  .then(() => {
    console.log('\n✨ All images have been optimized!');
    console.log(`📁 Check the folder: ${OUTPUT_DIR}`);
  })
  .catch(console.error);