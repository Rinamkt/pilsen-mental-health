import { validateIntake } from '../../../lib/validation.ts';
export const runtime = 'nodejs';
const response = (status: number, accepted = false) => Response.json({ accepted }, { status, headers: { 'Cache-Control': 'no-store' } });
export async function POST(request: Request) {
  // No logging, persistence, analytics or third-party calls before configuration.
  if (process.env.INTAKE_ENABLED !== 'true' || !process.env.INTAKE_ENDPOINT || !process.env.INTAKE_TOKEN) return response(503);
  const origin = request.headers.get('origin');
  if (!process.env.SITE_URL || origin !== new URL(process.env.SITE_URL).origin) return response(403);
  if (!request.headers.get('content-type')?.startsWith('application/json')) return response(415);
  // Enforce a byte limit even for streamed/chunked bodies.
  const reader = request.body?.getReader(); if (!reader) return response(400);
  const chunks: Uint8Array[] = []; let length = 0;
  try {
    while (true) { const { done, value } = await reader.read(); if (done) break; length += value.byteLength; if (length > 2048) { await reader.cancel(); return response(413); } chunks.push(value); }
    const body = Buffer.concat(chunks).toString('utf8');
    const payload = validateIntake(JSON.parse(body)); if (!payload) return response(400);
    const endpoint = new URL(process.env.INTAKE_ENDPOINT); if (endpoint.protocol !== 'https:') return response(503);
    const result = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.INTAKE_TOKEN}` }, body: JSON.stringify(payload), cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(10000) });
    // The receiver must confirm durable acceptance, not merely HTTP success.
    if (!result.ok) return response(502);
    const receipt = await result.json(); if (receipt.accepted !== true) return response(502);
    return response(200, true);
  } catch { return response(502); }
}

