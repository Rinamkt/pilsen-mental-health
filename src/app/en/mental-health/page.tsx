import { Landing } from '@/components/Landing';
import { metadata } from '@/lib/metadata';
export const generateMetadata = () => metadata('en');
export default function Page() { return <Landing locale="en" />; }
