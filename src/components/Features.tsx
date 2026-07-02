import React from 'react';
import { FeatureCard } from '@/components/ui/Card';

// Reuse a compact inline icon set (24x24, currentColor).
const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true"><path d={d} /></svg>
);

const ICONS = {
  bolt: 'M13 2 4 14h6l-1 8 9-12h-6l1-8Z',
  cpu: 'M9 3h6v2h3a2 2 0 0 1 2 2v3h2v2h-2v3a2 2 0 0 1-2 2h-3v2H9v-2H6a2 2 0 0 1-2-2v-3H2v-2h2V7a2 2 0 0 1 2-2h3V3Zm-1 6v6h8V9H8Z',
  sparkles: 'M11 2 9 7l-5 2 5 2 2 5 2-5 5-2-5-2-2-5Zm8 9-1 3-3 1 3 1 1 3 1-3 3-1-3-1-1-3Z',
  save: 'M5 3h11l3 3v15a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm2 4v4h8V7H7Zm8 12v-5H9v5h6Z',
  cloud: 'M7 18h9a4 4 0 1 0-1.1-7.9A5 5 0 0 0 5 12a4 4 0 0 0 2 6Z',
  controller: 'M6 8h12a4 4 0 0 1 3.8 5.2l-1.1 3A3 3 0 0 1 17 18h-2l-2-2h-2l-2 2H7a3 3 0 0 1-3.7-1.8l-1.1-3A4 4 0 0 1 6 8Zm2 2v2H6v2h2v2h2v-2h2v-2h-2v-2H8Zm8 .5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z',
  target: 'M12 2v2a8 8 0 1 1-8 8H2a10 10 0 1 0 10-10Zm0 6a4 4 0 1 0 4 4h2a6 6 0 1 1-6-6v2Z',
  phone: 'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm5 18a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z',
  chart: 'M4 20V4h2v16H4Zm4 0v-9h2v9H8Zm4 0v-6h2v6h-2Zm4 0v-12h2v12h-2Z',
  search: 'M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm8.7 13.3 3.3 3.3-1.4 1.4-3.3-3.3 1.4-1.4Z',
  network: 'M12 2a4 4 0 0 1 1 7.87V11h6a1 1 0 0 1 1 1v2.13a4 4 0 1 1-2 0V13h-5v1.13a4 4 0 1 1-2 0V13H6v1.13a4 4 0 1 1-2 0V12a1 1 0 0 1 1-1h6V9.87A4 4 0 0 1 12 2Z',
} as const;

type Feature = { title: string; description: string; icon: React.ReactNode };
type Group = { heading: string; items: Feature[] };

const f = (title: string, description: string, d: string): Feature => ({ title, description, icon: <Icon d={d} /> });

const GROUPS: Group[] = [
  {
    heading: 'Performance & graphics',
    items: [
      f('JIT-less full speed', 'Custom Apple-silicon CPU work runs Dreamcast at full speed with no JIT. Upscales to 1440p or 4K on recent devices.', ICONS.cpu),
      f('Custom Metal backend', 'A Metal renderer built for Apple GPUs, with HDR upscaling support.', ICONS.sparkles),
      f('1K+ Metal shaders', 'A large native shader library for visual quality and effects.', ICONS.bolt),
      f('Texture packs', 'Custom texture-pack support with a management UI, like Flycast.', ICONS.chart),
      f('ProMotion support', 'High-refresh ProMotion rendering, or lock to the original refresh rate.', ICONS.phone),
    ],
  },
  {
    heading: 'VMU tooling',
    items: [
      f('Floating VMU window', 'Keep a live VMU on screen while you play.', ICONS.save),
      f('VMU Watch companion', 'A live VMU viewer on Apple Watch.', ICONS.save),
      f('Native VMU file manager', 'A Swift-native VMU manager with per-game and per-VMU backup and restore.', ICONS.save),
    ],
  },
  {
    heading: 'Saves & sync',
    items: [
      f('iCloud sync', 'Saves, VMUs, and BIOS sync across devices over iCloud. ROMs stay local.', ICONS.cloud),
      f('Off-thread auto-saves', 'Timed auto-saves serialize off the main thread, so emulation never stalls.', ICONS.save),
      f('HLE & native BIOS', 'Run on the built-in HLE BIOS, or supply a real BIOS.', ICONS.cpu),
    ],
  },
  {
    heading: 'Input & controls',
    items: [
      f('External controllers + haptics', 'DualShock, DualSense, Xbox, Switch, and MFi controllers, with haptics.', ICONS.controller),
      f('Jump Pack rumble', 'Jump Pack rumble maps to device haptics or controller rumble.', ICONS.controller),
      f('Remappable + presets', 'Remap external controller buttons and save presets.', ICONS.target),
      f('On-screen controls', 'Customizable, movable on-screen controls.', ICONS.target),
      f('Keyboard & mouse', 'On-screen touch keyboard/mouse plus native Bluetooth keyboard, mouse, and Smart Keyboard where the OS supports it.', ICONS.phone),
      f('Light gun & microphone', 'Touch light-gun input and native CoreAudio microphone input.', ICONS.target),
      f('DeltaSkin / ManicSkin', 'Import DeltaSkin and ManicSkin controller skins.', ICONS.controller),
    ],
  },
  {
    heading: 'Connectivity & display',
    items: [
      f('External display', 'Output to an external display on iOS and iPadOS.', ICONS.phone),
      f('DCNet & LAN', 'DCNet network and LAN support, matching Flycast.', ICONS.network),
    ],
  },
  {
    heading: 'Games & content',
    items: [
      f('Cheat database', 'In-app cheat-code database.', ICONS.sparkles),
      f('RetroAchievements', 'RetroAchievements support.', ICONS.target),
      f('Metadata lookup', 'Online game-metadata lookup for your library.', ICONS.search),
      f('Per-game options', 'Tune options per game.', ICONS.chart),
    ],
  },
  {
    heading: 'Platform & import',
    items: [
      f('iOS, iPadOS, tvOS', 'One app across iPhone, iPad, and Apple TV.', ICONS.phone),
      f('Recent-games widget', 'Quick-launch recent games from a Springboard widget.', ICONS.bolt),
      f('Flexible import', 'WebDAV, HTTP, or Files.app import, plus drag-and-drop on iPad.', ICONS.cloud),
    ],
  },
];

// Curated highlights for the homepage compact view.
const HIGHLIGHTS: Feature[] = [
  GROUPS[0].items[0], // JIT-less full speed
  GROUPS[0].items[2], // 1K+ Metal shaders
  GROUPS[1].items[0], // Floating VMU window
  GROUPS[2].items[0], // iCloud sync
  GROUPS[3].items[0], // External controllers + haptics
  GROUPS[5].items[1], // RetroAchievements
];

export type FeaturesProps = { compact?: boolean; className?: string };

export default function Features({ compact = false, className }: FeaturesProps) {
  if (compact) {
    return (
      <div className={className}>
        <div className="grid gap-5 md:grid-cols-3">
          {HIGHLIGHTS.map((item) => (
            <FeatureCard key={item.title} icon={item.icon} title={item.title}>{item.description}</FeatureCard>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="space-y-12">
        {GROUPS.map((group) => (
          <div key={group.heading}>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide text-orange-400">{group.heading}</h3>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <FeatureCard key={item.title} icon={item.icon} title={item.title}>{item.description}</FeatureCard>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
