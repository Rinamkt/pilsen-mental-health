import { locations } from './locations.ts';
// Outpatient preferences only. Other services are routed by the intake team.
export const intakeLocations = locations.filter(location => location.kind === 'counseling' && !location.comingSoon);
export const intakeServices = ['mental-health', 'other'] as const;
