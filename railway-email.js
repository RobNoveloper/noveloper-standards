// Simplified email module for Railway deployment
// This uses MailerSend to send emails

const { MailerSend, EmailParams, Recipient, Sender } = require('mailersend');

if (!process.env.MAILERSEND_API_KEY) {
  console.warn("WARNING: MAILERSEND_API_KEY environment variable is not set. Email sending will not work.");
}

// Initialize the MailerSend instance with your API key
const mailerSend = process.env.MAILERSEND_API_KEY 
  ? new MailerSend({ apiKey: process.env.MAILERSEND_API_KEY })
  : null;

// Immediately check if MailerSend can be reached - this tests network connectivity
async function testMailerSendConnectivity() {
  if (!mailerSend) {
    console.error("Cannot test connectivity: MailerSend API key not configured");
    return false;
  }
  
  try {
    console.log("Testing MailerSend API connectivity...");
    
    // Attempt to fetch user info - a simple API call that should work
    // if the API key is valid and the network is accessible
    const response = await fetch('https://api.mailersend.com/v1/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.MAILERSEND_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    console.log("MailerSend connectivity test results:", {
      status: response.status,
      statusText: response.statusText,
      success: response.ok,
      dataReceived: !!data
    });
    
    if (!response.ok) {
      console.error("MailerSend API connectivity test failed:", data);
      return false;
    }
    
    console.log("MailerSend API is accessible!");
    return true;
  } catch (error) {
    console.error("ERROR: MailerSend connectivity test failed with exception:", error);
    return false;
  }
}

// The email address that will be shown as the sender
// Using the verified Noveloper domain email
let defaultSender;
try {
  // Check API key and log initial status
  if (process.env.MAILERSEND_API_KEY) {
    console.log("MailerSend API Key exists. Length:", process.env.MAILERSEND_API_KEY.length, "characters");
    
    // Start the connectivity test asynchronously
    testMailerSendConnectivity()
      .then(isConnected => {
        console.log("MailerSend API connectivity:", isConnected ? "SUCCESSFUL" : "FAILED");
      })
      .catch(error => {
        console.error("Error testing MailerSend connectivity:", error);
      });
  } else {
    console.error("WARNING: MAILERSEND_API_KEY is missing. Email functions will not work.");
  }
  
  defaultSender = new Sender("rob@noveloper.ai", "Noveloper");
  console.log("Sender email configured successfully: rob@noveloper.ai");
  console.log("IMPORTANT: Make sure 'noveloper.ai' domain is verified in MailerSend dashboard");
} catch (error) {
  console.error("Error creating sender:", error);
  console.error("Error details:", {
    name: error.name,
    message: error.message,
    stack: error.stack?.split("\n").slice(0, 3).join("\n")
  });
  
  // Fallback to a simpler sender
  defaultSender = { email: "rob@noveloper.ai", name: "Noveloper" };
  console.log("Using fallback sender object due to error");
}

// The email address that will receive contact form submissions
const defaultRecipient = "rob@noveloper.ai";

/**
 * Sends a contact form submission via email
 */
async function sendContactFormEmail(formData) {
  // Add extensive environment diagnostic info to debug production issues
  console.log("DIAGNOSTIC INFO - Environment (Contact Form):");
  console.log(`- NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
  console.log(`- API Key exists: ${!!process.env.MAILERSEND_API_KEY}`);
  if (process.env.MAILERSEND_API_KEY) {
    // NEVER log the full API key, just diagnostic info
    console.log(`- API Key length: ${process.env.MAILERSEND_API_KEY.length} characters`);
    console.log(`- API Key prefix: ${process.env.MAILERSEND_API_KEY.substring(0, 4)}...`);
  }
  
  if (!mailerSend) {
    console.error("Cannot send email: MailerSend API key not configured");
    return false;
  }

  console.log("Preparing to send contact form email from:", formData.name, formData.email);
  
  try {
    console.log("DIAGNOSTIC INFO - Contact Form Sender:");
    console.log(`- Using sender email: ${defaultSender.email}`);
    console.log(`- Sender object type: ${typeof defaultSender}`);
    console.log(`- Is Sender instance: ${defaultSender instanceof Sender}`);
    
    const recipients = [new Recipient(defaultRecipient, "Noveloper Team")];
    
    console.log("DIAGNOSTIC INFO - Contact Form Recipients:");
    console.log(`- Recipient email: ${defaultRecipient}`);
    console.log(`- Recipients object type: ${typeof recipients}`);
    console.log(`- Is Array: ${Array.isArray(recipients)}`);

    // Structure the email
    const emailParams = new EmailParams()
      .setFrom(defaultSender)
      .setTo(recipients)
      .setReplyTo(new Recipient(formData.email, formData.name))
      .setSubject("New contact form submission from " + formData.name)
      .setText(`
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
      `)
      .setHtml(`
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${formData.name}</p>
<p><strong>Email:</strong> ${formData.email}</p>
<h3>Message:</h3>
<p>${formData.message.replace(/\n/g, '<br>')}</p>
      `);
      
    console.log("DIAGNOSTIC INFO - Contact Form Email Params:");
    console.log(`- Email params type: ${typeof emailParams}`);
    console.log(`- Email params properties: ${Object.keys(emailParams).join(', ')}`);

    // Send the email - with enhanced error trapping
    console.log("Attempting to send contact form email to:", defaultRecipient);
    
    let response;
    try {
      response = await mailerSend.email.send(emailParams);
      console.log("MailerSend API response (contact form):", response);
      return true;
    } catch (apiError) {
      console.error("CRITICAL: Inner MailerSend API call failed for contact form:", apiError);
      
      // Detailed API error diagnostics
      if (apiError.response && apiError.response.data) {
        console.error("API Response data (contact form):", apiError.response.data);
      }
      
      if (apiError.request) {
        console.error("API Request details (contact form):", {
          url: apiError.request.url || 'unknown',
          method: apiError.request.method || 'unknown',
          status: apiError.request.status || 'unknown'
        });
      }
      
      throw apiError; // Re-throw to be caught by outer try/catch
    }
  } catch (error) {
    console.error("MailerSend contact form email error:", error);
    
    // Log detailed error for debugging
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
        cause: error.cause
      });
      
      // Special handling for common MailerSend errors
      if (error.message.includes("domain") || error.message.includes("sender")) {
        console.error("This appears to be a domain verification error. Make sure the sender domain is verified in MailerSend.");
      } else if (error.message.includes("authorization") || error.message.includes("authenticated")) {
        console.error("This appears to be an API key issue. Check that your API key is valid and has the necessary permissions.");
      }
      
      // Try to extract more specific error messages
      try {
        if (error.response && error.response.data) {
          console.error("API error response data (contact form):", error.response.data);
        }
      } catch (e) {
        console.error("Could not extract response data (contact form):", e);
      }
    }
    return false;
  }
}

/**
 * Sends a newsletter subscription confirmation
 */
async function sendNewsletterConfirmation(email) {
  // Add extensive environment diagnostic info to debug production issues
  console.log("DIAGNOSTIC INFO - Environment:");
  console.log(`- NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
  console.log(`- API Key exists: ${!!process.env.MAILERSEND_API_KEY}`);
  if (process.env.MAILERSEND_API_KEY) {
    // NEVER log the full API key, just diagnostic info
    console.log(`- API Key length: ${process.env.MAILERSEND_API_KEY.length} characters`);
    console.log(`- API Key prefix: ${process.env.MAILERSEND_API_KEY.substring(0, 4)}...`);
  }
  
  if (!mailerSend) {
    console.error("Cannot send email: MailerSend API key not configured");
    return false;
  }

  console.log("Preparing to send newsletter confirmation to:", email);
  
  try {
    console.log("DIAGNOSTIC INFO - Sender:");
    console.log(`- Using sender email: ${defaultSender.email}`);
    console.log(`- Sender object type: ${typeof defaultSender}`);
    console.log(`- Is Sender instance: ${defaultSender instanceof Sender}`);
    
    // Send only to the subscriber
    const recipients = [
      new Recipient(email)
    ];
    
    console.log("DIAGNOSTIC INFO - Recipients:");
    console.log(`- Recipient email: ${email}`);
    console.log(`- Recipients object type: ${typeof recipients}`);
    console.log(`- Is Array: ${Array.isArray(recipients)}`);
    
    // Log admin notification
    console.log(`ADMIN NOTIFICATION: New newsletter subscription from ${email}`);

    // Structure the email
    const emailParams = new EmailParams()
      .setFrom(defaultSender)
      .setTo(recipients)
      .setSubject("Welcome to the Noveloper Newsletter")
      .setText(`
Thank you for subscribing to the Noveloper newsletter!

You'll now receive updates about our latest innovations, product launches, and AI insights.

If you didn't subscribe to our newsletter, please ignore this email.

Best regards,
The Noveloper Team
      `)
      .setHtml(`
<h2>Welcome to the Noveloper Newsletter!</h2>
<p>Thank you for subscribing to the Noveloper newsletter!</p>
<p>You'll now receive updates about our latest innovations, product launches, and AI insights.</p>
<p>If you didn't subscribe to our newsletter, please ignore this email.</p>
<p>Best regards,<br>The Noveloper Team</p>
      `);

    console.log("DIAGNOSTIC INFO - Email Params:");
    console.log(`- Email params type: ${typeof emailParams}`);
    console.log(`- Email params properties: ${Object.keys(emailParams).join(', ')}`);
    
    // Send the email - with enhanced error trapping
    console.log("Attempting to send newsletter confirmation email to:", email);
    
    let response;
    try {
      response = await mailerSend.email.send(emailParams);
      console.log("MailerSend API response (newsletter):", response);
      return true;
    } catch (apiError) {
      console.error("CRITICAL: Inner MailerSend API call failed:", apiError);
      
      // Detailed API error diagnostics
      if (apiError.response && apiError.response.data) {
        console.error("API Response data:", apiError.response.data);
      }
      
      if (apiError.request) {
        console.error("API Request details:", {
          url: apiError.request.url || 'unknown',
          method: apiError.request.method || 'unknown',
          status: apiError.request.status || 'unknown'
        });
      }
      
      throw apiError; // Re-throw to be caught by outer try/catch
    }
  } catch (error) {
    console.error("MailerSend newsletter email error:", error);
    
    // Log detailed error for debugging
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
        cause: error.cause
      });
      
      // Special handling for common MailerSend errors
      if (error.message.includes("domain") || error.message.includes("sender")) {
        console.error("This appears to be a domain verification error. Make sure the sender domain is verified in MailerSend.");
      } else if (error.message.includes("authorization") || error.message.includes("authenticated")) {
        console.error("This appears to be an API key issue. Check that your API key is valid and has the necessary permissions.");
      }
      
      // Try to extract more specific error messages
      try {
        if (error.response && error.response.data) {
          console.error("API error response data:", error.response.data);
        }
      } catch (e) {
        console.error("Could not extract response data:", e);
      }
    }
    return false;
  }
}

// Export the functions for CommonJS
module.exports = {
  sendContactFormEmail,
  sendNewsletterConfirmation
};