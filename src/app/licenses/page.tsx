import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Licenses & Acknowledgements',
  description:
    'Open-source components used in iFly EMU and corresponding source code, per GPL-2.0 and other applicable licenses.',
  alternates: { canonical: 'https://ifly-emu.com/licenses/' },
};

type Component = {
  name: string;
  license: string;
  url: string;
  note?: string;
};

const components: Component[] = [
  {
    name: 'Flycast',
    license: 'GPL-2.0',
    url: 'https://github.com/JoeMatt/flycast',
    note: 'Custom modifications by Joseph Mattiello. Corresponding source available at the link above.',
  },
  {
    name: 'MoltenVK',
    license: 'Apache-2.0',
    url: 'https://github.com/KhronosGroup/MoltenVK',
  },
  {
    name: 'ZIPFoundation',
    license: 'MIT',
    url: 'https://github.com/weichsel/ZIPFoundation',
  },
  {
    name: 'Zip',
    license: 'MIT',
    url: 'https://github.com/marmelroy/Zip',
  },
  {
    name: 'GCDWebServer',
    license: 'BSD-3-Clause',
    url: 'https://github.com/swisspol/GCDWebServer',
  },
  {
    name: 'Bugsnag',
    license: 'MIT',
    url: 'https://github.com/bugsnag/bugsnag-cocoa',
  },
  {
    name: 'libretro database',
    license: 'See repository',
    url: 'https://github.com/libretro/libretro-database',
  },
];

export default function Licenses() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 text-center">
            Licenses &amp; Acknowledgements
          </h1>
          <p className="text-center text-gray-500 mb-10">
            Open-source components used in iFly EMU.
          </p>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-8">
            <section>
              <p className="text-gray-400 leading-relaxed">
                iFly EMU is built on Flycast and a number of open-source libraries. Each project
                is credited below alongside its license. Where required by license, links point
                to corresponding source.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Components</h2>
              <ul className="space-y-4">
                {components.map(c => (
                  <li key={c.name} className="border-l-2 border-orange-500/40 pl-4">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-semibold text-white hover:text-orange-300 hover:underline transition-colors"
                      >
                        {c.name}
                      </a>
                      <span className="text-xs uppercase tracking-wide text-gray-500">
                        {c.license}
                      </span>
                    </div>
                    {c.note && (
                      <p className="text-sm text-gray-400 mt-1">{c.note}</p>
                    )}
                    <p className="text-xs text-gray-600 mt-1 break-all">{c.url}</p>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-500 mt-6">
                This list may not be exhaustive. Additional in-tree licenses ship with the app
                bundle and the Flycast source repository.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Copyright</h2>
              <p className="text-gray-400 leading-relaxed">
                © Joseph Mattiello. iFly EMU and its custom Flycast modifications
                developed by Joseph Mattiello.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">GPL-2.0 corresponding source</h2>
              <p className="text-gray-400 leading-relaxed">
                Per the GPL-2.0 license under which Flycast is distributed, the corresponding
                source for the version of Flycast used in iFly EMU is available at{" "}
                <a
                  href="https://github.com/JoeMatt/flycast"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:text-orange-300 hover:underline transition-colors"
                >
                  github.com/JoeMatt/flycast
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
