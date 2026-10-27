'use client';
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
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
  const [step, setStep] = useState(1);
  const [medicaid, setMedicaid] = useState('');
  const focusStep = useRef(false);
  const stepHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { if (focusStep.current) stepHeading.current?.focus(); }, [step]);
  function moveTo(next: number) { focusStep.current = true; setStatus(''); setStep(next); }
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (lock.current || sent) return;
    const form = e.currentTarget;
    const controls = form.querySelectorAll<HTMLInputElement | HTMLSelectElement>(`[data-step="${step}"] input, [data-step="${step}"] select`);
    for (const control of controls) { if (!control.reportValidity()) return; }
    if (step === 1) { moveTo(2); return; }
    if (!enabled) { setStatus(c.unavailable); return; }
    const data = new FormData(form);
    const payload = validateIntake({...Object.fromEntries(data), privacyAccepted: data.get('privacyAccepted') === 'true'});
    if (!payload) { setStatus(c.invalid); return; }
    lock.current = true; setBusy(true); setStatus('');
    try {
      const res = await fetch('/api/appointment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: AbortSignal.timeout(15000) });
      const result = await res.json();
      if (!res.ok || result.accepted !== true) throw new Error('not-accepted');
      form.reset(); setMedicaid(''); setSent(true); setStatus(c.success); track('request_received');
    } catch { setStatus(c.error); } finally { setBusy(false); lock.current = false; }
  }
  return <section className="form-card" id="appointment" aria-labelledby="form-title" tabIndex={-1}>
    <div className="form-heading"><h2 id="form-title">{c.formTitle}</h2><p>{c.formIntro}</p></div>
    <form noValidate onSubmit={submit} method="post" action="/api/appointment" aria-describedby="form-privacy" aria-busy={busy}>
      <div className="form-progress" aria-label={locale === 'es' ? 'Progreso de la solicitud' : 'Request progress'}><span aria-current={step === 1 ? 'step' : undefined}>1 · {locale === 'es' ? 'Atención' : 'Care'}</span><span aria-current={step === 2 ? 'step' : undefined}>2 · {locale === 'es' ? 'Contacto' : 'Contact'}</span></div>
      <h3 ref={stepHeading} tabIndex={-1} className="step-heading">{locale === 'es' ? `Paso ${step} de 2: ${step === 1 ? '¿Qué atención buscas?' : '¿Cómo podemos contactarte?'}` : `Step ${step} of 2: ${step === 1 ? 'What care are you looking for?' : 'How can we reach you?'}`}</h3>
      <fieldset data-step="1" hidden={step !== 1} disabled={busy || sent}><legend className="sr-only">{locale === 'es' ? 'Preferencias de atención' : 'Care preferences'}</legend>
      <label htmlFor="service">{locale === 'es' ? '¿Qué atención buscas?' : 'What type of care are you looking for?'}</label>
      <select id="service" name="service" required defaultValue="" disabled={busy || sent} aria-describedby="routing-help"><option value="" disabled>{c.select}</option><option value="mental-health">{locale === 'es' ? 'Terapia de salud mental · con Medicaid' : 'Mental Health Counseling - With Medicaid insurance'}</option><option value="other">{locale === 'es' ? 'Otro servicio o seguro' : 'Any other Service or Insurance'}</option></select>
      <label htmlFor="location">{locale === 'es' ? '¿En qué sede te gustaría recibir atención?' : 'Where would you prefer to receive care?'}</label>
      <select id="location" name="location" required defaultValue="" disabled={busy || sent} aria-describedby="routing-help"><option value="" disabled>{c.select}</option><option value="guidance">{locale === 'es' ? 'Necesito orientación para elegir' : 'Help me choose a location'}</option>{intakeLocations.map(l=><option key={l.name} value={l.name}>{l.name}{l.comingSoon ? (locale === 'es' ? ' · próxima apertura' : ' · coming soon') : ''}</option>)}</select>
      <p id="routing-help" className="coverage-help">{locale === 'es' ? 'La sede es una preferencia. El equipo confirmará dónde se ofrece el servicio que necesitas.' : 'Your location is a preference. Our team will confirm where the service you need is available.'}</p>
      <label htmlFor="careFor">{locale === 'es' ? '¿Para quién buscas atención?' : 'Who are you seeking care for?'}</label>
      <select id="careFor" name="careFor" required defaultValue="" disabled={busy || sent}><option value="" disabled>{c.select}</option><option value="self">{locale === 'es' ? 'Para mí' : 'Myself'}</option><option value="family">{locale === 'es' ? 'Para un familiar' : 'A family member'}</option></select>
      <p className="coverage-help">{locale === 'es' ? 'Deja tus propios datos de contacto, incluso si consultas por un familiar. No incluyas datos personales ni clínicos de otra persona.' : 'Use your own contact details, even when asking for a family member. Do not include another person’s personal or clinical information.'}</p>
      <label htmlFor="medicaid">{locale === 'es' ? '¿La persona que recibirá atención cuenta con Medicaid?' : 'Does the person seeking care have Medicaid?'}</label><select id="medicaid" name="medicaid" value={medicaid} onChange={e => setMedicaid(e.target.value)} required><option value="" disabled>{c.select}</option><option value="yes">{c.yes}</option><option value="no">{c.no}</option></select>
      {medicaid === 'no' && <p className="medicaid-guidance" role="status">{locale === 'es' ? 'Puedes continuar con tu solicitud o llamar para consultar las opciones disponibles: ' : 'You can continue your request or call to discuss available options: '}<Phone locale={locale} compact /></p>}
      </fieldset>
      <fieldset data-step="2" hidden={step !== 2} disabled={busy || sent}><legend className="sr-only">{locale === 'es' ? 'Datos de contacto' : 'Contact details'}</legend>
      <label htmlFor="name">{c.name}</label><input id="name" name="name" autoComplete="name" required maxLength={80} disabled={busy || sent} />
      <label htmlFor="phone">{c.phone}</label><input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required minLength={10} maxLength={25} pattern="[+\(\)0-9 .\-]{10,25}" disabled={busy || sent} />
      <label htmlFor="email">{locale === 'es' ? 'Correo electrónico' : 'Email address'}</label><input id="email" name="email" type="email" autoComplete="email" required maxLength={254} disabled={busy || sent}/>
      <label htmlFor="callbackTime">{locale === 'es' ? 'Horario preferido para recibir una llamada (opcional)' : 'Preferred callback time (optional)'}</label>
      <select id="callbackTime" name="callbackTime" defaultValue="any" disabled={busy || sent} aria-describedby="callback-help"><option value="any">{locale === 'es' ? 'Sin preferencia' : 'No preference'}</option><option value="morning">{locale === 'es' ? 'Mañana' : 'Morning'}</option><option value="afternoon">{locale === 'es' ? 'Tarde' : 'Afternoon'}</option></select>
      <p id="callback-help" className="coverage-help">{locale === 'es' ? 'Hora de Chicago. Es una preferencia, sujeta a disponibilidad del equipo.' : 'Chicago time. This is a preference, subject to team availability.'}</p>
      <label className="privacy-accept"><input type="checkbox" name="privacyAccepted" value="true" required/><span>{c.privacyAgree} <a href={`https://www.pilsenwellnesscenter.org/${locale}/privacy`} target="_blank" rel="noopener noreferrer">{c.privacyPolicy}</a>.</span></label>
      </fieldset>
      <div className="form-step-actions">{step === 2 && <button className="back-button" type="button" disabled={busy || sent} onClick={() => moveTo(1)}>{locale === 'es' ? 'Volver' : 'Back'}</button>}<button className="button" type="submit" disabled={busy || sent || (step === 2 && !enabled)}>{step === 1 ? (locale === 'es' ? 'Continuar' : 'Continue') : busy ? c.sending : c.appointment}<span aria-hidden="true">↗</span></button></div>
      <p className="request-explainer">{c.requestNote}</p>
      {!enabled && <p className="preview-note">{c.preview}</p>}

      <p role="status" aria-live="polite" className="form-status">{status}</p>
      <noscript><p>{locale === 'es' ? 'Activa JavaScript para enviar el formulario en línea.' : 'Enable JavaScript to submit the online form.'}</p></noscript>
    </form><aside className="medical-disclaimer" id="medical-disclaimer"><h3>{c.disclaimerTitle}</h3><p>{c.disclaimer}</p><p className="disclaimer-followup" id="form-privacy">{c.postDisclaimer.slice(0, c.postDisclaimer.lastIndexOf(c.privacyLink))}<a href={`https://www.pilsenwellnesscenter.org/${locale}/privacy`}>{c.privacyLink}</a>.</p><a href="tel:911">{locale === 'es' ? 'Llamar al 911' : 'Call 911'}</a></aside><div className="form-call"><span>{site.dedicatedPhone ? c.appointment : locale === 'es' ? 'Servicios e información' : 'Services & information'}</span><Phone locale={locale} /><WhatsApp locale={locale} /></div>
  </section>;
}

