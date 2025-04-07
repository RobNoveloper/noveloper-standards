import { motion } from "framer-motion";
import { useReveal } from "@/lib/hooks";
import { Zap, Smile, Fingerprint, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { useTranslation } from "@/translations";

const icons = [Zap, Smile, Fingerprint];

export function PhilosophySection() {
  const [ref, inView] = useReveal<HTMLHeadingElement>();
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  
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
            {t("philosophy.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg text-gray-600"
          >
            {t("philosophy.content")}
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {(t("philosophy.cards") as any[]).map((card, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-md p-8 transition duration-300 hover:shadow-lg"
              >
                <div className="h-12 w-12 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mb-6">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-gray-600">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition duration-300"
            onClick={() => {
              const element = document.querySelector("#workflow");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t("philosophy.cta")} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
        
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
                <h3 className="text-2xl font-bold mb-4">{t("philosophy.studioSection.title")}</h3>
                <p className="text-gray-600 mb-6">
                  {t("philosophy.studioSection.description")}
                </p>
                <a 
                  href="#interactive-demo" 
                  className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-md hover:opacity-90 transition duration-300 font-medium mb-6"
                >
                  {t("philosophy.studioSection.cta")}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
                <div className="font-mono text-sm bg-gray-100 p-4 rounded-md mb-6">
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
