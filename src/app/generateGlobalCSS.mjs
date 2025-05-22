import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// First, we compile the TypeScript file to JavaScript
try {
  execSync('npx tsc src/app/globals.css.ts --outDir dist/temp --module commonjs --esModuleInterop true', { stdio: 'inherit' });
  console.log('TypeScript compiled successfully.');
} catch (error) {
  console.error('Error compiling TypeScript:', error);
  process.exit(1);
}

// Now we import the compiled file and generate the CSS
try {
  // Use dynamic import for the compiled file
  const { globalStyles } = await import('../dist/temp/app/globals.css.js');
  
  // We write the generated CSS to the globals.css file
  writeFileSync(
    join(__dirname, 'globals.css'),
    globalStyles,
    'utf8'
  );
  
  console.log('globals.css file generated successfully!');
} catch (error) {
  console.error('Error generating CSS:', error);
  process.exit(1);
}

// Clean up temporary files
try {
  execSync('rm -rf dist/temp', { stdio: 'inherit' });
  console.log('Temporary files removed.');
} catch (error) {
  console.error('Error removing temporary files:', error);
}
