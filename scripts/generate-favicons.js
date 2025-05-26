const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { execSync } = require('child_process');

// Ensure sharp is installed
function ensureSharp() {
  try {
    require.resolve('sharp');
  } catch (e) {
    console.log('Installing sharp...');
    execSync('npm install sharp --save-dev', { stdio: 'inherit' });
  }
}

// Create favicons in different sizes and formats
async function generateFavicons() {
  try {
    // Try to find the logo file
    const logosDir = path.join(process.cwd(), 'public', 'img', 'LOGO VISTA NOVA');
    console.log(`Looking for files in: ${logosDir}`);
    
    // List all files in the directory
    const files = fs.readdirSync(logosDir);
    console.log('Files found:', files);
    
    // Try to find a suitable logo file
    const logoFile = files.find(file => {
      const lowerFile = file.toLowerCase();
      return (lowerFile.includes('logo') || lowerFile.includes('vista') || lowerFile.includes('nova')) && 
             (lowerFile.endsWith('.svg') || lowerFile.endsWith('.png') || lowerFile.endsWith('.jpg'));
    });

    if (!logoFile) {
      throw new Error('No logo file found in directory.');
    }
    
    const sourceLogo = path.join(logosDir, logoFile);
    console.log(`✅ Using logo file: ${sourceLogo}`);
    
    // Define output directory
    const outputDir = path.join(process.cwd(), 'public', 'assets', 'icons');
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Favicon sizes and names
    const faviconSizes = [
      { size: 16, name: 'favicon-16x16.png' },
      { size: 32, name: 'favicon-32x32.png' },
      { size: 48, name: 'favicon.ico' }, // .ico format
      { size: 192, name: 'android-chrome-192x192.png' },
      { size: 512, name: 'android-chrome-512x512.png' },
      { size: 180, name: 'apple-touch-icon.png' },
      { size: 16, name: 'favicon-16x16.ico' },
      { size: 32, name: 'favicon-32x32.ico' },
    ];

    // Generate each favicon
    for (const { size, name } of faviconSizes) {
      const outputPath = path.join(outputDir, name);
      
      try {
        await sharp(sourceLogo)
          .resize(size, size)
          .png()
          .toFile(size === 48 || name.endsWith('.ico') ? 
            outputPath.replace(/\.png$/, '.ico') : 
            outputPath
          );
        console.log(`✅ Generated: ${name}`);
      } catch (error) {
        console.error(`❌ Error generating ${name}:`, error.message);
      }
    }

    // Generate site.webmanifest
    const manifest = {
      name: 'Vista Nova',
      short_name: 'Vista Nova',
      description: 'Credit intermediaton specialist',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#2563eb',
      icons: [
        {
          src: '/assets/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/assets/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    };

    fs.writeFileSync(
      path.join(process.cwd(), 'public', 'site.webmanifest'),
      JSON.stringify(manifest, null, 2)
    );
    console.log('✅ Generated: site.webmanifest');
    
  } catch (error) {
    console.error('❌ Error generating favicons:', error.message);
    throw error; // Re-throw para ser capturado pelo bloco catch externo
  }
}

// Run the generator
(async () => {
  try {
    ensureSharp();
    await generateFavicons();
    console.log('\n🎉 Favicons generated successfully!');
  } catch (error) {
    console.error('\n❌ Error generating favicons:', error);
    process.exit(1);
  }
})();
