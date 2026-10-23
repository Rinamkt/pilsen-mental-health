import { intakeLocations, intakeServices } from './intake-options.ts';
export type Intake = { medicaid: 'yes' | 'no'; name: string; phone: string; email: string; careFor: 'self' | 'family'; callbackTime: 'any' | 'morning' | 'afternoon'; location: string; service: 'mental-health' | 'other' };
export function validateIntake(value: unknown): Intake | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const v = value as Record<string, unknown>;
  if (Object.keys(v).some(k => !['medicaid', 'name', 'phone', 'location', 'service', 'email', 'careFor', 'callbackTime'].includes(k))) return null;
  if (typeof v.name !== 'string' || typeof v.phone !== 'string') return null;
  if (v.medicaid !== 'yes' && v.medicaid !== 'no') return null;
  const name = v.name.trim(); const phone = v.phone.trim();
  if (!name || name.length > 80 || /[\r\n<>]/.test(name)) return null;
  if (!/^[+()\d .-]{10,25}$/.test(phone) || phone.replace(/\D/g, '').length < 10 || phone.replace(/\D/g, '').length > 15) return null;
  if (typeof v.email !== 'string' || v.email.length > 254 || !/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(v.email.trim())) return null;
  if (!['self','family'].includes(v.careFor as string)) return null;
  const callbackTime = v.callbackTime === undefined ? 'any' : v.callbackTime;
  if (!['any','morning','afternoon'].includes(callbackTime as string)) return null;
  if (typeof v.location !== 'string' || (v.location !== 'guidance' && !intakeLocations.some(l => l.name === v.location))) return null;
  if (!intakeServices.includes(v.service as Intake['service'])) return null;
  return { medicaid: v.medicaid, email: v.email.trim(), careFor: v.careFor as Intake['careFor'], callbackTime: callbackTime as Intake['callbackTime'], location: v.location, service: v.service as Intake['service'], name, phone };
}
