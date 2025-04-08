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
  // Build the backend
  console.log('Building backend...');
  execSync('npx tsc', { stdio: 'inherit' });
  
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