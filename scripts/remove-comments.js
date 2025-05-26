const fs = require('fs');
const path = require('path');

// Function to create a file backup
function backupFile(filePath, backupDir) {
  const fileName = path.basename(filePath);
  const backupPath = path.join(backupDir, fileName);
  
  try {
    fs.mkdirSync(backupDir, { recursive: true });
    fs.copyFileSync(filePath, backupPath);
    console.log(`✅ Backup created: ${fileName}`);
    return true;
  } catch (error) {
    console.error(`❌ Error creating backup for ${fileName}:`, error.message);
    return false;
  }
}

// Function to remove only comments from a file
function removeComments(filePath) {
  try {
    // Read original content
    const originalContent = fs.readFileSync(filePath, 'utf8');
    const originalSize = Buffer.byteLength(originalContent, 'utf8');
    
    // Only remove comments
    const cleanedContent = originalContent.replace(/<!--[\s\S]*?-->/g, '');
    
    // Check if SVG is still valid
    if (!cleanedContent.includes('<svg') || !cleanedContent.includes('</svg>')) {
      throw new Error('Comment removal resulted in an invalid SVG');
    }
    
    // Check if there were any changes
    if (Buffer.byteLength(cleanedContent, 'utf8') >= originalSize) {
      console.log(`ℹ️  ${path.basename(filePath)}: No comments removed`);
      return false;
    }
    
    // Escrever o arquivo limpo
    fs.writeFileSync(filePath, cleanedContent);
    
    const cleanedSize = Buffer.byteLength(cleanedContent, 'utf8');
    const saved = ((originalSize - cleanedSize) / originalSize * 100).toFixed(2);
    
    console.log(`✅ ${path.basename(filePath)}: ${originalSize} bytes → ${cleanedSize} bytes (${saved}% menor)`);
    return true;
    
  } catch (error) {
    console.error(`❌ Erro ao processar ${path.basename(filePath)}:`, error.message);
    return false;
  }
}

// Main function
async function main() {
  try {
    const logosDir = path.join(process.cwd(), 'public', 'img', 'LOGO VISTA NOVA');
    console.log(`Looking for SVG files in: ${logosDir}`);
    
    // List all SVG files in the directory
    let files = [];
    try {
      files = fs.readdirSync(logosDir)
        .filter(file => file.toLowerCase().endsWith('.svg'));
    } catch (error) {
      console.error(`❌ Error reading directory: ${error.message}`);
      return;
    }
    
    if (files.length === 0) {
      console.log('No SVG files found to process.');
      return;
    }
    
    console.log(`Encontrados ${files.length} arquivos SVG para processar.`);
    
    // Create backup directory
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(logosDir, 'backup', `backup-${timestamp}`);
    
    // Processar cada arquivo SVG
    let successCount = 0;
    for (const file of files) {
      const filePath = path.join(logosDir, file);
      
      try {
        // Check if file exists and is a valid SVG
        const stats = fs.statSync(filePath);
        if (!stats.isFile()) {
          console.log(`⚠️  ${file} is not a file, skipping...`);
          continue;
        }
        
        const content = fs.readFileSync(filePath, 'utf8');
        if (!content.includes('<svg') || !content.includes('</svg>')) {
          console.log(`⚠️  ${file} doesn't seem to be a valid SVG, skipping...`);
          continue;
        }
        
        // Criar backup antes de processar
        if (backupFile(filePath, backupDir)) {
          // Remove only comments
          const success = removeComments(filePath);
          if (success) successCount++;
        }
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message);
      }
    }
    
    console.log(`\n✅ Done! ${successCount} out of ${files.length} files processed successfully.`);
    console.log(`Original files backup available at: ${backupDir}`);
    
  } catch (error) {
    console.error('❌ Error during SVG processing:', error.message);
    process.exit(1);
  }
}

// Executar o script
main();
