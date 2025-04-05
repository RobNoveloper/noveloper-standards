import { motion } from "framer-motion";
import { useReveal } from "@/lib/hooks";
import { Zap, Smile, Fingerprint } from "lucide-react";

const philosophyCards = [
  {
    title: "Curiosity-Driven",
    description: "Noveloper was born from curiosity. We wondered what would happen if we stopped writing code... and started conducting it.",
    icon: Zap
  },
  {
    title: "Creators First",
    description: "We explored what AI could become in the hands of creators, not just engineers — and discovered a new rhythm of building.",
    icon: Smile
  },
  {
    title: "Boundary Breakers",
    description: "We're not just building tools. We're creating new possibilities for those who want to create without the traditional limitations of code.",
    icon: Fingerprint
  }
];

export function PhilosophySection() {
  const [ref, inView] = useReveal();
  
  return (
    <section id="philosophy" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4"
          >
            Our Philosophy
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg text-gray-600"
          >
            We're reimagining what it means to create software in an AI-driven world.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {philosophyCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-md p-8 transition duration-300 hover:shadow-lg"
            >
              <div className="h-12 w-12 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mb-6">
                <card.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{card.title}</h3>
              <p className="text-gray-600">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-5 diagonal-bg"></div>
            <div className="p-8 sm:p-12 grid md:grid-cols-2 gap-8 items-center relative">
              <div>
                <h3 className="text-2xl font-bold mb-4">A New Kind of Builder</h3>
                <p className="text-gray-600 mb-6">
                  Noveloper is a fusion of "no developer" and "novel" — representing our commitment to enabling creation without traditional coding while pioneering new, original approaches to software development.
                </p>
                <div className="font-mono text-sm bg-gray-100 p-4 rounded-md">
                  <span className="text-purple-600">function</span>{" "}
                  <span className="text-gray-900">createWithoutCode</span>() {"{"}<br />
                  &nbsp;&nbsp;<span className="text-blue-600">return</span>{" "}
                  <span className="text-gray-700">"AI-powered creativity"</span>;<br />
                  {"}"}
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-xs">
                  <div className="w-full aspect-square rounded-full bg-gradient-to-r from-purple-600 to-blue-600 p-1">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="font-mono text-xs sm:text-sm text-gray-800 mb-2">
                          no_code = true<br />
                          no_fear = true<br />
                          just_flow = true
                        </div>
                        <div className="font-bold text-lg">
                          NOVELOPER
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
