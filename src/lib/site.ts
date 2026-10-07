import { locations } from './locations';
export type Locale = 'en' | 'es';
export const paths = { en: '/en/mental-health', es: '/es/salud-mental' };
export const site = {
 url: process.env.SITE_URL || 'http://localhost:3000', indexable: process.env.SITE_INDEXABLE === 'true',
 // Dedicated US appointment line confirmed by the user.
 phone: process.env.NEXT_PUBLIC_APPOINTMENT_PHONE || '+18442114325',
 phoneDisplay: process.env.NEXT_PUBLIC_APPOINTMENT_PHONE_DISPLAY || (process.env.NEXT_PUBLIC_APPOINTMENT_PHONE ? process.env.NEXT_PUBLIC_APPOINTMENT_PHONE : '844-211-4325'),
 dedicatedPhone: true,
 locations,
 whatsapp: 'https://api.whatsapp.com/send/?phone=18723080000&text=Hello%2C+I+have+a+question%3F&type=phone_number&app_absent=0',
 images: { hero: '/images/mental-health-conversation-v1.png', community: '/images/community-welcome-v1.png', location: '' }
};
