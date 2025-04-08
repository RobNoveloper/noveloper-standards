/**
 * Email Service Implementation for Noveloper
 * 
 * This file contains the email service implementation using MailerSend
 * for handling contact form submissions and newsletter subscriptions.
 */

import { MailerSend, EmailParams, Recipient, Sender } from "mailersend";

// Check for MailerSend API key
if (!process.env.MAILERSEND_API_KEY) {
  console.warn("WARNING: MAILERSEND_API_KEY environment variable is not set. Email sending will not work.");
}

// Initialize the MailerSend instance with API key
const mailerSend = process.env.MAILERSEND_API_KEY 
  ? new MailerSend({ apiKey: process.env.MAILERSEND_API_KEY })
  : null;

// Default sender using verified Noveloper domain
const defaultSender = new Sender("hello@noveloper.ai", "Noveloper");

// Default recipient for contact form submissions
const defaultRecipient = "rob@sumxholding.nl";

/**
 * Contact form data interface
 */
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

/**
 * Sends a contact form submission via email
 * 
 * @param {ContactFormData} formData - The contact form data
 * @returns {Promise<boolean>} - Success or failure
 */
export async function sendContactFormEmail(formData) {
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
    return false;
  }
}

/**
 * Sends a newsletter subscription confirmation
 * 
 * @param {string} email - The subscriber's email address
 * @returns {Promise<boolean>} - Success or failure
 */
export async function sendNewsletterConfirmation(email) {
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
    return false;
  }
}