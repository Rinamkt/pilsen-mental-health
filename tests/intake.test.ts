import test from 'node:test';
import assert from 'node:assert/strict';
import { validateIntake } from '../src/lib/validation.ts';
import { track, setMeasurementConsent } from '../src/lib/analytics.ts';
const valid = { name: 'Test Person', phone: '312-555-0100', medicaid: 'unsure' };
test('accepts each Medicaid option without excluding people', () => {
  for (const medicaid of ['yes','no','unsure']) assert.ok(validateIntake({...valid,medicaid}));
});
test('rejects malformed input, extra clinical fields and oversized values', () => {
  for (const value of [null, [], {}, {...valid, diagnosis:'test'}, {...valid,name:' '}, {...valid,name:'x'.repeat(81)}, {...valid,phone:'abc1234567'}, {...valid,phone:'123'}, {...valid,medicaid:'maybe'}]) assert.equal(validateIntake(value),null);
});
test('measurement stays silent without consent and exposes only fixed event names', () => {
  const captured: unknown[] = [];
  Object.defineProperty(globalThis, 'window', {value: {dispatchEvent: (e: CustomEvent) => captured.push(e.detail)}, configurable:true});
  setMeasurementConsent(false); track('request_received'); assert.equal(captured.length,0);
  setMeasurementConsent(true); track('request_received'); track('phone_click');
  assert.deepEqual(captured,[{event:'request_received'},{event:'phone_click'}]);
  setMeasurementConsent(false); track('phone_click'); assert.equal(captured.length,2);
});
