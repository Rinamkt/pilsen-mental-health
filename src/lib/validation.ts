export type Intake = { name: string; phone: string; medicaid: 'yes' | 'no' | 'unsure' };
export function validateIntake(value: unknown): Intake | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const v = value as Record<string, unknown>;
  if (Object.keys(v).some(k => !['name', 'phone', 'medicaid'].includes(k))) return null;
  if (typeof v.name !== 'string' || typeof v.phone !== 'string') return null;
  const name = v.name.trim(); const phone = v.phone.trim();
  if (!name || name.length > 80 || /[\r\n<>]/.test(name)) return null;
  if (!/^[+()\d .-]{10,25}$/.test(phone) || phone.replace(/\D/g, '').length < 10 || phone.replace(/\D/g, '').length > 15) return null;
  if (!['yes', 'no', 'unsure'].includes(v.medicaid as string)) return null;
  return { name, phone, medicaid: v.medicaid as Intake['medicaid'] };
}
