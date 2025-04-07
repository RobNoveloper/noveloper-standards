import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function PrivacyPolicy() {
  return (
    <div className="font-sans text-gray-900 bg-white">
      <Header />
      <main className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>
              Noveloper ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Noveloper. This Privacy Policy applies to our website, noveloper.com, and its associated services (collectively, our "Service").
            </p>
            <p>
              By accessing or using our Service, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when you:
            </p>
            <ul className="list-disc pl-6 mt-2 mb-4">
              <li>Fill out forms on our website, including contact or newsletter signup forms</li>
              <li>Correspond with us by phone, email, or other means</li>
              <li>Use our services or request information about our services</li>
            </ul>
            <p>
              The types of information we collect may include your name, email address, phone number, company name, and any other information you choose to provide.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
            <p>
              We use the information we collect for various purposes, including to:
            </p>
            <ul className="list-disc pl-6 mt-2 mb-4">
              <li>Provide, maintain, and improve our Service</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Communicate with you about products, services, offers, and events</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our Service</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              <li>Comply with legal obligations</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Sharing of Information</h2>
            <p>
              We may share your personal information in the following situations:
            </p>
            <ul className="list-disc pl-6 mt-2 mb-4">
              <li>With third-party service providers who perform services on our behalf</li>
              <li>If we believe disclosure is necessary to comply with any applicable law, regulation, legal process, or governmental request</li>
              <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business by another company</li>
              <li>With your consent or at your direction</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Data Security</h2>
            <p>
              We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no security system is impenetrable, and we cannot guarantee the security of our systems.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, such as the right to:
            </p>
            <ul className="list-disc pl-6 mt-2 mb-4">
              <li>Access the personal information we have about you</li>
              <li>Correct inaccuracies in your personal information</li>
              <li>Delete your personal information</li>
              <li>Object to the processing of your personal information</li>
              <li>Request that we limit our use and disclosure of your personal information</li>
              <li>Request portability of your personal information</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at privacy@noveloper.com.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. If we make material changes, we will notify you by email or through a notice on our website prior to the change becoming effective. We encourage you to review our Privacy Policy frequently to stay informed about how we are protecting your information.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@noveloper.com.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}