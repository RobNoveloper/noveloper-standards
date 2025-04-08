# Deployment Guide for Noveloper Website

This guide explains how to deploy the Noveloper website using a combination of Railway (backend) and Vercel (frontend).

## Architecture Overview

- **Frontend**: React + Vite application deployed on Vercel
- **Backend**: Express.js API deployed on Railway
- **Database**: PostgreSQL hosted on Supabase

## 1. Deploy Backend to Railway

### Railway Setup Steps:

1. Create a new project in Railway
2. Link to your GitHub repository
3. Configure the following settings:
   - Root Directory: `/`
   - Build Command: `npm run build`
   - Start Command: `NODE_ENV=production node railway-start.mjs`
   - Health Check Path: `/`
   - Health Check Timeout: 300 seconds

### Environment Variables:

Set these environment variables in Railway:
- `DATABASE_URL`: Your Supabase Session Pooler connection string
- `MAILERSEND_API_KEY`: Your MailerSend API key
- `NODE_ENV`: `production`
- `PORT`: `8080` (or leave empty to use Railway's default)

### Verifying Backend Deployment:

Once deployed, your backend should be accessible at:
`https://your-project-name.up.railway.app/`

You can also check the API health at:
`https://your-project-name.up.railway.app/api/health`

Either endpoint should return a successful response, indicating the server is running.

## 2. Deploy Frontend to Vercel

### Setup Steps:

1. When initially setting up the project in Vercel, rename `vercel-frontend.json` to `vercel.json` in the repo
2. Update the Railway URL in `vercel.json` to match your actual Railway deployment URL
3. Deploy to Vercel as a static site

### Environment Variables:

No additional environment variables are needed for the frontend, as all API calls are proxied to the backend.

## 3. Configure Domain

### For Production Domain:

1. In Vercel, go to your project settings
2. Navigate to "Domains"
3. Add your domain (e.g., noveloper.ai)
4. Follow Vercel's instructions to set up the required DNS records

## 4. Updating the Application

### Update Process:

1. Make changes to your code
2. Commit and push to GitHub
3. Railway and Vercel will automatically deploy your changes

## Troubleshooting

### Backend Connection Issues:

- Verify the health endpoint is accessible: `/api/health`
- Check Railway logs for any server errors
- Ensure the database connection string is correct
- If encountering ESM/CommonJS errors, verify all imports use proper ESM syntax

### Frontend Issues:

- Check if the API proxy in `vercel.json` is pointing to the correct Railway URL
- Verify that the frontend is built correctly
- Check browser console for CORS or API connection errors

## Revert to Full Vercel Deployment

If needed, you can revert to a full-stack Vercel deployment by:
1. Renaming the original `vercel.json` back
2. Removing the Railway deployment

## Important Notes for Railway Deployment

1. The application is now using a modern ESM module approach with `railway-start.mjs`
2. Email functionality is handled through MailerSend, ensure your API keys are properly configured
3. Database connections use Supabase Session Pooler for better connection stability
4. The directory structure accommodates both local development and production deployment