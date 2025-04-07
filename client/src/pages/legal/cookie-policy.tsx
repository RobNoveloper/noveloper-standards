import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function CookiePolicy() {
  return (
    <div className="font-sans text-gray-900 bg-white">
      <Header />
      <main className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>
              Noveloper ("we," "our," or "us") uses cookies on our website, noveloper.com, and its associated services (collectively, our "Service"). By using the Service, you consent to the use of cookies.
            </p>
            <p>
              This Cookie Policy explains what cookies are, how we use cookies, how third parties we may partner with may use cookies on the Service, your choices regarding cookies, and further information about cookies.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. What Are Cookies</h2>
            <p>
              Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third party to recognize you and make your next visit easier and the Service more useful to you.
            </p>
            <p>
              Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your personal computer or mobile device when you go offline, while session cookies are deleted as soon as you close your web browser.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. How Noveloper Uses Cookies</h2>
            <p>
              When you use and access the Service, we may place a number of cookie files in your web browser. We use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 mt-2 mb-4">
              <li>To enable certain functions of the Service</li>
              <li>To provide analytics</li>
              <li>To store your preferences</li>
              <li>To enable advertisements delivery, including behavioral advertising</li>
            </ul>
            <p>
              We use both session and persistent cookies on the Service and we use different types of cookies to run the Service:
            </p>
            <ul className="list-disc pl-6 mt-2 mb-4">
              <li><strong>Essential cookies.</strong> These cookies are required for the operation of our website and enable you to use its features.</li>
              <li><strong>Analytical/performance cookies.</strong> These allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it. This helps us to improve the way our website works.</li>
              <li><strong>Functionality cookies.</strong> These cookies are used to recognize you when you return to our website. This enables us to personalize our content for you, greet you by name and remember your preferences.</li>
              <li><strong>Targeting cookies.</strong> These cookies record your visit to our website, the pages you have visited and the links you have followed. We will use this information to make our website and the advertising displayed on it more relevant to your interests.</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Third-Party Cookies</h2>
            <p>
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. What Are Your Choices Regarding Cookies</h2>
            <p>
              If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser.
            </p>
            <p>
              Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Where Can You Find More Information About Cookies</h2>
            <p>
              You can learn more about cookies at the following third-party websites:
            </p>
            <ul className="list-disc pl-6 mt-2 mb-4">
              <li>AllAboutCookies: <a href="https://www.allaboutcookies.org/" className="text-purple-600 hover:underline">https://www.allaboutcookies.org/</a></li>
              <li>Network Advertising Initiative: <a href="https://www.networkadvertising.org/" className="text-purple-600 hover:underline">https://www.networkadvertising.org/</a></li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Changes to This Cookie Policy</h2>
            <p>
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page. We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Cookie Policy.
            </p>
            <p>
              You are advised to review this Cookie Policy periodically for any changes. Changes to this Cookie Policy are effective when they are posted on this page.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Contact Us</h2>
            <p>
              If you have any questions about our Cookie Policy, please contact us at privacy@noveloper.com.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}