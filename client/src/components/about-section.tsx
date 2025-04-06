import { motion } from "framer-motion";
import { useReveal } from "@/lib/hooks";
import { Check, Euro, Target, Clock } from "lucide-react";

const features = [
  "Enterprise-quality software at €10 per user per month",
  "Excel process transformations into modern applications",
  "Custom dashboards and business intelligence tools",
  "Real solutions for real business needs, not generic templates"
];

const workflowSteps = [
  { number: "01", title: "Discovery", description: "We map your Excel processes and identify opportunities for transformation into custom applications." },
  { number: "02", title: "Requirements", description: "We document exactly what your custom application needs to do to replace your current workflows." },
  { number: "03", title: "AI-Driven Development", description: "We build your custom software using AI tools and our business expertise." },
  { number: "04", title: "Developer Validation", description: "Experienced developers review the solution to ensure quality, security, and best practices." },
  { number: "05", title: "Deployment & Onboarding", description: "We launch your solution and help your team transition from Excel to your new custom application." }
];

export function AboutSection() {
  const [ref, inView] = useReveal<HTMLHeadingElement>();

  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4"
          >
            About Noveloper
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg text-gray-600"
          >
            We're making custom software affordable for every business. No more six-figure development costs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 max-w-3xl mx-auto"
          >
            <p className="italic text-gray-600 text-center mb-4">
              Noveloper was born from a simple insight.
            </p>
            <p className="text-gray-600 text-center mb-4">
              Why do businesses still rely on complex Excel processes, when custom software would be so much better? The answer: cost. Traditional custom development is prohibitively expensive. We set out to change that equation.
            </p>
            <p className="italic text-gray-600 text-center">
              By combining AI and business expertise, we've created a new model: 
              Custom software at SaaS prices. Just €10/user/month.
            </p>
          </motion.div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4">Our Value Proposition</h3>
            <p className="text-gray-600 mb-6">
              We transform how businesses access custom software by making it affordable through a simple subscription model:
            </p>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-6 w-6 text-purple-600 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <Euro className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                <div className="font-bold text-2xl">€10</div>
                <div className="text-sm text-gray-500">per user/month</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <Target className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                <div className="font-bold text-2xl">100</div>
                <div className="text-sm text-gray-500">user minimum</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <Clock className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                <div className="font-bold text-2xl">18</div>
                <div className="text-sm text-gray-500">month commitment</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-4">Our Process</h3>
              <p className="text-gray-600 mb-6">
                We focus on understanding your business processes first, then create software specifically designed to address your unique challenges - all at a predictable monthly cost.
              </p>
              <div className="space-y-4">
                {workflowSteps.map((step) => (
                  <div key={step.number} className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mr-4 flex-shrink-0 text-white">
                      <span className="font-bold">{step.number}</span>
                    </div>
                    <div>
                      <h4 className="font-bold">{step.title}</h4>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 p-8 bg-black rounded-xl text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-6">The Noveloper Promise</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold text-lg mb-2">Custom Software</h4>
              <p className="text-gray-300">We build applications specifically designed for your business needs, not generic templates or one-size-fits-all solutions.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">Affordable Pricing</h4>
              <p className="text-gray-300">Our subscription model (€10/user/month) makes enterprise-grade software accessible to businesses of all sizes.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">Business Partnership</h4>
              <p className="text-gray-300">Our 18-month commitment means we're invested in your success and focused on delivering sustainable value.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
