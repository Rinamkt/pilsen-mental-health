import { Landing } from '@/components/Landing';
import { metadata } from '@/lib/metadata';
export const generateMetadata = () => metadata('es');
export default function Page() { return <Landing locale="es" />; }
