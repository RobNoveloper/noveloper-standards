import { motion } from "framer-motion";
import { useReveal } from "@/lib/hooks";
import { FileSpreadsheet } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/language-context";
import { useTranslation } from "@/translations";

export function InteractiveDemo() {
  const [ref, inView] = useReveal<HTMLHeadingElement>();
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <section id="interactive-demo" className="py-16 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      <div className="absolute top-1/2 left-0 -ml-40 w-80 h-80 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-10 blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4"
          >
            {t.interactiveDemo.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg text-gray-600"
          >
            {t.interactiveDemo.description}
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-4 bg-purple-50 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <FileSpreadsheet className="h-5 w-5 text-purple-600 mr-2" />
              <div className="text-sm font-medium">Excel Process Transformation</div>
            </div>
            <div className="text-xs text-gray-500">Monthly Expense Tracking Example</div>
          </div>
          
          <div className="p-6">
            <div className="w-full">
              <Tabs defaultValue="before" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="before">Before: Excel Process</TabsTrigger>
                  <TabsTrigger value="after">After: Custom Application</TabsTrigger>
                </TabsList>
                
                <TabsContent value="before" className="border rounded-lg p-4">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-4">
                      <div className="flex items-center">
                        <FileSpreadsheet className="h-4 w-4 text-green-600 mr-2" />
                        <span className="font-mono text-sm">ExpenseTracking_2025_Q1.xlsx</span>
                      </div>
                      <div className="text-xs text-gray-500">Last modified: Yesterday</div>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-sm text-left">Date</th>
                            <th className="border border-gray-300 px-4 py-2 text-sm text-left">Description</th>
                            <th className="border border-gray-300 px-4 py-2 text-sm text-left">Amount</th>
                            <th className="border border-gray-300 px-4 py-2 text-sm text-left">Category</th>
                            <th className="border border-gray-300 px-4 py-2 text-sm text-left">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2 text-sm">04/05/2025</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">Office Supplies</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">€245.00</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">Operations</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">Pending</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2 text-sm">04/02/2025</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">Software License</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">€1,200.00</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">IT</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">Approved</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2 text-sm">04/01/2025</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">Client Lunch</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">€78.50</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">Sales</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm">Pending</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-4 text-center text-xs text-gray-500">
                      <p>Issues with Excel approach:</p>
                      <ul className="text-left list-disc list-inside mt-1">
                        <li>Manual approval process via email</li>
                        <li>No real-time visibility for management</li>  
                        <li>Version control problems</li>
                        <li>Complex formulas for reporting</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="after" className="border rounded-lg p-4">
                  <div className="bg-white shadow rounded-lg">
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                      <div className="font-medium">Expense Management Portal</div>
                      <div className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded">Built by Noveloper</div>
                    </div>
                    
                    <div className="p-4">
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
                          <div className="text-sm text-gray-500 mb-1">Expenses This Month</div>
                          <div className="font-bold text-2xl">€4,580</div>
                          <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                            <div className="h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full" style={{ width: '65%' }}></div>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
                          <div className="text-sm text-gray-500 mb-1">Pending Approvals</div>
                          <div className="font-bold text-2xl">8</div>
                          <div className="text-xs text-green-600 mt-2">
                            <span>↓ 12% from last month</span>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
                          <div className="text-sm text-gray-500 mb-1">Quarterly Budget</div>
                          <div className="font-bold text-2xl">€22,500</div>
                          <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                            <div className="h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full" style={{ width: '35%' }}></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg overflow-hidden mb-4">
                        <div className="p-3 bg-gray-50 border-b flex justify-between items-center">
                          <div className="font-medium">Recent Expenses</div>
                          <div className="text-sm text-purple-600">View All</div>
                        </div>
                        <table className="min-w-full">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 tracking-wider">Date</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 tracking-wider">Description</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 tracking-wider">Amount</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 tracking-wider">Status</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            <tr>
                              <td className="px-4 py-3 text-sm">04/05/2025</td>
                              <td className="px-4 py-3 text-sm">Office Supplies</td>
                              <td className="px-4 py-3 text-sm">€245.00</td>
                              <td className="px-4 py-3 text-sm">
                                <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <div className="flex space-x-2">
                                  <button className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Approve</button>
                                  <button className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded">Reject</button>
                                </div>
                              </td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="px-4 py-3 text-sm">04/02/2025</td>
                              <td className="px-4 py-3 text-sm">Software License</td>
                              <td className="px-4 py-3 text-sm">€1,200.00</td>
                              <td className="px-4 py-3 text-sm">
                                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Approved</span>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <button className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded">View</button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="text-center mt-4 text-sm text-gray-500">
                        <div className="font-medium mb-1">Benefits of your custom application:</div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-left">
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                            <span>Automated approval workflows</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                            <span>Real-time reporting dashboards</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                            <span>Mobile accessibility</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                            <span>Automated expense categorization</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-8 text-center">
                <div className="text-sm text-gray-600 bg-purple-50 p-4 rounded-lg inline-block">
                  <p>This demo illustrates how we transform business processes into custom applications.</p>
                  <p>Experience the power of AI-driven software development.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
