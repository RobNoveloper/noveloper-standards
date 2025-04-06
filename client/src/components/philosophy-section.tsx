import { motion } from "framer-motion";
import { useReveal } from "@/lib/hooks";
import { Zap, Euro, Lock } from "lucide-react";

const philosophyCards = [
  {
    title: "Custom, Not Custom-Priced",
    description: "We build truly custom solutions at fixed subscription prices (€10/user/month). No more six-figure price tags for software that fits your exact needs.",
    icon: Euro
  },
  {
    title: "Excel Liberation",
    description: "Free your business from spreadsheet limitations. We transform your Excel processes into robust applications without the enterprise-level investment.",
    icon: Zap
  },
  {
    title: "Sustainable Partnership",
    description: "Our 18-month minimum commitment (100 users) ensures we can invest in your solution while you gain predictable costs and ongoing improvements.",
    icon: Lock
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
            We're revolutionizing how businesses access custom software by combining 
            the quality of bespoke solutions with the affordability of SaaS pricing.
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
                  Noveloper emerged from a simple insight: businesses need custom software but can't afford traditional development costs. By harnessing AI and our business expertise, we've created a model where custom no longer means expensive.
                </p>
                <div className="font-mono text-sm bg-gray-100 p-4 rounded-md">
                  <span className="text-purple-600">function</span>{" "}
                  <span className="text-gray-900">makeCustomAffordable</span>() {"{"}<br />
                  &nbsp;&nbsp;<span className="text-blue-600">return</span>{" "}
                  <span className="text-gray-700">"€10/user/month"</span>;<br />
                  {"}"}
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-xs">
                  <div className="w-full aspect-square rounded-full bg-gradient-to-r from-purple-600 to-blue-600 p-1">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="font-mono text-xs sm:text-sm text-gray-800 mb-2">
                          custom_software = true<br />
                          saas_pricing = true<br />
                          excel_replacement = true
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
