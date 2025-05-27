const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processLogo() {
  try {
    const inputPath = path.join(__dirname, '..', 'public', 'assets', 'brand', 'VISTA NOVA', '1. LOGOS', '3_2.png');
    const outputPath = path.join(__dirname, '..', 'public', 'assets', 'brand', 'processed', 'logo-default.png');
    
    console.log(`Processando a imagem: ${inputPath}`);
    
    // Carrega a imagem e garante que o canal alfa (transparência) seja preservado
    await sharp(inputPath)
      .ensureAlpha() // Garante que a imagem tenha um canal alfa
      .toFile(outputPath);
      
    console.log(`Imagem processada e salva em: ${outputPath}`);
  } catch (error) {
    console.error('Erro ao processar a logo:', error);
    process.exit(1);
  }
}

processLogo();
