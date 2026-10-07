import { site } from '@/lib/site';
export default function robots() { return { rules: { userAgent: '*', ...(site.indexable ? { allow: '/', disallow: '/api/' } : { disallow: '/' }) }, ...(site.indexable ? { sitemap: `${site.url}/sitemap.xml` } : {}) }; }
