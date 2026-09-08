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
    { url: `${base}/`,           changeFrequency: 'weekly',  priority: 1.0, lastModified: lastModifiedFor('src/app/page.tsx') },
    { url: `${base}/downloads/`, changeFrequency: 'weekly',  priority: 0.9, lastModified: lastModifiedFor('src/app/downloads/page.tsx') },
    { url: `${base}/sources/`,   changeFrequency: 'weekly',  priority: 0.7, lastModified: lastModifiedFor('src/app/sources/page.tsx') },
    { url: `${base}/guide/`,           changeFrequency: 'monthly', priority: 0.8, lastModified: lastModifiedFor('src/app/guide/page.tsx') },
    { url: `${base}/guide/importing/`, changeFrequency: 'monthly', priority: 0.7, lastModified: lastModifiedFor('src/app/guide/importing/page.tsx') },
    { url: `${base}/guide/formats/`,   changeFrequency: 'monthly', priority: 0.7, lastModified: lastModifiedFor('src/app/guide/formats/page.tsx') },
    { url: `${base}/guide/bios/`,      changeFrequency: 'monthly', priority: 0.7, lastModified: lastModifiedFor('src/app/guide/bios/page.tsx') },
    { url: `${base}/guide/arcade/`,    changeFrequency: 'monthly', priority: 0.7, lastModified: lastModifiedFor('src/app/guide/arcade/page.tsx') },
    { url: `${base}/guide/systems/`,   changeFrequency: 'monthly', priority: 0.6, lastModified: lastModifiedFor('src/app/guide/systems/page.tsx') },
    { url: `${base}/guide/faq/`,       changeFrequency: 'monthly', priority: 0.6, lastModified: lastModifiedFor('src/app/guide/faq/page.tsx') },
    { url: `${base}/features/`,  changeFrequency: 'monthly', priority: 0.8, lastModified: lastModifiedFor('src/app/features/page.tsx') },
    { url: `${base}/compare/`,                    changeFrequency: 'monthly', priority: 0.6, lastModified: lastModifiedFor('src/app/compare/page.tsx') },
    { url: `${base}/compare/ifly-vs-flycast/`,     changeFrequency: 'monthly', priority: 0.6, lastModified: lastModifiedFor('src/app/compare/ifly-vs-flycast/page.tsx') },
    { url: `${base}/compare/ifly-vs-provenance/`,  changeFrequency: 'monthly', priority: 0.6, lastModified: lastModifiedFor('src/app/compare/ifly-vs-provenance/page.tsx') },
    { url: `${base}/plus/`,      changeFrequency: 'monthly', priority: 0.8, lastModified: lastModifiedFor('src/app/plus/page.tsx') },
    { url: `${base}/about/`,     changeFrequency: 'monthly', priority: 0.7, lastModified: lastModifiedFor('src/app/about/page.tsx') },
    { url: `${base}/support/`,   changeFrequency: 'monthly', priority: 0.6, lastModified: lastModifiedFor('src/app/support/page.tsx') },
    { url: `${base}/controllers/`, changeFrequency: 'monthly', priority: 0.5, lastModified: lastModifiedFor('src/app/controllers/page.tsx') },
    { url: `${base}/donate/`,    changeFrequency: 'monthly', priority: 0.5, lastModified: lastModifiedFor('src/app/donate/page.tsx') },
    { url: `${base}/links/`,     changeFrequency: 'monthly', priority: 0.4, lastModified: lastModifiedFor('src/app/links/page.tsx') },
    { url: `${base}/privacy/`,   changeFrequency: 'yearly',  priority: 0.2, lastModified: lastModifiedFor('src/app/privacy/page.tsx') },
    { url: `${base}/licenses/`,  changeFrequency: 'yearly',  priority: 0.2, lastModified: lastModifiedFor('src/app/licenses/page.tsx') },
  ]
}
