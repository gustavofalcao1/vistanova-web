const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

// Function to check if a file is a valid SVG
function isValidSvg(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return content.includes('<svg') && content.includes('</svg>');
  } catch (error) {
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
      console.log('No SVG files found to optimize.');
      return;
    }
    
    console.log(`Found ${files.length} SVG files to optimize.`);
    
    // Create backup directory
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(logosDir, 'backup', `backup-${timestamp}`);
    
    // Optimize each SVG file
    let successCount = 0;
    for (const file of files) {
      const filePath = path.join(logosDir, file);
      
      try {
        // Check if the file exists and is a valid SVG
        const stats = fs.statSync(filePath);
        if (!stats.isFile()) {
          console.log(`⚠️  ${file} is not a file, skipping...`);
          continue;
        }
        
        if (!isValidSvg(filePath)) {
          console.log(`⚠️  ${file} doesn't seem to be a valid SVG, skipping...`);
          continue;
        }
        
        // Get original size
        const originalSize = stats.size;
        
        // Create backup before optimizing
        if (backupFile(filePath, backupDir)) {
          // Run SVGO directly on the file with minimal options
          try {
            execSync(`svgo --multipass --precision=3 "${filePath}"`, {
              stdio: 'pipe',
              maxBuffer: 10 * 1024 * 1024, // 10MB
            });
            
            // Check if the file is still a valid SVG after optimization
            if (!isValidSvg(filePath)) {
              console.error(`❌ ${file} was corrupted during optimization, restoring from backup...`);
              // Restore from backup
              const backupPath = path.join(backupDir, file);
              fs.copyFileSync(backupPath, filePath);
              console.log(`✅ ${file} restored from backup`);
              continue;
            }
            
            const optimizedSize = fs.statSync(filePath).size;
            const saved = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);
            
            console.log(`✅ ${file}: ${originalSize} bytes → ${optimizedSize} bytes (${saved}% smaller)`);
            successCount++;
            
          } catch (error) {
            console.error(`❌ Error optimizing ${file}:`, error.message);
            // Try to restore from backup in case of error
            try {
              const backupPath = path.join(backupDir, file);
              if (fs.existsSync(backupPath)) {
                fs.copyFileSync(backupPath, filePath);
                console.log(`✅ ${file} restored from backup after error`);
              }
            } catch (restoreError) {
              console.error(`❌ Failed to restore ${file} from backup:`, restoreError.message);
            }
          }
        }
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message);
      }
    }
    
    console.log(`\n✅ Done! ${successCount} out of ${files.length} files optimized successfully.`);
    console.log(`Original files backup available at: ${backupDir}`);
    
  } catch (error) {
    console.error('❌ Error during SVG optimization:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
