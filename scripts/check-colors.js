#!/usr/bin/env node
/**
 * Script para verificar o uso de cores no projeto
 * Verifica se as cores estão sendo usadas corretamente de acordo com o tema
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');

// Cores do tema
const themeColors = require('../src/styles/tokens/colors');

// Diretórios para verificar
const DIRECTORIES = [
  'src/app',
  'src/components',
  'src/styles',
];

// Extensões de arquivo para verificar
const FILE_EXTENSIONS = ['.tsx', '.ts', '.js', '.jsx', '.css', '.scss'];

// Cores hexadecimais para verificar
const hexColorRegex = /#([a-f0-9]{3}){1,2}\b/gi;
const rgbColorRegex = /(rgb|rgba)\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(?:\s*,\s*[01]?\d?\d?\s*)?\)/gi;
const colorFunctionRegex = /(?:color|background(?:-color)?|border(?:-color)?|fill|stroke)\s*:[^;{}]*?(#|rgb|hsl|hwb|lab|lch|oklab|oklch|color)/gi;

// Estatísticas
const stats = {
  filesScanned: 0,
  colorIssues: 0,
  hexColors: new Set(),
  rgbColors: new Set(),
  colorFunctions: new Set(),
  issues: [],
};

/**
 * Extrai todas as cores de um texto
 * @param {string} text Texto para extrair cores
 * @param {string} filePath Caminho do arquivo
 * @param {number} lineNumber Número da linha
 */
function extractColors(text, filePath, lineNumber) {
  // Verifica cores hexadecimais
  let match;
  while ((match = hexColorRegex.exec(text)) !== null) {
    const color = match[0];
    stats.hexColors.add(color);
    stats.colorIssues++;
    stats.issues.push({
      type: 'hex',
      color,
      file: filePath,
      line: lineNumber,
      text: text.trim(),
    });
  }

  // Verifica cores RGB/RGBA
  while ((match = rgbColorRegex.exec(text)) !== null) {
    const color = match[0];
    stats.rgbColors.add(color);
    stats.colorIssues++;
    stats.issues.push({
      type: 'rgb',
      color,
      file: filePath,
      line: lineNumber,
      text: text.trim(),
    });
  }

  // Verifica funções de cor CSS
  while ((match = colorFunctionRegex.exec(text)) !== null) {
    const func = match[0];
    stats.colorFunctions.add(func);
    stats.colorIssues++;
    stats.issues.push({
      type: 'function',
      func,
      file: filePath,
      line: lineNumber,
      text: text.trim(),
    });
  }
}

/**
 * Processa um arquivo para verificar o uso de cores
 * @param {string} filePath Caminho do arquivo
 */
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      extractColors(line, filePath, index + 1);
    });
    
    stats.filesScanned++;
  } catch (error) {
    console.error(`Erro ao processar o arquivo ${filePath}:`, error);
  }
}

/**
 * Percorre um diretório recursivamente
 * @param {string} dir Caminho do diretório
 */
function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (FILE_EXTENSIONS.includes(path.extname(fullPath).toLowerCase())) {
      processFile(fullPath);
    }
  });
}

/**
 * Exibe um resumo das cores do tema
 */
function showThemeColors() {
  console.log('\n' + chalk.underline('Cores do Tema:') + '\n');
  
  const printColors = (colors, indent = '') => {
    Object.entries(colors).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        console.log(`${indent}${chalk.bold(key)}:`);
        printColors(value, indent + '  ');
      } else if (typeof value === 'string' && value.startsWith('#')) {
        console.log(`${indent}${key}: ${chalk.hex(value)('■■■■')} ${value}`);
      }
    });
  };
  
  printColors(themeColors);
}

/**
 * Exibe um resumo dos problemas encontrados
 */
function showIssues() {
  if (stats.issues.length === 0) {
    console.log('\n' + chalk.green('✅ Nenhum problema encontrado com o uso de cores!'));
    return;
  }
  
  console.log('\n' + chalk.underline('Problemas encontrados:') + '\n');
  
  // Agrupar problemas por arquivo
  const issuesByFile = stats.issues.reduce((acc, issue) => {
    if (!acc[issue.file]) {
      acc[issue.file] = [];
    }
    acc[issue.file].push(issue);
    return acc;
  }, {});
  
  // Exibir problemas por arquivo
  Object.entries(issuesByFile).forEach(([file, fileIssues]) => {
    console.log(chalk.underline(file) + ':');
    
    fileIssues.forEach(issue => {
      const linePrefix = `  ${issue.line}: `;
      const lineNumber = `${chalk.dim(issue.line.toString().padStart(4, ' '))} | `;
      
      let issueType, issueColor;
      switch (issue.type) {
        case 'hex':
          issueType = 'COR HEX';
          issueColor = chalk.yellow;
          break;
        case 'rgb':
          issueType = 'COR RGB';
          issueColor = chalk.yellow;
          break;
        case 'function':
          issueType = 'FUNÇÃO DE COR';
          issueColor = chalk.blue;
          break;
        default:
          issueType = 'DESCONHECIDO';
          issueColor = chalk.gray;
      }
      
      console.log(`  ${issueColor(issueType)}: ${issue.text}`);
      console.log(`  ${' '.repeat(issueType.length + 2)} ${chalk.dim(`em ${file}:${issue.line}`)}`);
    });
    
    console.log();
  });
}

/**
 * Exibe um resumo da verificação
 */
function showSummary() {
  console.log('\n' + chalk.underline.bold('Resumo da Verificação:') + '\n');
  
  console.log(`📂 ${chalk.bold('Arquivos verificados:')} ${stats.filesScanned}`);
  console.log(`⚠️  ${chalk.bold('Problemas encontrados:')} ${chalk[stats.colorIssues > 0 ? 'red' : 'green'](stats.colorIssues)}`);
  
  if (stats.hexColors.size > 0) {
    console.log(`\n${chalk.yellow('Cores hexadecimais encontradas:')}`);
    Array.from(stats.hexColors).sort().forEach(color => {
      console.log(`  ${chalk.hex(color)('■■■■')} ${color}`);
    });
  }
  
  if (stats.rgbColors.size > 0) {
    console.log(`\n${chalk.yellow('Cores RGB/RGBA encontradas:')}`);
    Array.from(stats.rgbColors).sort().forEach(color => {
      console.log(`  ${color}`);
    });
  }
  
  if (stats.colorFunctions.size > 0) {
    console.log(`\n${chalk.blue('Funções de cor CSS encontradas:')}`);
    Array.from(stats.colorFunctions).sort().forEach(func => {
      console.log(`  ${func}`);
    });
  }
  
  console.log('\n' + chalk.bold('Dica:'), 'Use as variáveis de cor do tema em vez de valores de cor diretos.');
  console.log('Exemplo: Use `text-primary` em vez de `#123456`');
  console.log('Consulte o arquivo COLORS.md para mais informações sobre o sistema de cores.');
}

// Executa a verificação
console.log(chalk.blue.bold('🔍 Verificando o uso de cores no projeto...\n'));

// Processa os diretórios
DIRECTORIES.forEach(dir => {
  if (fs.existsSync(dir)) {
    walkDir(dir);
  } else {
    console.warn(chalk.yellow(`⚠️  Diretório não encontrado: ${dir}`));
  }
});

// Exibe os resultados
showThemeColors();
showIssues();
showSummary();

// Retorna código de saída apropriado
process.exit(stats.colorIssues > 0 ? 1 : 0);
