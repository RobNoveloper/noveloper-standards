// Build script for Railway deployment
// This script builds the production version of the application with ESM support

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('Starting Railway build process...');

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

try {
  // Skip TypeScript compilation altogether for Railway deployment
  // This is a temporary workaround to get the deployment working
  console.log('Copying TypeScript files to dist as JavaScript...');
  
  // Copy server files
  console.log('Copying server files...');
  execSync('mkdir -p dist/server', { stdio: 'inherit' });
  execSync('cp -r server/* dist/server/', { stdio: 'inherit' });
  
  // Copy shared files
  console.log('Copying shared files...');
  execSync('mkdir -p dist/shared', { stdio: 'inherit' });
  execSync('cp -r shared/* dist/shared/', { stdio: 'inherit' });
  
  // Rename .ts files to .js
  console.log('Renaming .ts files to .js...');
  execSync('find dist -name "*.ts" -type f -exec bash -c \'cp "$0" "${0%.ts}.js"\' {} \\;', { stdio: 'inherit' });
  
  console.log('TypeScript files copied successfully!');
  
  // Create the server index file for direct Railway execution
  console.log('Creating standalone server file...');
  
  // Read in the railway-start.js file
  const startFilePath = path.resolve(__dirname, 'railway-start.js');
  if (!fs.existsSync(startFilePath)) {
    throw new Error(`railway-start.js not found at ${startFilePath}`);
  }
  
  // Copy railway-start.js to dist/index.js
  const targetPath = path.resolve(__dirname, 'dist', 'index.js');
  fs.copyFileSync(startFilePath, targetPath);
  
  // Also copy railway-start.js as railway-start.mjs
  const mjsStartPath = path.resolve(__dirname, 'railway-start.mjs');
  if (fs.existsSync(mjsStartPath)) {
    const mjsTargetPath = path.resolve(__dirname, 'dist', 'railway-start.mjs');
    fs.copyFileSync(mjsStartPath, mjsTargetPath);
    console.log(`Copied railway-start.mjs to ${mjsTargetPath}`);
  } else {
    console.log('railway-start.mjs not found, copying railway-start.js as railway-start.mjs');
    const mjsTargetPath = path.resolve(__dirname, 'dist', 'railway-start.mjs');
    fs.copyFileSync(startFilePath, mjsTargetPath);
    console.log(`Copied railway-start.js to ${mjsTargetPath} as railway-start.mjs`);
  }
  
  console.log(`Copied railway-start.js to ${targetPath}`);
  
  // Copy railway-email.js to dist/
  const emailFilePath = path.resolve(__dirname, 'railway-email.js');
  if (fs.existsSync(emailFilePath)) {
    const emailTargetPath = path.resolve(__dirname, 'dist', 'railway-email.js');
    fs.copyFileSync(emailFilePath, emailTargetPath);
    console.log(`Copied railway-email.js to ${emailTargetPath}`);
  } else {
    console.warn('Warning: railway-email.js not found, email functionality may not work');
  }
  
  console.log('Railway build completed successfully!');
} catch (error) {
  console.error('Railway build failed:', error);
  process.exit(1);
}