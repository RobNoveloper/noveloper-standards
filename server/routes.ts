import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import path from "path";
import { storage } from "./storage";

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

  const httpServer = createServer(app);

  return httpServer;
}
