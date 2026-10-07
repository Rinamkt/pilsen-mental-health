import type { ReactNode } from 'react';
export type IconName = 'emotion' | 'path' | 'conversation' | 'coverage' | 'calendar' | 'people';
const drawings: Record<IconName, ReactNode> = {
 emotion: <><path d="M29 51V40c-7-3-11-9-11-17a18 18 0 0 1 36 0v10l-6 3v15"/><path d="M28 25c0-5 7-6 9-1 3-5 10-3 10 2 0 5-10 11-10 11s-9-6-9-12Z"/><path d="M10 16 6 13M14 7l-1-5M56 9l4-4"/></>,
 path: <><path d="M12 53h18c18 0 20-18 3-18h-3c-17 0-14-17 1-17h15"/><path d="m40 11 8 7-8 7"/><circle cx="12" cy="53" r="4"/><path d="M53 40v10M48 45h10"/></>,
 conversation: <><path d="M9 13h33v23H24l-10 8v-8H9Z"/><path d="M46 24h9v25h-8l-8 7v-7H28v-8"/><path d="M18 22h15M18 28h9"/></>,
 coverage: <><rect x="9" y="15" width="46" height="35" rx="5"/><path d="M9 25h46M17 34h10M17 41h6m14-3 4 4 8-10"/></>,
 calendar: <><rect x="12" y="14" width="40" height="40" rx="5"/><path d="M12 26h40M23 9v11M41 9v11m-17 20 6 6 11-13"/></>,
 people: <><circle cx="32" cy="20" r="7"/><circle cx="13" cy="28" r="5"/><circle cx="51" cy="28" r="5"/><path d="M21 52V41a11 11 0 0 1 22 0v11M4 51v-8a9 9 0 0 1 13-8M60 51v-8a9 9 0 0 0-13-8"/></>
};
export function CareIcon({name}:{name:IconName}) {
 return <svg className="care-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{drawings[name]}</svg>;
}
