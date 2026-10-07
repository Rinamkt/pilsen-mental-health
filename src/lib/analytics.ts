// No vendor tags, cookies, page paths, identifiers, form values or query strings.
// An approved host integration may listen after affirmative measurement consent.
export type Measurement = 'request_received' | 'phone_click' | 'whatsapp_click';
let approved = false;
export function setMeasurementConsent(value: boolean) { approved = value; }
export function track(event: Measurement) {
  if (!approved || typeof window === 'undefined' || !['request_received', 'phone_click', 'whatsapp_click'].includes(event)) return;
  window.dispatchEvent(new CustomEvent('pilsen:measurement', { detail: { event } }));
}

