import type { Metadata } from "next";
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: "Privacy Policy - iFly",
  description:
    "iFly does not collect personally identifiable information. Anonymous crash reports and usage analytics are opt-out. iCloud and local network features are user-controlled.",
  alternates: { canonical: 'https://ifly-emu.com/privacy/' },
};

export default function Privacy() {
  return (
    <div className="min-h-screen bg-ink">
      <PageHeader title="Privacy Policy" subtitle="Effective date: August 9, 2026" />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="card-glass p-8 space-y-8">
            <section>
              <p className="text-gray-300 leading-relaxed">
                iFly EMU does not collect any personally identifiable information.
                No accounts, no logins, no ads, no advertising or marketing tracking,
                and we never sell data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Crash diagnostics</h2>
              <p className="text-gray-400 leading-relaxed">
                iFly uses a crash-reporting service (Bugsnag) to collect anonymous diagnostics:
                device model, OS version, and crash stack traces, so we can fix bugs. The
                per-install device identifier is stripped before each report is sent. No
                performance monitoring is collected. iFly measures its own frame timing on your
                device, and those measurements never leave it. This is not personally
                identifiable, not linked to you, and never used for tracking or advertising. You
                can turn it off any time in the app:{" "}
                <span className="text-gray-300 font-medium">Settings → General → Privacy → Share Crash Reports</span>.
                Turning it off stops uploads immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Usage analytics</h2>
              <p className="text-gray-400 leading-relaxed">
                iFly uses TelemetryDeck to count anonymous feature usage: app launches, game
                sessions (which game started, how long it ran), and which features get used.
                TelemetryDeck is anonymous by design — identifiers are double-hashed and rotate,
                and there is no device fingerprinting or advertising ID. Nothing is linked to you,
                and nothing is used for tracking or ads. You can turn it off any time in
                the app:{" "}
                <span className="text-gray-300 font-medium">Settings → General → Privacy → Share Anonymous Analytics</span>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">iCloud</h2>
              <p className="text-gray-400 leading-relaxed">
                Game saves and settings sync through your own iCloud account (Apple CloudKit).
                The developer has no access and stores nothing on its own servers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Local network</h2>
              <p className="text-gray-400 leading-relaxed">
                An optional built-in web server lets you transfer files over your own Wi-Fi.
                Nothing leaves your network.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Online play</h2>
              <p className="text-gray-400 leading-relaxed">
                Optional. Connects to game servers only when you start an online game.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
              <p className="text-gray-400 leading-relaxed">
                Questions about privacy:{" "}
                <a href="mailto:provenance.emu+ifly-privacy@gmail.com" className="text-orange-400 hover:text-orange-300 hover:underline transition-colors">
                  provenance.emu+ifly-privacy@gmail.com
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
