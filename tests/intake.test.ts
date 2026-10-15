import test from 'node:test';
import assert from 'node:assert/strict';
import { validateIntake } from '../src/lib/validation.ts';
import { track, setMeasurementConsent } from '../src/lib/analytics.ts';
const valid = { name: 'Test Person', phone: '312-555-0100', email: 'test@example.com', careFor: 'self', callbackTime: 'any', medicaid: 'yes', location: 'guidance', service: 'mental-health' };
test('requires explicit Medicaid confirmation', () => { assert.ok(validateIntake(valid)); for (const medicaid of ['no','',undefined]) assert.equal(validateIntake({...valid,medicaid}),null); });
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

test('requires valid routing and rejects removed Medicaid choice', () => {
 for (const value of [{...valid,medicaid:'unsure'},{...valid,location:''},{...valid,location:'Unknown clinic'},{...valid,service:'diagnosis'},{...valid,service:undefined}]) assert.equal(validateIntake(value),null);
 assert.ok(validateIntake({...valid,medicaid:'yes',service:'other',location:'Pilsen / On Damen'}));
});

test('requires email and valid care preferences',()=>{for(const patch of [{email:''},{email:'invalid'},{email:'a@b.com\nBcc:bad'},{careFor:'other'},{callbackTime:'midnight'}]) assert.equal(validateIntake({...valid,...patch}),null); assert.ok(validateIntake({...valid,careFor:'family',callbackTime:'afternoon'}));});
