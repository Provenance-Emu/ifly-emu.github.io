export type GuidePage = { href: string; label: string; blurb: string };

export const GUIDE_PAGES: GuidePage[] = [
  { href: '/guide/', label: 'Overview', blurb: 'Start here — get your first game running.' },
  { href: '/guide/importing/', label: 'Importing Games', blurb: 'Files app, drag-and-drop, Wi-Fi upload, and URL scheme.' },
  { href: '/guide/formats/', label: 'Supported Formats', blurb: 'Every extension iFly reads, and which to prefer.' },
  { href: '/guide/bios/', label: 'BIOS Setup', blurb: 'When you need a BIOS and where it goes.' },
  { href: '/guide/arcade/', label: 'Arcade & Naomi Rips', blurb: 'Naomi, Naomi 2, and Atomiswave in odd formats.' },
  { href: '/guide/systems/', label: 'Systems', blurb: 'Every system iFly runs, with per-system notes.' },
  { href: '/guide/faq/', label: 'FAQ & Troubleshooting', blurb: 'Fixes for the common failures.' },
];
