const fs = require('fs');
const path = require('path');

// Diretórios
const sourceDir = path.join(process.cwd(), 'public/img/partners');
const targetDir = path.join(process.cwd(), 'public/assets/logos');

// Criar diretório de destino se não existir
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Mover arquivos
fs.readdir(sourceDir, (err, files) => {
  if (err) {
    console.error('Erro ao ler o diretório:', err);
    return;
  }

  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    
    // Mover o arquivo
    fs.rename(sourcePath, targetPath, err => {
      if (err) {
        console.error(`Erro ao mover o arquivo ${file}:`, err);
      } else {
        console.log(`Arquivo movido: ${file}`);
      }
    });
  });
});
