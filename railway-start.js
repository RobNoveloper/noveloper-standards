// This is a compatibility wrapper for running the server on Railway
// It handles environment variables and path resolution issues

// Set the required environment variable for import.meta.dirname compatibility
process.env.NODE_OPTIONS = '--experimental-import-meta-resolve';

// Start the actual server
require('./dist/index.js');

console.log('Railway compatibility wrapper started');
console.log(`Environment: NODE_ENV=${process.env.NODE_ENV}, PORT=${process.env.PORT}`);