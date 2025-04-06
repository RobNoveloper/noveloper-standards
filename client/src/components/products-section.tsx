import { motion } from "framer-motion";
import { useReveal } from "@/lib/hooks";
import { LineChart, Lightbulb, PaintBucket, FileSpreadsheet } from "lucide-react";

const products = [
  {
    title: "Excel Process Transformations",
    description: "Replace your complex Excel spreadsheets with custom applications at just €10/user/month. Streamline workflows while keeping costs predictable.",
    icon: FileSpreadsheet
  },
  {
    title: "Custom SaaS Applications",
    description: "Enterprise-grade software built specifically for your business at subscription pricing that's a fraction of traditional custom development costs.",
    icon: LineChart
  },
  {
    title: "Business Intelligence Tools",
    description: "Turn your data into actionable insights without expensive BI platforms. Custom dashboards and reporting that fit your exact needs.",
    icon: Lightbulb
  }
];

export function ProductsSection() {
  const [ref, inView] = useReveal<HTMLHeadingElement>();
  
  return (
    <section id="products" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4"
          >
            Our Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg text-gray-600"
          >
            Custom software that fits your exact needs, delivered at SaaS-level pricing. 
            We make enterprise-level solutions accessible to businesses of all sizes.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden transition duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="h-48 bg-gray-100 relative">
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                    <product.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-4">
                  {product.description}
                </p>
                <a href="#" className="inline-flex items-center text-purple-600 hover:text-blue-600 transition-colors duration-300">
                  <span>Learn more</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}  
          className="mt-16 pt-8 border-t border-gray-200"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Simple, Transparent Pricing</h3>
            <p className="text-lg text-gray-600 mb-6">Just €10 per user per month with a minimum of 100 users for 18 months.</p>
            <div className="relative inline-block group cursor-pointer">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <button className="relative px-8 py-4 bg-white rounded-lg flex items-center divide-x divide-gray-600">
                <span className="pr-6 text-gray-900 font-semibold">Contact us for details</span>
                <span className="pl-6 text-purple-600">Get started</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
