# Noveloper Website Deployment Summary

## Current Deployment Architecture

The Noveloper website is deployed using a split architecture for optimal performance and cost-effectiveness:

### Frontend (Vercel)
- Static assets (React application)
- Built using Vite
- Feature-rich UI with animations via Framer Motion
- Multilingual support (English and Dutch)
- Shadcn/UI components with custom Noveloper purple theming

### Backend (Railway)
- Express.js API server
- ESM modules for better compatibility
- Email services via MailerSend API
- Database connection to Supabase PostgreSQL
- Proper health checks and error handling

## Key Configuration Files

### Railway Deployment
- `railway.json` - Railway configuration with proper healthcheck
- `railway-start.mjs` - ESM-compatible entry point for Railway
- `railway-email.js` - Email service handler for MailerSend integration

### Vercel Deployment
- `vercel.json` - Full-stack configuration (alternative option)
- `vercel-frontend.json` - Frontend-only configuration with backend proxying

## Database Setup

- Supabase PostgreSQL database in EU region (for GDPR compliance)
- Connection via Session Pooler for better connection stability
- Basic schema with user table implemented
- Production ready with proper database connection management

## Email Service

- MailerSend integration for both contact form and newsletter
- Custom email templates with proper HTML/text alternatives
- Error handling with fallbacks for API failures

## Language Support

- Full support for both English and Dutch
- Easy extensibility for additional languages
- Proper translation keys organized by section

## Deployment Process

1. Code is pushed to GitHub repository at https://github.com/RobNoveloper/noveloper-website
2. Railway automatically detects changes and deploys backend
3. Vercel automatically detects changes and deploys frontend
4. Health checks verify the deployment status
5. Email notifications inform of deployment success/failure

## Environment Variables

### Railway (Backend)
- DATABASE_URL - Supabase connection string
- MAILERSEND_API_KEY - API key for email service
- NODE_ENV - Set to 'production'
- PORT - Port for the server (default 8080)

### Vercel (Frontend)
- No sensitive environment variables needed
- API calls are proxied to Railway backend

## Domain Configuration

- Domain: noveloper.ai
- DNS configured through Vercel
- HTTPS enabled by default

## Monitoring & Maintenance

- Railway provides logs and metrics for backend
- Vercel provides analytics and build logs for frontend
- Health check endpoints for monitoring server status