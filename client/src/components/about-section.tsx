import { motion } from "framer-motion";
import { useReveal } from "@/lib/hooks";
import { Check } from "lucide-react";

const features = [
  "Custom SaaS applications tailored to your business needs",
  "Business intelligence tools for data-driven decisions",
  "Interactive experiences and games with business impact",
  "Software development that prioritizes quality and innovation"
];

const workflowSteps = [
  { number: "01", title: "Consultation", description: "We work closely with you to understand your business needs and challenges." },
  { number: "02", title: "Solution Design", description: "Our human experts architect the solution, leveraging AI to accelerate the process." },
  { number: "03", title: "AI-Driven Development", description: "We build your custom software using AI tools to create innovative solutions." },
  { number: "04", title: "Developer Validation", description: "Experienced developers review the solution to ensure quality, security, and best practices." },
  { number: "05", title: "Launch & Support", description: "We deliver your solution and provide ongoing support for your business." }
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
            An AI-powered creative studio that builds custom software for businesses, reimagining how software is created.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 max-w-3xl mx-auto"
          >
            <p className="italic text-gray-600 text-center mb-4">
              Noveloper was born from curiosity.
            </p>
            <p className="text-gray-600 text-center mb-4">
              We wondered what would happen if we stopped writing code… and started conducting it. We explored what AI could become in the hands of creators, not just engineers — and discovered a new rhythm of building.
            </p>
            <p className="italic text-gray-600 text-center">
              Noveloper isn't just a name. It's a mindset. 
              A new kind of builder. A new kind of studio.
            </p>
          </motion.div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4">What We Do</h3>
            <p className="text-gray-600 mb-6">
              Noveloper is an AI-powered creative studio that builds custom software solutions for clients. We work with businesses to create:
            </p>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-6 w-6 text-purple-600 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-4">How We Work</h3>
              <p className="text-gray-600 mb-6">
                We combine human expertise in consulting, design, and business understanding with AI-powered development tools to build custom software solutions that balance innovation, quality, and efficiency.
              </p>
              <div className="space-y-4">
                {workflowSteps.map((step) => (
                  <div key={step.number} className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="font-bold text-gray-700">{step.number}</span>
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
          <h3 className="text-2xl font-bold mb-6">The Noveloper Mindset</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold text-lg mb-2">No Code</h4>
              <p className="text-gray-300">We build custom software without traditional coding—enabling a new approach to development for our clients.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">No Fear</h4>
              <p className="text-gray-300">We tackle complex software challenges with confidence, helping businesses innovate without technical barriers.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">Just Flow</h4>
              <p className="text-gray-300">We deliver a seamless development experience from consultation to launch, powered by human expertise and AI tools.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
