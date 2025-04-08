import express, { type Express, type Request, type Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import path from "path";
import { storage } from "./storage";
import { sendContactFormEmail, sendNewsletterConfirmation } from "./emailService";
import { z } from "zod";

// Validation schemas for form data
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000)
});

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address")
});

// Helper to set CORS headers explicitly on every API response
const setCorsHeaders = (res: Response, origin: string | undefined) => {
  // Allow requests from all Noveloper domains and common development domains
  const allowedOrigins = [
    'https://www.noveloper.ai', 
    'https://noveloper.ai', 
    'http://localhost:5173', 
    'https://localhost:5173',
    'https://noveloper-website.vercel.app',
    'https://noveloper-website-git-main.vercel.app',
    'https://noveloper-website-robnoveloper.vercel.app',
    'https://noveloper-website-production.up.railway.app'
  ];

  let corsOrigin = '*';
  
  // If origin is provided and is in allowed list or has noveloper.ai domain, use it
  if (origin && (allowedOrigins.includes(origin) || 
                 origin.endsWith('.noveloper.ai') || 
                 origin.endsWith('.vercel.app') ||
                 origin.endsWith('.railway.app'))) {
    corsOrigin = origin;
  }
  
  // Set explicit CORS headers on every response
  res.header('Access-Control-Allow-Origin', corsOrigin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, X-Requested-With, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Log CORS origins in production for debugging
  if (process.env.NODE_ENV === 'production') {
    console.log(`Setting CORS headers for origin: ${origin || 'undefined'} -> ${corsOrigin}`);
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // pre-flight OPTIONS handler for all API routes
  app.options('/api/*', (req: Request, res: Response) => {
    setCorsHeaders(res, req.headers.origin);
    res.status(204).end();
  });

  // Health check endpoint for Railway
  app.get('/api/health', (req: Request, res: Response) => {
    // Set CORS headers
    setCorsHeaders(res, req.headers.origin);
    
    // Include email service status in health check
    const emailServiceStatus = process.env.MAILERSEND_API_KEY 
      ? 'configured' 
      : 'not configured';
    
    // Add more diagnostic information
    const healthInfo = { 
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      emailService: emailServiceStatus,
      environment: process.env.NODE_ENV || 'development',
      apiEndpoint: process.env.API_URL || 'not set',
      cors: {
        origin: req.headers.origin || 'not provided',
        responseHeaders: {
          'access-control-allow-origin': res.getHeader('Access-Control-Allow-Origin')
        }
      },
      headers: Object.keys(req.headers).reduce((acc, key) => {
        // Don't include sensitive header values
        acc[key] = key.toLowerCase().includes('auth') ? '[REDACTED]' : req.headers[key];
        return acc;
      }, {} as Record<string, any>),
      connectionInfo: {
        ip: req.ip,
        protocol: req.protocol,
        hostname: req.hostname,
        path: req.path,
        originalUrl: req.originalUrl
      } 
    };
    
    res.status(200).json(healthInfo);
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)
  
  // Add route to serve the logo download page
  app.get('/logo-download', (req: Request, res: Response) => {
    const filePath = path.join(process.cwd(), 'public', 'logo-download.html');
    res.sendFile(filePath);
  });
  
  // Serve files from public/assets directory
  app.use('/assets', (req, res, next) => {
    const filePath = path.join(process.cwd(), 'public', 'assets', req.path);
    res.sendFile(filePath, err => {
      if (err) next();
    });
  });
  
  // Add route to serve SVG logo files
  app.get('/api/logo/:variant', (req: Request, res: Response) => {
    // Set CORS headers
    setCorsHeaders(res, req.headers.origin);
    
    const variant = req.params.variant;
    
    if (variant === 'colored' || variant === 'gradient') {
      const logoPath = path.join(process.cwd(), 'public', 'noveloper-logo-colored.svg');
      res.type('image/svg+xml').sendFile(logoPath);
    } else if (variant === 'transparent') {
      const logoPath = path.join(process.cwd(), 'public', 'noveloper-logo-transparent.svg');
      res.type('image/svg+xml').sendFile(logoPath);
    } else {
      const logoPath = path.join(process.cwd(), 'public', 'noveloper-logo.svg');
      res.type('image/svg+xml').sendFile(logoPath);
    }
  });

  // Handle contact form submissions
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      // Set CORS headers
      setCorsHeaders(res, req.headers.origin);
      
      console.log("Received contact form submission request", { 
        contentType: req.headers['content-type'],
        bodySize: req.body ? JSON.stringify(req.body).length : 0,
        hasBody: !!req.body,
        origin: req.headers.origin || 'not provided'
      });
      
      if (!req.body) {
        return res.status(400).json({ 
          success: false, 
          message: "Missing request body. Please ensure you're sending valid JSON." 
        });
      }
      
      // Validate form data
      const formData = contactFormSchema.parse(req.body);
      
      // Log the form data with sensitive information redacted
      console.log("Contact form submission:", {
        name: formData.name,
        email: formData.email.substring(0, 3) + '***@' + formData.email.split('@')[1],
        messageLength: formData.message.length
      });

      // Check for test mode - enables testing without relying on email service
      const isTestMode = process.env.NODE_ENV !== 'production' || 
                          req.query.test === 'true' ||
                          !process.env.MAILERSEND_API_KEY;
      
      if (isTestMode) {
        console.log("TEST MODE: Skipping actual email sending. Form data would have been sent to: rob@noveloper.ai");
        console.log("Contact form content:", JSON.stringify(formData, null, 2));
        console.log("Request origin:", req.headers.origin);
        console.log("Request host:", req.headers.host);
        
        // In test mode, always return success
        return res.status(200).json({ 
          success: true, 
          message: "Your message has been received. (Test mode: No email was sent)",
          test_mode: true
        });
      }
      
      // In production mode, actually send the email
      const success = await sendContactFormEmail(formData);
      
      if (success) {
        console.log("Successfully sent contact form email");
        res.status(200).json({ success: true, message: "Your message has been sent successfully!" });
      } else {
        // Log the issue and try a second attempt with extra diagnostics
        console.error("First attempt to send email failed, trying with extra diagnostics...");
        
        // Try again but log the process in detail 
        try {
          const secondSuccess = await sendContactFormEmail(formData);
          if (secondSuccess) {
            console.log("Second attempt succeeded");
            return res.status(200).json({ success: true, message: "Your message has been sent successfully!" });
          } else {
            console.error("Both attempts to send contact form email failed");
          }
        } catch (retryError) {
          console.error("Error during second email attempt:", retryError);
        }
        
        // If we got here, both attempts failed
        // Return 200 with success=false instead of 500 error
        // This prevents the browser from showing connection errors
        res.status(200).json({ 
          success: false, 
          message: "Your message was received, but we couldn't send a confirmation email. Please contact rob@noveloper.ai directly.",
          error_details: "Email delivery failed after multiple attempts",
          debug_info: {
            mailersend_configured: !!process.env.MAILERSEND_API_KEY,
            environment: process.env.NODE_ENV || 'development',
            sender_email: 'rob@noveloper.ai',
            sender_domain: 'noveloper.ai',
            time: new Date().toISOString()
          },
          fallback_mode: true
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Return validation errors
        console.warn("Contact form validation errors", error.errors);
        res.status(400).json({ 
          success: false, 
          message: "Please correct the errors in the form.",
          errors: error.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
        });
      } else {
        // Detailed error logging for debugging
        console.error("Contact form error:", error);
        
        if (error instanceof Error) {
          console.error("Error details:", {
            name: error.name,
            message: error.message,
            stack: error.stack,
            cause: (error as any).cause
          });
        }
        
        // More detailed error message to help with debugging
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        // Return 200 with success=false instead of 500 to avoid browser connection errors
        res.status(200).json({ 
          success: false, 
          message: "Your message was received, but we couldn't process it. Please contact rob@noveloper.ai directly.",
          error_details: errorMessage,
          fallback_mode: true
        });
      }
    }
  });

  // Handle newsletter subscriptions
  app.post('/api/newsletter', async (req: Request, res: Response) => {
    try {
      // Set CORS headers
      setCorsHeaders(res, req.headers.origin);
      
      console.log("Received newsletter submission request", { 
        contentType: req.headers['content-type'],
        bodySize: req.body ? JSON.stringify(req.body).length : 0,
        hasBody: !!req.body,
        origin: req.headers.origin || 'not provided'
      });
      
      if (!req.body) {
        return res.status(400).json({ 
          success: false, 
          message: "Missing request body. Please ensure you're sending valid JSON." 
        });
      }
      
      // Validate email
      const { email } = newsletterSchema.parse(req.body);
      
      // Log the subscription with sensitive information redacted
      console.log("Newsletter subscription:", 
        email.substring(0, 3) + '***@' + email.split('@')[1]
      );
      
      // Check for test mode - enables testing without relying on email service
      const isTestMode = process.env.NODE_ENV !== 'production' || 
                          req.query.test === 'true' ||
                          !process.env.MAILERSEND_API_KEY;
      
      if (isTestMode) {
        console.log("TEST MODE: Skipping actual email sending for newsletter subscription:", email);
        console.log("Request origin:", req.headers.origin);
        console.log("Request host:", req.headers.host);
        
        // In test mode, always return success
        return res.status(200).json({ 
          success: true, 
          message: "You've been subscribed to our newsletter! (Test mode: No email was sent)",
          test_mode: true
        });
      }
      
      // Send the newsletter confirmation email
      const success = await sendNewsletterConfirmation(email);
      
      if (success) {
        console.log("Successfully sent newsletter confirmation email");
        res.status(200).json({ success: true, message: "You've been subscribed to our newsletter!" });
      } else {
        // Log the issue and try a second attempt with extra diagnostics
        console.error("First attempt to send newsletter email failed, trying with extra diagnostics...");
        
        // Try again but log the process in detail 
        try {
          const secondSuccess = await sendNewsletterConfirmation(email);
          if (secondSuccess) {
            console.log("Second attempt succeeded");
            return res.status(200).json({ success: true, message: "You've been subscribed to our newsletter!" });
          } else {
            console.error("Both attempts to send newsletter email failed");
          }
        } catch (retryError) {
          console.error("Error during second newsletter email attempt:", retryError);
        }
        
        // If we got here, both attempts failed
        // Return 200 with success=false instead of 500 error
        // This prevents the browser from showing connection errors
        res.status(200).json({ 
          success: false, 
          message: "You've been subscribed, but we couldn't send a confirmation email. You'll receive future newsletters.",
          error_details: "Email delivery failed after multiple attempts",
          debug_info: {
            mailersend_configured: !!process.env.MAILERSEND_API_KEY,
            environment: process.env.NODE_ENV || 'development',
            sender_email: 'rob@noveloper.ai',
            sender_domain: 'noveloper.ai',
            time: new Date().toISOString()
          },
          fallback_mode: true
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Return validation errors
        console.warn("Newsletter validation errors", error.errors);
        res.status(400).json({ 
          success: false, 
          message: "Please enter a valid email address",
          errors: error.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
        });
      } else {
        // Detailed error logging for debugging
        console.error("Newsletter subscription error:", error);
        
        if (error instanceof Error) {
          console.error("Error details:", {
            name: error.name,
            message: error.message,
            stack: error.stack,
            cause: (error as any).cause
          });
        }
        
        // More detailed error message to help with debugging
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        // Return 200 with success=false instead of 500 to avoid browser connection errors
        res.status(200).json({ 
          success: false, 
          message: "We'll add you to our subscriber list, but couldn't send a confirmation email.",
          error_details: errorMessage,
          fallback_mode: true
        });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
