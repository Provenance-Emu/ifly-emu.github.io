import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - iFly",
  description:
    "Privacy Policy for the iFly app and website. We do not collect personal data. We use anonymous crash reports and basic analytics to improve stability and performance.",
};

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 text-center">
            Privacy Policy
          </h1>
          <p className="text-center text-gray-500 mb-10">
            Last updated: October 28, 2025
          </p>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Overview</h2>
              <p className="text-gray-400 leading-relaxed">
                iFly (the &quot;App&quot;) is a Dreamcast emulator for iOS and tvOS. We respect your privacy. We do not collect or sell personal data. The App and our website use limited, aggregated analytics and anonymous crash reporting strictly to improve stability, performance, and user experience.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Data We Collect</h2>
              <p className="text-gray-400 leading-relaxed mb-3">
                We aim to collect as little data as possible. We do not collect personal information such as your name, email address, phone number, or precise location. The App may collect the following non-personal, aggregated, or de-identified data:
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex gap-2"><span className="text-orange-500 mt-1">•</span><span><span className="font-medium text-gray-300">Crash and diagnostics data</span> (via Google/Firebase Crashlytics): anonymized crash traces, device model class, OS version, app version/build, and other technical information needed to diagnose and fix issues. This data is not used to identify you.</span></li>
                <li className="flex gap-2"><span className="text-orange-500 mt-1">•</span><span><span className="font-medium text-gray-300">Basic usage analytics</span>: aggregate feature usage, session counts, app version, device and OS version classes, and similar metrics that help us understand app performance and prioritize improvements. We do not use this data to identify or track you across apps or websites.</span></li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Website Analytics</h2>
              <p className="text-gray-400 leading-relaxed">
                Our website may use Google Analytics to understand aggregate traffic and usage. We use analytics only to maintain and improve the site and App. We do not use analytics data to profile or identify you, and we do not combine analytics data with other information to attempt to identify you. You can use browser settings or content blockers to limit analytics if you prefer.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">How We Use Data</h2>
              <ul className="space-y-2 text-gray-400">
                {['Diagnose crashes and technical issues', 'Improve stability, performance, and features', 'Understand aggregate usage to guide development priorities'].map(item => (
                  <li key={item} className="flex gap-2"><span className="text-orange-500 mt-1">•</span><span>{item}</span></li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Data Sharing and Selling</h2>
              <p className="text-gray-400 leading-relaxed">
                We do not sell your data. We do not share personal data with third parties. For the limited analytics and crash reporting described above, we use service providers (e.g., Google/Firebase) who process data on our behalf to provide these services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Data Linked to You and Tracking</h2>
              <p className="text-gray-400 leading-relaxed">
                The App is designed not to collect data that is linked to your identity. We do not use the collected data to track you across other companies&apos; apps or websites.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Retention</h2>
              <p className="text-gray-400 leading-relaxed">
                Crash and analytics data are retained by our service providers for limited periods consistent with their default retention policies (for example, Crashlytics typically retains recent reports needed for debugging, and Google Analytics event data is retained according to project settings). We do not retain personal data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Children&apos;s Privacy</h2>
              <p className="text-gray-400 leading-relaxed">
                The App is not directed to children under the age of 13 (or the equivalent age in your jurisdiction). We do not knowingly collect personal information from children.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">International Transfers</h2>
              <p className="text-gray-400 leading-relaxed">
                Depending on your location, data processed by our service providers may be transferred to and stored on servers in other countries. We rely on reputable providers and standard safeguards to protect data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Your Choices and Rights</h2>
              <ul className="space-y-2 text-gray-400">
                <li className="flex gap-2"><span className="text-orange-500 mt-1">•</span><span>You can opt out of website analytics via browser settings, content blockers, or privacy preferences.</span></li>
                <li className="flex gap-2"><span className="text-orange-500 mt-1">•</span><span>You may have rights under applicable laws (e.g., GDPR/CCPA) to access or delete data held by our processors. Because we do not collect personal data ourselves, requests often relate to provider-held, de-identified records. Contact us and we will assist where possible.</span></li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Contact Us</h2>
              <p className="text-gray-400 leading-relaxed">
                If you have questions about this policy or your privacy, contact us at{" "}
                <a href="mailto:support@provenance-emu.com" className="text-orange-400 hover:text-orange-300 hover:underline transition-colors">
                  support@provenance-emu.com
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Changes to This Policy</h2>
              <p className="text-gray-400 leading-relaxed">
                We may update this Privacy Policy from time to time. We will post updates on this page and revise the &quot;Last updated&quot; date above.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Third‑Party Information</h2>
              <ul className="space-y-2 text-gray-400">
                <li className="flex gap-2"><span className="text-orange-500 mt-1">•</span><span>Google Privacy &amp; Terms:{" "}<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 hover:underline transition-colors">policies.google.com/privacy</a></span></li>
                <li className="flex gap-2"><span className="text-orange-500 mt-1">•</span><span>Firebase Crashlytics:{" "}<a href="https://firebase.google.com/support/privacy#crash-stored-info" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 hover:underline transition-colors">firebase.google.com/support/privacy</a></span></li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
