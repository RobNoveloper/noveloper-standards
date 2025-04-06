import { motion } from "framer-motion";
import { useReveal } from "@/lib/hooks";
import { Mail, MapPin, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function ContactSection() {
  const [ref, inView] = useReveal();

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
            Get Started
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg text-gray-300"
          >
            Ready to transform your ideas into reality without code? Get in touch with us.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-gray-300">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              
              <div>
                <Label htmlFor="message" className="text-gray-300">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
              
              <div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-md hover:opacity-90 transition duration-300 font-medium"
                >
                  Send Message
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
              <h3 className="text-2xl font-bold mb-6">Connect With Us</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-200">Email</h4>
                    <p className="text-gray-400">rob@noveloper.ai</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-200">Location</h4>
                    <p className="text-gray-400">Rotterdam, Netherlands</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MessageSquare className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-200">Social</h4>
                    <div className="flex space-x-4 mt-2">
                      <a href="#" className="text-gray-400 hover:text-white transition duration-300">Twitter</a>
                      <a href="#" className="text-gray-400 hover:text-white transition duration-300">LinkedIn</a>
                      <a href="#" className="text-gray-400 hover:text-white transition duration-300">Instagram</a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-700">
                <h4 className="font-bold text-lg mb-4">Newsletter</h4>
                <p className="text-gray-400 mb-4">Stay updated with our latest innovations and product launches.</p>
                <div className="flex">
                  <Input
                    type="email"
                    placeholder="Your email"
                    className="flex-grow px-4 py-2 bg-gray-700 border border-gray-600 rounded-l-md text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-r-md hover:opacity-90 transition duration-300">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
