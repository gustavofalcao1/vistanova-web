const fs = require('fs');
const path = require('path');

// Regex patterns for SVG cleaning
const SVG_CLEANUP_PATTERNS = [
  // Remove comments
  /<!--.*?-->/gs,
  // Remover metadados do Inkscape
  /<sodipodi:namedview.*?<\/sodipodi:namedview>/gs,
  // Remover metadados do Adobe
  /<metadata>.*?<\/metadata>/gs,
  // Remove unnecessary attributes
  /\s+(?:id|sodipodi:[^=\s]+|inkscape:[^=\s]+)="[^"]*"/g,
  // Remover espaços em branco extras
  /\s+/g,
  // Remove spaces before tag closing
  /\s+>/g,
  // Remove unnecessary quotes
  /""/g
];

// Function to clean an SVG
function cleanSvg(content) {
  let cleaned = content;
  
  // Apply all replacements
  SVG_CLEANUP_PATTERNS.forEach(pattern => {
    cleaned = cleaned.replace(pattern, ' ');
  });
  
  // Remover espaços em branco extras
  cleaned = cleaned.trim();
  
  return cleaned;
}

// Main function
async function optimizeSvgs() {
  try {
    const logosDir = path.join(process.cwd(), 'public', 'img', 'LOGO VISTA NOVA');
    console.log(`Procurando arquivos SVG em: ${logosDir}`);
    
    // List all SVG files in the directory
    const files = fs.readdirSync(logosDir).filter(file => 
      file.toLowerCase().endsWith('.svg')
    );
    
    if (files.length === 0) {
      console.log('Nenhum arquivo SVG encontrado para otimizar.');
      return;
    }
    
    console.log(`Encontrados ${files.length} arquivos SVG para otimizar.`);
    
    // Criar backup dos arquivos originais
    const backupDir = path.join(logosDir, 'backup');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const currentBackupDir = path.join(backupDir, `backup-${timestamp}`);
    fs.mkdirSync(currentBackupDir);
    
    console.log(`Criando backup em: ${currentBackupDir}`);
    
    // Fazer backup dos arquivos originais
    for (const file of files) {
      const source = path.join(logosDir, file);
      const dest = path.join(currentBackupDir, file);
      fs.copyFileSync(source, dest);
      console.log(`✅ Backup criado: ${file}`);
    }
    
    // Otimizar cada arquivo SVG
    let successCount = 0;
    for (const file of files) {
      try {
        const filePath = path.join(logosDir, file);
        const originalContent = fs.readFileSync(filePath, 'utf8');
        const originalSize = Buffer.byteLength(originalContent, 'utf8');
        
        // Clean SVG content
        const cleanedContent = cleanSvg(originalContent);
        const cleanedSize = Buffer.byteLength(cleanedContent, 'utf8');
        
        // Write cleaned content back to file
        fs.writeFileSync(filePath, cleanedContent);
        
        const saved = ((originalSize - cleanedSize) / originalSize * 100).toFixed(2);
        console.log(`✅ ${file}: ${originalSize} bytes → ${cleanedSize} bytes (${saved}% smaller)`);
        successCount++;
        
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message);
      }
    }
    
    console.log(`\n✅ Done! ${successCount} out of ${files.length} files optimized successfully.`);
    console.log(`Original files backup available at: ${currentBackupDir}`);
    
  } catch (error) {
    console.error('❌ Error during SVG optimization:', error.message);
    process.exit(1);
  }
}

// Run optimization
optimizeSvgs();
