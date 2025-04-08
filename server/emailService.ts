import { MailerSend, EmailParams, Recipient, Sender } from "mailersend";

// Check for API key
if (!process.env.MAILERSEND_API_KEY) {
  console.warn("WARNING: MAILERSEND_API_KEY environment variable is not set. Email sending will not work.");
}

// Initialize the MailerSend instance with your API key and more detailed error handling
let mailerSend: MailerSend | null = null;
try {
  if (process.env.MAILERSEND_API_KEY) {
    mailerSend = new MailerSend({ apiKey: process.env.MAILERSEND_API_KEY });
    console.log("MailerSend initialized successfully");
  }
} catch (error) {
  console.error("Error initializing MailerSend:", error);
  if (error instanceof Error) {
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
  }
}

// The email address that will be shown as the sender
// Using a verified Noveloper domain email (needs domain verification in MailerSend)

// Initialize with default sender
const createSender = (): Sender => {
  try {
    // Primary sender (requires domain verification in MailerSend)
    const sender = new Sender("hello@noveloper.ai", "Noveloper");
    console.log("Configured sender: hello@noveloper.ai");
    console.log("WARNING: Make sure 'noveloper.ai' domain is verified in your MailerSend account");
    return sender;
  } catch (error) {
    console.error("Error configuring sender with hello@noveloper.ai:", error);
    
    try {
      // Fallback to a generic sender that might work without domain verification
      const fallbackSender = new Sender("noreply@mail.mailersend.net", "Noveloper");
      console.log("Using fallback sender: noreply@mail.mailersend.net");
      return fallbackSender;
    } catch (fallbackError) {
      console.error("Error configuring fallback sender:", fallbackError);
      throw new Error("Failed to configure any email sender");
    }
  }
};

// Create the sender
const defaultSender = createSender();

// The email address that will receive contact form submissions
const defaultRecipient = "rob@noveloper.ai";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

/**
 * Sends a contact form submission via email
 */
export async function sendContactFormEmail(formData: ContactFormData): Promise<boolean> {
  if (!mailerSend) {
    console.error("Cannot send email: MailerSend API key not configured");
    return false;
  }

  console.log("Preparing to send contact form email from:", formData.name, formData.email);
  
  try {
    // Validate the domain for sender
    console.log("Using sender configuration:", { 
      email: defaultSender.email, 
      name: defaultSender.name 
    });
    
    // Create recipients array with error handling
    const recipients = [];
    try {
      recipients.push(new Recipient(defaultRecipient, "Noveloper Team"));
      console.log("Added recipient:", defaultRecipient);
    } catch (recipError) {
      console.error("Error creating recipient:", recipError);
      return false;
    }

    // Create reply-to with error handling
    let replyTo;
    try {
      replyTo = new Recipient(formData.email, formData.name);
      console.log("Created reply-to address:", formData.email);
    } catch (replyToError) {
      console.error("Error creating reply-to:", replyToError);
      // Continue even if reply-to fails
    }

    // Structure the email with additional checks
    const emailParams = new EmailParams()
      .setFrom(defaultSender)
      .setTo(recipients);
    
    // Add reply-to only if successfully created
    if (replyTo) {
      emailParams.setReplyTo(replyTo);
    }
      
    emailParams.setSubject("New contact form submission from " + formData.name)
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

    // Send the email with more detailed logging
    console.log("Contact email configuration:", {
      from: defaultSender.email,
      to: defaultRecipient,
      subject: `New contact form submission from ${formData.name}`,
      messageLength: formData.message.length
    });
    
    console.log("Attempting to send contact form email to:", defaultRecipient);
    const response = await mailerSend.email.send(emailParams);
    console.log("MailerSend API response success (contact form):", response);
    return true;
  } catch (error) {
    console.error("MailerSend contact form email error:", error);
    
    // Log detailed error for debugging
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
        cause: (error as any).cause
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
export async function sendNewsletterConfirmation(email: string): Promise<boolean> {
  if (!mailerSend) {
    console.error("Cannot send email: MailerSend API key not configured");
    return false;
  }

  console.log("Preparing to send newsletter confirmation to:", email);
  
  try {
    // Validate the domain for sender first
    console.log("Using sender configuration:", { 
      email: defaultSender.email, 
      name: defaultSender.name 
    });
    
    // Create recipients array with error handling
    const recipients = [];
    try {
      recipients.push(new Recipient(email));
      console.log("Added recipient:", email);
    } catch (recipError) {
      console.error("Error creating recipient:", recipError);
      return false;
    }
    
    // Log admin notification
    console.log(`ADMIN NOTIFICATION: New newsletter subscription from ${email}`);

    // Structure the email with careful error handling
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

    // Send the email with more detailed logging
    console.log("Newsletter email configuration:", {
      from: defaultSender.email,
      to: email,
      subject: "Welcome to the Noveloper Newsletter"
    });
    
    console.log("Attempting to send newsletter confirmation email to:", email);
    const response = await mailerSend.email.send(emailParams);
    console.log("MailerSend API response success (newsletter):", response);
    return true;
  } catch (error) {
    console.error("MailerSend newsletter email error:", error);
    
    // Log detailed error for debugging
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
        cause: (error as any).cause
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