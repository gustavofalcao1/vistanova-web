const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function removeBackground() {
  try {
    const inputPath = path.join(__dirname, '..', 'public', 'assets', 'brand', 'VISTA NOVA', '1. LOGOS', '3_2.png');
    const outputPath = path.join(__dirname, '..', 'public', 'assets', 'brand', 'processed', 'logo-transparent.png');
    
    console.log(`Processando a imagem: ${inputPath}`);
    
    // Cria o diretório de saída se não existir
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Processa a imagem para remover o fundo branco
    await sharp(inputPath)
      .ensureAlpha() // Garante que a imagem tenha um canal alfa
      .toColourspace('b-w') // Converte para preto e branco para facilitar a remoção do fundo
      .threshold(240) // Define um limite para remover tons claros (branco)
      .toColourspace('b-w') // Garante que a saída seja em preto e branco
      .toFile(outputPath);
    
    console.log(`Imagem processada e salva em: ${outputPath}`);
  } catch (error) {
    console.error('Erro ao processar a imagem:', error);
    process.exit(1);
  }
}

removeBackground();
