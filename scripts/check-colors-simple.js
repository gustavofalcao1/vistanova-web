#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Caminho para as cores do tema
const themePath = path.join(__dirname, '../src/styles/tokens/colors.ts');
const themeColors = require(themePath);

// Diretórios para verificar
const DIRECTORIES = [
  'src/app',
  'src/components',
  'src/styles',
];

// Extensões de arquivo para verificar
const FILE_EXTENSIONS = ['.tsx', '.ts', '.js', '.jsx', '.css', '.scss'];

// Expressões regulares para encontrar cores
const COLOR_REGEX = {
  hex: /#([a-f0-9]{3}){1,2}\b/gi,
  rgb: /(rgb|rgba)\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(?:\s*,\s*[01]?\d?\d?\s*)?\)/gi,
  colorFunc: /(?:color|background(?:-color)?|border(?:-color)?|fill|stroke)\s*:[^;{}]*?(#|rgb|hsl|hwb|lab|lch|oklab|oklch|color)/gi,
};

// Resultados
const results = {
  filesScanned: 0,
  issues: [],
  colors: new Set(),
};

/**
 * Processa um arquivo em busca de cores
 */
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      // Verifica cada tipo de cor
      Object.entries(COLOR_REGEX).forEach(([type, regex]) => {
        let match;
        while ((match = regex.exec(line)) !== null) {
          const color = match[0];
          results.colors.add(color);
          results.issues.push({
            type,
            color,
            file: path.relative(process.cwd(), filePath),
            line: index + 1,
            text: line.trim(),
          });
        }
      });
    });
    
    results.filesScanned++;
  } catch (error) {
    console.error(`Erro ao processar ${filePath}:`, error.message);
  }
}

/**
 * Percorre diretórios recursivamente
 */
function walkDir(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      walkDir(fullPath);
    } else if (FILE_EXTENSIONS.includes(path.extname(file.name).toLowerCase())) {
      processFile(fullPath);
    }
  }
}

/**
 * Exibe os resultados
 */
function showResults() {
  console.log('\n=== Verificação de Cores ===\n');
  
  // Mostra as cores do tema
  console.log('Cores do tema:');
  const printColors = (colors, prefix = '') => {
    Object.entries(colors).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        printColors(value, `${prefix}${key}.`);
      } else if (typeof value === 'string' && value.startsWith('#')) {
        console.log(`  ${prefix}${key}: ${value}`);
      }
    });
  };
  printColors(themeColors);
  
  // Mostra problemas encontrados
  if (results.issues.length > 0) {
    console.log('\nProblemas encontrados:');
    
    // Agrupa por arquivo
    const issuesByFile = results.issues.reduce((acc, issue) => {
      if (!acc[issue.file]) acc[issue.file] = [];
      acc[issue.file].push(issue);
      return acc;
    }, {});
    
    // Exibe problemas por arquivo
    Object.entries(issuesByFile).forEach(([file, issues]) => {
      console.log(`\n${file}:`);
      issues.forEach(issue => {
        console.log(`  Linha ${issue.line}: [${issue.type}] ${issue.color}`);
        console.log(`  ${issue.text}`);
      });
    });
  } else {
    console.log('\n✅ Nenhum problema encontrado!');
  }
  
  // Resumo
  console.log('\n=== Resumo ===');
  console.log(`Arquivos verificados: ${results.filesScanned}`);
  console.log(`Cores encontradas: ${results.colors.size}`);
  console.log(`Problemas encontrados: ${results.issues.length}`);
}

// Executa a verificação
console.log('Iniciando verificação de cores...');
DIRECTORIES.forEach(dir => {
  if (fs.existsSync(dir)) {
    walkDir(dir);
  } else {
    console.warn(`Aviso: Diretório não encontrado: ${dir}`);
  }
});

// Exibe os resultados
showResults();

// Retorna código de saída apropriado
process.exit(results.issues.length > 0 ? 1 : 0);
