# Noveloper Standard Deployment Guide

This document outlines the standard deployment process for Noveloper projects. Our architecture separates frontend, backend, and database services for optimal performance and maintainability.

## Deployment Architecture

Noveloper projects follow a multi-service deployment architecture:

1. **Frontend**: Deployed on Vercel
2. **Backend API**: Deployed on Railway
3. **Database**: Hosted on Supabase (PostgreSQL)

## Environment Setup

### Production Environment
- Frontend: `{project}.noveloper.ai`
- Backend API: `api.{project}.noveloper.ai`

### Development Environment
- Frontend: `dev-{project}.noveloper.ai`
- Backend API: `dev-api.{project}.noveloper.ai`

## Required Environment Variables

### Frontend (Vercel)
```
VITE_API_URL=https://api.{project}.noveloper.ai
NODE_ENV=production
```

### Backend (Railway)
```
DATABASE_URL=postgresql://...
CORS_ORIGIN=https://{project}.noveloper.ai
NODE_ENV=production
PORT=3000
MAILERSEND_API_KEY=...
```

## Deployment Process

### 1. Database Setup (Supabase)
1. Create a new PostgreSQL database in Supabase
2. Get the connection string (`DATABASE_URL`)
3. Run the initial schema migration:
   ```
   npm run db:push
   ```

### 2. Backend API Deployment (Railway)
1. Connect the GitHub repository to Railway
2. Configure environment variables
3. Set the project name
4. Enable custom domain: `api.{project}.noveloper.ai`
5. Deploy from the main branch

### 3. Frontend Deployment (Vercel)
1. Connect the GitHub repository to Vercel
2. Configure environment variables
3. Set the project name
4. Configure the custom domain: `{project}.noveloper.ai`
5. Deploy from the main branch

## Continuous Deployment

All projects should implement CI/CD workflows:

1. **Main Branch**: Auto-deploys to production
2. **Development Branch**: Auto-deploys to development environment
3. **Pull Requests**: Preview deployments

## DNS Configuration

### Production Environment
```
{project}.noveloper.ai       CNAME  cname.vercel-dns.com
api.{project}.noveloper.ai   CNAME  {project}.up.railway.app
```

### Development Environment
```
dev-{project}.noveloper.ai       CNAME  cname.vercel-dns.com
dev-api.{project}.noveloper.ai   CNAME  {project}-dev.up.railway.app
```

## Monitoring and Logging

- Frontend: Vercel Analytics
- Backend: Railway Logs
- Database: Supabase Monitoring

## Backup Strategy

- Database: Daily automated backups on Supabase
- Configuration: All environment variables documented in secure storage

## Troubleshooting Common Issues

### CORS Errors
Ensure the `CORS_ORIGIN` variable on the backend matches exactly with the frontend URL.

### Database Connection Issues
Verify the `DATABASE_URL` is correct and that IP restrictions allow access from Railway.

### Build Failures
Check the build logs for specific errors related to dependencies or syntax issues.