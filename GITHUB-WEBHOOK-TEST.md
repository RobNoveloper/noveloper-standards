# GitHub Webhook Test

If your organization has webhook restrictions, administrators might need to approve webhook creation. Here's how to check:

1. Go to GitHub.com → Your Organization → Settings → Third-party Access
2. Look for "Restrictions for GitHub Apps" and see if there are policies restricting webhook creation
3. If restrictions exist, you'll need an organization admin to approve the Vercel app

## Manually Create a Webhook (Temporary Solution)

Since we confirmed changes are not triggering Vercel deployments, you can manually create a webhook as a temporary solution:

1. Go to your GitHub repository → Settings → Webhooks → Add webhook
2. Add these settings:
   - Payload URL: `https://api.vercel.com/v1/integrations/github/[YOUR_TEAM_ID]`
     (You can find your Team ID in Vercel → Team Settings → General)
   - Content type: `application/json`
   - Secret: Leave empty (Vercel manages this internally)
   - Which events would you like to trigger this webhook?: Select "Just the push event"
   - Active: Checked

This will at least get automatic deployments working while you resolve the integration issue with Vercel support.

## Alternative: Direct Import Approach

If webhook issues persist, you can try this alternative approach:

1. In Vercel, create a completely new project
2. Select "Import Git Repository" and choose your repository
3. During setup, select your existing project name (this will create a new project linked to the same domain)
4. Configure the same environment variables
5. Once deployment completes, verify webhooks were created in GitHub

This creates a fresh connection that should properly set up the webhooks.