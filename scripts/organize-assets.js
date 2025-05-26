const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

// Source and destination directories
const dirs = {
  root: path.join(process.cwd(), 'public'),
  assets: path.join(process.cwd(), 'public/assets'),
  img: path.join(process.cwd(), 'public/img'),
  
  // Destination directories
  dest: {
    partners: path.join(process.cwd(), 'public/assets/partners'),
    protocols: path.join(process.cwd(), 'public/assets/protocols'),
    images: path.join(process.cwd(), 'public/assets/images'),
    brand: path.join(process.cwd(), 'public/assets/brand'),
    brandBackup: path.join(process.cwd(), 'public/assets/brand/backup')
  }
};

// File mapping for moving assets
const fileMap = {
  // Partner images (already moved to logos)
  partners: [
    'logo-abanca.png',
    'logo-bancoctt.png',
    'logo-bankinter.png',
    'logo-bbva.png',
    'logo-bpi.png',
    'logo-cgd.png',
    'logo-cofidis.png',
    'logo-credibom.png',
    'logo-eurobic.png',
    'logo-novobanco.png',
    'logo-santander.png',
    'logo-uci.png',
    'logo-unicre.png'
  ],
  
  // Protocol images
  protocols: [
    '1.webp',
    '2.png',
    '3.png',
    'logo_amg.png',
    'logo_jm.png',
    'logo_occ.png',
    'logo_oe.webp',
    'logo_sc.png'
  ],
  
  // Loose images
  images: [
    'ab.jpg',
    'do.avif',
    'hero.avif',
    'jv.jpg'
  ],
  
  // Brand files
  brand: [
    'LoGO Horizontal 500 x 281.svg',
    'Logo 1000 por 1000 Versão fundo azul.svg',
    'Logo Horizontal 500 x 281 (Fundo verde).svg',
    'Logo Vertica 1920 x 817 ( Fundo verde).svg',
    'Logo Vertica 1920 x 817.svg',
    'Manual de Identidade - NOVA Vista Nova.pdf',
    'WhatsApp_Image_2025-05-05_at_16.01.49-removebg-preview.png',
    'neue_metana.zip'
  ]
};

// Create destination directories
async function createDirectories() {
  console.log('Creating directories...');
  for (const dir of Object.values(dirs.dest)) {
    try {
      await fs.mkdir(dir, { recursive: true });
      console.log(`✔ Created: ${path.relative(process.cwd(), dir)}`);
    } catch (error) {
      if (error.code !== 'EEXIST') {
        console.error(`Error creating directory ${dir}:`, error);
      }
    }
  }
}

// Move files to their new locations
async function moveFiles() {
  console.log('\nMoving files...');
  
  // Move partner files
  for (const file of fileMap.partners) {
    const source = path.join(dirs.assets, 'logos', file);
    const target = path.join(dirs.dest.partners, file);
    await moveFile(source, target, 'partners');
  }
  
  // Move protocol files
  for (const file of fileMap.protocols) {
    const source = path.join(dirs.img, 'protocols', file);
    const target = path.join(dirs.dest.protocols, file);
    await moveFile(source, target, 'protocols');
  }
  
  // Move loose images
  for (const file of fileMap.images) {
    const source = path.join(dirs.img, file);
    const target = path.join(dirs.dest.images, file);
    await moveFile(source, target, 'images');
  }
  
  // Move brand files
  for (const file of fileMap.brand) {
    const source = path.join(dirs.img, 'LOGO VISTA NOVA', file);
    const target = path.join(dirs.dest.brand, file);
    await moveFile(source, target, 'brand');
  }
  
  // Move backups
  try {
    const backupSource = path.join(dirs.img, 'LOGO VISTA NOVA', 'backup');
    if (await directoryExists(backupSource)) {
      await fs.rename(backupSource, dirs.dest.brandBackup);
      console.log(`✔ Moved: ${path.relative(process.cwd(), backupSource)} -> ${path.relative(process.cwd(), dirs.dest.brandBackup)}`);
    }
  } catch (error) {
    console.error('Error moving backup:', error);
  }
}

// Helper function to move a file
async function moveFile(source, target, type) {
  try {
    await fs.rename(source, target);
    console.log(`✔ Moved (${type}): ${path.basename(source)}`);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`⚠ Not found (${type}): ${path.basename(source)}`);
    } else if (error.code === 'ENOTEMPTY') {
      console.log(`⚠ Already exists (${type}): ${path.basename(source)}`);
    } else {
      console.error(`Error moving ${source}:`, error);
    }
    return false;
  }
}

// Check if a directory exists
async function directoryExists(path) {
  try {
    const stat = await fs.stat(path);
    return stat.isDirectory();
  } catch (error) {
    return false;
  }
}

// Update file references
function updateReferences() {
  console.log('\nUpdating file references...');
  
  // Search and replace patterns
  const patterns = [
    // Update partner references
    {
      search: /"\/assets\/logos\/(logo-[a-z0-9-]+\.(png|jpg|jpeg|svg|webp))"/gi,
      replace: '"/assets/partners/$1"'
    },
    // Update protocol references
    {
      search: /"\/img\/protocols\/([a-z0-9_.-]+\.(png|jpg|jpeg|svg|webp))"/gi,
      replace: '"/assets/protocols/$1"'
    },
    // Update loose image references
    ...fileMap.images.map(file => ({
      search: new RegExp(`"\/img\/${file.replace(/\./g, '\\.')}"`, 'gi'),
      replace: `"/assets/images/${file}"`
    })),
    // Update brand file references
    ...fileMap.brand.map(file => ({
      search: new RegExp(`"\/img\/LOGO VISTA NOVA\/${file.replace(/\./g, '\\.')}"`, 'gi'),
      replace: `"/assets/brand/${file}"`
    }))
  ];
  
  // Directories to search in
  const searchDirs = [
    path.join(process.cwd(), 'src')
  ];
  
  // Find and update files
  for (const dir of searchDirs) {
    try {
      const files = findFilesByExtension(dir, ['.tsx', '.ts', '.js', '.jsx', '.json']);
      
      for (const file of files) {
        try {
          let content = fs.readFileSync(file, 'utf8');
          let modified = false;
          
          for (const { search, replace } of patterns) {
            const newContent = content.replace(search, replace);
            if (newContent !== content) {
              modified = true;
              content = newContent;
            }
          }
          
          if (modified) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`✔ Updated: ${path.relative(process.cwd(), file)}`);
          }
        } catch (error) {
          console.error(`Error processing ${file}:`, error);
        }
      }
    } catch (error) {
      console.error(`Error scanning directory ${dir}:`, error);
    }
  }
}

// Find files by extension
function findFilesByExtension(dir, extensions) {
  const files = [];
  
  function walk(directory) {
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      
      if (entry.isDirectory()) {
        // Ignore node_modules and hidden directories
        if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
          walk(fullPath);
        }
      } else if (extensions.includes(path.extname(entry.name).toLowerCase())) {
        files.push(fullPath);
      }
    }
  }
  
  walk(dir);
  return files;
}

// Remove empty directories
async function removeEmptyDirectories() {
  console.log('\nRemoving empty directories...');
  
  const dirsToRemove = [
    path.join(dirs.assets, 'logos'),
    path.join(dirs.img, 'protocols'),
    path.join(dirs.img, 'LOGO VISTA NOVA')
  ];
  
  for (const dir of dirsToRemove) {
    try {
      const files = await fs.readdir(dir);
      if (files.length === 0) {
        await fs.rmdir(dir);
        console.log(`✔ Removed empty directory: ${path.relative(process.cwd(), dir)}`);
      } else {
        console.log(`⚠ Directory not empty: ${path.relative(process.cwd(), dir)}`);
      }
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error(`Error removing directory ${dir}:`, error);
      }
    }
  }
  
  // Try to remove the img directory if empty
  try {
    const files = await fs.readdir(dirs.img);
    if (files.length === 0) {
      await fs.rmdir(dirs.img);
      console.log(`✔ Removed empty directory: ${path.relative(process.cwd(), dirs.img)}`);
    } else {
      console.log(`⚠ img directory still contains files: ${files.join(', ')}`);
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error('Error checking img directory:', error);
    }
  }
}

// Main function
async function main() {
  console.log('🚀 Starting asset organization...\n');
  
  try {
    // 1. Create destination directories
    await createDirectories();
    
    // 2. Move files to their new locations
    await moveFiles();
    
    // 3. Update references in all files
    updateReferences();
    
    // 4. Clean up empty directories
    await removeEmptyDirectories();
    
    console.log('\n🎉 Asset organization completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Verify all files were moved correctly');
    console.log('2. Confirm references were updated in all files');
    console.log('3. Run the project to test everything works');
    console.log('4. Commit your changes');
    
  } catch (error) {
    console.error('❌ Error during organization:', error);
    process.exit(1);
  }
}

// Run the script
main();
