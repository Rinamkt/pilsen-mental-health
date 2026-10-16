'use client';
import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import { copy } from '@/lib/copy';
import { site, type Locale } from '@/lib/site';
import { validateIntake } from '@/lib/validation';
import { intakeLocations } from '@/lib/intake-options';
import { track } from '@/lib/analytics';

export function Phone({ locale, compact = false, phone, children }: { locale: Locale; compact?: boolean; phone?: string; children?: ReactNode }) {
  const number = phone || site.phone;
  if (!number) return <span className="phone-pending" aria-disabled="true">{copy[locale].pendingPhone}</span>;
  return <a className="phone-link" href={`tel:${number}`} onClick={() => track('phone_click')}>{children || (compact ? copy[locale].call : (number === '+18442114325' ? <><span>844-211-HEAL</span><small className="phone-digits">844-211-4325</small></> : site.phoneDisplay || number))}</a>;
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
      <label htmlFor="name">{c.name}</label><input id="name" name="name" autoComplete="name" required maxLength={80} disabled={busy || sent} />
      <label htmlFor="phone">{c.phone}</label><input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required minLength={10} maxLength={25} pattern="[+\(\)0-9 .\-]{10,25}" disabled={busy || sent} />
      <label htmlFor="email">{locale === 'es' ? 'Correo electrónico' : 'Email address'}</label><input id="email" name="email" type="email" autoComplete="email" required maxLength={254} disabled={busy || sent}/>
      <label htmlFor="service">{locale === 'es' ? '¿Qué atención buscas?' : 'What type of care are you looking for?'}</label>
      <select id="service" name="service" required defaultValue="" disabled={busy || sent} aria-describedby="routing-help"><option value="" disabled>{c.select}</option><option value="mental-health">{locale === 'es' ? 'Salud mental' : 'Mental health'}</option><option value="other">{locale === 'es' ? 'Otro servicio' : 'Other service'}</option></select>
      <label htmlFor="location">{locale === 'es' ? '¿En qué sede te gustaría recibir atención?' : 'Where would you prefer to receive care?'}</label>
      <select id="location" name="location" required defaultValue="" disabled={busy || sent} aria-describedby="routing-help"><option value="" disabled>{c.select}</option><option value="guidance">{locale === 'es' ? 'Necesito orientación para elegir' : 'Help me choose a location'}</option>{intakeLocations.map(l=><option key={l.name} value={l.name}>{l.name}</option>)}</select>
      <p id="routing-help" className="coverage-help">{locale === 'es' ? 'La sede es una preferencia. El equipo confirmará dónde se ofrece el servicio que necesitas.' : 'Your location is a preference. Our team will confirm where the service you need is available.'}</p>
      <label htmlFor="careFor">{locale === 'es' ? '¿Para quién buscas atención?' : 'Who are you seeking care for?'}</label>
      <select id="careFor" name="careFor" required defaultValue="" disabled={busy || sent}><option value="" disabled>{c.select}</option><option value="self">{locale === 'es' ? 'Para mí' : 'Myself'}</option><option value="family">{locale === 'es' ? 'Para un familiar' : 'A family member'}</option></select>
      <p className="coverage-help">{locale === 'es' ? 'Deja tus propios datos de contacto, incluso si consultas por un familiar. No incluyas datos personales ni clínicos de otra persona.' : 'Use your own contact details, even when asking for a family member. Do not include another person’s personal or clinical information.'}</p>
      <label htmlFor="callbackTime">{locale === 'es' ? 'Horario preferido para recibir una llamada (opcional)' : 'Preferred callback time (optional)'}</label>
      <select id="callbackTime" name="callbackTime" defaultValue="any" disabled={busy || sent} aria-describedby="callback-help"><option value="any">{locale === 'es' ? 'Sin preferencia' : 'No preference'}</option><option value="morning">{locale === 'es' ? 'Mañana' : 'Morning'}</option><option value="afternoon">{locale === 'es' ? 'Tarde' : 'Afternoon'}</option></select>
      <p id="callback-help" className="coverage-help">{locale === 'es' ? 'Hora de Chicago. Es una preferencia, sujeta a disponibilidad del equipo.' : 'Chicago time. This is a preference, subject to team availability.'}</p>
      <button className="button" type="submit" disabled={busy || sent || !enabled}>{busy ? c.sending : c.appointment}<span aria-hidden="true">↗</span></button>
      <p className="request-explainer">{locale === 'es' ? 'Enviar esta solicitud no confirma una cita.' : 'Submitting this request does not confirm an appointment.'}</p>
      {!enabled && <p className="preview-note">{c.preview}</p>}
      <p className="form-privacy" id="form-privacy">{c.privacy} {c.consent} <a href={`https://www.pilsenwellnesscenter.org/${locale}/privacy`}>{c.privacyLink}</a>.</p>
      <p role="status" aria-live="polite" className="form-status">{status}</p>
      <noscript><p>{locale === 'es' ? 'Activa JavaScript para enviar el formulario en línea.' : 'Enable JavaScript to submit the online form.'}</p></noscript>
    </form><div className="form-call"><span>{site.dedicatedPhone ? c.appointment : locale === 'es' ? 'Servicios e información' : 'Services & information'}</span><Phone locale={locale} /><WhatsApp locale={locale} /></div>
  </section>;
}

