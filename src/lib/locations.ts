export type LocationKind = 'counseling' | 'residential' | 'school';
export type PilsenLocation = { name: string; address: string; phone: string; area: 'chicago' | 'suburbs'; kind: LocationKind; comingSoon?: boolean; weekday: string; saturday: string; note?: {en:string;es:string} };
// Verified against each location's SERVICES disclosure on the official directory, 2026-10-06.
const standard = {weekday:'9:00 AM – 8:00 PM', saturday:'9:00 AM – 5:00 PM'};
export const locations: PilsenLocation[] = [
 {name:'Pilsen / On Damen',address:'2259 South Damen Avenue, Chicago, IL 60608',phone:'+18722817575',area:'chicago',kind:'counseling',...standard},
 {name:'Pilsen / On Cermak',address:'2015 West Cermak Road, Chicago, IL 60608',phone:'+17738900645',area:'chicago',kind:'counseling',...standard,note:{en:'Counseling and psychosocial rehabilitation.',es:'Terapia y rehabilitación psicosocial.'}},
 {name:'California Pink Line',address:'2001 South California Avenue, 3rd Floor, Chicago, IL 60608',phone:'+18723550305',area:'chicago',kind:'counseling',...standard},
 {name:'Chicago Lawn',address:'6026 South Kedzie Avenue, Chicago, IL 60629',phone:'+18728950677',area:'chicago',kind:'counseling',...standard},
 {name:'Little Village',address:'3113 West Cermak Road, Chicago, IL 60623',phone:'+17732773413',area:'chicago',kind:'counseling',weekday:'6:00 AM – 8:00 PM',saturday:'7:00 AM – 5:00 PM'},
 {name:'McKinley Park',address:'3528 South Hermitage Avenue, Chicago, IL 60609',phone:'+18722486300',area:'chicago',kind:'counseling',...standard},
 {name:'Brighton Park',address:'2456 West 38th Street, Chicago, IL 60632',phone:'+17738237743',area:'chicago',kind:'counseling',...standard},
 {name:'Gage Park',address:'3232 West 55th Street, Chicago, IL 60632',phone:'+17734243060',area:'chicago',kind:'counseling',...standard},
 {name:'South Chicago',address:'2938 East 89th Street, Chicago, IL 60617',phone:'+18722280080',area:'chicago',kind:'counseling',...standard,note:{en:'Counseling, community support and Drop-In Center.',es:'Terapia, apoyo comunitario y Drop-In Center.'}},
 {name:'Administration Office',address:'2319 South Damen Avenue, Chicago, IL 60608',phone:'+17735790832',area:'chicago',kind:'counseling',weekday:'8:00 AM – 8:00 PM',saturday:'9:00 AM – 5:00 PM',note:{en:'The directory also lists counseling and the MHJJ youth program at this office.',es:'El directorio también ofrece terapia y el programa juvenil MHJJ en esta oficina.'}},
 {name:'Cicero / On Roosevelt',address:'5101 West Roosevelt Road, Cicero, IL 60804',phone:'+18723326077',area:'suburbs',kind:'counseling',...standard},
 {name:'Cicero',address:'1407 South 49th Court, Cicero, IL 60804',phone:'+17086835500',area:'suburbs',kind:'counseling',...standard},
 {name:'Berwyn',address:'2600 Ridgeland Avenue, Berwyn, IL 60402',phone:'+17083175926',area:'suburbs',kind:'counseling',...standard},
 {name:'Melrose Park',address:'1633 North 37th Avenue, Melrose Park, IL 60160',phone:'+17083437860',area:'suburbs',kind:'counseling',...standard},
 {name:'Stone Park',address:'1546 North Mannheim Road, Stone Park, IL 60165',phone:'+17084100856',area:'suburbs',kind:'counseling',weekday:'6:00 AM – 8:00 PM',saturday:'8:00 AM – 5:00 PM'},
 {name:'Joliet',address:'971 Collins St, Joliet, IL 60432',phone:'+17792424022',area:'suburbs',kind:'counseling',comingSoon:true,...standard},
 {name:'Wellness Inn',address:'2316 South Damen Avenue, Chicago, IL 60608',phone:'+17739276987',area:'chicago',kind:'residential',...standard,note:{en:'24-hour supervised residential care; community support and employment support. Call about admission requirements.',es:'Atención residencial supervisada las 24 horas, apoyo comunitario y laboral. Consulta los requisitos de ingreso.'}},
 {name:'Pilsen Inn Residential',address:'2635 West 23rd Street, Chicago, IL 60608',phone:'+17739271228',area:'chicago',kind:'residential',...standard,note:{en:'24-hour supervised mental health residential care. Admission is separate from a counseling appointment.',es:'Atención residencial supervisada de salud mental las 24 horas. El ingreso es distinto de una cita de terapia.'}},
 {name:'Latino Youth High School',address:'2001 South California Avenue, 2nd Floor, Chicago, IL 60608',phone:'+17736482130',area:'chicago',kind:'school',weekday:'',saturday:'',note:{en:'Educational site. Not listed as an outpatient mental health counseling location.',es:'Sede educativa. No figura como centro de consultas ambulatorias de salud mental.'}}
];
