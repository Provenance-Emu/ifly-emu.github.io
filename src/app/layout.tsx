import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Script from "next/script";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const GA_ID = 'G-D2HKD61NJ1';

export const metadata: Metadata = {
  metadataBase: new URL('https://ifly-emu.com'),
  title: {
    default: "iFly – Dreamcast Emulator for iOS & tvOS",
    template: "%s | iFly",
  },
  description: "Play classic Sega Dreamcast games on your iPhone, iPad, and Apple TV. Fast, accurate emulation with controller support, Metal shaders, save states, and more.",
  keywords: ["Dreamcast emulator", "iOS emulator", "tvOS emulator", "Sega Dreamcast", "iFly", "Apple TV emulator", "iPhone emulator"],
  authors: [{ name: "Provenance Emu" }],
  creator: "Provenance Emu",
  openGraph: {
    type: "website",
    siteName: "iFly",
    title: "iFly – Dreamcast Emulator for iOS & tvOS",
    description: "Play classic Sega Dreamcast games on your iPhone, iPad, and Apple TV. Fast, accurate emulation with controller support, Metal shaders, and save states.",
    url: "https://ifly-emu.com",
    images: [
      {
        url: "/header.png",
        width: 1200,
        height: 630,
        alt: "iFly – Dreamcast Emulator for iOS & tvOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ProvenanceApp",
    creator: "@ProvenanceApp",
    title: "iFly – Dreamcast Emulator for iOS & tvOS",
    description: "Play classic Sega Dreamcast games on your iPhone, iPad, and Apple TV.",
    images: ["/header.png"],
  },
  icons: {
    icon: [
      { url: "/favicons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicons/favicon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicons/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicons/favicon.ico", type: "image/x-icon" },
    ],
    apple: [
      { url: "/favicons/favicon-120-precomposed.png", sizes: "120x120" },
      { url: "/favicons/favicon-152-precomposed.png", sizes: "152x152" },
      { url: "/favicons/favicon-180-precomposed.png", sizes: "180x180" },
    ],
  },
  manifest: "/favicons/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "iFly",
  },
  other: {
    'theme-color': '#ff6900',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'iFly',
  applicationCategory: 'GameApplication',
  applicationSubCategory: 'Emulator',
  operatingSystem: 'iOS 15.6+, tvOS 16.6+',
  description: 'A Dreamcast emulator for iOS and tvOS. Play classic Sega Dreamcast games on your iPhone, iPad, and Apple TV.',
  url: 'https://ifly-emu.com',
  image: 'https://ifly-emu.com/icon-512.png',
  author: {
    '@type': 'Organization',
    name: 'Provenance Emu',
    url: 'https://provenance-emu.com',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <Navigation />
        <GoogleAnalytics />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
