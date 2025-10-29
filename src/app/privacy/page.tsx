import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - iFly",
  description:
    "Privacy Policy for the iFly app and website. We do not collect personal data. We use anonymous crash reports and basic analytics to improve stability and performance.",
};

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Privacy Policy
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
            Last updated: October 28, 2025
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Overview</h2>
              <p className="text-gray-700 dark:text-gray-300">
                iFly (the "App") is a Dreamcast emulator for iOS and tvOS. We respect your privacy. We do not collect or sell personal data. The App and our website use limited, aggregated analytics and anonymous crash reporting strictly to improve stability, performance, and user experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Data We Collect</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                We aim to collect as little data as possible. We do not collect personal information such as your name, email address, phone number, or precise location. The App may collect the following non-personal, aggregated, or de-identified data:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>
                  <span className="font-medium">Crash and diagnostics data</span> (via Google/Firebase Crashlytics): anonymized crash traces, device model class, OS version, app version/build, and other technical information needed to diagnose and fix issues. This data is not used to identify you.
                </li>
                <li>
                  <span className="font-medium">Basic usage analytics</span>: aggregate feature usage, session counts, app version, device and OS version classes, and similar metrics that help us understand app performance and prioritize improvements. We do not use this data to identify or track you across apps or websites.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Website Analytics</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Our website may use Google Analytics to understand aggregate traffic and usage. We use analytics only to maintain and improve the site and App. We do not use analytics data to profile or identify you, and we do not combine analytics data with other information to attempt to identify you. You can use browser settings or content blockers to limit analytics if you prefer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">How We Use Data</h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Diagnose crashes and technical issues</li>
                <li>Improve stability, performance, and features</li>
                <li>Understand aggregate usage to guide development priorities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Data Sharing and Selling</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We do not sell your data. We do not share personal data with third parties. For the limited analytics and crash reporting described above, we use service providers (e.g., Google/Firebase) who process data on our behalf to provide these services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Data Linked to You and Tracking</h2>
              <p className="text-gray-700 dark:text-gray-300">
                The App is designed not to collect data that is linked to your identity. We do not use the collected data to track you across other companies’ apps or websites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Retention</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Crash and analytics data are retained by our service providers for limited periods consistent with their default retention policies (for example, Crashlytics typically retains recent reports needed for debugging, and Google Analytics event data is retained according to project settings). We do not retain personal data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Children’s Privacy</h2>
              <p className="text-gray-700 dark:text-gray-300">
                The App is not directed to children under the age of 13 (or the equivalent age in your jurisdiction). We do not knowingly collect personal information from children.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">International Transfers</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Depending on your location, data processed by our service providers may be transferred to and stored on servers in other countries. We rely on reputable providers and standard safeguards to protect data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Your Choices and Rights</h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>You can opt out of website analytics via browser settings, content blockers, or privacy preferences.</li>
                <li>You may have rights under applicable laws (e.g., GDPR/CCPA) to access or delete data held by our processors. Because we do not collect personal data ourselves, requests often relate to provider-held, de-identified records. Contact us and we will assist where possible.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-300">
                If you have questions about this policy or your privacy, contact us at
                {" "}
                <a
                  href="mailto:support@provenance-emu.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  support@provenance-emu.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Changes to This Policy</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We may update this Privacy Policy from time to time. We will post updates on this page and revise the “Last updated” date above.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Third‑Party Information</h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>
                  Google Privacy & Terms: {" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                    https://policies.google.com/privacy
                  </a>
                </li>
                <li>
                  Firebase Crashlytics: {" "}
                  <a href="https://firebase.google.com/support/privacy#crash-logs" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                    https://firebase.google.com/support/privacy#crash-logs
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
