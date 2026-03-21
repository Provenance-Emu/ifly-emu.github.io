import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import StatusDashboard from './StatusDashboard';

export const metadata: Metadata = {
  title: 'Site Status',
  description: 'Live site health for ifly-emu.com: Lighthouse scores, HTML/link check results, SSL grade, and Mozilla Observatory security rating.',
  alternates: { canonical: 'https://ifly-emu.com/status/' },
  robots: { index: false, follow: false },
};

export const dynamic = 'force-static';

export default function StatusPage() {
  let initialData = null;
  try {
    const filePath = path.join(process.cwd(), 'public', 'status.json');
    initialData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    // status.json may not exist on first build
  }
  return <StatusDashboard initialData={initialData} />;
}
