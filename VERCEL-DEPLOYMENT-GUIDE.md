# Vercel Pro Custom Environment Setup Guide

## Overview

This document provides detailed instructions for configuring Vercel Pro's custom environments feature for the Noveloper website project.

## Branch Setup

The repository uses two main branches:
- `main` → Production environment
- `development` → Custom "Dev" environment

## Custom Environment Configuration

### Step 1: Create a Custom Environment

1. Go to Vercel dashboard → Your project → Settings → Environment Variables
2. At the top, click "Add New Environment" button
3. Name it "Dev" (exactly as shown)
4. Select the "development" Git branch
5. Leave "Production" environment associated with the "main" branch

### Step 2: Environment Variables

Configure these variables with environment-specific values:

| Variable Name | Production Value | Dev Value |
|---------------|------------------|-----------|
| `VITE_API_BASE_URL` | `https://api.noveloper.ai` | `https://dev-api.noveloper.ai` |
| `RAILWAY_API_URL` | `https://noveloper-website-production.up.railway.app` | `https://noveloper-website-development.up.railway.app` |
| `VITE_VERCEL_ENV` | `production` | `development` |

### Step 3: Domain Configuration

1. Go to Vercel dashboard → Your project → Settings → Domains
2. Configure these domains:
   - `noveloper.ai` → Production environment
   - `dev.noveloper.ai` → Dev environment
3. Ensure that both domains have HTTPS enabled

## Deployment Troubleshooting

If auto-deployments from the development branch aren't working:

### Check Webhook Configuration:

1. In your GitHub repository, go to Settings → Webhooks
2. Look for the Vercel webhook
3. Check "Recent Deliveries" to see if GitHub is sending events to Vercel
4. If not seeing successful deliveries, recreate the webhook:
   - Delete the existing Vercel webhook
   - In Vercel: Disconnect and reconnect your GitHub repository

### Check Git Integration Settings:

1. In Vercel dashboard → Your project → Settings → Git
2. Verify "Deploy Hooks" are properly configured
3. Ensure there are no "Ignored Build Steps" blocking deployment

### Manually Force a Deployment:

1. In Vercel dashboard → Your project
2. Click "Deployments" tab
3. Click "Deploy" button
4. Select the "development" branch
5. Watch build logs for any errors

## Verification

To verify your environment is working correctly:

1. Visit `dev.noveloper.ai` and check for the "DEV" badge in the footer
2. Inspect any API calls to confirm they're going to `dev-api.noveloper.ai`
3. Test submitting a contact form to ensure it routes through the development API

## Additional Resources

- [Vercel Custom Environments Documentation](https://vercel.com/docs/deployments/environments#custom-environments)
- [Vercel Deployment Notifications](https://vercel.com/docs/deployments/notifications)
- [Vercel Environment Variables](https://vercel.com/docs/deployments/environment-variables)