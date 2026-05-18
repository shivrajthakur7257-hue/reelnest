export const metadata = {
  title: 'Terms & Conditions - ReelNest',
  description: 'Read the ReelNest terms and conditions for using our free video and MP3 download service.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-24 pb-32 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8">
          Terms &amp; <span className="neon-text">Conditions</span>
        </h1>

        <div className="space-y-8 text-gray-400 text-sm leading-relaxed">
          <section className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using ReelNest, you accept and agree to be bound by these terms and conditions. If you do not agree, please do not use the service.
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">2. Use of Service</h2>
            <p>
              ReelNest provides tools for downloading publicly available media content. You agree to use this service only for lawful purposes and in accordance with all applicable laws and regulations. You are solely responsible for ensuring you have the right to download any content.
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">3. Intellectual Property</h2>
            <p>
              ReelNest does not host, store, or distribute any copyrighted content. All content accessed through our service belongs to its respective owners. We are not responsible for any copyright infringement resulting from the use of our service.
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">4. Limitation of Liability</h2>
            <p>
              ReelNest is provided &quot;as is&quot; without warranties of any kind. We shall not be liable for any damages arising from the use or inability to use the service, including but not limited to direct, indirect, incidental, or consequential damages.
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">5. Service Availability</h2>
            <p>
              We strive to maintain service availability but do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue the service at any time without notice.
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">6. Abuse Prevention</h2>
            <p>
              We implement rate limiting and security measures to prevent abuse. Automated or excessive requests may be blocked. We reserve the right to restrict access to users who violate these terms.
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">7. Changes to Terms</h2>
            <p>
              We may update these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <p className="text-xs text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
