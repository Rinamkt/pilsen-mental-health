import type { Metadata } from 'next';
import { copy } from './copy';
import { site, paths, type Locale } from './site';
export function metadata(locale: Locale): Metadata {
  const c = copy[locale];
  return { metadataBase: new URL(site.url), title: c.title, description: c.description,
    alternates: { canonical: paths[locale], languages: { en: paths.en, es: paths.es, 'x-default': paths.en } },
    robots: { index: site.indexable, follow: site.indexable },
    openGraph: { title: c.title, description: c.description, url: paths[locale], siteName: 'Pilsen Wellness Center', locale: locale === 'es' ? 'es_US' : 'en_US', alternateLocale: locale === 'es' ? 'en_US' : 'es_US', type: 'website' },
    twitter: { card: 'summary', title: c.title, description: c.description }
  };
}
