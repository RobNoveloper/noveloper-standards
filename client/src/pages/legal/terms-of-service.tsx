import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function TermsOfService() {
  return (
    <div className="font-sans text-gray-900 bg-white">
      <Header />
      <main className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Agreement to Terms</h2>
            <p>
              These Terms of Service constitute a legally binding agreement made between you and Noveloper ("we," "us," or "our"), concerning your access to and use of the noveloper.com website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
            </p>
            <p>
              By accessing the Site, you agree to be bound by these Terms of Service. If you do not agree to these Terms of Service, you are expressly prohibited from using the Site and must discontinue use immediately.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Intellectual Property Rights</h2>
            <p>
              Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights.
            </p>
            <p>
              The Content and Marks are provided on the Site "AS IS" for your information and personal use only. Except as expressly provided in these Terms of Service, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. User Representations</h2>
            <p>
              By using the Site, you represent and warrant that:
            </p>
            <ul className="list-disc pl-6 mt-2 mb-4">
              <li>All registration information you submit will be true, accurate, current, and complete</li>
              <li>You will maintain the accuracy of such information and promptly update such registration information as necessary</li>
              <li>You have the legal capacity and you agree to comply with these Terms of Service</li>
              <li>You are not a minor in the jurisdiction in which you reside</li>
              <li>You will not access the Site through automated or non-human means, whether through a bot, script, or otherwise</li>
              <li>You will not use the Site for any illegal or unauthorized purpose</li>
              <li>Your use of the Site will not violate any applicable law or regulation</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Services</h2>
            <p>
              We provide custom software development services ("Services") as described on our Site. The Services are subject to separate agreements that will be provided to you upon engagement of our Services.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Fees and Payment</h2>
            <p>
              We offer our Services on a subscription basis with fees as described on our Site. All fees are exclusive of all taxes, levies, or duties imposed by taxing authorities, and you shall be responsible for payment of all such taxes, levies, or duties.
            </p>
            <p>
              You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Limitation of Liability</h2>
            <p>
              IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out of: (1) your use of the Site; (2) breach of these Terms of Service; (3) any breach of your representations and warranties set forth in these Terms of Service; (4) your violation of the rights of a third party, including but not limited to intellectual property rights; or (5) any overt harmful act toward any other user of the Site with whom you connected via the Site.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Term and Termination</h2>
            <p>
              These Terms of Service shall remain in full force and effect while you use the Site. We may terminate or suspend your access to the Site immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms of Service.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">9. Governing Law</h2>
            <p>
              These Terms shall be governed by and defined following the laws of [Your Country/State]. Noveloper and yourself irrevocably consent that the courts of [Your Country/State] shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">10. Changes to Terms</h2>
            <p>
              We reserve the right to change or replace these Terms of Service at any time. It is your responsibility to periodically review these Terms of Service to stay informed of updates. Your continued use of the Site after the posting of revised Terms of Service means that you accept and agree to the changes.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">11. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at legal@noveloper.com.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}