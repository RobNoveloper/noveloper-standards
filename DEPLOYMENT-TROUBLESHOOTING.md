# Deployment Troubleshooting Guide

## Current Situation

The Vercel deployments are not automatically triggered by GitHub pushes, despite the dashboard saying "Continuously generated from RobNoveloper/noveloper-website".

Instead, all recent deployments are happening via "Deploy Hook" as seen in the deployment history.

## Solution: Deploy Hooks

Since Deploy Hooks are working, we should set up a specific hook for the development branch:

1. Go to Vercel dashboard → Project Settings → Git → Deploy Hooks
2. Create a new Deploy Hook:
   - Name: "Development Branch Deploy"
   - Git Branch: "development"
   - Environment: "Dev" (your custom environment)
3. Copy the generated URL (it will look like `https://api.vercel.com/v1/integrations/deploy/...`)

This will create a webhook URL that can be triggered via a simple CURL command to deploy the development branch.

## Using the Deploy Hook

You can trigger a deployment with:
```bash
curl -X POST "https://api.vercel.com/v1/integrations/deploy/..."
```

## GitHub Actions Integration (Optional)

For fully automated deployments, you could set up a GitHub Action that calls this webhook whenever there's a push to the development branch:

```yaml
name: Trigger Vercel Deployment
on:
  push:
    branches:
      - development
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Vercel Deploy Hook
        run: curl -X POST "https://api.vercel.com/v1/integrations/deploy/..."
```

This would ensure deployments happen automatically even if the direct GitHub-to-Vercel integration isn't working.

## Testing the Connection

If you want to fix the GitHub integration instead:

1. In Vercel → Settings → Git → Disconnect the GitHub repository
2. Reconnect it following the prompts
3. Make sure to grant Vercel permissions to the specific repository

This might resolve issues with the webhook communication between GitHub and Vercel.