// This is a standalone server for Railway deployment
// It doesn't rely on the ESM bundled version

// Import required modules
const express = require('express');
const fs = require('fs');
const path = require('path');

// Create Express application
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Helper function to ensure CORS headers are always set
const ensureCorsHeaders = (req, res) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    'https://www.noveloper.ai', 
    'https://noveloper.ai', 
    'http://localhost:5173', 
    'https://localhost:5173',
    'https://noveloper-website.vercel.app',
    'https://noveloper-website-git-main.vercel.app',
    'https://noveloper-website-robnoveloper.vercel.app'
  ];
  
  // Double-check CORS headers are set for each response
  if (origin && (allowedOrigins.includes(origin) || 
                origin.endsWith('.noveloper.ai') || 
                origin.endsWith('.vercel.app'))) {
    // Always allow the specific origin for cross-domain requests
    res.header('Access-Control-Allow-Origin', origin);
    console.log(`Setting CORS Origin: ${origin} (matched allowed domain)`);
  } else {
    // In development or for unrecognized origins, use * 
    res.header('Access-Control-Allow-Origin', '*');
    console.log(`Setting CORS Origin: * (fallback for unrecognized origin: ${origin || 'none'})`);
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, X-Requested-With, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (process.env.NODE_ENV === 'production') {
    console.log(`[${req.method}] ${req.path} - Origin: ${origin || 'none'}, CORS Response: ${res.getHeader('Access-Control-Allow-Origin')}`);
  }
};

// CORS middleware for handling cross-origin requests
app.use((req, res, next) => {
  // Ensure CORS headers are set for all requests
  ensureCorsHeaders(req, res);
  next();
});

// Dedicated handler for OPTIONS preflight requests - with highest priority for Railway's routing system
app.options('*', (req, res) => {
  // Get the origin from the request headers
  const origin = req.headers.origin;
  
  // Log the preflight request in production
  if (process.env.NODE_ENV === 'production') {
    console.log(`OPTIONS preflight request for ${req.path} from origin: ${origin || 'none'}`);
  }
  
  // Ensure CORS headers are set - use highest priority
  ensureCorsHeaders(req, res);
  
  // Respond with 204 No Content to preflight requests
  return res.status(204).end();
});

// Set up security headers for production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    // Set security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Content Security Policy - modified to allow connections from noveloper.ai domains
    res.setHeader('Content-Security-Policy', 
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data: https:; " +
      "font-src 'self'; " +
      "connect-src 'self' https://api.mailersend.com https://*.noveloper.ai https://*.vercel.app; " + 
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
  // Ensure CORS headers
  ensureCorsHeaders(req, res);
  
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    cors: {
      request_origin: req.headers.origin || 'not provided',
      response_headers: {
        'access-control-allow-origin': res.getHeader('Access-Control-Allow-Origin')
      }
    }
  });
});

// Serve logo files if requested
app.get('/api/logo/:variant', (req, res) => {
  // Ensure CORS headers
  ensureCorsHeaders(req, res);
  
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

// For compatibility, we'll use CommonJS require for the email service
try {
  // First try to require the module directly (Railway deployment)
  emailService = require('./railway-email.js');
  console.log('Email service loaded successfully via require');
} catch (error) {
  console.warn('Email service not available via require:', error.message);
  // Keep the fallback implementation
}

// API routes
app.post('/api/contact', async (req, res) => {
  try {
    // Ensure CORS headers for each individual endpoint
    ensureCorsHeaders(req, res);
    
    console.log('Contact form submission received:', {
      originHeader: req.headers.origin,
      contentType: req.headers['content-type'],
      hasBody: !!req.body,
      bodySize: req.body ? JSON.stringify(req.body).length : 0
    });
    
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
      res.status(200).json({ // Use 200 instead of 500 to avoid CORS errors
        success: false, 
        message: "Failed to send message. Please try again later.",
        error_fallback: true
      });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(200).json({ // Use 200 instead of 500 to avoid CORS errors 
      success: false, 
      message: "An unexpected error occurred.",
      error_fallback: true
    });
  }
});

app.post('/api/newsletter', async (req, res) => {
  try {
    // Ensure CORS headers for each individual endpoint
    ensureCorsHeaders(req, res);
    
    console.log('Newsletter subscription received:', {
      originHeader: req.headers.origin,
      contentType: req.headers['content-type'],
      hasBody: !!req.body,
      bodySize: req.body ? JSON.stringify(req.body).length : 0
    });
    
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
      res.status(200).json({ // Use 200 instead of 500 to avoid CORS errors
        success: false, 
        message: "Failed to subscribe. Please try again later.",
        error_fallback: true
      });
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(200).json({ // Use 200 instead of 500 to avoid CORS errors
      success: false, 
      message: "An unexpected error occurred.",
      error_fallback: true
    });
  }
});

// In Railway API-only mode, we don't need to serve static files
// This avoids path resolution issues in ESM context
console.log('Running in API-only mode, static file serving is disabled');

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log(`Railway server running on port ${port}`);
  console.log(`Environment: NODE_ENV=${process.env.NODE_ENV}`);
});
