import test from 'node:test';
import assert from 'node:assert/strict';
import { POST } from '../src/app/api/appointment/route.ts';
test('intake enforces boundaries and confirms only durable acceptance', async () => {
 process.env.INTAKE_ENABLED='true'; process.env.INTAKE_ENDPOINT='https://intake.example.test'; process.env.INTAKE_TOKEN='test-token'; process.env.SITE_URL='https://landing.example.test';
 const payload={name:'QA Test',phone:'3125550100',medicaid:'unsure'};
 const request=(body=JSON.stringify(payload),origin='https://landing.example.test',type='application/json')=>new Request('https://landing.example.test/api/appointment',{method:'POST',headers:{origin,'Content-Type':type},body});
 let sent=0;
 const original=globalThis.fetch;
 try {
  globalThis.fetch=async (_url, options)=> { sent++; assert.deepEqual(JSON.parse(String(options?.body)),payload); return Response.json({accepted:true}); };
  assert.equal((await POST(request(undefined,'https://other.example.test'))).status,403);
  assert.equal((await POST(request(undefined,undefined,'text/plain'))).status,415);
  assert.equal((await POST(request(JSON.stringify({...payload,diagnosis:'private'})))).status,400);
  assert.equal((await POST(request('x'.repeat(2049)))).status,413);
  assert.equal(sent,0);
  const accepted=await POST(request()); assert.equal(accepted.status,200); assert.deepEqual(await accepted.json(),{accepted:true}); assert.equal(accepted.headers.get('cache-control'),'no-store');
  globalThis.fetch=async()=>Response.json({}); assert.equal((await POST(request())).status,502);
  globalThis.fetch=async()=>{throw new Error('receiver detail must remain private')}; const failure=await POST(request()); assert.equal(failure.status,502); assert.deepEqual(await failure.json(),{accepted:false});
  process.env.INTAKE_ENABLED='false'; assert.equal((await POST(request())).status,503);
 } finally {globalThis.fetch=original;}
});
