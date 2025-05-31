import fs from 'fs-extra'; // Using fs-extra for ensureDir and promise-based operations
import https from 'https';
import path from 'path';
import { Stream } from 'stream'; // For typing the response stream

// Interface for font file configuration
interface FontFileConfig {
  url: string;
  filename: string;
}

// Configurations
const CWD = process.cwd();
const FONTS_DIR = path.resolve(CWD, 'public/fonts');

// Font files to download
const FONT_FILES: FontFileConfig[] = [
  {
    url: 'https://rsms.me/inter/font-files/Inter-Regular.woff2',
    filename: 'Inter-Regular.woff2',
  },
  {
    url: 'https://rsms.me/inter/font-files/Inter-Medium.woff2',
    filename: 'Inter-Medium.woff2',
  },
  {
    url: 'https://rsms.me/inter/font-files/Inter-SemiBold.woff2',
    filename: 'Inter-SemiBold.woff2',
  },
  {
    url: 'https://rsms.me/inter/font-files/Inter-Bold.woff2',
    filename: 'Inter-Bold.woff2',
  },
  // Add other font weights/styles if needed
  // {
  //   url: 'https://rsms.me/inter/font-files/Inter-Italic.woff2',
  //   filename: 'Inter-Italic.woff2',
  // },
  // {
  //   url: 'https://rsms.me/inter/font-files/Inter-BoldItalic.woff2',
  //   filename: 'Inter-BoldItalic.woff2',
  // },
];

// Download function for a single file
function downloadFile(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if file already exists
    if (fs.existsSync(filepath)) {
      console.log(`ℹ️ ${path.basename(filepath)} already exists. Skipping download.`);
      resolve();
      return;
    }

    const file = fs.createWriteStream(filepath);
    const request = https.get(url, (response: Stream & { statusCode?: number }) => {
      if (response.statusCode !== 200) {
        fs.unlink(filepath, () => {}); // Delete the empty file on error (like 404)
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        return;
      }
      response.pipe(file);
    });

    file.on('finish', () => {
      file.close();
      console.log(`✅ Downloaded ${path.basename(filepath)} to ${filepath}`);
      resolve();
    });

    request.on('error', (err) => {
      fs.unlink(filepath, () => {}); // Attempt to delete file on request error
      console.error(`❌ Error downloading ${url}:`, err.message);
      reject(err);
    });

    file.on('error', (err) => { // Handle stream write errors
        fs.unlink(filepath, () => {});
        console.error(`❌ Error writing file ${filepath}:`, err.message);
        reject(err);
    });
  });
}

// Main function to download all fonts
async function downloadAllFonts(): Promise<void> {
  console.log('🚀 Starting font download process...');

  try {
    // Ensure the fonts directory exists
    await fs.ensureDir(FONTS_DIR);
    console.log(`Font directory ensured: ${FONTS_DIR}`);

    const downloadPromises = FONT_FILES.map(font => {
      const filepath = path.join(FONTS_DIR, font.filename);
      return downloadFile(font.url, filepath);
    });

    await Promise.all(downloadPromises);
    console.log('\n✨ All specified font files processed successfully!');

  } catch (error) {
    // Errors from individual downloads (if not caught and re-thrown) or Promise.all
    const err = error as Error;
    console.error('\n❌ An error occurred during the font download process:', err.message);
    process.exit(1); // Exit with error code
  }
}

// Execute the download process
downloadAllFonts().catch(() => {
  // Catch unhandled rejections from downloadAllFonts itself
  process.exit(1);
});
