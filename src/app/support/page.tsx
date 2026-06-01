import type { Metadata } from 'next';
import React from 'react';
import SocialButton, { BmcIcon, PatreonIcon } from '@/components/SocialButton';

export const metadata: Metadata = {
  title: 'Support',
  description: 'Get help with iFly Dreamcast emulator. Find answers about installation, sideloading, controller setup, JIT on Apple TV, and common issues.',
  alternates: { canonical: 'https://ifly-emu.com/support/' },
};

export default function Support() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
            Support
          </h1>

          {/* FAQ Section */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-6">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Frequently Asked Questions
            </h2>

            <div className="divide-y divide-gray-700">
              {([
                ['How do I install games on iFly?', <>You&apos;ll need to provide your own Dreamcast game files (such as CHD, CDI, or GDI). These can be imported through iTunes file sharing, cloud storage, or other file management apps. Make sure you own the original games before using ROM files.</>],
                ['How do I install iFly (sideload)?', <>iFly is distributed via sideloading for iOS and tvOS. We recommend using <a href="https://sideloadly.io" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Sideloadly</a> to install the app on your device. For enabling JIT on Apple TV, ask in our <a href="https://discord.com/invite/4TK7PU5" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Discord</a> for current JIT enabler recommendations.</>],
                ['Which controllers are supported?', <>iFly supports MFi (Made for iPhone) controllers, PlayStation DualShock 4, PlayStation DualSense, Xbox Wireless Controllers, and the Siri Remote on Apple TV. Touch controls are also available on iPhone and iPad.</>],
                ['What devices are compatible?', <>iFly requires iOS 15.6 or later for iPhone and iPad, and tvOS 16.6 or later for Apple TV. For optimal performance, we recommend newer devices.</>],
                ['Can I save my game progress?', <>Yes! iFly supports both in-game saves (like the original consoles) and save states, which allow you to save and load your progress at any point during gameplay. All saves are stored locally on your device.</>],
                ['Why are some games not working properly?', <>While iFly aims for high compatibility, some games may have issues due to their complexity or specific hardware requirements. We&apos;re constantly working to improve compatibility through regular updates.</>],
                ['How can I improve performance?', <>For better performance, try reducing the internal resolution, disabling enhanced features like anti-aliasing, closing other apps, and ensuring your device isn&apos;t overheating. Performance varies based on the game and your device&apos;s capabilities.</>],
              ] as [string, React.ReactNode][]).map(([q, a]) => (
                <div key={q} className="py-4 first:pt-0 last:pb-0">
                  <h3 className="text-lg font-semibold text-white mb-2">{q}</h3>
                  <p className="text-gray-400">{a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-6">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Getting Help
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <a href="mailto:provenance.emu+ifly-support@gmail.com?subject=iFly%20Support"
                 className="flex items-start gap-4 p-5 bg-gray-800/40 border border-gray-700/50 rounded-xl hover:border-gray-600 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 ring-1 ring-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"/><path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"/></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Email Support</h3>
                  <p className="text-sm text-gray-400 mb-2">Send questions or bug reports</p>
                  <span className="text-sm text-orange-400 group-hover:underline">provenance.emu+ifly-support@gmail.com</span>
                </div>
              </a>

              <a href="https://discord.com/invite/4TK7PU5" target="_blank" rel="noopener noreferrer"
                 className="flex items-start gap-4 p-5 bg-gray-800/40 border border-gray-700/50 rounded-xl hover:border-gray-600 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path d="M20.317 4.369A19.791 19.791 0 0 0 16.558 3c-.2.355-.432.83-.593 1.205a18.27 18.27 0 0 0-3.93 0A11.09 11.09 0 0 0 11.443 3c-1.3.23-2.54.6-3.759 1.11C3.733 6.37 2.49 9.6 2.75 12.77c1.566 1.17 3.08 1.886 4.59 2.34.37-.51.702-1.055.989-1.627-.55-.21-1.078-.466-1.58-.768.132-.096.262-.196.386-.3 3.045 1.413 6.34 1.413 9.36 0 .127.104.255.204.386.3-.5.302-1.028.558-1.578.768.286.572.62 1.116.989 1.627 1.51-.454 3.023-1.17 4.59-2.34.38-4.513-1.48-7.317-3.615-8.401ZM9.58 12.66c-.623 0-1.132-.6-1.132-1.335 0-.735.505-1.34 1.132-1.34.631 0 1.14.606 1.132 1.34 0 .735-.505 1.334-1.132 1.334Zm4.85 0c-.623 0-1.132-.6-1.132-1.335 0-.735.505-1.34 1.132-1.34.631 0 1.14.606 1.132 1.34 0 .735-.505 1.334-1.132 1.334Z"/></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Discord</h3>
                  <p className="text-sm text-gray-400 mb-2">Get help from the community</p>
                  <span className="text-sm text-orange-400 group-hover:underline">Join our server →</span>
                </div>
              </a>
            </div>
          </div>

          {/* Donate Section (compact) */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Support Development</h2>
            <p className="text-gray-400 mb-6">If you find iFly helpful, consider supporting the project.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <SocialButton href="https://buymeacoffee.com/joemattiello" label="Buy Me a Coffee" leftIcon={<BmcIcon className="w-5 h-5" />} variant="bmc" />
              <SocialButton href="https://www.patreon.com/provenance" label="Support on Patreon" leftIcon={<PatreonIcon className="w-5 h-5" />} variant="patreon" />
            </div>
          </div>

          {/* Troubleshooting Section */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Troubleshooting Tips
            </h2>

            <div className="space-y-4">
              {([
                ['Restart the app', 'Close iFly completely and reopen it to resolve minor issues.'],
                ['Check available storage', 'Ensure you have at least 1GB of free space on your device for games and save files.'],
                ['Update to latest version', "Make sure you're running the latest available build of iFly."],
                ['Disable Low Power Mode', 'For best performance, ensure your device is not in Low Power Mode and has sufficient battery.'],
                ['Adjust CPU tuning options', 'iFly exposes several CPU tuning controls in the emulation settings — experiment with clock speed, threading, and accuracy options to balance performance and compatibility.'],
                ['Restart your device', 'A device restart can resolve performance issues and free up memory.'],
              ] as [string, string][]).map(([title, desc]) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5 text-green-400" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{title}</h4>
                    <p className="text-gray-400">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
