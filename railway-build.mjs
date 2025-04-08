#!/usr/bin/env node

/**
 * Railway build script
 * This script prepares the backend for Railway deployment
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure dist directory exists
console.log('Creating dist directory if it doesn\'t exist...');
try {
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
  }
} catch (err) {
  console.error('Error creating dist directory:', err);
}

// Copy necessary files to dist
console.log('Copying railway-start.mjs to dist...');
try {
  fs.copyFileSync('railway-start.mjs', path.join('dist', 'railway-start.mjs'));
} catch (err) {
  console.error('Error copying railway-start.mjs:', err);
}

console.log('Copying railway-email.js to dist...');
try {
  fs.copyFileSync('railway-email.js', path.join('dist', 'railway-email.js'));
} catch (err) {
  console.error('Error copying railway-email.js:', err);
}

// Create simple index.js export in dist
console.log('Creating simplified dist/index.js...');
try {
  const indexContent = `// Railway deployment build
// This is a simple export file that loads the railway-start.mjs module
export * from './railway-start.mjs';
`;
  fs.writeFileSync(path.join('dist', 'index.js'), indexContent);
} catch (err) {
  console.error('Error creating dist/index.js:', err);
}

// List dist directory contents
console.log('Dist directory contents:');
try {
  const files = fs.readdirSync('dist');
  console.log(files);
} catch (err) {
  console.error('Error listing dist directory:', err);
}

console.log('Railway build script completed');