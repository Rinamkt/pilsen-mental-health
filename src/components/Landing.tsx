import Image from 'next/image';
import { copy } from '@/lib/copy';
import { site, type Locale } from '@/lib/site';
import { AppointmentForm, Phone, WhatsApp } from './Contact';
import { Locations } from './Locations';

function Photo({ locale, slot, className = '' }: { locale: Locale; slot: 'hero' | 'community' | 'location'; className?: string }) {
  const c = copy[locale]; const index = ['hero', 'community', 'location'].indexOf(slot);
  return <figure className={`photo ${site.images[slot] ? 'photo-ready' : ''} ${className}`}>
    {site.images[slot] ? <Image src={site.images[slot]} alt={c.imageAlt[index]} fill sizes="(min-width: 900px) 45vw, 100vw" /> : <><div className="photo-mat" aria-hidden="true"><span>0{index+1}</span><div className="photo-frame">PILSEN<br/><i>Wellness Center</i></div></div><figcaption><span>{c.photoPending}</span>{[c.photoHero, c.photoCommunity, c.photoLocation][index]}</figcaption></>}
  </figure>;
}
export function Landing({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const enabled = process.env.INTAKE_ENABLED === 'true' && !!process.env.INTAKE_ENDPOINT && !!process.env.INTAKE_TOKEN;
  return <>
    <a className="skip-link" href="#main">{c.skip}</a>
    <header className="site-header"><div className="wrap header-inner"><Image className="logo" src="/images/pilsen-logo.png" alt="Pilsen Wellness Center" width={196} height={87} priority /><p className="heritage">{c.heritage}</p><div className="header-contact"><span>{site.dedicatedPhone ? c.appointment : locale === 'es' ? 'Servicios e información' : 'Services & information'}</span><Phone locale={locale} /></div></div></header>
    <main id="main">
      <div className="hero-background"><section className="hero wrap"><div className="hero-copy"><p className="eyebrow">{c.eyebrow}</p><h1>{c.headline}<em>{c.emphasis}</em></h1><p className="hero-intro">{c.intro}</p><div className="medicaid-highlight"><strong>{locale === 'es' ? 'Aceptamos Medicaid' : 'Medicaid accepted'}</strong><p>{locale === 'es' ? 'Nuestra atención está dirigida principalmente a personas con Medicaid. Te ayudamos a revisar tu cobertura y las opciones disponibles.' : 'Our care primarily serves people with Medicaid. We can help you review your coverage and available options.'}</p></div><Photo locale={locale} slot="hero" className="hero-photo" /></div><AppointmentForm locale={locale} enabled={enabled} /></section></div>
      <div className="trust-wrap"><ul className="wrap trust-row">{c.trust.map((t,i) => <li key={t}><span className="trust-mark" aria-hidden="true">{['✓','Aa','50+','↔'][i]}</span>{t}</li>)}</ul></div><p className="wrap coverage">{c.coverage}</p>
      <section className="wrap section"><div className="section-heading"><p className="eyebrow">{c.nextLabel}</p><h2>{c.nextTitle}</h2></div><ol className="steps">{c.steps.map(([title,text],i) => <li key={title}><span aria-hidden="true">0{i+1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol><a href="#appointment" className="text-cta">{c.appointment} <span aria-hidden="true">↗</span></a></section>
      <section className="wrap section"><div className="section-heading"><p className="eyebrow">{c.servicesLabel}</p><h2>{c.servicesTitle}</h2><p>{c.servicesIntro}</p></div><div className="services">{c.services.map(([title, text],i) => <article key={title}><span className="service-number" aria-hidden="true">0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      <section className="why"><div className="wrap why-grid"><div className="brand-story"><Image src="/images/pilsen-square.png" alt="Pilsen Wellness Center" width={256} height={256}/><p>{locale === 'es' ? 'Cuidando mentes. Fortaleciendo comunidades.' : 'Caring for minds. Nurturing communities.'}</p><Photo locale={locale} slot="community" /></div><div><p className="eyebrow">{c.whyLabel}</p><h2>{c.whyTitle}</h2><p className="why-intro">{c.whyIntro}</p>{c.why.map(([title,text]) => <div className="why-point" key={title}><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>
      <section className="faq-section"><div className="wrap faq-grid"><div><p className="eyebrow">{c.faqLabel}</p><h2>{c.faqTitle}</h2></div><div className="faqs">{c.faqs.map(([q,a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></div></section>
      <Locations locale={locale} />
      <section className="final-cta"><div className="wrap"><p className="eyebrow">PILSEN WELLNESS CENTER</p><h2>{c.finalTitle}</h2><p>{c.finalBody}</p><a className="button" href="#appointment">{c.appointment}<span aria-hidden="true">↗</span></a><div className="final-phone"><Phone locale={locale} /><WhatsApp locale={locale} /></div></div></section>
    </main><footer className="wrap footer"><span>Pilsen Wellness Center · {c.footer}</span><a href={`https://www.pilsenwellnesscenter.org/${locale}/privacy`}>{c.privacyLink}</a></footer>
    <div className="mobile-bar" aria-label={c.appointment}><a href="#appointment" className="button">{c.appointment}<span aria-hidden="true">↗</span></a><Phone locale={locale} compact /></div>
  </>;
}
