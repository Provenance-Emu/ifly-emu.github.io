import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Recommended Controllers',
  description:
    'Controllers that work great with iFly on iPhone, iPad, and Apple TV: MFi gamepads, DualSense, DualShock 4, and Xbox Wireless.',
  alternates: { canonical: 'https://ifly-emu.com/controllers/' },
};

type Pick = {
  name: string;
  blurb: string;
  url: string;
};

// Amazon links carry the Associates tag; the disclosure below is required and must stay
// visible adjacent to these links.
const AMZN_TAG = 'provenance09-20';

const picks: Pick[] = [
  {
    name: 'PlayStation DualSense',
    blurb:
      'Pairs over Bluetooth with iPhone, iPad, and Apple TV. Great d-pad and analog feel for Dreamcast games.',
    url: `https://www.amazon.com/s?k=playstation+dualsense+controller&tag=${AMZN_TAG}`,
  },
  {
    name: 'PlayStation DualShock 4',
    blurb:
      'Cheaper than a DualSense and just as well supported by iOS. A solid budget option.',
    url: `https://www.amazon.com/s?k=playstation+dualshock+4+controller&tag=${AMZN_TAG}`,
  },
  {
    name: 'Xbox Wireless Controller',
    blurb:
      'Excellent ergonomics and rock-solid Bluetooth pairing across iPhone, iPad, and Apple TV.',
    url: `https://www.amazon.com/s?k=xbox+wireless+controller&tag=${AMZN_TAG}`,
  },
  {
    name: 'MFi gamepads',
    blurb:
      'Made-for-iPhone controllers, including clamp-on styles that turn an iPhone into a handheld.',
    url: `https://www.amazon.com/s?k=mfi+game+controller+iphone&tag=${AMZN_TAG}`,
  },
];

export default function Controllers() {
  return (
    <div className="min-h-screen bg-ink">
      <PageHeader
        title="Recommended Controllers"
        subtitle="Everything below pairs over Bluetooth and works with iFly out of the box."
      />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="card-glass p-8 space-y-8">
            <section>
              <p className="text-gray-400 leading-relaxed">
                iFly supports MFi controllers, PlayStation DualSense and DualShock 4, Xbox
                Wireless controllers, and the Siri Remote on Apple TV. Touch controls are built
                in on iPhone and iPad, but a physical controller is the way Dreamcast games were
                meant to be played.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Our picks</h2>
              <ul className="space-y-4">
                {picks.map(p => (
                  <li key={p.name} className="border-l-2 border-orange-500/40 pl-4">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="text-base font-semibold text-white hover:text-orange-300 hover:underline transition-colors"
                    >
                      {p.name} →
                    </a>
                    <p className="text-sm text-gray-400 mt-1">{p.blurb}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Pairing</h2>
              <p className="text-gray-400 leading-relaxed">
                Put the controller in pairing mode, then connect it under Settings → Bluetooth
                on your iPhone, iPad, or Apple TV. iFly picks it up automatically — no in-app
                setup needed.
              </p>
            </section>

            <section>
              <p className="text-xs text-gray-500">
                As an Amazon Associate, iFly earns from qualifying purchases.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
