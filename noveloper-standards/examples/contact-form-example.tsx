/**
 * Example Contact Form Implementation
 * 
 * This example demonstrates how to use Noveloper standard components
 * to create a complete contact form with validation, API integration,
 * and error handling.
 */

import React, { useState } from 'react';
import { z } from 'zod';
import { Form, FormField, FormTextarea } from '../templates/Form';
import { apiClient } from '../templates/api-client';
import { Button } from '../templates/Button';

// Define the form schema with validation
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Define the form data type
type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactFormExample() {
  // Form state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Default form values
  const defaultValues: ContactFormData = {
    name: '',
    email: '',
    message: '',
  };
  
  // Form submission handler
  const handleSubmit = async (data: ContactFormData) => {
    try {
      setError(null);
      
      // Call API to send contact form
      const response = await apiClient.post<{ success: boolean }>('/api/contact', data);
      
      if (response.success) {
        setIsSubmitted(true);
      } else {
        setError(response.message || 'Failed to submit the form. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.');
      console.error('Contact form submission error:', err);
    }
  };
  
  // Reset the form
  const handleReset = () => {
    setIsSubmitted(false);
    setError(null);
  };
  
  // Show success message if form was submitted successfully
  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-2xl font-semibold text-green-800 mb-2">Message Sent!</h3>
        <p className="text-green-700 mb-4">
          Thank you for contacting us. We'll get back to you as soon as possible.
        </p>
        <Button variant="outline" onClick={handleReset}>
          Send Another Message
        </Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      {/* Contact form */}
      <Form
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        schema={contactFormSchema}
        submitText="Send Message"
      >
        {(form) => (
          <>
            <FormField
              form={form}
              name="name"
              label="Your Name"
              placeholder="Enter your name"
              required
            />
            
            <FormField
              form={form}
              name="email"
              label="Email Address"
              placeholder="Enter your email"
              type="email"
              required
            />
            
            <FormTextarea
              form={form}
              name="message"
              label="Message"
              placeholder="Type your message here..."
              required
            />
          </>
        )}
      </Form>
    </div>
  );
}