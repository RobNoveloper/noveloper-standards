# Railway Deployment Guide for Noveloper

## Overview

This document explains how to configure and manage the Railway deployment for the Noveloper website's backend API.

## Project Structure

The Noveloper website deployment is divided across several platforms:
- **Frontend**: Hosted on Vercel with separate Production and Dev environments
- **Backend API**: Hosted on Railway with separate Production and Development services
- **Database**: PostgreSQL database with schemas for isolating Production and Development data

## Railway Project Configuration

### Step 1: Service Setup

1. Two services are configured in Railway:
   - `noveloper-website-production` → Handles production API requests
   - `noveloper-website-development` → Handles development API requests

2. Both services use the same codebase but with different environment variables

### Step 2: Environment Variables

Configure these key variables for each service:

| Variable Name | Production Value | Development Value |
|---------------|------------------|-------------------|
| `NODE_ENV` | `production` | `development` |
| `PORT` | `3000` | `3000` |
| `CORS_ORIGIN` | `https://noveloper.ai` | `https://dev.noveloper.ai` |
| `MAILERSEND_API_KEY` | [SECRET] | [SECRET] |
| `DATABASE_URL` | `postgresql://...` | `postgresql://...?schema=noveloper_dev` |

### Step 3: Database Configuration

1. Both services connect to the same PostgreSQL database instance
2. The development service uses a separate schema (`noveloper_dev`) for isolation
3. To switch schemas, append `?schema=noveloper_dev` to the `DATABASE_URL`

## Deployment Process

Railway automatically deploys when changes are pushed to the respective GitHub branches:
- Push to `main` branch → Deploys to `noveloper-website-production`
- Push to `development` branch → Deploys to `noveloper-website-development`

## Monitoring and Logs

1. Access logs through the Railway dashboard
2. Select the appropriate service
3. Click on "Logs" to see runtime information
4. Filter logs by:
   - Info
   - Warning
   - Error

## Database Management

### Migrations

The project uses Drizzle for database migrations:

1. Make schema changes in `shared/schema.ts`
2. Run migrations:
   ```
   npm run db:push
   ```

### Accessing Data

To access the database directly:

1. Use Railway's built-in PostgreSQL interface
2. Or connect using a PostgreSQL client with the connection details from Railway

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Verify `CORS_ORIGIN` is set correctly for each environment
   - Check that the frontend is sending requests to the correct API URL

2. **Deployment Failures**
   - Check build logs for syntax errors
   - Verify all required environment variables are set

3. **Database Connection Issues**
   - Ensure `DATABASE_URL` includes the correct schema parameter
   - Check if IP allow-listing is required