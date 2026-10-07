import type { NextConfig } from 'next';
const config: NextConfig = {
  poweredByHeader: false, turbopack: { root: process.cwd() },
  async redirects() { return [{ source: '/', destination: '/en/mental-health', permanent: false }]; },
  async headers() { return [{ source: '/:path*', headers: [
    { key: 'Referrer-Policy', value: 'no-referrer' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
  ] }]; }
};
export default config;

