import { motion } from "framer-motion";
import { useReveal } from "@/lib/hooks";
import { useLanguage } from "@/contexts/language-context";
import { useTranslation } from "@/translations";

interface WorkflowStepProps {
  number: string;
  title: string;
  description: string;
}

function WorkflowStep({ number, title, description }: WorkflowStepProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all hover:shadow-lg border-t-4 border-purple-500">
      <div className="text-purple-600 dark:text-purple-400 font-bold text-lg mb-1">{number}</div>
      <h3 className="font-bold text-gray-800 dark:text-gray-200 text-lg mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </div>
  );
}

export function AboutSection() {
  const [ref, inView] = useReveal<HTMLHeadingElement>();
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const { workflow } = useTranslation(language);

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
            {t("about.title")}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 max-w-3xl mx-auto"
          >
            <p className="text-gray-600 text-center mb-4">
              {t("about.origin.content1")}
            </p>
            <p className="text-gray-600 text-center mb-4">
              {t("about.origin.content2")}
            </p>
            <p className="italic text-gray-600 text-center">
              {t("about.slogan")}
            </p>
          </motion.div>
        </div>
        
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-6xl mx-auto mt-16"
          >
            <div id="workflow-steps" className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-center">{t("about.workflow.title")}</h3>
              <p className="text-gray-600 mb-6 text-center">
                {t("about.workflow.subtitle")}
              </p>
              
              {/* Workflow Steps Cards */}
              <div className="mt-8 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <WorkflowStep 
                    number="01" 
                    title={workflow.steps.discovery.title} 
                    description={workflow.steps.discovery.description} 
                  />
                  <WorkflowStep 
                    number="02" 
                    title={workflow.steps.design.title} 
                    description={workflow.steps.design.description} 
                  />
                  <WorkflowStep 
                    number="03" 
                    title={workflow.steps.build.title} 
                    description={workflow.steps.build.description} 
                  />
                  <WorkflowStep 
                    number="04" 
                    title={workflow.steps.test.title} 
                    description={workflow.steps.test.description} 
                  />
                  <WorkflowStep 
                    number="05" 
                    title={workflow.steps.launch.title} 
                    description={workflow.steps.launch.description} 
                  />
                </div>
              </div>
            </div>
          </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 p-8 bg-black rounded-xl text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-6">{t("about.promise.title")}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold text-lg mb-2">{t("about.promise.excellence.title")}</h4>
              <p className="text-gray-300">{t("about.promise.excellence.content")}</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">{t("about.promise.innovation.title")}</h4>
              <p className="text-gray-300">{t("about.promise.innovation.content")}</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">{t("about.promise.experience.title")}</h4>
              <p className="text-gray-300">{t("about.promise.experience.content")}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
