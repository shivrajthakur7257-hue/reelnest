export const metadata = {
  title: 'Privacy Policy - ReelNest',
  description: 'Read the ReelNest privacy policy. Learn how we handle your data and protect your privacy.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24 pb-32 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8">
          Privacy <span className="neon-text">Policy</span>
        </h1>

        <div className="space-y-8 text-gray-400 text-sm leading-relaxed">
          <section className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">1. Information We Collect</h2>
            <p>
              ReelNest does not collect personal information. We do not require account creation, and we do not store your download history on our servers. Download history is stored locally in your browser using localStorage and is never transmitted to us.
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">2. URLs You Submit</h2>
            <p>
              When you submit a URL for processing, it is sent to our servers temporarily to fetch the media. We do not store these URLs after processing is complete. URLs are not linked to any personal identifier.
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">3. Cookies</h2>
            <p>
              ReelNest uses minimal cookies necessary for the website to function properly. We do not use tracking cookies, advertising cookies, or third-party analytics cookies.
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">4. Third-Party Services</h2>
            <p>
              We may use third-party services for analytics or ad serving. These services may collect anonymized usage data. We encourage you to review the privacy policies of these third-party services.
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">5. Data Security</h2>
            <p>
              We implement appropriate security measures to protect any data that passes through our servers. All communications are encrypted using HTTPS. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">6. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date. Continued use of the service constitutes acceptance of any changes.
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">7. Contact Us</h2>
            <p>
              If you have questions about this privacy policy, please contact us at privacy@reelnest.com.
            </p>
          </section>

          <p className="text-xs text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
