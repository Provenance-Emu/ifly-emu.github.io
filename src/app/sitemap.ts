import { MetadataRoute } from 'next'
import { execSync } from 'child_process'

export const dynamic = 'force-static'

function lastModifiedFor(file: string): Date {
  try {
    const iso = execSync(`git log -1 --format=%cI -- "${file}"`, { encoding: 'utf-8' }).trim()
    if (iso) return new Date(iso)
  } catch {
    // git unavailable or the command failed — fall through to today's date.
  }
  return new Date()
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://ifly-emu.com'
  return [
    { url: `${base}/`,           changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/downloads/`, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/sources/`,   changeFrequency: 'weekly',  priority: 0.7, lastModified: lastModifiedFor('src/app/sources/page.tsx') },
    { url: `${base}/guide/`,           changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/guide/importing/`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/guide/formats/`,   changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/guide/bios/`,      changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/guide/arcade/`,    changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/guide/systems/`,   changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/guide/faq/`,       changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/features/`,  changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/plus/`,      changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/about/`,     changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/support/`,   changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/controllers/`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/donate/`,    changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/links/`,     changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/privacy/`,   changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${base}/licenses/`,  changeFrequency: 'yearly',  priority: 0.2 },
  ]
}
