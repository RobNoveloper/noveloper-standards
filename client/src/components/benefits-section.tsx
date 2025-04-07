import { motion } from "framer-motion";
import { useReveal } from "@/lib/hooks";
import { 
  DollarSign, 
  Lightbulb, 
  Timer,
  Heart,
  Shield,
  Headphones
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useTranslation } from "@/translations";

const benefitIcons = [Lightbulb, DollarSign, Timer, Heart, Shield, Headphones];

export function BenefitsSection() {
  const [ref, inView] = useReveal<HTMLHeadingElement>();
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  
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
            {t("benefits.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg text-gray-600"
          >
            {t("benefits.subtitle")}
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Innovation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-white rounded-xl shadow-md p-6 transition duration-300 hover:shadow-xl"
          >
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mb-6">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t("benefits.innovation.title")}</h3>
            <p className="text-gray-600">
              {t("benefits.innovation.content")}
            </p>
          </motion.div>
          
          {/* Cost */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-6 transition duration-300 hover:shadow-xl"
          >
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mb-6">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t("benefits.cost.title")}</h3>
            <p className="text-gray-600">
              {t("benefits.cost.content")}
            </p>
          </motion.div>
          
          {/* Speed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6 transition duration-300 hover:shadow-xl"
          >
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mb-6">
              <Timer className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t("benefits.speed.title")}</h3>
            <p className="text-gray-600">
              {t("benefits.speed.content")}
            </p>
          </motion.div>
          
          {/* Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-xl shadow-md p-6 transition duration-300 hover:shadow-xl"
          >
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mb-6">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t("benefits.design.title")}</h3>
            <p className="text-gray-600">
              {t("benefits.design.content")}
            </p>
          </motion.div>
          
          {/* Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white rounded-xl shadow-md p-6 transition duration-300 hover:shadow-xl"
          >
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mb-6">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t("benefits.security.title")}</h3>
            <p className="text-gray-600">
              {t("benefits.security.content")}
            </p>
          </motion.div>
          
          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white rounded-xl shadow-md p-6 transition duration-300 hover:shadow-xl"
          >
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mb-6">
              <Headphones className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t("benefits.support.title")}</h3>
            <p className="text-gray-600">
              {t("benefits.support.content")}
            </p>
          </motion.div>
        </div>
        

      </div>
    </section>
  );
}