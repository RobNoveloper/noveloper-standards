import express from "express";
import { createServer } from "http";
import path from "path";
import { storage } from "./storage.js";
import { sendContactFormEmail, sendNewsletterConfirmation } from "./emailService.js";
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

export async function registerRoutes(app) {
  // Health check endpoint for Vercel
  app.get('/api/health', (req, res) => {
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
      headers: Object.keys(req.headers).reduce((acc, key) => {
        // Don't include sensitive header values
        acc[key] = key.toLowerCase().includes('auth') ? '[REDACTED]' : req.headers[key];
        return acc;
      }, {}),
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
  
  // Add route to serve SVG logo files
  app.get('/api/logo/:variant', (req, res) => {
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
  app.post('/api/contact', async (req, res) => {
    try {
      console.log("Received contact form submission request", { 
        contentType: req.headers['content-type'],
        bodySize: req.body ? JSON.stringify(req.body).length : 0,
        hasBody: !!req.body
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
      
      // Send the contact form email
      const success = await sendContactFormEmail(formData);
      
      if (success) {
        console.log("Successfully sent contact form email");
        res.status(200).json({ success: true, message: "Your message has been sent successfully!" });
      } else {
        console.error("Failed to send contact form email - API returned failure");
        res.status(500).json({ success: false, message: "Failed to send message. Please try again later." });
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
            cause: error.cause
          });
        }
        
        // More detailed error message to help with debugging
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        res.status(500).json({ 
          success: false, 
          message: "Failed to send message. Please try again later.", 
          error: errorMessage
        });
      }
    }
  });

  // Handle newsletter subscriptions
  app.post('/api/newsletter', async (req, res) => {
    try {
      console.log("Received newsletter submission request", { 
        contentType: req.headers['content-type'],
        bodySize: req.body ? JSON.stringify(req.body).length : 0,
        hasBody: !!req.body
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
      
      // Send the newsletter confirmation email
      const success = await sendNewsletterConfirmation(email);
      
      if (success) {
        console.log("Successfully sent newsletter confirmation email");
        res.status(200).json({ success: true, message: "You've been subscribed to our newsletter!" });
      } else {
        console.error("Failed to send newsletter confirmation email - API returned failure");
        res.status(500).json({ success: false, message: "Failed to subscribe. Please try again later." });
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
            cause: error.cause
          });
        }
        
        // More detailed error message to help with debugging
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        res.status(500).json({ 
          success: false, 
          message: "Failed to subscribe. Please try again later.", 
          error: errorMessage
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}