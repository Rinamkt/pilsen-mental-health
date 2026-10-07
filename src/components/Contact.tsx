'use client';
import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import { copy } from '@/lib/copy';
import { site, type Locale } from '@/lib/site';
import { validateIntake } from '@/lib/validation';
import { track } from '@/lib/analytics';

export function Phone({ locale, compact = false, phone, children }: { locale: Locale; compact?: boolean; phone?: string; children?: ReactNode }) {
  const number = phone || site.phone;
  if (!number) return <span className="phone-pending" aria-disabled="true">{copy[locale].pendingPhone}</span>;
  return <a className="phone-link" href={`tel:${number}`} onClick={() => track('phone_click')}>{children || (compact ? copy[locale].call : site.phoneDisplay || number)}</a>;
}
export function WhatsApp({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  return <a className="whatsapp-link" href={site.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => track('whatsapp_click')} aria-label={locale === 'es' ? 'Escribir por WhatsApp (abre otra pestaña)' : 'Message on WhatsApp (opens a new tab)'}>{compact ? 'WhatsApp' : locale === 'es' ? 'Escríbenos por WhatsApp' : 'Message us on WhatsApp'} <span aria-hidden="true">↗</span></a>;
}
export function AppointmentForm({ locale, enabled }: { locale: Locale; enabled: boolean }) {
  const c = copy[locale]; const [status, setStatus] = useState(''); const [busy, setBusy] = useState(false); const [sent, setSent] = useState(false); const lock = useRef(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (lock.current || sent) return;
    if (!enabled) { setStatus(c.unavailable); return; }
    const form = e.currentTarget; const data = new FormData(form);
    const payload = validateIntake(Object.fromEntries(data));
    if (!payload) { setStatus(c.invalid); return; }
    lock.current = true; setBusy(true); setStatus('');
    try {
      const res = await fetch('/api/appointment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: AbortSignal.timeout(15000) });
      const result = await res.json();
      if (!res.ok || result.accepted !== true) throw new Error('not-accepted');
      form.reset(); setSent(true); setStatus(c.success); track('request_received');
    } catch { setStatus(c.error); } finally { setBusy(false); lock.current = false; }
  }
  return <section className="form-card" id="appointment" aria-labelledby="form-title" tabIndex={-1}>
    <div className="form-heading"><span className="small-label">{c.appointment}</span><h2 id="form-title">{c.formTitle}</h2><p>{c.formIntro}</p></div>
    <form onSubmit={submit} method="post" action="/api/appointment" aria-describedby="form-privacy" aria-busy={busy}>
      <label htmlFor="name">{c.name}</label><input id="name" name="name" autoComplete="given-name" required maxLength={80} disabled={busy || sent} />
      <label htmlFor="phone">{c.phone}</label><input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required minLength={10} maxLength={25} pattern="[+\(\)0-9 .\-]{10,25}" disabled={busy || sent} />
      <label htmlFor="medicaid">{c.medicaid}</label><select aria-describedby="coverage-help" id="medicaid" name="medicaid" required defaultValue="" disabled={busy || sent}><option value="" disabled>{c.select}</option><option value="yes">{c.yes}</option><option value="no">{c.no}</option><option value="unsure">{c.unsure}</option></select>
      <p id="coverage-help" className="coverage-help">{locale === 'es' ? '¿No sabes si tu cobertura aplica? Podemos orientarte.' : 'Not sure whether your coverage applies? We can help you explore your options.'}</p>
      <button className="button" type="submit" disabled={busy || sent || !enabled}>{busy ? c.sending : c.appointment}<span aria-hidden="true">↗</span></button>
      <p className="request-explainer">{locale === 'es' ? 'Enviar esta solicitud no confirma una cita.' : 'Submitting this request does not confirm an appointment.'}</p>
      {!enabled && <p className="preview-note">{c.preview}</p>}
      <p className="form-privacy" id="form-privacy">{c.privacy} {c.consent} <a href={`https://www.pilsenwellnesscenter.org/${locale}/privacy`}>{c.privacyLink}</a>.</p>
      <p role="status" aria-live="polite" className="form-status">{status}</p>
      <noscript><p>{locale === 'es' ? 'Activa JavaScript para enviar el formulario en línea.' : 'Enable JavaScript to submit the online form.'}</p></noscript>
    </form><div className="form-call"><span>{site.dedicatedPhone ? c.appointment : locale === 'es' ? 'Servicios e información' : 'Services & information'}</span><Phone locale={locale} /><WhatsApp locale={locale} /></div>
  </section>;
}

