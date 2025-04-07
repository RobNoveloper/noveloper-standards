import { useLanguage } from "@/contexts/language-context";
import { useTranslation } from "@/translations";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

export function WorkflowSection() {
  const { language } = useLanguage();
  const { workflow } = useTranslation(language);

  return (
    <section id="workflow" className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn(0)}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            {workflow.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {workflow.description}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn(0.2)}
          className="relative w-full max-w-5xl mx-auto mb-16"
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
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8"
        >
          <WorkflowStep
            title={workflow.steps.discovery.title}
            description={workflow.steps.discovery.description}
            step={1} 
          />
          <WorkflowStep
            title={workflow.steps.design.title}
            description={workflow.steps.design.description}
            step={2}
          />
          <WorkflowStep
            title={workflow.steps.build.title}
            description={workflow.steps.build.description}
            step={3}
          />
          <WorkflowStep
            title={workflow.steps.test.title}
            description={workflow.steps.test.description}
            step={4}
          />
          <WorkflowStep
            title={workflow.steps.launch.title}
            description={workflow.steps.launch.description}
            step={5}
          />
        </motion.div>
      </div>
    </section>
  );
}

interface WorkflowStepProps {
  title: string;
  description: string;
  step: number;
}

function WorkflowStep({ title, description, step }: WorkflowStepProps) {
  const isColorPurple = step <= 3;
  
  return (
    <div className="flex flex-col items-center">
      <div className={`relative mb-4 w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-t-4 ${
        isColorPurple ? 'border-purple-600' : 'border-indigo-600'
      }`}>
        <h3 className={`font-bold ${
          isColorPurple ? 'text-purple-600 dark:text-purple-400' : 'text-indigo-600 dark:text-indigo-400'
        } mb-2`}>
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
}