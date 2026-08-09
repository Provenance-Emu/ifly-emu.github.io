// The six gated features, mirroring `ProFeature.swift` in the iFly app repo.
// Keep `id` in sync with the Swift enum case names — when a gate is added or
// removed there, this file is the other half of the change.
//
// Naming: the app calls the tier "Plus" (renamed from "Pro", 2026-08-09) to
// match Provenance Plus. The StoreKit product IDs are `…iFly.plus.*`.

export type PlusPlatform = 'iphone' | 'ipad' | 'tvos' | 'watchos';

export type PlusFeatureSpec = {
  /** Matches the `ProFeature` case name in the app. */
  id: string;
  title: string;
  /** One or two sentences. No marketing speak — say what it does. */
  body: string;
  /** What stays free, when the split needs spelling out. Rendered as a caveat. */
  freeNote?: string;
  /** Which platform frame the media slot uses. */
  platform: PlusPlatform;
  /** Filename under /images/plus/ once captured. Undefined renders a marked slot. */
  media?: string;
  /** Set when the media is a looping clip rather than a still. */
  video?: boolean;
};

export const PLUS_FEATURES: PlusFeatureSpec[] = [
  {
    id: 'shaderPacks',
    title: 'CRT & Filter Packs',
    body:
      'Deep CRT, NTSC, and film-simulation shader packs, on top of the shader library the app already ships.',
    freeNote:
      'Scanlines, handheld LCD looks, sharpening, and the default Trinitron CRT are free for everyone — the preset iFly turns on by default is never behind the paywall.',
    platform: 'ipad',
  },
  {
    id: 'texturePacks',
    title: 'HD Texture Packs',
    body:
      'Install community HD texture packs per game and manage them in-app.',
    platform: 'ipad',
  },
  {
    id: 'perGameProfiles',
    title: 'Per-Game Tuning Profiles',
    body:
      'Save a tuned set of emulation settings per game, so a title that needs a specific configuration keeps it without changing your defaults.',
    platform: 'iphone',
  },
  {
    id: 'watchVMU',
    title: 'VMU on Apple Watch',
    body:
      'Run VMU mini-games on your wrist and trade memory cards between the watch and the app.',
    platform: 'watchos',
  },
  {
    id: 'watermarkFreeClips',
    title: 'Watermark-Free Clips',
    body:
      'Share recorded gameplay clips without the iFly watermark.',
    freeNote: 'Recording itself is free — Plus only removes the watermark.',
    platform: 'iphone',
  },
  {
    id: 'unlimitedContinuity',
    title: 'Unlimited Handoff',
    body:
      'Pick a game up on another device as often as you like.',
    freeNote: 'The free tier allows 3 pulls a day.',
    platform: 'tvos',
  },
];

// Free forever, from the rationale comment at the top of `ProFeature.swift`.
// This list is deliberately rendered ABOVE the paid features on the page: the
// emulator core is GPL, and vagueness about the boundary is how an emulator
// gets accused of paywalling what it didn't write.
export const FREE_FOREVER: string[] = [
  'The emulator core, and every system it runs — Dreamcast, Naomi, Naomi 2, Atomiswave',
  'Importing games, by WebDAV, HTTP, Files.app, or drag-and-drop',
  'Save states and auto-saves',
  'RetroAchievements',
  'Bundled and imported controller skins, including DeltaSkin and ManicSkin',
  'The basic shader buckets — scanlines, handheld LCD, sharpening, and the default Trinitron CRT',
  'iCloud sync for saves, VMUs, and BIOS',
  'Cheats, metadata lookup, and the VMU file manager',
];
