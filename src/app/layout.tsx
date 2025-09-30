import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const viewport: Viewport = {
  themeColor: "#ff6900",
};

export const metadata: Metadata = {
  title: "iFly - Dreamcast Emulator for iOS & tvOS",
  description: "Dreamcast emulator for iOS and tvOS devices, bringing classic Sega games to your Apple devices",
  icons: {
    icon: [
      { url: "/favicons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-36.png", sizes: "36x36", type: "image/png" },
      { url: "/favicons/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicons/favicon-57.png", sizes: "57x57", type: "image/png" },
      { url: "/favicons/favicon-60.png", sizes: "60x60", type: "image/png" },
      { url: "/favicons/favicon-72.png", sizes: "72x72", type: "image/png" },
      { url: "/favicons/favicon-76.png", sizes: "76x76", type: "image/png" },
      { url: "/favicons/favicon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicons/favicon-114-precomposed.png", sizes: "114x114", type: "image/png" },
      { url: "/favicons/favicon-120-precomposed.png", sizes: "120x120", type: "image/png" },
      { url: "/favicons/favicon-144-precomposed.png", sizes: "144x144", type: "image/png" },
      { url: "/favicons/favicon-152-precomposed.png", sizes: "152x152", type: "image/png" },
      { url: "/favicons/favicon-180-precomposed.png", sizes: "180x180", type: "image/png" },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="antialiased">
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}