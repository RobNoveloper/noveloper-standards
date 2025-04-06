import { motion } from "framer-motion";
import { useReveal } from "@/lib/hooks";
import { 
  DollarSign, 
  FileSpreadsheet, 
  LineChart, 
  Timer,
  Code,
  Heart
} from "lucide-react";

const benefits = [
  {
    title: "Cost Predictability",
    description: "Fixed subscription pricing at €10/user/month, instead of unpredictable six-figure development costs.",
    icon: DollarSign
  },
  {
    title: "Excel Liberation",
    description: "Move beyond spreadsheet limitations to powerful, dedicated applications that fit your exact business processes.",
    icon: FileSpreadsheet
  },
  {
    title: "Business Intelligence",
    description: "Gain real-time insights and reporting that static spreadsheets can't provide.",
    icon: LineChart
  },
  {
    title: "Rapid Development",
    description: "Get your custom application in weeks, not months or years, with our AI-driven approach.",
    icon: Timer
  },
  {
    title: "No Technical Debt",
    description: "We handle all maintenance, updates, and improvements as part of your subscription.",
    icon: Code
  },
  {
    title: "Business-Focused Solutions",
    description: "Applications designed around your specific business needs, not generic templates.",
    icon: Heart
  }
];

export function BenefitsSection() {
  const [ref, inView] = useReveal<HTMLHeadingElement>();
  
  return (
    <section id="benefits" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4"
          >
            Why Choose Noveloper?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg text-gray-600"
          >
            Transform your business with custom software that's finally affordable and accessible
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md p-6 transition duration-300 hover:shadow-xl"
            >
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mb-6">
                <benefit.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gray-100 py-4 px-8 rounded-full">
            <div className="text-purple-600 font-medium">
              Custom Software at SaaS Prices. Starting at €10/user/month (100 user minimum)
            </div>
          </div>
          
          <div className="mt-8 inline-block bg-gradient-to-r from-purple-600 to-blue-600 py-1 px-1 rounded-lg">
            <div className="bg-white px-8 py-4 rounded-lg flex items-center space-x-6">
              <div className="font-bold">Compared to Traditional Custom Software:</div>
              <div className="text-purple-600 font-medium">Save 80-90% on total cost</div>
              <div className="text-gray-600">|</div>
              <div className="text-purple-600 font-medium">No upfront development costs</div>
              <div className="text-gray-600">|</div>
              <div className="text-purple-600 font-medium">Faster time-to-market</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}