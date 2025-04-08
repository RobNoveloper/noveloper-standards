# Noveloper Website Deployment Troubleshooting Guide

This guide addresses common deployment issues and their solutions for the Noveloper split architecture deployment (Vercel frontend, Railway backend).

## Frontend-to-Backend API Connection Issues

### Problem: API calls from frontend to backend fail with CORS errors

#### Symptoms:
- Console errors mentioning "Access-Control-Allow-Origin"
- Contact form and newsletter submissions fail
- Network tab shows 403 or failed OPTIONS requests

#### Solutions:
1. **Update CORS configuration in the backend**:
   - Edit `server/index.ts` to add your Vercel deployment URL to the list of allowed origins:
   ```typescript
   app.use('/api', cors({
     origin: [
       'https://www.noveloper.ai', 
       'https://noveloper.ai', 
       // Add your Vercel domain(s) here:
       'https://noveloper-website.vercel.app',
       'https://noveloper-website-git-main.vercel.app'
     ],
     methods: ['GET', 'POST', 'OPTIONS'],
     credentials: true,
     allowedHeaders: ['Content-Type', 'Authorization']
   }));
   ```

2. **Update Content Security Policy**:
   - Ensure the CSP in `server/index.ts` includes all necessary domains:
   ```typescript
   "connect-src 'self' https://api.mailersend.com https://api.noveloper.ai " +
   "https://noveloper-website-production.up.railway.app " +
   "https://noveloper-website.vercel.app;"
   ```

### Problem: API proxy in Vercel not working

#### Symptoms:
- Network requests to `/api/*` endpoints receive 404 errors
- Client makes requests to Vercel domain instead of Railway

#### Solutions:
1. **Check Vercel configuration**:
   - Ensure `vercel.json` is properly configured with routes:
   ```json
   {
     "version": 2,
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "https://your-railway-app.up.railway.app/api/$1"
       },
       {
         "src": "/(.*)",
         "dest": "/index.html"
       }
     ]
   }
   ```

2. **Verify the Railway URL is correct**:
   - Railway deployment URLs follow the pattern `https://[project-name]-production.up.railway.app`
   - Check the Railway dashboard for the exact URL

3. **Test Railway API directly**:
   - Try accessing `https://your-railway-app.up.railway.app/api/health` to confirm it's working

## Email Service Issues

### Problem: Emails not sending through MailerSend

#### Symptoms:
- Contact form appears to submit successfully but no emails arrive
- Railway logs show MailerSend API errors

#### Solutions:
1. **Check MailerSend API Key**:
   - Verify the `MAILERSEND_API_KEY` environment variable is set in Railway
   - Ensure the API key has not expired or been revoked

2. **Verify Domain Verification**:
   - In MailerSend dashboard, confirm your domain (noveloper.ai) is verified
   - Check that proper DKIM, SPF, and MX records are configured

3. **Inspect Railway Logs**:
   - Look for specific error messages from the MailerSend API
   - Common issues include rate limiting, invalid recipients, or content problems

4. **Test email service manually**:
   - Use Railway's terminal to run a simple test script:
   ```javascript
   // test-email.js
   const { sendContactFormEmail } = require('./server/emailService');
   
   async function test() {
     const result = await sendContactFormEmail({
       name: 'Test User',
       email: 'test@example.com',
       message: 'This is a test message'
     });
     console.log('Email send result:', result);
   }
   
   test();
   ```
   - Run with `node test-email.js`

## Database Connection Issues

### Problem: Database queries failing

#### Symptoms:
- Server errors mentioning database connection failures
- Railway logs showing Postgres errors

#### Solutions:
1. **Check DATABASE_URL environment variable**:
   - Verify the connection string is correct and properly formatted
   - Ensure you're using the Session Pooler URL for better reliability

2. **Verify Supabase access**:
   - Check IP allow list in Supabase settings
   - Confirm the database is online and accessible

3. **Test connection directly**:
   - Use Railway's terminal to run a simple test:
   ```javascript
   // test-db.js
   const { Pool } = require('pg');
   
   async function testConnection() {
     const pool = new Pool({
       connectionString: process.env.DATABASE_URL
     });
     
     try {
       const client = await pool.connect();
       const result = await client.query('SELECT NOW()');
       console.log('Database connection successful:', result.rows[0]);
       client.release();
     } catch (err) {
       console.error('Database connection error:', err);
     } finally {
       await pool.end();
     }
   }
   
   testConnection();
   ```
   - Run with `node test-db.js`

## Deployment Pipeline Issues

### Problem: Railway deployment failing

#### Symptoms:
- Railway deployment shows errors in build or start phase
- Application crashes immediately after deployment

#### Solutions:
1. **Check start command**:
   - Ensure you're using the correct start command: `NODE_ENV=production node railway-start.cjs`
   - Verify `railway-start.cjs` file is correctly formatted as CommonJS module

2. **Inspect build logs**:
   - Look for specific build errors, such as missing dependencies or failed compilation
   - Verify the Node.js version is compatible (Railway uses Node.js 18 by default)

3. **Examine application logs**:
   - Check for runtime errors after startup
   - Look for uncaught exceptions or unhandled promise rejections

### Problem: Vercel deployment failing

#### Symptoms:
- Build fails in Vercel deployment logs
- Site deploys but shows a 404 page or blank screen

#### Solutions:
1. **Check build command and output directory**:
   - Build command should be `vite build`
   - Output directory should be `dist/public`

2. **Verify Vite configuration**:
   - Check `vite.config.ts` has the correct output directory:
   ```typescript
   build: {
     outDir: path.resolve(import.meta.dirname, "dist/public"),
     emptyOutDir: true,
   }
   ```

3. **Review framework preset**:
   - Set framework preset to Vite in Vercel project settings

4. **Inspect build logs**:
   - Look for specific errors during the build process
   - Check for missing dependencies or environment variables

## After Deployment: Verification Checklist

1. Visit the Railway health endpoint: `https://your-railway-app.up.railway.app/api/health`
2. Check the frontend on Vercel: `https://your-vercel-app.vercel.app`
3. Test API communication by submitting the contact form
4. Subscribe to the newsletter
5. Verify you receive both types of emails
6. Test language switching between English and Dutch
7. Check mobile responsiveness

## Monitoring Ongoing Issues

1. Set up Railway alerts for deployment failures
2. Configure Vercel notifications for build issues
3. Set up Uptime monitoring for both Railway and Vercel endpoints
4. Monitor MailerSend delivery statistics dashboard
