import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable CORS for API routes
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'https://www.noveloper.ai', 
      'https://noveloper.ai', 
      'http://localhost:5173', 
      'https://localhost:5173',
      'https://noveloper-website.vercel.app',
      'https://noveloper-website-git-main.vercel.app',
      'https://noveloper-website-robnoveloper.vercel.app',
      'https://noveloper-studio-1-rob389.replit.app'
    ];
    
    // Check if the origin is allowed
    if (allowedOrigins.indexOf(origin) !== -1 || 
        origin.endsWith('.noveloper.ai') || 
        origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    
    return callback(null, false);
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Add security headers for production
if (process.env.NODE_ENV === "production") {
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
      "connect-src 'self' https://api.mailersend.com https://api.noveloper.ai " +
      "https://noveloper-website-production.up.railway.app " +
      "https://noveloper-website.vercel.app " +
      "https://noveloper-website-git-main.vercel.app " +
      "https://noveloper-website-robnoveloper.vercel.app " +
      "https://*.noveloper.ai https://*.vercel.app https://*.replit.app; " + 
      "frame-src 'none'; " +
      "object-src 'none';"
    );
    next();
  });
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

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

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    // For 5xx errors, return status 200 with success:false to avoid browser connection errors
    const originalStatus = err.status || err.statusCode || 500;
    const finalStatus = originalStatus >= 500 ? 200 : originalStatus;
    const message = err.message || "Internal Server Error";

    console.error("Global error handler caught:", {
      originalStatus,
      finalStatus,
      message,
      stack: err.stack,
      path: _req.path
    });

    res.status(finalStatus).json({ 
      success: false,
      message: message,
      error_details: "The server encountered an error processing your request.",
      fallback_mode: true
    });
    
    // Log the error but don't re-throw it to prevent server crashes
    console.error(err);
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Use the PORT environment variable provided by Railway in production
  // or default to port 5000 in development
  const port = process.env.PORT || 5000;
  console.log(`About to start server on port: ${port}`);
  console.log(`Environment: NODE_ENV=${process.env.NODE_ENV}`);
  server.listen({
    port: Number(port),
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
    console.log(`Server is now listening on port ${port}`);
  });
})();
