import type { ReactNode } from 'react';
// Decorative editorial illustrations; all meaning remains in the adjacent headings.
const art: ReactNode[] = [
 <g key="calm"><path d="M88 125c-18-22-22-51 4-66 28-16 70-7 76 19 7 29-26 21-30 2-4-20 37-27 51-3 16 27-6 55-32 58"/><path d="M83 143c30-20 69-20 102 0M105 157h56"/><circle cx="218" cy="48" r="17" fill="#ce9072" stroke="none"/></g>,
 <g key="emotion"><path d="M101 133V97a43 43 0 0 1 86 0v21l-13 8v25M101 111l-13-9"/><path d="M120 97c-10-17 10-30 22-14 12-16 32-3 22 14l-22 22Z" fill="#ce9072" stroke="none"/><path d="m208 75 12-7m-16-9 5-12"/></g>,
 <g key="growth"><path d="M150 153V67M150 118c-35 0-53-18-51-42 30 0 51 17 51 42Zm0-24c35 0 52-20 49-43-30 1-49 20-49 43Z"/><path d="M113 154h74"/><circle cx="94" cy="47" r="13" fill="#ce9072" stroke="none"/></g>,
 <g key="family"><circle cx="111" cy="64" r="19" fill="#d0b195"/><circle cx="187" cy="64" r="19" fill="#ce9072"/><path d="M76 143v-23a35 35 0 0 1 55-29m91 52v-23a35 35 0 0 0-55-29"/><path d="M121 130c-11-18 13-29 28-12 15-17 39-6 28 12l-28 25Z"/></g>,
 <g key="youth"><path d="m153 43 13 30 33 4-25 23 7 33-28-16-29 16 6-33-25-23 34-4Z" fill="#d0b195"/><path d="M91 145c-2-25-13-42-31-51m153 49c5-25 16-38 29-43M76 54l8 9m139-21-5 12"/><circle cx="98" cy="113" r="5" fill="#ce9072" stroke="none"/></g>,
 <g key="talk"><path d="M81 49h98v60h-46l-27 23v-23H81Z" fill="#e3ded8"/><path d="M194 78h29v61h-24l-20 17v-17h-35v-17M101 71h55m-55 17h36"/><circle cx="205" cy="48" r="10" fill="#ce9072" stroke="none"/></g>
];
export function SupportArt({index}:{index:number}) {
 return <div className={`support-art support-art-${index}`}><svg viewBox="0 0 300 185" fill="none" stroke="#3a4559" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><ellipse cx="150" cy="97" rx="91" ry="74" fill="#ffffff70" stroke="none"/>{art[index]}</svg></div>;
}
