import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/secret/', '/testflight-patrons/', '/status/'],
      },
    ],
    sitemap: 'https://ifly-emu.com/sitemap.xml',
  }
}
