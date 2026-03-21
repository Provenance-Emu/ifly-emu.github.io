import type { Metadata } from 'next';
import SocialButton, { BmcIcon, PatreonIcon, VenmoIcon, ZelleIcon, OpenCollectiveIcon } from '@/components/SocialButton';

export const metadata: Metadata = {
  title: 'Donate',
  description: 'Support iFly development. Contribute via Buy Me a Coffee, Patreon, Venmo, Zelle, or Open Collective to help keep the Dreamcast emulator free and actively developed.',
  alternates: { canonical: 'https://ifly-emu.com/donate/' },
};

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <section className="container mx-auto px-4 pt-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-orange-700 text-white rounded-lg p-8 text-center shadow-lg shadow-orange-900/30">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Support Development</h1>
            <p className="opacity-90">
              Your support helps keep iFly fast, polished, and moving forward for iOS and tvOS.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-400 mb-6">
            Choose a donation option below. Thank you!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center">
            <SocialButton
              href="https://buymeacoffee.com/joemattiello"
              label="Buy Me a Coffee"
              leftIcon={<BmcIcon className="w-5 h-5" />}
              variant="bmc"
            />
            <SocialButton
              href="https://www.patreon.com/provenance"
              label="Support on Patreon"
              leftIcon={<PatreonIcon className="w-5 h-5" />}
              variant="patreon"
            />
            <SocialButton
              href="https://account.venmo.com/u/Joe-Mattiello"
              label="Venmo: @Joe-Mattiello"
              leftIcon={<VenmoIcon className="w-5 h-5" />}
              variant="venmo"
            />
            <SocialButton
              href="mailto:mail@joemattiello.com?subject=Zelle%20Donation%20for%20iFly"
              label="Zelle: mail@joemattiello.com"
              leftIcon={<ZelleIcon className="w-5 h-5" />}
              variant="zelle"
            />
            <SocialButton
              href="https://opencollective.com/provenanceemu"
              label="Open Collective"
              leftIcon={<OpenCollectiveIcon className="w-5 h-5" />}
              variant="opencollective"
            />
          </div>

          <p className="text-sm text-gray-500 mt-8">
            Donations are voluntary and non‑refundable. Thanks for supporting the project!
          </p>
        </div>
      </section>
    </div>
  );
}
