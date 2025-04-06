import { MailerSend, EmailParams, Recipient, Sender } from "mailersend";

if (!process.env.MAILERSEND_API_KEY) {
  console.warn("WARNING: MAILERSEND_API_KEY environment variable is not set. Email sending will not work.");
}

// Initialize the MailerSend instance with your API key
const mailerSend = process.env.MAILERSEND_API_KEY 
  ? new MailerSend({ apiKey: process.env.MAILERSEND_API_KEY })
  : null;

// The email address that will be shown as the sender
// Now using a verified Noveloper domain email
const defaultSender = new Sender("hello@noveloper.ai", "Noveloper");

// The email address that will receive contact form submissions
const defaultRecipient = "rob@sumxholding.nl";

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
    await mailerSend.email.send(emailParams);
    return true;
  } catch (error) {
    console.error("MailerSend email error:", error);
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

  try {
    // Send to the subscriber and also to your email for tracking
    const recipients = [
      new Recipient(email),
      new Recipient(defaultRecipient, "Noveloper Team")
    ];

    // Structure the email
    // Different subjects for subscriber vs admin
    const emailParams = new EmailParams()
      .setFrom(defaultSender)
      .setTo(recipients)
      .setSubject(recipient => 
        recipient.email === defaultRecipient 
          ? "New Newsletter Subscription: " + email 
          : "Welcome to the Noveloper Newsletter")
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
    await mailerSend.email.send(emailParams);
    return true;
  } catch (error) {
    console.error("MailerSend email error:", error);
    return false;
  }
}