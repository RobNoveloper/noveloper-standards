// This is a standalone server for Railway deployment in ESM format
// It doesn't rely on the ESM bundled version

// Import required modules
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ESM context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express application
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up security headers for production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    // Set security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Content Security Policy
    res.setHeader('Content-Security-Policy', 
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data: https:; " +
      "font-src 'self'; " +
      "connect-src 'self' https://api.mailersend.com; " + 
      "frame-src 'none'; " +
      "object-src 'none';"
    );
    next();
  });
}

// Root path for health check
app.get('/', (req, res) => {
  res.status(200).send('Noveloper API Server is running');
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Serve logo files if requested
app.get('/api/logo/:variant', (req, res) => {
  const variant = req.params.variant;
  console.log(`Logo requested with variant: ${variant}`);
  
  // Default response if logo files aren't available
  res.status(200).json({
    status: 'success',
    message: 'Logo API endpoint is working',
    requestedVariant: variant
  });
});

// Initialize emailService with fallback
let emailService = {
  sendContactFormEmail: () => {
    console.error('Email service not available');
    return Promise.resolve(false);
  },
  sendNewsletterConfirmation: () => {
    console.error('Email service not available');
    return Promise.resolve(false);
  }
};

// Dynamically import email service
try {
  emailService = await import('./railway-email.js');
  console.log('Email service loaded successfully');
} catch (error) {
  console.error('Failed to load email service:', error);
}

// API routes
app.post('/api/contact', async (req, res) => {
  try {
    console.log('Contact form submission received:', req.body);
    
    // Simple validation
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email and message",
        errors: []
      });
    }
    
    // Try to send the email
    const success = await emailService.sendContactFormEmail(req.body);
    
    if (success) {
      res.status(200).json({ 
        success: true, 
        message: "Your message has been sent successfully!"
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: "Failed to send message. Please try again later."
      });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      message: "An unexpected error occurred."
    });
  }
});

app.post('/api/newsletter', async (req, res) => {
  try {
    console.log('Newsletter subscription received:', req.body);
    
    // Simple validation
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide an email address",
        errors: []
      });
    }
    
    // Try to send the confirmation email
    const success = await emailService.sendNewsletterConfirmation(email);
    
    if (success) {
      res.status(200).json({ 
        success: true, 
        message: "You've been subscribed to our newsletter!"
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: "Failed to subscribe. Please try again later."
      });
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ 
      success: false, 
      message: "An unexpected error occurred."
    });
  }
});

// Serve static files from dist/client if they exist
// Very cautious approach to find the client distribution files
// Absolute safety checks to avoid the TypeError ERR_INVALID_ARG_TYPE
const safeResolve = (...parts) => {
  // Ensure all path parts are defined strings
  const validParts = parts.filter(part => typeof part === 'string');
  if (validParts.length !== parts.length) {
    console.warn('Invalid path parts detected, some parts were filtered');
  }
  try {
    return path.resolve(...validParts);
  } catch (err) {
    console.error(`Path resolution error: ${err.message}`);
    return null;
  }
};

// Define potential client paths with safety
const potentialClientPaths = [
  safeResolve(__dirname, 'dist', 'client'),
  safeResolve(process.cwd(), 'dist', 'client')
];

// Add absolute paths only if they're valid strings
if (typeof '/app/dist/client' === 'string') {
  potentialClientPaths.push('/app/dist/client');
}

if (typeof '/opt/render/project/dist/client' === 'string') {
  potentialClientPaths.push('/opt/render/project/dist/client');
}

// Filter out any potential null values from safeResolve
const validPaths = potentialClientPaths.filter(p => p !== null);

// Log all paths we're checking
console.log('Checking for client dist in these locations:');
validPaths.forEach(p => console.log(` - ${p}`));

// Find a valid client dist path
let clientDistPath = null;

for (const pathToCheck of validPaths) {
  try {
    // Perform multiple validation checks
    if (
      pathToCheck !== null && 
      typeof pathToCheck === 'string' && 
      pathToCheck.length > 0 &&
      fs.existsSync(pathToCheck)
    ) {
      clientDistPath = pathToCheck;
      console.log(`✓ Found client dist at: ${clientDistPath}`);
      break;
    } else {
      console.log(`✗ Path doesn't exist or is invalid: ${pathToCheck}`);
    }
  } catch (err) {
    console.log(`✗ Error checking path ${pathToCheck}: ${err.message}`);
  }
}

// Safety check for the Railway environment
try {
  // In Railway, list the app directory contents to help debug
  if (process.env.RAILWAY_ENVIRONMENT) {
    console.log('Running in Railway environment, listing /app directory:');
    const appDirContents = fs.readdirSync('/app');
    console.log('/app contents:', appDirContents);
    
    if (fs.existsSync('/app/dist')) {
      console.log('Listing /app/dist directory:');
      console.log('/app/dist contents:', fs.readdirSync('/app/dist'));
    }
  }
} catch (err) {
  console.log('Error listing Railway directories:', err.message);
}

// Serve static files only if a valid path was found
if (clientDistPath) {
  app.use(express.static(clientDistPath));
  console.log(`Serving static files from ${clientDistPath}`);
} else {
  console.warn('No client dist directory found for static files - API mode only');
}

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log(`Railway server running on port ${port}`);
  console.log(`Environment: NODE_ENV=${process.env.NODE_ENV}`);
});