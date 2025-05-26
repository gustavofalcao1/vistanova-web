const fs = require('fs');
const https = require('https');
const path = require('path');

// Ensure the fonts directory exists
const fontsDir = path.join(__dirname, '../public/fonts');
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

// Font files to download
const fontFiles = [
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
];

// Download function
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${path.basename(filepath)}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// Download all fonts
async function downloadFonts() {
  console.log('Downloading Inter font files...');
  
  try {
    for (const font of fontFiles) {
      const filepath = path.join(fontsDir, font.filename);
      await downloadFile(font.url, filepath);
    }
    console.log('All font files downloaded successfully!');
  } catch (error) {
    console.error('Error downloading font files:', error);
    process.exit(1);
  }
}

downloadFonts();
