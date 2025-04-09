// This script helps Vercel identify what branch configuration to use
const fs = require('fs');
const { execSync } = require('child_process');

// Print environment info for debugging
console.log('🔧 VERCEL BUILD ENVIRONMENT:');
console.log(`🔧 VERCEL_ENV: ${process.env.VERCEL_ENV || 'not set'}`);
console.log(`🔧 VERCEL_GIT_COMMIT_REF: ${process.env.VERCEL_GIT_COMMIT_REF || 'not set'}`);
console.log(`🔧 NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);

// Determine the current branch/environment
let currentBranch;
let deployEnvironment = process.env.VERCEL_ENV || 'production';

try {
  // First priority: Vercel Git branch reference
  if (process.env.VERCEL_GIT_COMMIT_REF) {
    currentBranch = process.env.VERCEL_GIT_COMMIT_REF;
    console.log(`🔍 Using branch from VERCEL_GIT_COMMIT_REF: ${currentBranch}`);
  } 
  // Second priority: Try to get from git command
  else {
    currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    console.log(`🔍 Using branch from git command: ${currentBranch}`);
  }
} catch (error) {
  console.log('⚠️ Unable to determine git branch, defaulting to main');
  currentBranch = 'main';
}

// Determine deploy environment based on branch
if (currentBranch === 'development' || deployEnvironment === 'preview') {
  deployEnvironment = 'development';
} else {
  deployEnvironment = 'production';
}

console.log(`🔍 Detected environment: ${deployEnvironment} (from branch: ${currentBranch})`);

// Choose the appropriate config file
let configFile;
if (deployEnvironment === 'development') {
  configFile = 'vercel-dev.json';
  console.log('🔧 Using development configuration (vercel-dev.json)');
} else {
  configFile = 'vercel.json';
  console.log('🔧 Using production configuration (vercel.json)');
}

// Copy the appropriate config to .vercel.json for the build
try {
  if (fs.existsSync(configFile)) {
    const configContent = fs.readFileSync(configFile, 'utf8');
    fs.writeFileSync('.vercel.json', configContent);
    console.log(`✅ Successfully prepared ${configFile} for Vercel build`);
  } else {
    console.error(`❌ Config file ${configFile} does not exist!`);
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Error preparing Vercel config:', error);
  process.exit(1);
}