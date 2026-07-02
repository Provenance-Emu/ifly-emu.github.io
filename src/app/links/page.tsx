import type { Metadata } from 'next';
import DownloadSection from '@/components/DownloadSection';
import SocialButton, { DiscordIcon, XIcon, BmcIcon, PatreonIcon } from '@/components/SocialButton';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Links',
  description: 'All official iFly links: Discord community, X/Twitter, GitHub, itch.io, Patreon, and more.',
  alternates: { canonical: 'https://ifly-emu.com/links/' },
};

const ExternalCard = ({ href, title, description, iconPath, iconColor = 'text-gray-400', iconBg = 'bg-gray-700/50', proofIgnore }: {
  href: string; title: string; description: string;
  iconPath: string; iconColor?: string; iconBg?: string;
  proofIgnore?: boolean;
}) => (
  <a href={href} target="_blank" rel="noopener noreferrer"
     {...(proofIgnore ? { 'data-proofer-ignore': '' } : {})}
     className="flex items-start gap-4 p-4 card-glass group">
    <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center ${iconColor} shrink-0`}>
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d={iconPath} />
      </svg>
    </div>
    <div>
      <h3 className="font-semibold text-white mb-0.5 group-hover:text-orange-400 transition-colors">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  </a>
);

export default function Links() {
  return (
    <div className="min-h-screen bg-ink">
      <PageHeader title="Links & Resources" />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Download */}
          <div className="card-glass p-8 mb-6">
            <h2 className="text-2xl font-semibold text-white mb-6">Download iFly</h2>
            <DownloadSection showEmbed />
          </div>

          {/* Flycast Resources */}
          <div className="card-glass p-8 mb-6">
            <h2 className="text-2xl font-semibold text-white mb-2">Flycast Resources</h2>
            <p className="text-gray-400 text-sm mb-6">iFly is built on Flycast. These resources cover the underlying emulator.</p>
            <div className="grid md:grid-cols-2 gap-3">
              <ExternalCard
                href="https://github.com/flyinghead/flycast"
                title="Flycast GitHub"
                description="Source code and development"
                iconPath="M12 .5a11.5 11.5 0 0 0-3.636 22.41c.575.105.786-.25.786-.556 0-.274-.01-1.002-.016-1.967-3.2.696-3.877-1.543-3.877-1.543-.523-1.328-1.277-1.682-1.277-1.682-1.043-.713.08-.699.08-.699 1.152.081 1.759 1.183 1.759 1.183 1.025 1.758 2.689 1.25 3.344.956.104-.742.402-1.25.73-1.538-2.555-.29-5.243-1.277-5.243-5.683 0-1.255.45-2.281 1.184-3.086-.119-.29-.513-1.46.112-3.046 0 0 .966-.309 3.168 1.178a10.98 10.98 0 0 1 5.768 0c2.2-1.487 3.165-1.178 3.165-1.178.627 1.586.233 2.756.114 3.046.737.805 1.183 1.831 1.183 3.086 0 4.416-2.693 5.389-5.257 5.674.413.356.78 1.055.78 2.127 0 1.535-.014 2.77-.014 3.148 0 .309.207.668.793.555A11.5 11.5 0 0 0 12 .5Z"
                iconColor="text-gray-300" iconBg="bg-gray-700/60"
              />
              <ExternalCard
                href="https://github.com/TheArcadeStriker/flycast-wiki/wiki"
                title="Flycast Wiki"
                description="Documentation and guides"
                iconPath="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Zm1 14.5h-2v-6h2v6Zm0-8h-2V6.5h2V8.5Z"
                iconColor="text-emerald-400" iconBg="bg-emerald-500/10"
                proofIgnore
              />
              <ExternalCard
                href="https://www.rinnegatamante.eu/newflycast/"
                title="Flycast Compatibility"
                description="Game compatibility list and guides"
                iconPath="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 0 0 1.946-.806 3.42 3.42 0 0 1 4.438 0 3.42 3.42 0 0 0 1.946.806 3.42 3.42 0 0 1 3.138 3.138 3.42 3.42 0 0 0 .806 1.946 3.42 3.42 0 0 1 0 4.438 3.42 3.42 0 0 0-.806 1.946 3.42 3.42 0 0 1-3.138 3.138 3.42 3.42 0 0 0-1.946.806 3.42 3.42 0 0 1-4.438 0 3.42 3.42 0 0 0-1.946-.806 3.42 3.42 0 0 1-3.138-3.138 3.42 3.42 0 0 0-.806-1.946 3.42 3.42 0 0 1 0-4.438 3.42 3.42 0 0 0 .806-1.946 3.42 3.42 0 0 1 3.138-3.138z"
                iconColor="text-emerald-400" iconBg="bg-emerald-500/10"
                proofIgnore
              />
              <ExternalCard
                href="https://discord.gg/X8YWP8w"
                title="Flycast Discord"
                description="Upstream community discussions"
                iconPath="M20.317 4.369A19.791 19.791 0 0 0 16.558 3c-.2.355-.432.83-.593 1.205a18.27 18.27 0 0 0-3.93 0A11.09 11.09 0 0 0 11.443 3c-1.3.23-2.54.6-3.759 1.11C3.733 6.37 2.49 9.6 2.75 12.77c1.566 1.17 3.08 1.886 4.59 2.34.37-.51.702-1.055.989-1.627-.55-.21-1.078-.466-1.58-.768.132-.096.262-.196.386-.3 3.045 1.413 6.34 1.413 9.36 0 .127.104.255.204.386.3-.5.302-1.028.558-1.578.768.286.572.62 1.116.989 1.627 1.51-.454 3.023-1.17 4.59-2.34.38-4.513-1.48-7.317-3.615-8.401ZM9.58 12.66c-.623 0-1.132-.6-1.132-1.335 0-.735.505-1.34 1.132-1.34.631 0 1.14.606 1.132 1.34 0 .735-.505 1.334-1.132 1.334Zm4.85 0c-.623 0-1.132-.6-1.132-1.335 0-.735.505-1.34 1.132-1.34.631 0 1.14.606 1.132 1.34 0 .735-.505 1.334-1.132 1.334Z"
                iconColor="text-indigo-400" iconBg="bg-indigo-500/10"
              />
            </div>
          </div>

          {/* Community */}
          <div className="card-glass p-8 mb-6">
            <h2 className="text-2xl font-semibold text-white mb-6">Community &amp; Social</h2>
            <div className="grid md:grid-cols-3 gap-3">
              <ExternalCard
                href="https://discord.gg/QF5ZjVT4Sa"
                title="Discord"
                description="Get help and chat with the community"
                iconPath="M20.317 4.369A19.791 19.791 0 0 0 16.558 3c-.2.355-.432.83-.593 1.205a18.27 18.27 0 0 0-3.93 0A11.09 11.09 0 0 0 11.443 3c-1.3.23-2.54.6-3.759 1.11C3.733 6.37 2.49 9.6 2.75 12.77c1.566 1.17 3.08 1.886 4.59 2.34.37-.51.702-1.055.989-1.627-.55-.21-1.078-.466-1.58-.768.132-.096.262-.196.386-.3 3.045 1.413 6.34 1.413 9.36 0 .127.104.255.204.386.3-.5.302-1.028.558-1.578.768.286.572.62 1.116.989 1.627 1.51-.454 3.023-1.17 4.59-2.34.38-4.513-1.48-7.317-3.615-8.401ZM9.58 12.66c-.623 0-1.132-.6-1.132-1.335 0-.735.505-1.34 1.132-1.34.631 0 1.14.606 1.132 1.34 0 .735-.505 1.334-1.132 1.334Zm4.85 0c-.623 0-1.132-.6-1.132-1.335 0-.735.505-1.34 1.132-1.34.631 0 1.14.606 1.132 1.34 0 .735-.505 1.334-1.132 1.334Z"
                iconColor="text-indigo-400" iconBg="bg-indigo-500/10"
              />
              <ExternalCard
                href="https://x.com/ProvenanceApp"
                title="X / Twitter"
                description="@ProvenanceApp — news and updates"
                iconPath="M3 3h4.6l5.12 7.52L16.98 3H21l-7.36 10.7L21.5 21h-4.6l-5.5-8.08L7.02 21H3l7.8-11.35L3 3Z"
                iconColor="text-gray-300" iconBg="bg-gray-700/60"
              />
              <ExternalCard
                href="https://reddit.com/r/EmulationOniOS"
                title="Reddit"
                description="r/EmulationOniOS community"
                iconPath="M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.315 3.516 8.488C3.185 19.401 3 18.22 3 17c0-2.21 1.343-4.1 3.27-4.9a2 2 0 1 1 2.73-1.844C10.2 9.883 11.08 9.5 12 9.5s1.8.383 2 .756A2 2 0 1 1 16.73 12.1C18.657 12.9 20 14.79 20 17c0 1.22-.185 2.401-.516 3.488A11.955 11.955 0 0 0 24 12c0-6.627-5.373-12-12-12Z"
                iconColor="text-orange-400" iconBg="bg-orange-500/10"
              />
            </div>
          </div>

          {/* Support Development */}
          <div className="card-glass p-8 mb-6">
            <h2 className="text-2xl font-semibold text-white mb-2">Support Development</h2>
            <p className="text-gray-400 text-sm mb-6">Help keep iFly free and actively developed.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <SocialButton href="https://buymeacoffee.com/joemattiello" label="Buy Me a Coffee" leftIcon={<BmcIcon className="w-5 h-5" />} variant="bmc" />
              <SocialButton href="https://www.patreon.com/provenance" label="Support on Patreon" leftIcon={<PatreonIcon className="w-5 h-5" />} variant="patreon" />
            </div>
          </div>

          {/* Related Projects */}
          <div className="card-glass p-8">
            <h2 className="text-2xl font-semibold text-white mb-2">Related Projects</h2>
            <p className="text-gray-400 text-sm mb-6">Other emulators from the same team.</p>
            <div className="grid md:grid-cols-2 gap-3">
              <ExternalCard
                href="https://github.com/Provenance-Emu/Provenance"
                title="Provenance"
                description="Multi-system emulator frontend for iOS — 38+ consoles"
                iconPath="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Zm0 4a6 6 0 1 1 0 12A6 6 0 0 1 12 6Zm0 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
                iconColor="text-orange-400" iconBg="bg-orange-500/10"
              />
              <ExternalCard
                href="https://icube-emu.com"
                title="iCube"
                description="iOS port of Dolphin — GameCube &amp; Wii emulation"
                iconPath="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
                iconColor="text-blue-400" iconBg="bg-blue-500/10"
                proofIgnore
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
