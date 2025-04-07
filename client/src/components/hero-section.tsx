import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "./ui/logo";
import { useReveal } from "@/lib/hooks";
import { useLanguage } from "@/contexts/language-context";
import { useTranslation } from "@/translations";

export function HeroSection() {
  const [ref1, inView1] = useReveal<HTMLDivElement>();
  const [ref2, inView2] = useReveal<HTMLDivElement>();
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  
  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden relative"
    >
      {/* Background gradients */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          ref={ref1}
          initial={{ opacity: 0, y: 20 }}
          animate={inView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            <span className="block">{language === "nl" ? t("hero.title") : "No code."}</span>
            <span className="block">{language === "nl" ? "" : "No fear."}</span>
            <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {language === "nl" ? t("hero.subtitle") : "Just flow."}
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-lg">
            {t("hero.description")}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition duration-300"
              onClick={() => {
                const element = document.querySelector("#contact");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {t("hero.cta")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 transition duration-300"
              onClick={() => {
                const element = document.querySelector("#philosophy");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {t("hero.scrollDown")}
            </Button>
          </div>
        </motion.div>
        
        <motion.div
          ref={ref2}
          initial={{ opacity: 0, y: 20 }}
          animate={inView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center items-center"
        >
          <div className="relative w-full max-w-md">
            <div className="w-full h-64 sm:h-80 md:h-96 relative overflow-hidden rounded-xl shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-20"></div>
              <div className="flex flex-col items-center justify-center h-full p-8 text-center relative z-10">
                <Logo size="lg" withText={false} className="mb-6" />
                <div className="font-mono text-sm sm:text-base text-gray-800 overflow-hidden whitespace-nowrap border-r-2 border-gray-800 typing-animation">
                  AI-driven creativity in motion
                </div>
              </div>
              
              {/* Animated shapes */}
              <motion.div 
                className="absolute top-8 left-8 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-50"
                animate={{ y: [0, -20, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 6,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute bottom-16 right-8 w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-50"
                animate={{ y: [0, -20, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 6,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
              <motion.div 
                className="absolute top-1/2 right-16 w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-50"
                animate={{ y: [0, -20, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 6,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
