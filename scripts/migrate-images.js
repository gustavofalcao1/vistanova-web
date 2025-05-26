const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Iniciando migração de imagens...\n');

// 1. Mover imagens dos parceiros
console.log('1. Movendo imagens dos parceiros...');
try {
  execSync('yarn move-partners', { stdio: 'inherit' });
  console.log('✅ Imagens movidas com sucesso!\n');
} catch (error) {
  console.error('❌ Erro ao mover imagens:', error);
  process.exit(1);
}

// 2. Atualizar referências nos arquivos
console.log('2. Atualizando referências nos arquivos...');
try {
  execSync('yarn update-references', { stdio: 'inherit' });
  console.log('✅ Referências atualizadas com sucesso!\n');
} catch (error) {
  console.error('❌ Erro ao atualizar referências:', error);
  process.exit(1);
}

console.log('🎉 Migração concluída com sucesso!');
console.log('\nPróximos passos:');
console.log('1. Verifique se todas as imagens foram movidas corretamente');
console.log('2. Confirme se as referências foram atualizadas nos arquivos');
console.log('3. Execute o projeto para testar se tudo está funcionando');
console.log('4. Remova a pasta /public/img/partners se não for mais necessária');
