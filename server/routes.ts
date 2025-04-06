import type { Express, Request, Response } from "express";
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

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)
  
  // Add route to serve SVG logo files
  app.get('/api/logo/:variant', (req: Request, res: Response) => {
    const variant = req.params.variant;
    let logoPath;
    
    if (variant === 'transparent') {
      logoPath = path.join(process.cwd(), 'public', 'noveloper-logo-transparent.svg');
    } else {
      logoPath = path.join(process.cwd(), 'public', 'noveloper-logo.svg');
    }
    
    res.type('image/svg+xml').sendFile(logoPath);
  });

  // Handle contact form submissions
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      // Validate form data
      const formData = contactFormSchema.parse(req.body);
      
      // For demonstration purposes, we'll log the form data instead of sending an email
      console.log("Contact form submission:", formData);
      
      // Send the contact form email
      const success = await sendContactFormEmail(formData);
      
      if (success) {
        res.status(200).json({ success: true, message: "Your message has been sent successfully!" });
      } else {
        res.status(500).json({ success: false, message: "Failed to send message. Please try again later." });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Return validation errors
        res.status(400).json({ 
          success: false, 
          message: "Please correct the errors in the form.",
          errors: error.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ success: false, message: "An unexpected error occurred." });
      }
    }
  });

  // Handle newsletter subscriptions
  app.post('/api/newsletter', async (req: Request, res: Response) => {
    try {
      // Validate email
      const { email } = newsletterSchema.parse(req.body);
      
      // For demonstration purposes, we'll log the email instead of sending a confirmation
      console.log("Newsletter subscription:", email);
      
      // Send the newsletter confirmation email
      const success = await sendNewsletterConfirmation(email);
      
      if (success) {
        res.status(200).json({ success: true, message: "You've been subscribed to our newsletter!" });
      } else {
        res.status(500).json({ success: false, message: "Failed to subscribe. Please try again later." });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Return validation errors
        res.status(400).json({ 
          success: false, 
          message: "Please enter a valid email address",
          errors: error.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
        });
      } else {
        console.error("Newsletter subscription error:", error);
        res.status(500).json({ success: false, message: "An unexpected error occurred." });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
