/**
 * Standard Noveloper Email Service
 * 
 * This module provides a standardized approach to sending emails
 * across Noveloper projects using MailerSend.
 */

import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

interface EmailServiceConfig {
  apiKey: string;
  defaultSender: {
    email: string;
    name: string;
  };
  defaultReplyTo?: {
    email: string;
    name: string;
  };
}

export class EmailService {
  private mailerSend: MailerSend;
  private sender: Sender;
  private replyTo?: Sender;
  
  /**
   * Create a new EmailService instance
   * 
   * @param config Configuration options for the email service
   */
  constructor(config: EmailServiceConfig) {
    this.mailerSend = new MailerSend({
      apiKey: config.apiKey,
    });
    
    this.sender = new Sender(
      config.defaultSender.email,
      config.defaultSender.name
    );
    
    if (config.defaultReplyTo) {
      this.replyTo = new Sender(
        config.defaultReplyTo.email,
        config.defaultReplyTo.name
      );
    }
    
    // Validate configuration
    this.validateConfig();
  }
  
  /**
   * Validate the email service configuration
   */
  private validateConfig(): void {
    try {
      console.log('MailerSend initialized successfully');
      console.log(`Configured sender: ${this.sender.email}`);
      
      // Extract domain from sender email
      const domain = this.sender.email.split('@')[1];
      console.log(`WARNING: Make sure '${domain}' domain is verified in your MailerSend account`);
    } catch (error) {
      console.error('Failed to initialize email service:', error);
      throw new Error('Email service initialization failed');
    }
  }
  
  /**
   * Send an email
   * 
   * @param to Recipient email address
   * @param subject Email subject
   * @param textContent Plain text content
   * @param htmlContent HTML content
   * @param options Additional email options
   */
  async sendEmail(
    to: { email: string; name?: string },
    subject: string,
    textContent: string,
    htmlContent: string,
    options?: {
      cc?: Array<{ email: string; name?: string }>,
      bcc?: Array<{ email: string; name?: string }>,
      attachments?: Array<{ content: string; filename: string }>,
      customSender?: { email: string; name: string },
      templateId?: string,
      variables?: Record<string, any>,
    }
  ): Promise<boolean> {
    try {
      // Create recipients
      const recipients = [
        new Recipient(to.email, to.name || to.email.split('@')[0])
      ];
      
      // Initialize email parameters
      const emailParams = new EmailParams()
        .setFrom(options?.customSender ? 
          new Sender(options.customSender.email, options.customSender.name) : 
          this.sender)
        .setTo(recipients)
        .setSubject(subject)
        .setText(textContent)
        .setHtml(htmlContent);
      
      // Add reply-to if configured
      if (this.replyTo) {
        emailParams.setReplyTo(this.replyTo);
      }
      
      // Add CC recipients if provided
      if (options?.cc && options.cc.length > 0) {
        emailParams.setCc(
          options.cc.map(cc => new Recipient(cc.email, cc.name || cc.email.split('@')[0]))
        );
      }
      
      // Add BCC recipients if provided
      if (options?.bcc && options.bcc.length > 0) {
        emailParams.setBcc(
          options.bcc.map(bcc => new Recipient(bcc.email, bcc.name || bcc.email.split('@')[0]))
        );
      }
      
      // Add attachments if provided
      if (options?.attachments && options.attachments.length > 0) {
        emailParams.setAttachments(options.attachments);
      }
      
      // Use template if provided
      if (options?.templateId) {
        emailParams.setTemplateId(options.templateId);
        
        // Add template variables if provided
        if (options.variables) {
          emailParams.setVariables(options.variables);
        }
      }
      
      // Send the email
      const response = await this.mailerSend.email.send(emailParams);
      
      // Check if the email was sent successfully
      return response.statusCode === 202;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }
  
  /**
   * Send a contact form submission via email
   * 
   * @param formData Contact form data
   */
  async sendContactFormEmail(formData: {
    name: string;
    email: string;
    message: string;
  }): Promise<boolean> {
    const subject = `New Contact Form Submission from ${formData.name}`;
    
    const textContent = `
Name: ${formData.name}
Email: ${formData.email}
Message: ${formData.message}
    `.trim();
    
    const htmlContent = `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${formData.name}</p>
<p><strong>Email:</strong> ${formData.email}</p>
<p><strong>Message:</strong></p>
<p>${formData.message.replace(/\n/g, '<br>')}</p>
    `.trim();
    
    return this.sendEmail(
      { email: this.sender.email },
      subject,
      textContent,
      htmlContent,
      {
        replyTo: { email: formData.email, name: formData.name }
      }
    );
  }
  
  /**
   * Send a newsletter subscription confirmation
   * 
   * @param email Subscriber's email address
   */
  async sendNewsletterConfirmation(email: string): Promise<boolean> {
    const subject = 'Thank you for subscribing to our newsletter';
    
    const textContent = `
Thank you for subscribing to the Noveloper newsletter.

You'll now receive updates on our latest products, services, and industry insights.

If you didn't subscribe or wish to unsubscribe, please click the unsubscribe link in the footer.

Best regards,
The Noveloper Team
    `.trim();
    
    const htmlContent = `
<h2>Thank you for subscribing!</h2>
<p>You'll now receive updates on our latest products, services, and industry insights.</p>
<p>If you didn't subscribe or wish to unsubscribe, please click the unsubscribe link in the footer.</p>
<p>Best regards,<br>The Noveloper Team</p>
    `.trim();
    
    return this.sendEmail(
      { email },
      subject,
      textContent,
      htmlContent
    );
  }
}

// Example of creating an email service instance
// const emailService = new EmailService({
//   apiKey: process.env.MAILERSEND_API_KEY || '',
//   defaultSender: {
//     email: 'rob@noveloper.ai',
//     name: 'Rob @ Noveloper',
//   },
// });