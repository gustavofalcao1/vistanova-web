#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🚀 Iniciando build personalizado para Vercel...');

try {
  // Executar apenas os scripts necessários para o build, ignorando lint e type checking
  console.log('📦 Gerando favicons...');
  execSync('node scripts/generate-favicons.js', { stdio: 'inherit' });
  
  console.log('🔨 Executando build do Next.js...');
  // Usa cross-env para compatibilidade com Windows
  execSync('next build', { 
    stdio: 'inherit',
    env: { 
      ...process.env, 
      NEXT_TELEMETRY_DISABLED: '1', 
      SKIP_LINT: 'true',
      NODE_OPTIONS: '--max-old-space-size=4096'
    }
  });
  
  console.log('📝 Gerando sitemap...');
  execSync('next-sitemap --config next-sitemap.config.js', { stdio: 'inherit' });
  
  console.log('✅ Build concluído com sucesso!');
} catch (error) {
  console.error('❌ Erro durante o build:', error);
  process.exit(1);
}
