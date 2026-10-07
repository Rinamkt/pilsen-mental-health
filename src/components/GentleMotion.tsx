'use client';
import { useEffect } from 'react';
export function GentleMotion() {
 useEffect(()=>{
  const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!('IntersectionObserver' in window)) return;
  let observer:IntersectionObserver|undefined;
  const nodes=Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  const reset=()=>{observer?.disconnect();nodes.forEach(el=>el.classList.remove('reveal-pending'));};
  const setup=()=>{
   reset();if(preference.matches)return;
   observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('reveal-pending');observer?.unobserve(entry.target);}}),{threshold:0.12});
   nodes.forEach(el=>{if(el.getBoundingClientRect().top>window.innerHeight){el.classList.add('reveal-pending');observer!.observe(el);}});
  };
  setup();preference.addEventListener('change',setup);
  return ()=>{reset();preference.removeEventListener('change',setup);};
 },[]);
 return null;
}
