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

// Dynamically import email service using ESM syntax
(async function() {
  try {
    emailService = await import('./railway-email.js');
    console.log('Email service loaded successfully');
  } catch (error) {
    console.error('Failed to load email service:', error);
  }
})();

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
// Add defensive programming to prevent undefined path errors
try {
  // Make sure __dirname is defined before using it
  const basePath = __dirname || '.';
  const clientDistPath = path.join(basePath, 'dist', 'client');
  
  // Check if path exists before attempting to serve
  if (fs.existsSync(clientDistPath)) {
    app.use(express.static(clientDistPath));
    console.log(`Serving static files from ${clientDistPath}`);
  } else {
    console.log(`Static file path not found: ${clientDistPath}`);
  }
} catch (error) {
  console.error('Error setting up static file serving:', error);
}

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log(`Railway server running on port ${port}`);
  console.log(`Environment: NODE_ENV=${process.env.NODE_ENV}`);
});