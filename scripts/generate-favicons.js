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
    // Use the new logo from the branding package
    const sourceLogo = path.join(process.cwd(), 'public', 'assets', 'brand', 'VISTA NOVA', '1. LOGOS', '5.png');
    
    // Check if the file exists
    if (!fs.existsSync(sourceLogo)) {
      throw new Error(`Logo file not found at: ${sourceLogo}`);
    }
    
    console.log(`✅ Using logo file: ${sourceLogo}`);
    
    // Define output directory
    const outputDir = path.join(process.cwd(), 'public', 'favicon');
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Favicon sizes and names
    const sizes = [16, 32, 48, 96, 128, 192, 256, 384, 512];

    // Generate favicon.ico (16x16, 32x32, 48x48)
    await sharp(sourceLogo)
      .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(path.join(outputDir, 'favicon.ico'));
    console.log('✅ favicon.ico gerado com sucesso');

    // Generate favicons in different sizes
    for (const size of sizes) {
      const outputFile = path.join(outputDir, `favicon-${size}x${size}.png`);
      await sharp(sourceLogo)
        .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .toFile(outputFile);
      console.log(`✅ ${outputFile} gerado com sucesso`);
    }

    // Generate apple-touch-icon.png (180x180)
    await sharp(sourceLogo)
      .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));
    console.log('✅ apple-touch-icon.png gerado com sucesso');

    // Generate icon-192.png for Android Chrome
    await sharp(sourceLogo)
      .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(path.join(outputDir, 'icon-192.png'));
    console.log('✅ icon-192.png gerado com sucesso');

    // Generate icon-512.png for Android Chrome
    await sharp(sourceLogo)
      .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(path.join(outputDir, 'icon-512.png'));
    console.log('✅ icon-512.png gerado com sucesso');

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
