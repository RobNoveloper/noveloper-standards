import { useLanguage } from "@/contexts/language-context";
import { useTranslation } from "@/translations";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

export function WorkflowSection() {
  const { language } = useLanguage();
  const { workflow } = useTranslation(language);

  return (
    <section id="workflow" className="py-24 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn(0)}
          className="text-center mb-12"
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
          className="max-w-5xl mx-auto"
        >
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
        </motion.div>
      </div>
    </section>
  );
}

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