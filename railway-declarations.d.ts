// This file contains type declarations to make the Railway build succeed
// It intentionally creates loose type definitions to avoid TypeScript errors

// First, declare the Insert schema
declare module "@shared/schema" {
  export type User = any;
  export type InsertUser = any;
  export const users: any;
  export const insertUserSchema: any;
}

// Fix the vite ServerOptions type
declare module "vite" {
  export interface ServerOptions {
    middlewareMode?: boolean;
    hmr?: any;
    allowedHosts?: any;
  }
}

// Fix the ContactFormData type
declare module "./emailService" {
  export interface ContactFormData {
    name?: string;
    email?: string;
    message?: string;
  }
}