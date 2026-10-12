import { intakeLocations, intakeServices } from './intake-options.ts';
export type Intake = { name: string; phone: string; medicaid: 'yes' | 'no'; location: string; service: 'mental-health' | 'other' };
export function validateIntake(value: unknown): Intake | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const v = value as Record<string, unknown>;
  if (Object.keys(v).some(k => !['name', 'phone', 'medicaid', 'location', 'service'].includes(k))) return null;
  if (typeof v.name !== 'string' || typeof v.phone !== 'string') return null;
  const name = v.name.trim(); const phone = v.phone.trim();
  if (!name || name.length > 80 || /[\r\n<>]/.test(name)) return null;
  if (!/^[+()\d .-]{10,25}$/.test(phone) || phone.replace(/\D/g, '').length < 10 || phone.replace(/\D/g, '').length > 15) return null;
  if (!['yes', 'no'].includes(v.medicaid as string)) return null;
  if (typeof v.location !== 'string' || (v.location !== 'guidance' && !intakeLocations.some(l => l.name === v.location))) return null;
  if (!intakeServices.includes(v.service as Intake['service'])) return null;
  return { location: v.location, service: v.service as Intake['service'], name, phone, medicaid: v.medicaid as Intake['medicaid'] };
}
