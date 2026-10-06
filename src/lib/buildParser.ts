import fs from 'fs';
import path from 'path';
import * as plist from 'plist';
import { screenshots } from '@/data/screenshots';

export interface BuildVersion {
  version: string;
  buildVersion: string;
  date: string;
  localizedDescription: string;
  downloadURL: string;
  size: number;
  minOSVersion: string;
  platform: 'iOS' | 'tvOS';
  isBeta: boolean;
  betaNumber?: number;
  /** Unique feed version for builds that share a marketing version (release builds). */
  feedVersion?: string;
}

export interface AppMetadata {
  name: string;
  bundleIdentifier: string;
  developerName: string;
  subtitle: string;
  localizedDescription: string;
  iconURL: string;
  tintColor: string;
  category: string;
  screenshots?: string[];
  versions: BuildVersion[];
}

interface DistributionSummary {
  [key: string]: Array<{
    buildNumber: string;
    versionNumber?: string;
  }>;
}

/**
 * Parse the local builds directory (public/builds/<version>/<platform>/*.ipa)
 */
function parseLocalBuilds(buildsDir: string, baseURL: string): BuildVersion[] {
  const versions: BuildVersion[] = [];

  if (!fs.existsSync(buildsDir)) {
    return versions;
  }

  // Read all version directories (e.g., 1.0.0, 1.0.1, etc.)
  const versionDirs = fs.readdirSync(buildsDir).filter(file => {
    const fullPath = path.join(buildsDir, file);
    return fs.statSync(fullPath).isDirectory() && /^\d+\.\d+\.\d+$/.test(file);
  });

  for (const versionDir of versionDirs) {
    const versionPath = path.join(buildsDir, versionDir);

    // Read platform/beta directories (e.g., iOS-Beta7, tvOS, iOS, etc.)
    const platformDirs = fs.readdirSync(versionPath).filter(file => {
      const fullPath = path.join(versionPath, file);
      return fs.statSync(fullPath).isDirectory();
    });

    for (const platformDir of platformDirs) {
      const platformPath = path.join(versionPath, platformDir);

      // Parse platform and beta info from directory name
      const platformMatch = platformDir.match(/^(iOS|tvOS)(?:-Beta(\d+))?$/i);
      if (!platformMatch) continue;

      const platform = platformMatch[1] as 'iOS' | 'tvOS';
      const isBeta = !!platformMatch[2];
      const betaNumber = platformMatch[2] ? parseInt(platformMatch[2]) : undefined;

      // Look for IPA file
      const files = fs.readdirSync(platformPath);
      const ipaFile = files.find(f => f.endsWith('.ipa'));
      if (!ipaFile) continue;

      const ipaPath = path.join(platformPath, ipaFile);
      const ipaStats = fs.statSync(ipaPath);

      // Try to read DistributionSummary.plist for metadata
      const distSummaryPath = path.join(platformPath, 'DistributionSummary.plist');
      let buildNumber = '1';
      let versionNumber = versionDir;

      if (fs.existsSync(distSummaryPath)) {
        try {
          const distSummaryContent = fs.readFileSync(distSummaryPath, 'utf8');
          const distSummary = plist.parse(distSummaryContent) as DistributionSummary;

          // Get the first app entry (should be the .ipa)
          const appKey = Object.keys(distSummary).find(key => key.endsWith('.ipa'));
          if (appKey && distSummary[appKey] && distSummary[appKey][0]) {
            buildNumber = distSummary[appKey][0].buildNumber || buildNumber;
            versionNumber = distSummary[appKey][0].versionNumber || versionNumber;
          }
        } catch (error) {
          console.error(`Error parsing DistributionSummary.plist for ${platformDir}:`, error);
        }
      }

      // Get file modification time as release date
      const releaseDate = ipaStats.mtime.toISOString().split('T')[0];

      // Construct download URL
      const downloadURL = `${baseURL}/builds/${versionDir}/${platformDir}/${ipaFile}`;

      // Create version description
      let description = `iFly ${versionNumber}`;
      if (isBeta) {
        description += ` Beta ${betaNumber}`;
      }
      description += ` for ${platform}`;

      versions.push({
        version: versionNumber,
        buildVersion: buildNumber,
        date: releaseDate,
        localizedDescription: description,
        downloadURL,
        size: ipaStats.size,
        minOSVersion: '17.0',
        platform,
        isBeta,
        betaNumber,
      });
    }
  }

  sortVersions(versions);

  return versions;
}

/** Latest first, stable before beta, then higher beta, then newest date. */
function sortVersions(versions: BuildVersion[]): void {
  versions.sort((a, b) => {
    // First compare by version number
    const versionCompare = compareVersions(b.version, a.version);
    if (versionCompare !== 0) return versionCompare;

    // Then by beta status (stable before beta)
    if (a.isBeta !== b.isBeta) {
      return a.isBeta ? 1 : -1;
    }

    // Then by beta number (higher beta first)
    if (a.isBeta && b.isBeta && a.betaNumber !== b.betaNumber) {
      return (b.betaNumber || 0) - (a.betaNumber || 0);
    }

    // Finally by date (newer first)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

}

/** Written by scripts/fetch-releases.mjs from the public releases repo. */
const RELEASES_MANIFEST = path.join(process.cwd(), 'data', 'releases.json');

interface ReleaseBuild {
  tag: string;
  version: string;
  build: string;
  prerelease: boolean;
  date: string;
  name: string;
  url: string;
  size: number;
  platform: 'iOS' | 'tvOS';
}

/** Builds published as GitHub release assets; download links point at the assets. */
function parseReleaseBuilds(): BuildVersion[] {
  if (!fs.existsSync(RELEASES_MANIFEST)) return [];
  try {
    const manifest = JSON.parse(fs.readFileSync(RELEASES_MANIFEST, 'utf8')) as { builds?: ReleaseBuild[] };
    return (manifest.builds ?? []).map((b) => ({
      version: b.version,
      buildVersion: b.build,
      date: b.date,
      localizedDescription: `iFly ${b.version} (build ${b.build}) for ${b.platform}`,
      downloadURL: b.url,
      size: b.size,
      minOSVersion: '17.0',
      platform: b.platform,
      isBeta: b.prerelease,
      // Several builds share a marketing version, and stores need unique versions.
      feedVersion: `${b.version}+${b.build}`,
    }));
  } catch (error) {
    console.error('Error reading releases manifest:', error);
    return [];
  }
}

/**
 * All available builds: the local public/builds directory plus the GitHub
 * releases listed in data/releases.json.
 */
export function parseBuilds(buildsDir: string, baseURL: string): BuildVersion[] {
  const versions = [...parseLocalBuilds(buildsDir, baseURL), ...parseReleaseBuilds()];
  sortVersions(versions);
  return versions;
}

/**
 * Compare two semantic version strings
 */
function compareVersions(a: string, b: string): number {
  const aParts = a.split('.').map(Number);
  const bParts = b.split('.').map(Number);

  for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    const aPart = aParts[i] || 0;
    const bPart = bParts[i] || 0;
    if (aPart !== bPart) {
      return aPart - bPart;
    }
  }

  return 0;
}

/**
 * Generate AltStore/SideStore compatible app metadata
 */
export function generateAltStoreApp(
  baseURL: string,
  buildsDir: string
): AppMetadata {
  const versions = parseBuilds(buildsDir, baseURL);

  return {
    name: 'iFly',
    bundleIdentifier: 'com.provenance.ifly',
    developerName: 'Provenance Emu',
    subtitle: 'Dreamcast Emulator for iOS & tvOS',
    localizedDescription: `Experience classic Sega Dreamcast games on your iOS devices and Apple TV.

Features:
• Full Dreamcast emulation
• Controller support (MFi, PlayStation, Xbox)
• Save states and real-time saves
• High-resolution rendering
• Fast-forward and slow motion
• Customizable controls
• Game library management
• And much more!

This is an early build of iFly optimized for iOS and tvOS devices.`,
    iconURL: `${baseURL}/icon-1024.png`,
    tintColor: '#ff6900',
    category: 'games',
    screenshots: screenshots('iphone').slice(0, 8).map((item) => `${baseURL}${item.jpg}`),
    versions: versions.map(v => ({
      // Make beta versions unique by appending beta number to version string
      // This prevents duplicate version errors when multiple betas share the same bundle version
      version: v.feedVersion ?? (v.isBeta && v.betaNumber ? `${v.version}-beta${v.betaNumber}` : v.version),
      buildVersion: v.buildVersion,
      date: v.date,
      localizedDescription: v.localizedDescription,
      downloadURL: v.downloadURL,
      size: v.size,
      minOSVersion: v.minOSVersion,
      platform: v.platform,
      isBeta: v.isBeta,
      betaNumber: v.betaNumber,
    })),
  };
}
