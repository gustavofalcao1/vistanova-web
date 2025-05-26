import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Input and output paths
const inputSvg = path.resolve(process.cwd(), 'public/img/LOGO VISTA NOVA/Logo 1000 por 1000 Versão fundo azul.svg');
const outputDir = path.resolve(process.cwd(), 'public/assets/icons');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Check if input file exists
if (!fs.existsSync(inputSvg)) {
  console.error(`Error: Input file not found at ${inputSvg}`);
  process.exit(1);
}

// Favicon sizes and filenames
const faviconSizes = [
  // Standard favicons
  { size: 16, filename: 'favicon-16x16.png' },
  { size: 32, filename: 'favicon-32x32.png' },
  { size: 48, filename: 'favicon-48x48.png' },
  
  // Apple Touch Icons
  { size: 180, filename: 'apple-touch-icon.png' },
  
  // Android/Chrome
  { size: 192, filename: 'android-chrome-192x192.png' },
  { size: 512, filename: 'android-chrome-512x512.png' },
  
  // Windows Metro
  { size: 70, filename: 'mstile-70x70.png' },
  { size: 144, filename: 'mstile-144x144.png' },
  { size: 150, filename: 'mstile-150x150.png' },
  { size: 310, filename: 'mstile-310x310.png' },
  { size: 310, filename: 'mstile-310x150.png' },
  
  // ICO format (must be last as it's a special case)
  { size: 16, filename: 'favicon.ico' },
];

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate favicons
async function generateFavicons() {
  try {
    console.log('Generating favicons from:', inputSvg);
    
    // Process each size
    for (const { size, filename } of faviconSizes) {
      const outputPath = path.join(outputDir, filename);
      
      // Special case for ICO file
      if (filename.endsWith('.ico')) {
        await sharp(inputSvg)
          .resize(size, size, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 },
          })
          .toFile(outputPath);
      } else {
        await sharp(inputSvg)
          .resize(size, size, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 },
          })
          .png()
          .toFile(outputPath);
      }
      
      console.log(`Generated: ${outputPath}`);
    }
    
    // Generate site.webmanifest
    const manifest = {
      name: 'Vista Nova',
      short_name: 'Vista Nova',
      description: 'Especialista em intermediação de crédito',
      start_url: '/',
      display: 'standalone',
      background_color: '#0e454e',
      theme_color: '#0e454e',
      orientation: 'portrait',
      icons: [
        {
          src: '/assets/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/assets/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/assets/icons/favicon-32x32.png',
          sizes: '32x32',
          type: 'image/png'
        },
        {
          src: '/assets/icons/favicon-16x16.png',
          sizes: '16x16',
          type: 'image/png'
        }
      ]
    };
    
    fs.writeFileSync(
      path.join(__dirname, '../../public/site.webmanifest'),
      JSON.stringify(manifest, null, 2)
    );
    
    console.log('Generated: site.webmanifest');
    console.log('\n✅ Favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
