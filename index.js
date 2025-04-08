// This is the entry point for Vercel deployments
import express from 'express';
import path from 'path';
import cors from 'cors';
import { registerRoutes } from './server/routes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable CORS for API routes
app.use('/api', cors({
  origin: ['https://www.noveloper.ai', 'https://noveloper.ai'],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Security headers for production
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

// Add request logging
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      console.log(`[express] ${logLine}`);
    }
  });

  next();
});

// Register API routes
(async () => {
  const server = await registerRoutes(app);

  // Error handling
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error(`Error: ${message}`, err);
    res.status(status).json({ message });
  });

  // Serve static files from the dist/public directory
  app.use(express.static(path.join(process.cwd(), 'dist', 'public')));
  
  // For all other routes, serve the index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist', 'public', 'index.html'));
  });

  // Use the PORT environment variable provided by Vercel or default to 3000
  const port = process.env.PORT || 3000;
  console.log(`Starting server on port: ${port}`);
  console.log(`Environment: NODE_ENV=${process.env.NODE_ENV}`);
  
  server.listen(port, '0.0.0.0', () => {
    console.log(`Server is now listening on port ${port}`);
  });
})();

export default app;