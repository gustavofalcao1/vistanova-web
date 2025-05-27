const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

async function checkTransparency(imagePath) {
  try {
    const image = await loadImage(imagePath);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    
    // Desenha a imagem no canvas
    ctx.drawImage(image, 0, 0);
    
    // Obtém os dados da imagem
    const imageData = ctx.getImageData(0, 0, image.width, image.height);
    const data = imageData.data;
    
    // Verifica se há algum pixel com canal alfa < 255
    let hasTransparency = false;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] < 255) {
        hasTransparency = true;
        break;
      }
    }
    
    console.log(`A imagem ${path.basename(imagePath)} ${hasTransparency ? 'tem' : 'não tem'} transparência.`);
    return hasTransparency;
  } catch (error) {
    console.error('Erro ao verificar transparência:', error);
    return false;
  }
}

// Caminho para a imagem
const imagePath = path.join(__dirname, '..', 'public', 'assets', 'brand', 'VISTA NOVA', '1. LOGOS', '3_2.png');
checkTransparency(imagePath);
