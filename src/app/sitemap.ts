import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://ifly-emu.com'
  return [
    { url: `${base}/`,           changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/downloads/`, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/features/`,  changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/about/`,     changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/support/`,   changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/donate/`,    changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/links/`,     changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/privacy/`,   changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${base}/licenses/`,  changeFrequency: 'yearly',  priority: 0.2 },
  ]
}
