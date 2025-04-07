import { motion } from "framer-motion";
import { useReveal } from "@/lib/hooks";
import { LineChart, Lightbulb, PaintBucket, FileSpreadsheet } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useTranslation } from "@/translations";

const productIcons = [LineChart, FileSpreadsheet, PaintBucket];

export function ProductsSection() {
  const [ref, inView] = useReveal<HTMLHeadingElement>();
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  
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
            {t("products.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg text-gray-600"
          >
            {t("products.subtitle")}
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-white rounded-xl shadow-md overflow-hidden transition duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="h-48 bg-gray-100 relative">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                  <LineChart className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{t("products.saas.title")}</h3>
              <p className="text-gray-600 mb-4">
                {t("products.saas.content")}
              </p>
              <a href="#contact" className="inline-flex items-center text-purple-600 hover:text-blue-600 transition-colors duration-300">
                <span>{t("products.cta")}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-xl shadow-md overflow-hidden transition duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="h-48 bg-gray-100 relative">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                  <FileSpreadsheet className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{t("products.excel.title")}</h3>
              <p className="text-gray-600 mb-4">
                {t("products.excel.content")}
              </p>
              <a href="#contact" className="inline-flex items-center text-purple-600 hover:text-blue-600 transition-colors duration-300">
                <span>{t("products.cta")}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white rounded-xl shadow-md overflow-hidden transition duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="h-48 bg-gray-100 relative">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                  <PaintBucket className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{t("products.interactive.title")}</h3>
              <p className="text-gray-600 mb-4">
                {t("products.interactive.content")}
              </p>
              <a href="#contact" className="inline-flex items-center text-purple-600 hover:text-blue-600 transition-colors duration-300">
                <span>{t("products.cta")}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
        

      </div>
    </section>
  );
}
