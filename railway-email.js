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

// The email address that will be shown as the sender
// Using the verified Noveloper domain email
let defaultSender;
try {
  // Check API key and log initial status
  if (process.env.MAILERSEND_API_KEY) {
    console.log("MailerSend API Key exists. Length:", process.env.MAILERSEND_API_KEY.length, "characters");
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
  if (!mailerSend) {
    console.error("Cannot send email: MailerSend API key not configured");
    return false;
  }

  console.log("Preparing to send contact form email from:", formData.name, formData.email);
  
  try {
    const recipients = [new Recipient(defaultRecipient, "Noveloper Team")];

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

    // Send the email
    console.log("Attempting to send contact form email to:", defaultRecipient);
    const response = await mailerSend.email.send(emailParams);
    console.log("MailerSend API response (contact form):", response);
    return true;
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
    }
    return false;
  }
}

/**
 * Sends a newsletter subscription confirmation
 */
async function sendNewsletterConfirmation(email) {
  if (!mailerSend) {
    console.error("Cannot send email: MailerSend API key not configured");
    return false;
  }

  console.log("Preparing to send newsletter confirmation to:", email);
  
  try {
    // Send only to the subscriber
    const recipients = [
      new Recipient(email)
    ];
    
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

    // Send the email
    console.log("Attempting to send newsletter confirmation email to:", email);
    const response = await mailerSend.email.send(emailParams);
    console.log("MailerSend API response (newsletter):", response);
    return true;
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
    }
    return false;
  }
}

// Export the functions for CommonJS
module.exports = {
  sendContactFormEmail,
  sendNewsletterConfirmation
};