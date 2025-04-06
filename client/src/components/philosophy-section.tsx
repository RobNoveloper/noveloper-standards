import { motion } from "framer-motion";
import { useReveal } from "@/lib/hooks";
import { Zap, Smile, Fingerprint, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const philosophyCards = [
  {
    title: "Human + AI Partnership",
    description: "We combine human creativity and business understanding with AI's capabilities to create custom software solutions at accessible subscription prices.",
    icon: Zap
  },
  {
    title: "Client-Centric Approach",
    description: "We listen and translate your business challenges into custom software solutions, maintaining the human touch in consulting, architecting, and collaboration.",
    icon: Smile
  },
  {
    title: "Accelerated Innovation",
    description: "We build SaaS applications, BI tools, and interactive experiences faster than ever before, letting you realize your custom software vision quickly.",
    icon: Fingerprint
  }
];

export function PhilosophySection() {
  const [ref, inView] = useReveal<HTMLHeadingElement>();
  
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
            No Code. No Fear. Just Flow.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg text-gray-600"
          >
            We're transforming how businesses get custom software built by blending 
            human creativity and AI acceleration to make enterprise-grade solutions accessible to all.
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
                <h3 className="text-2xl font-bold mb-4">A New Kind of Studio</h3>
                <p className="text-gray-600 mb-6">
                  Noveloper is a fusion of "no developer" and "novel" — we build custom software without traditional coding, pioneering a creative approach to development that makes quality software accessible at subscription prices.
                </p>
                <div className="font-mono text-sm bg-gray-100 p-4 rounded-md mb-6">
                  <span className="text-purple-600">function</span>{" "}
                  <span className="text-gray-900">createWithoutCode</span>() {"{"}<br />
                  &nbsp;&nbsp;<span className="text-blue-600">return</span>{" "}
                  <span className="text-gray-700">"AI-powered creativity"</span>;<br />
                  {"}"}
                </div>
                <a href="#interactive-demo">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90">
                    See it in Action <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
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
