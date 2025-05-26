const fs = require('fs');
const path = require('path');

// Diretório raiz do projeto
const rootDir = path.join(process.cwd(), 'src');

// Padrões de busca e substituição
const patterns = [
  {
    search: /"\/img\/partners\//g,
    replace: '"/assets/logos/'
  }
];

// Função para processar um arquivo
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    patterns.forEach(({ search, replace }) => {
      const newContent = content.replace(search, replace);
      if (newContent !== content) {
        modified = true;
        content = newContent;
      }
    });

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Atualizado: ${path.relative(process.cwd(), filePath)}`);
    }
  } catch (error) {
    console.error(`Erro ao processar ${filePath}:`, error);
  }
}

// Função para percorrer diretórios recursivamente
function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.jsx')) {
      processFile(filePath);
    }
  });
}

// Iniciar a busca a partir do diretório src
console.log('Atualizando referências de imagens...');
walkDir(rootDir);
console.log('Atualização concluída!');
