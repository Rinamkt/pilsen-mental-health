import { locations } from './locations.ts';
// Outpatient preferences, including announced Joliet (not a confirmed appointment). Other services are routed by the intake team.
export const intakeLocations = locations.filter(location => location.kind === 'counseling');
export const intakeServices = ['mental-health', 'other'] as const;
