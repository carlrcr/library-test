import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

// Encuentra el archivo index con hash
const distDir = './dist';
const files = readdirSync(distDir);
const indexFile = files.find(f => f.startsWith('index.') && f.endsWith('.js') && !f.endsWith('.map'));

if (indexFile) {
  // Lee el package.json
  const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));
  
  // Actualiza las rutas con el hash correcto
  packageJson.main = `./dist/${indexFile}`;
  packageJson.module = `./dist/${indexFile}`;
  packageJson.exports['.'].import = `./dist/${indexFile}`;
  
  // Guarda el package.json actualizado
  writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
  
  console.log(`✅ package.json actualizado con: ${indexFile}`);
} else {
  console.error('❌ No se encontró el archivo index.js');
  process.exit(1);
}