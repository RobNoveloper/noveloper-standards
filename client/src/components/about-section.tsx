import { motion } from "framer-motion";
import { useReveal } from "@/lib/hooks";
import { Check } from "lucide-react";

const features = [
  "Data visualization and insights",
  "Planning and productivity tools",
  "Interactive dashboards and experiences",
  "Creative content and gaming experiences"
];

const workflowSteps = [
  { number: "01", title: "Ideation", description: "We start with a vision and refine it through AI-powered exploration." },
  { number: "02", title: "Prototyping", description: "Rapid AI-driven prototyping that brings concepts to life quickly." },
  { number: "03", title: "Refinement", description: "Human-guided AI iteration to perfect the product experience." },
  { number: "04", title: "Deployment", description: "Bringing innovative tools to users across platforms." }
];

export function AboutSection() {
  const [ref, inView] = useReveal();

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
            An AI-driven maker collective building tools for people who want to create without code.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4">What We Do</h3>
            <p className="text-gray-600 mb-6">
              Noveloper is not a software company in the traditional sense. We are an AI-driven creative studio that builds intelligent applications for various purposes:
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
                Instead of traditional programming, we use AI as a designer, builder, and executor. We translate ideas into working digital products without writing code.
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
              <p className="text-gray-300">Breaking free from traditional development limitations.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">No Fear</h4>
              <p className="text-gray-300">Embracing the creative process without technical barriers.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">Just Flow</h4>
              <p className="text-gray-300">Finding a new rhythm of creation with AI as your partner.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
