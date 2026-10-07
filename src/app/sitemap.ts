import { site, paths } from '@/lib/site';
export default function sitemap() { return site.indexable ? Object.values(paths).map(p => ({ url: `${site.url}${p}`, alternates: { languages: { en: `${site.url}${paths.en}`, es: `${site.url}${paths.es}` } } })) : []; }
