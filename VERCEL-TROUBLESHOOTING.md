# Vercel Deployment Troubleshooting Guide

## Common Issues with GitHub Integration

1. **Webhook Configuration**:
   - Go to GitHub repository → Settings → Webhooks
   - Verify Vercel webhook exists and is properly configured
   - Check Recent Deliveries tab to see if webhooks are being sent and receiving successful responses

2. **Branch Permissions**:
   - In Vercel dashboard → Your project → Settings → Git
   - Make sure "Ignored Build Step" is not preventing builds
   - Check if specific Production/Preview/Development branch settings are configured correctly

3. **Custom Environment Confusion**:
   - If using custom environments (like Dev), verify that the environment is correctly linked to the specific branch
   - Check that automatic deployments are enabled for this environment

## Manual Deployment Options:

1. **Trigger Deploy via Vercel Dashboard**:
   - Go to Vercel Dashboard → Your Project
   - Click "Deployments" tab 
   - Click "Deploy" button
   - Select the branch you want to deploy

2. **Disconnecting and Reconnecting Git Integration**:
   - Go to Project Settings → Git Integration
   - Remove the Git integration
   - Re-add it following the prompts
   - This often resolves webhook and permission issues

3. **Use Vercel CLI for Manual Deployment**:
   - Install Vercel CLI: `npm i -g vercel`
   - Login: `vercel login`
   - Deploy: `vercel --prod` (for production) or just `vercel` (for preview)

## Webhook Event Inspection:

For deeper investigation of webhook deliveries:
1. Open GitHub repository → Settings → Webhooks → Vercel webhook
2. Check "Recent Deliveries" tab
3. Inspect payload and response for errors

## Force Push to Update GitHub Hook:

Sometimes Git hooks require a "force" trigger:
```bash
git commit --allow-empty -m "Force Vercel deployment" && git push origin main:development
```

This pushes an empty commit which can trigger the webhook if it's properly configured.