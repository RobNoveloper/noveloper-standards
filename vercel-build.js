// Build script for Vercel deployments
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting Vercel build process...');

// Install dependencies (already done by Vercel's buildCommand, but just in case)
console.log('Ensuring all dependencies are installed...');
execSync('npm install', { stdio: 'inherit' });

// Build the frontend
console.log('Building frontend...');
execSync('vite build', { stdio: 'inherit' });

// Make sure the server directory exists in dist
console.log('Preparing server files...');
if (!fs.existsSync(path.join(process.cwd(), 'dist', 'server'))) {
  fs.mkdirSync(path.join(process.cwd(), 'dist', 'server'), { recursive: true });
}

// Copy necessary server files to dist
console.log('Copying server files...');
// List of server files to copy
const serverFiles = [
  'server/routes.js',
  'server/emailService.js',
  'server/storage.js',
  'server/db.js',
  'shared/schema.js',
  'index.js'
];

serverFiles.forEach(file => {
  const sourcePath = path.join(process.cwd(), file);
  const destPath = path.join(process.cwd(), 'dist', file);
  
  // Create directories if needed
  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  // Check if file exists before copying
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Copied ${file} to dist`);
  } else {
    // Handle the case where the file doesn't exist (probably already transpiled)
    console.log(`File ${file} not found, assuming it's already built`);
  }
});

// Create or update the Vercel package.json in dist
console.log('Creating production package.json...');
const packageJson = {
  "name": "noveloper-website",
  "type": "module",
  "version": "1.0.0",
  "engines": {
    "node": "18.x"
  },
  "main": "index.js",
  "dependencies": {
    "@neondatabase/serverless": "^0.6.0",
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "drizzle-orm": "^0.29.1",
    "zod": "^3.22.4",
    "mailersend": "^2.5.0"
  }
};

fs.writeFileSync(
  path.join(process.cwd(), 'dist', 'package.json'),
  JSON.stringify(packageJson, null, 2)
);

console.log('Build completed successfully!');