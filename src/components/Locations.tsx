'use client';
import { useState } from 'react';
import { locations } from '@/lib/locations';
import type { Locale } from '@/lib/site';
import { Phone } from './Contact';
export function Locations({locale}:{locale:Locale}) {
 const es=locale==='es'; const [filter,setFilter]=useState('all'); const [expanded,setExpanded]=useState(false);
 const filters=[['all',es?'Todas las ubicaciones':'All locations'],['chicago','Chicago'],['suburbs',es?'Suburbios':'Suburbs'],['counseling',es?'Terapia':'Counseling'],['residential',es?'Residenciales':'Residential']];
 const matches=locations.filter(l=>filter==='all'||l.area===filter||l.kind===filter);
 const visible=expanded?matches:matches.slice(0,3);
 return <section className="directory" id="locations" aria-labelledby="locations-title"><div className="wrap">
  <div className="directory-heading"><div><p className="eyebrow">{es?'PILSEN EN TU COMUNIDAD':'PILSEN IN YOUR COMMUNITY'}</p><h2 id="locations-title">{es?'Encuentra apoyo cerca de ti.':'Find support close to home.'}</h2></div><p>{es?'Explora las 19 ubicaciones del directorio de Pilsen. Confirma el programa y la disponibilidad de salud mental antes de acudir.':'Explore all 19 locations in Pilsen’s directory. Confirm the mental health program and availability before visiting.'}</p></div>
  <div className="location-filters" role="group" aria-label={es?'Filtrar ubicaciones':'Filter locations'}>{filters.map(([id,label])=><button key={id} aria-pressed={filter===id} onClick={()=>{setFilter(id);setExpanded(false);}} aria-controls="location-list">{label}</button>)}</div>
  <p className="results-count" role="status">{es ? `Mostrando ${visible.length} de ${matches.length} ubicaciones` : `Showing ${visible.length} of ${matches.length} locations`}</p>
  <div className="locations" id="location-list">{visible.map(l=><article key={l.name}>
   <p className="location-type">{l.comingSoon?(es?'PRÓXIMA APERTURA · LISTA DE ESPERA':'COMING SOON · WAITLIST'):l.kind==='counseling'?(es?'TERAPIA DE SALUD MENTAL':'MENTAL HEALTH COUNSELING'):l.kind==='residential'?(es?'SALUD MENTAL RESIDENCIAL':'MENTAL HEALTH RESIDENTIAL'):(es?'SEDE EDUCATIVA':'EDUCATIONAL SITE')}</p>
   <h3>{l.name}</h3><address>{l.address}</address>{l.note&&<p className="location-note">{l.note[locale]}</p>}
   <details className="location-hours"><summary>{es?'Horarios y disponibilidad':'Hours & availability'} <span aria-hidden="true">+</span></summary>
    {l.weekday?<><p>{es?'Lun–vie':'Mon–Fri'}: {l.weekday}<br/>{es?'Sábado':'Saturday'}: {l.saturday}</p><p>{l.comingSoon?(es?'Horario anunciado; apertura pendiente. Llama para consultar la lista de espera.':'Announced hours; opening pending. Call about the waitlist.'):l.kind==='residential'?(es?'Horario de oficina publicado; la atención residencial es de 24 horas.':'Published office hours; residential care is provided 24 hours a day.'):(es?'Horario de la sede; las citas dependen del programa y disponibilidad.':'Site hours; appointments depend on program and availability.')}</p></>:<p>{es?'Horarios no publicados en el directorio.':'Hours are not published in the directory.'}</p>}
   </details><Phone locale={locale} phone={l.phone}>{l.phone.slice(2).replace(/(\d{3})(\d{3})(\d{4})/,'$1-$2-$3')} <span aria-hidden="true">↗</span></Phone>
  </article>)}</div>{matches.length>3 && <button className="locations-toggle" aria-expanded={expanded} aria-controls="location-list" onClick={()=>setExpanded(!expanded)}>{expanded ? (es?'Ver menos ubicaciones':'Show fewer locations') : (es?`Ver todas las ubicaciones (${matches.length})`:`Show all locations (${matches.length})`)}</button>}<p className="directory-source">{es?'Fuente:':'Source:'} <a href="https://www.pilsenwellnesscenter.org/en/locations">{es?'Directorio oficial de Pilsen':'Pilsen’s official directory'}</a> · {es?'La atención residencial tiene un proceso de ingreso distinto. La escuela se incluye como referencia de la red.':'Residential care has a separate admission process. The school is included as a network reference.'}</p>
 </div></section>;
}
