const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// Configurações
const IMG_DIR = path.join(__dirname, '..', 'public', 'assets');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'optimized-assets');
const MAX_WIDTH = 1920;
const QUALITY = 80;

// Garante que o diretório de saída existe
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Função para processar uma única imagem
async function processImage(filePath, outputPath) {
  const ext = path.extname(filePath).toLowerCase();
  const outputExt = ext === '.png' ? '.webp' : ext;
  const outputFile = outputPath.replace(/\.[^/.]+$/, '') + outputExt;
  
  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Redimensiona se for maior que a largura máxima
    const width = metadata.width > MAX_WIDTH ? MAX_WIDTH : metadata.width;
    
    // Configurações de otimização baseadas no tipo de imagem
    const options = {
      quality: QUALITY,
      ...(ext === '.png' ? { lossless: false, alphaQuality: 100 } : {}),
      ...(ext === '.jpg' || ext === '.jpeg' ? { mozjpeg: true } : {}),
    };
    
    await image
      .resize(width, null, { withoutEnlargement: true })
      .toFormat(ext === '.png' ? 'webp' : ext.replace('.', ''), options)
      .toFile(outputFile);
    
    const originalSize = (await stat(filePath)).size;
    const newSize = (await stat(outputFile)).size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(2);
    
    console.log(`✅ ${path.basename(filePath)}: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB (${savings}% menor)`);
    
    return { originalSize, newSize, savings };
  } catch (error) {
    console.error(`❌ Erro ao processar ${filePath}:`, error.message);
    return null;
  }
}

// Função para percorrer diretórios recursivamente
async function processDirectory(dir, outputDir) {
  const files = await readdir(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const fileStat = await stat(filePath);
    
    if (fileStat.isDirectory()) {
      const newOutputDir = path.join(outputDir, file);
      if (!fs.existsSync(newOutputDir)) {
        fs.mkdirSync(newOutputDir, { recursive: true });
      }
      await processDirectory(filePath, newOutputDir);
    } else if (/\.(png|jpe?g|webp)$/i.test(file)) {
      const relativePath = path.relative(IMG_DIR, dir);
      const outputPath = path.join(outputDir, relativePath, file);
      
      // Cria a estrutura de diretórios se não existir
      const outputFileDir = path.dirname(outputPath);
      if (!fs.existsSync(outputFileDir)) {
        fs.mkdirSync(outputFileDir, { recursive: true });
      }
      
      await processImage(filePath, outputPath);
    }
  }
}

// Inicia o processo
console.log('🚀 Iniciando otimização de imagens...\n');

processDirectory(IMG_DIR, OUTPUT_DIR)
  .then(() => {
    console.log('\n✨ Todas as imagens foram otimizadas!');
    console.log(`📁 Verifique a pasta: ${OUTPUT_DIR}`);
  })
  .catch(console.error);
