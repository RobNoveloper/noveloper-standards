import { motion } from "framer-motion";
import { useReveal } from "@/lib/hooks";
import { Check, Euro, Target, Clock } from "lucide-react";

const features = [
  "AI-powered creative solutions that feel magical to use",
  "Custom applications at affordable subscription pricing",
  "Interactive experiences that transform business processes",
  "Visually stunning interfaces with intuitive user experiences"
];

const workflowSteps = [
  { number: "01", title: "Discovery", description: "We explore your vision and business challenges to identify opportunities for innovative digital solutions." },
  { number: "02", title: "Creative Design", description: "We design intuitive, engaging interfaces that capture your brand and enhance user experience." },
  { number: "03", title: "AI-Driven Development", description: "We leverage AI to build your custom software faster and with greater creativity than traditional methods." },
  { number: "04", title: "Quality Assurance", description: "Our human senior developers review all code to ensure your application meets the highest standards of quality, security, and performance." },
  { number: "05", title: "Continuous Evolution", description: "We refine and enhance your solution over time, adding features and optimizing based on real user feedback." }
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
            Where AI-powered creativity meets accessible, affordable enterprise solutions
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 max-w-3xl mx-auto"
          >
            <p className="font-bold text-gray-700 text-center mb-4">
              Noveloper was born from curiosity and a drive to rethink how we build.
            </p>
            <p className="text-gray-600 text-center mb-4">
              We explored what AI could become in the hands of creators — not just engineers — and uncovered a new rhythm of building: faster, freer, and more intuitive. Our founders combined their expertise in AI and business solutions to create a new approach that merges advanced AI with human creativity. The result is a process that delivers tailored applications with unprecedented speed and innovation.
            </p>
            <p className="italic text-gray-600 text-center">
              No code. No fear. Just flow.
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
            
            <div className="mt-8 text-center">
              <div className="inline-block py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg">
                <span className="font-medium">Experience the creative difference</span>
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
                We blend creative innovation with business expertise to develop applications that are both visually stunning and functionally powerful — all while maintaining affordability through our subscription model.
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
              <h4 className="font-bold text-lg mb-2">Creative Excellence</h4>
              <p className="text-gray-300">We create visually stunning, intuitively designed applications that captivate users while solving complex business challenges.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">Innovation + Affordability</h4>
              <p className="text-gray-300">Our subscription model brings enterprise-grade custom software within reach while maintaining creative brilliance.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">Transformative Experience</h4>
              <p className="text-gray-300">We don't just build software; we create digital experiences that transform how your business operates and how your customers engage.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
