import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Primeiro, compilamos o arquivo TypeScript para JavaScript
try {
  execSync('npx tsc src/app/globals.css.ts --outDir dist/temp --module commonjs --esModuleInterop true', { stdio: 'inherit' });
  console.log('TypeScript compilado com sucesso.');
} catch (error) {
  console.error('Erro ao compilar TypeScript:', error);
  process.exit(1);
}

// Agora importamos o arquivo compilado e geramos o CSS
try {
  // Use dynamic import for the compiled file
  const { globalStyles } = await import('../dist/temp/app/globals.css.js');
  
  // Escrevemos o CSS gerado no arquivo globals.css
  writeFileSync(
    join(__dirname, 'globals.css'),
    globalStyles,
    'utf8'
  );
  
  console.log('Arquivo globals.css gerado com sucesso!');
} catch (error) {
  console.error('Erro ao gerar CSS:', error);
  process.exit(1);
}

// Limpamos os arquivos temporários
try {
  execSync('rm -rf dist/temp', { stdio: 'inherit' });
  console.log('Arquivos temporários removidos.');
} catch (error) {
  console.error('Erro ao remover arquivos temporários:', error);
}
