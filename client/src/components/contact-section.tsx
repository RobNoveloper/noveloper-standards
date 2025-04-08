/**
 * Contact Section Component
 * 
 * This component handles the contact form, newsletter subscription, and displays contact information.
 * 
 * API INTEGRATION PLAN:
 * - Current Implementation: Uses direct email fallback with clear user messaging due to CORS limitations
 * - Future Implementation: Will integrate with api.noveloper.ai subdomain for proper CORS-compliant API calls
 * - When api.noveloper.ai is set up:
 *   1. Remove the isProdSite conditional blocks with the setTimeout fallbacks
 *   2. Use the getApiEndpoint helper function for API URLs
 * 
 * For setup instructions on api.noveloper.ai, see API-SUBDOMAIN-SETUP.txt
 */

import { motion } from "framer-motion";
import { useReveal } from "@/lib/hooks";
import { Mail, MapPin, MessageSquare, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, FormEvent, ChangeEvent } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context";
import { useTranslation } from "@/translations";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  general?: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  errors?: Array<{ field: string, message: string }>;
}

export function ContactSection() {
  const [ref, inView] = useReveal();
  const { toast } = useToast();
  const { language } = useLanguage();
  const { contact } = useTranslation(language);
  
  // Form state
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    message: ""
  });
  
  // Newsletter state
  const [newsletter, setNewsletter] = useState("");
  
  // Loading states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  
  // Errors
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Handle input changes for contact form
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }
  };
  
  // Handle contact form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: FormErrors = {};
    if (!formState.name) newErrors.name = contact.form.validationError.required.name;
    if (!formState.email) newErrors.email = contact.form.validationError.required.email;
    else if (!/\S+@\S+\.\S+/.test(formState.email)) newErrors.email = contact.form.validationError.invalid.email;
    if (!formState.message) newErrors.message = contact.form.validationError.required.message;
    else if (formState.message.length < 10) newErrors.message = contact.form.validationError.invalid.message;
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Determine API URL based on environment
    let apiUrl = '/api/contact';
    
    // Use the deployed API URL for production websites
    const isProdSite = window.location.hostname === 'www.noveloper.ai' || 
                       window.location.hostname === 'noveloper.ai';
                       
    // This will be used once the api.noveloper.ai subdomain is set up
    const getApiEndpoint = (endpoint: string): string => {
      if (isProdSite) {
        return `https://api.noveloper.ai${endpoint}`;
      }
      return endpoint;
    };
    
    if (isProdSite) {
      // Temporary fallback with instruction message while API subdomain is being set up
      setTimeout(() => {
        toast({
          title: "Message Received - Direct Email Fallback",
          description: "⚠️ Live form submission is being set up (api.noveloper.ai). For now, please email rob@noveloper.ai directly with your details. We'll confirm when we receive your message!",
          variant: "default",
          duration: 10000, // Longer duration so user can see the message
        });
        
        // Console logging for development purposes
        console.log("Using direct email fallback. Online form submission will be active once api.noveloper.ai is set up.");
        
        // Reset form
        setFormState({ name: "", email: "", message: "" });
        setIsSubmitting(false);
      }, 1500); // Short delay to simulate processing
      
      return;
    }
    
    try {
      console.log(`Submitting contact form to: ${apiUrl}`);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });
      
      const data = await response.json() as ApiResponse;
      
      if (data.success) {
        toast({
          title: "Success!",
          description: contact.form.success,
          variant: "default"
        });
        
        // Reset form
        setFormState({ name: "", email: "", message: "" });
      } else {
        // Show error message from server
        setErrors({ general: data.message || contact.form.error });
        toast({
          title: "Error",
          description: data.message || contact.form.error,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: contact.form.error,
        variant: "destructive"
      });
      setErrors({ general: contact.form.validationError.general });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle newsletter subscription
  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!newsletter) {
      toast({
        title: "Error",
        description: contact.newsletter.validationError.required,
        variant: "destructive"
      });
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(newsletter)) {
      toast({
        title: "Error",
        description: contact.newsletter.validationError.invalid,
        variant: "destructive"
      });
      return;
    }
    
    setIsSubscribing(true);
    
    // Determine API URL based on environment
    let apiUrl = '/api/newsletter';
    
    // Use the deployed API URL for production websites
    const isProdSite = window.location.hostname === 'www.noveloper.ai' || 
                       window.location.hostname === 'noveloper.ai';
                       
    // This will be used once the api.noveloper.ai subdomain is set up
    const getApiEndpoint = (endpoint: string): string => {
      if (isProdSite) {
        return `https://api.noveloper.ai${endpoint}`;
      }
      return endpoint;
    };
    
    if (isProdSite) {
      // Temporary fallback with instruction message while API subdomain is being set up
      setTimeout(() => {
        toast({
          title: "Newsletter Subscription - Direct Email Fallback",
          description: "⚠️ Live subscription is being set up (api.noveloper.ai). For now, please email rob@noveloper.ai with subject 'Newsletter' to be added to our mailing list.",
          variant: "default",
          duration: 10000, // Longer duration so user can see the message
        });
        
        // Console logging for development purposes
        console.log("Using direct email fallback for newsletter. Online subscription will be active once api.noveloper.ai is set up.");
        
        // Reset form
        setNewsletter("");
        setIsSubscribing(false);
      }, 1500); // Short delay to simulate processing
      
      return;
    }
    
    try {
      console.log(`Submitting newsletter subscription to: ${apiUrl}`);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletter })
      });
      
      const data = await response.json() as ApiResponse;
      
      if (data.success) {
        toast({
          title: "Success!",
          description: contact.newsletter.success,
          variant: "default"
        });
        
        // Reset form
        setNewsletter("");
      } else {
        toast({
          title: "Error",
          description: data.message || contact.newsletter.error,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast({
        title: "Error",
        description: contact.newsletter.validationError.general,
        variant: "destructive"
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
          >
            {contact.getStarted}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg text-gray-300"
          >
            {contact.readyTransform}
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {errors.general && (
              <div className="mb-4 p-3 bg-red-900/40 border border-red-500 rounded-md text-red-200">
                {errors.general}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-gray-300">{contact.form.name}</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full px-4 py-3 bg-gray-800 border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-md text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
              </div>
              
              <div>
                <Label htmlFor="email" className="text-gray-300">{contact.form.email}</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full px-4 py-3 bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-md text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
              </div>
              
              <div>
                <Label htmlFor="message" className="text-gray-300">{contact.form.message}</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formState.message}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full px-4 py-3 bg-gray-800 border ${errors.message ? 'border-red-500' : 'border-gray-700'} rounded-md text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                />
                {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
              </div>
              
              <div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-md hover:opacity-90 transition duration-300 font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {contact.form.sending}
                    </>
                  ) : contact.form.submit}
                </Button>
              </div>
            </form>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-gray-800 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">{contact.connect.title}</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-200">{contact.connect.email}</h4>
                    <p className="text-gray-400">rob@noveloper.ai</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-200">{contact.connect.location}</h4>
                    <p className="text-gray-400">{contact.connect.rotterdam}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MessageSquare className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-200">{contact.connect.social}</h4>
                    <div className="flex space-x-4 mt-2">
                      <a href="#" className="text-gray-400 hover:text-white transition duration-300">Twitter</a>
                      <a href="#" className="text-gray-400 hover:text-white transition duration-300">LinkedIn</a>
                      <a href="#" className="text-gray-400 hover:text-white transition duration-300">Instagram</a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-700">
                <h4 className="font-bold text-lg mb-4">{contact.newsletter.title}</h4>
                <p className="text-gray-400 mb-4">{contact.newsletter.description}</p>
                <form onSubmit={handleSubscribe} className="flex">
                  <Input
                    type="email"
                    placeholder={contact.newsletter.placeholder}
                    value={newsletter}
                    onChange={(e) => setNewsletter(e.target.value)}
                    className="flex-grow px-4 py-2 bg-gray-700 border border-gray-600 rounded-l-md text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-r-md hover:opacity-90 transition duration-300"
                    disabled={isSubscribing}
                  >
                    {isSubscribing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : contact.newsletter.button}
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
