import { useLanguage } from "@/contexts/language-context";
import { useTranslation } from "@/translations";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

export function WorkflowSection() {
  const { language } = useLanguage();
  const { workflow } = useTranslation(language);

  return (
    <section id="workflow" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn(0)}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">{workflow.title}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {workflow.description}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn(0.2)}
          className="relative w-full max-w-4xl mx-auto"
        >
          <img 
            src="/assets/infinity-workflow.svg" 
            alt="Noveloper's Infinity Workflow Process" 
            className="w-full h-auto"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn(0.4)}
          className="mt-12 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6"
        >
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
            <h3 className="font-bold text-purple-700 dark:text-purple-400 mb-2">{workflow.steps.discovery.title}</h3>
            <p className="text-sm">{workflow.steps.discovery.description}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
            <h3 className="font-bold text-purple-700 dark:text-purple-400 mb-2">{workflow.steps.design.title}</h3>
            <p className="text-sm">{workflow.steps.design.description}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
            <h3 className="font-bold text-purple-700 dark:text-purple-400 mb-2">{workflow.steps.build.title}</h3>
            <p className="text-sm">{workflow.steps.build.description}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
            <h3 className="font-bold text-purple-700 dark:text-purple-400 mb-2">{workflow.steps.test.title}</h3>
            <p className="text-sm">{workflow.steps.test.description}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
            <h3 className="font-bold text-purple-700 dark:text-purple-400 mb-2">{workflow.steps.launch.title}</h3>
            <p className="text-sm">{workflow.steps.launch.description}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}