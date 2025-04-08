# Noveloper Website Deployment Guide

This guide explains how to deploy the Noveloper website using a split deployment architecture with Railway (backend) and Vercel (frontend).

## Architecture Overview

- **Frontend**: React.js + Vite application deployed on Vercel
- **Backend**: Express.js API deployed on Railway
- **Database**: PostgreSQL hosted on Supabase (EU region for GDPR compliance)
- **Email Service**: MailerSend API

## Prerequisites

- GitHub repository access (https://github.com/RobNoveloper/noveloper-website)
- Railway account with billing setup
- Vercel account
- Supabase account with a PostgreSQL database
- MailerSend account with API key

## Deployment Steps

### 1. Database Setup (Supabase)

1. Create a new PostgreSQL database in Supabase (EU region recommended)
2. Get the connection string from the Supabase dashboard
   - Use the **Session Pooler** connection string for better compatibility
3. Run database migrations using:
   ```
   npm run db:push
   ```

### 2. Backend Deployment (Railway)

1. Connect your GitHub repository to Railway
2. Create a new project using the repository
3. Configure the following settings:
   - **Root Directory**: `/`
   - **Build Command**: `npm run build`
   - **Start Command**: `NODE_ENV=production node railway-start.cjs`
   - **Health Check Path**: `/`
   - **Health Check Timeout**: 300 seconds
4. Set environment variables:
   - `DATABASE_URL`: Supabase Session Pooler connection string
   - `MAILERSEND_API_KEY`: Your MailerSend API key
   - `NODE_ENV`: `production`
   - `PORT`: `8080` (or leave empty to use Railway's default)
5. Deploy the project

### 3. Frontend Deployment (Vercel)

1. Connect your GitHub repository to Vercel
2. Create a new project using the repository
3. Rename `vercel-frontend.json` to `vercel.json` in the repo
4. Update the Railway URL in `vercel.json` to match your actual Railway deployment URL
5. Configure the deployment:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/client`
6. Deploy the project

### 4. Domain Configuration

1. In Vercel, go to your project settings
2. Navigate to "Domains"
3. Add your domain (e.g., noveloper.ai)
4. Follow Vercel's instructions to set up the required DNS records
5. For email verification, add appropriate MX records as directed by MailerSend

## Verification Steps

1. Test the backend API:
   - Visit `https://your-railway-app.up.railway.app/api/health`
   - Should return a JSON response with status "healthy"

2. Test the frontend:
   - Visit your Vercel deployment URL or custom domain
   - Verify the website loads properly
   - Test language switching (Dutch/English)

3. Test email functionality:
   - Fill out and submit the contact form
   - Subscribe to the newsletter
   - Verify email delivery

## Troubleshooting

### API Connection Issues
- Check that the Railway URL in `vercel.json` is correct
- Verify the Railway deployment is running
- Check Railway logs for any errors

### Database Connection Issues
- Verify the DATABASE_URL environment variable is set correctly
- Ensure Supabase database is accessible
- Check if the Session Pooler URL is being used

### Email Service Issues
- Verify the MAILERSEND_API_KEY is set correctly
- Check if the email domain is verified in MailerSend
- Examine Railway logs for email service errors

## Maintenance

### Updating the Application
1. Make changes to your code
2. Commit and push to GitHub
3. Railway and Vercel will automatically deploy your changes

### Monitoring
- Use Railway's monitoring tools for backend performance
- Use Vercel's analytics for frontend performance
- Check email delivery stats in MailerSend dashboard

## Security Considerations

- All sensitive API keys are stored as environment variables
- HTTPS is enforced on all connections
- Database credentials are never exposed to the frontend
- Content Security Policy is implemented to prevent XSS attacks
- EU hosting ensures GDPR compliance