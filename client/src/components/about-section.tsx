import { motion } from "framer-motion";
import { useReveal } from "@/lib/hooks";

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 max-w-3xl mx-auto"
          >
            <p className="text-gray-600 text-center mb-4">
              Noveloper was born from curiosity and a drive to rethink how we build.
            </p>
            <p className="text-gray-600 text-center mb-4">
              We explored what AI could become in the hands of creators — not just engineers — and uncovered a new rhythm of building: faster, freer, and more intuitive. Our founders combined their expertise in AI, BI, and business solutions to create a new approach that merges advanced AI with human creativity. The result is a process that delivers tailored applications in weeks instead of months, transforming how quickly your solutions can come to life.
            </p>
            <p className="italic text-gray-600 text-center">
              No code. No fear. Just flow.
            </p>
          </motion.div>
        </div>
        
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-3xl mx-auto mt-16"
          >
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-center">How We Work</h3>
              <p className="text-gray-600 mb-6 text-center">
                We blend creative innovation with business expertise to develop applications that are both visually stunning and functionally powerful — creating exceptional user experiences that drive real business results.
              </p>
              <div className="space-y-6">
                {workflowSteps.map((step) => (
                  <div key={step.number} className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mr-4 flex-shrink-0 text-white">
                      <span className="font-bold">{step.number}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{step.title}</h4>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        
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
