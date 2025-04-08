# Email Troubleshooting Guide

This document helps debug and fix issues with the email service in the Noveloper website.

## Current Status

The website uses MailerSend for two core features:
- Contact form submissions
- Newsletter subscriptions

Both features require:
1. A valid MailerSend API key set in the environment variables
2. Domain verification for the sender email (hello@noveloper.ai)

## Common Issues

### 500 Errors on Form Submission

If you're seeing 500 errors when submitting the contact form or subscribing to the newsletter, the most likely causes are:

1. **Missing API Key**: The MailerSend API key is not set in the Railway environment variables
2. **Invalid API Key**: The API key is expired, revoked, or doesn't have the required permissions
3. **Domain Verification**: The sender email domain (noveloper.ai) isn't properly verified in MailerSend
4. **Rate Limiting**: Exceeding the allowed number of email sends in your MailerSend plan

### Error Logging

The application includes detailed error logging. You can check the Railway logs to see:
- Initialization errors when starting the email service
- Specific errors when trying to send emails
- The exact API responses from MailerSend

### Test Mode

The API includes a test mode for both endpoints which can be activated by:
1. Setting `NODE_ENV` to anything other than "production"
2. Adding `?test=true` to the API URL when making requests
3. Not providing a MailerSend API key

In test mode, the API will:
- Log the form data that would have been sent
- Return success responses without trying to send actual emails
- Include a `test_mode: true` flag in the response

## How to Fix

### Setting Up MailerSend

1. Create a MailerSend account at [mailersend.com](https://mailersend.com)
2. Verify the domain (noveloper.ai) by adding the required DNS records
3. Generate an API key with the "Email Send" permission
4. Add the API key to Railway environment variables with the name `MAILERSEND_API_KEY`

### Advanced Configuration

The email service is configured in `server/emailService.ts` with:
- Sender email: hello@noveloper.ai
- Contact form recipient: rob@noveloper.ai

To change these settings:
1. Make sure any new sender domain is verified in MailerSend
2. Update the configuration in `server/emailService.ts`
3. Redeploy the application

## Testing

You can test the email service by:

```bash
# Test the contact form with test mode
curl -X POST https://noveloper-website-production.up.railway.app/api/contact?test=true \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"This is a test"}'

# Test the newsletter with test mode
curl -X POST https://noveloper-website-production.up.railway.app/api/newsletter?test=true \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

The response should include `"success": true` and `"test_mode": true`.
