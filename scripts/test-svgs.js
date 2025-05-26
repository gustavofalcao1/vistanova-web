const fs = require('fs');
const path = require('path');

async function testSvgs() {
  try {
    const logosDir = path.join(process.cwd(), 'public', 'img', 'LOGO VISTA NOVA');
    console.log(`Looking for files in: ${logosDir}`);
    
    // List all files in the directory
    const files = fs.readdirSync(logosDir);
    console.log('Files found:', files);
    
    // Filter only SVGs
    const svgFiles = files.filter(file => file.toLowerCase().endsWith('.svg'));
    console.log('\nSVG files found:', svgFiles);
    
    if (svgFiles.length === 0) {
      console.log('No SVG files found.');
      return;
    }
    
    // Show information about each SVG
    console.log('\nSVG files information:');
    for (const file of svgFiles) {
      const filePath = path.join(logosDir, file);
      const stats = fs.statSync(filePath);
      console.log(`\n${file}:`);
      console.log(`  Size: ${(stats.size / 1024).toFixed(2)} KB`);
      
      // Read the first 200 characters of the file
      const content = fs.readFileSync(filePath, 'utf8').substring(0, 200);
      console.log('  Content start:');
      console.log('  ' + content.split('\n').join('\n  '));
    }
    
  } catch (error) {
    console.error('❌ Error reading SVG files:', error.message);
  }
}

testSvgs();
