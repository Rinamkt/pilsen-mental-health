# Pilsen Wellness Center — Mental Health

Landing bilingüe Next.js + TypeScript, lista para un repositorio independiente. Sin bibliotecas de UI, fuentes remotas, stock, píxeles ni servicios de seguimiento instalados. CSS propio y componentes interactivos ligeros. Existe una vista pública de revisión en https://pilsen-mental-health.vercel.app. El formulario permanece desactivado y la página usa noindex. Las fotos integradas son ilustraciones generadas con IA.

## Revisión visual v2

La corrección del usuario reemplaza la paleta interpretada y el límite original de cuatro sedes. Paleta extraída del CSS visible del sitio: azul `#3A4559`, durazno `#CE9072`, beige `#E3DED8`, arena `#D0B195`, blanco `#F5F5F5`. Titulares serif en cursiva y logotipos originales. No quedan verdes ni filtros monocromáticos en el diseño.

El directorio conserva las 19 ubicaciones y muestra tres inicialmente, con un botón para ver todas, con filtros Chicago, Suburbios, Terapia y Residenciales. La escuela está identificada como educativa, no como consulta de salud mental. El directorio se verificó ficha por ficha; no se extrapoló el pie general de horarios. Las sedes residenciales diferencian horario de oficina y atención de 24 horas.

## Instalar y ejecutar

Node.js 22.12+ y pnpm 11.19.0 (el mismo de la verificación).

```sh
corepack enable
corepack prepare pnpm@11.19.0 --activate
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

En Windows: `Copy-Item .env.example .env.local`. Si no tienes Corepack, instala pnpm con `npm install -g pnpm@11.19.0`.

- http://localhost:3000/en/mental-health
- http://localhost:3000/es/salud-mental
- `/` redirige al inglés. No hay selector de idioma ni menú.

```sh
pnpm test
pnpm build
pnpm check
pnpm start
```

El lockfile fija la resolución usada; conservarlo en GitHub. `pnpm build` genera el servidor y páginas optimizadas; no subir `.next` ni `node_modules`.

## GitHub y Vercel

1. Sube **el contenido de esta carpeta** a la raíz de un repositorio nuevo. Si la conservas dentro de otro repositorio, el Root Directory de Vercel será `pilsen-mental-health`.
2. En Vercel, importa ese repositorio, selecciona Next.js y Node 22. Comando de instalación: `pnpm install --frozen-lockfile`; build: `pnpm build`; output predeterminado de Next.js.
3. Configura las variables de `.env.example` en Vercel. Para cada entorno usa su origen exacto como `SITE_URL`. No incluyas ruta ni barra final.
4. Mantén `SITE_INDEXABLE=false` en previews y mientras existan pendientes. Las dos páginas llevan noindex; robots bloquea rastreo y el sitemap permanece vacío.
5. Tras completar los pendientes y validar recepción real, configura el dominio final, `SITE_URL` y `SITE_INDEXABLE=true`; vuelve a desplegar. Canonical, hreflang y sitemap se generan con ese origen. Las variables públicas y el modo del formulario se aplican al compilar: requieren rebuild.
6. Prueba ambas URLs en el dominio publicado; la configuración de backend requiere el mismo origen. El workflow `.github/workflows/verify.yml` ejecuta pruebas, build y chequeo de tipos.

Repositorio: https://github.com/Rinamkt/pilsen-mental-health. Vista de revisión desplegada en Vercel; los pushes a main actualizan esa vista.

## Dónde completar los datos

| Dato | Archivo o variable | Estado |
|---|---|---|
| Teléfono visible | `src/lib/site.ts`; variables `NEXT_PUBLIC_APPOINTMENT_PHONE` y `NEXT_PUBLIC_APPOINTMENT_PHONE_DISPLAY` para reemplazarlo | Se usa 773-579-0832, rotulado Servicios e información. No se afirma que sea línea dedicada de citas. |
| Directorio completo | `src/lib/locations.ts` | 19 ubicaciones verificadas: 16 de terapia incluyendo Joliet próxima apertura, 2 residenciales y 1 escuela claramente identificada. Direcciones y teléfonos completos; horarios de escuela no publicados. |
| Fecha de apertura de Joliet | `src/lib/locations.ts` y textos | Sin fecha prometida. No cambiar `comingSoon` sin confirmación. |
| Fotografías | `public/images/` y `site.images` | Dos espacios de fotografía rotulados en CSS, sin representar instalaciones reales. Sustituir por archivos locales autorizados. |
| Textos alternativos | `src/lib/copy.ts`, `imageAlt` | Adaptar al contenido real de cada foto en ambos idiomas. |
| Textos y FAQs | `src/lib/copy.ts` | Sin precio, tiempo de respuesta ni disponibilidad inventados. |
| Privacidad | Enlaces en `Contact.tsx` y `Landing.tsx` | Apuntan al aviso oficial por idioma; confirmar que cubre esta landing y su receptor. |
| Dominio / SEO | `SITE_URL`, `SITE_INDEXABLE` | Noindex de forma predeterminada. |
| Recepción segura | `INTAKE_*` | Desactivada hasta configurar. |

Para las fotografías, usar WebP o AVIF, dimensiones aproximadas de 1200×800, peso ideal <180 KB. Hero: retrato ambiental de personal real con autorización. Comunidad: recepción/equipo sin pacientes identificables. Sede: fachada real de una sede confirmada. Los espacios de reserva no son fotografías ni instalaciones reales. La imagen principal queda después del formulario en móvil para priorizar el primer campo. Se usan los dos PNG aportados por el usuario, sin filtros, recoloración ni modificación de los originales. El logo horizontal conserva el blanco sobre durazno; el logo cuadrado conserva su fondo azul. El encuadre del header reduce únicamente el espacio transparente mediante CSS.

## Formulario: integración real, sin éxito simulado

Formulario de dos etapas: servicio, sede preferida, para quién se solicita atención y Medicaid (sí/no); después nombre y apellido, teléfono, correo obligatorio, horario preferido opcional y aceptación obligatoria de privacidad. Sin datos clínicos, campos ocultos de campaña ni almacenamiento del formulario en navegador. La solicitud viaja en POST JSON a `/api/appointment`, nunca en la URL.

En el estado entregado, el botón de envío está desactivado y se muestra el aviso de vista previa. La API responde 503 y no envía ni guarda datos. La línea principal de citas y los teléfonos de las 19 sedes son marcables. La sección de crisis se retiró a petición del usuario.

Para activar:

1. Configura un receptor HTTPS aprobado para estos datos, su política de retención y acceso. No basta con un webhook público cualquiera. Incluye límites de solicitudes y protección contra abuso en Vercel/WAF y en el receptor antes de habilitar captación. No añadir capturas de sesión ni logging del cuerpo.
2. El receptor debe aceptar `POST` con `Authorization: Bearer <INTAKE_TOKEN>` y JSON `{ "name": "...", "phone": "...", "medicaid": "yes|no", "location": "guidance o nombre de sede permitido", "service": "mental-health|other" }`.
3. Debe devolver HTTP 2xx y `{ "accepted": true }` **únicamente después de guardar o aceptar durablemente la solicitud**. Una respuesta 200 sin ese indicador se trata como fallo. Implementar deduplicación en el receptor ante reintentos y respuestas perdidas.
4. Define `INTAKE_ENDPOINT`, `INTAKE_TOKEN`, `SITE_URL` y `INTAKE_ENABLED=true` y recompila. El token se usa solo en servidor.
5. Prueba con datos ficticios autorizados: recepción, rechazo del receptor, timeout, reintento y mensaje de éxito. El éxito dice solicitud recibida; nunca cita reservada.

La API aplica origen exacto, tipo de contenido, límite de 2 KB incluso en streaming, validación de campos permitidos, HTTPS, sin redirects al receptor, timeout y `Cache-Control: no-store`. No escribe registros del cuerpo ni devuelve detalles internos. No incorpora base de datos ni cuenta de correo. Las pruebas de aceptación con un receptor real quedan pendientes de configuración.

## Tracking sin datos del formulario

Consulta `docs/TRACKING.md`. Se entrega un adaptador local desactivado por defecto, sin GA/GTM/Ads instalados. Solo expone nombres de eventos de una lista cerrada tras consentimiento explícito. No mezcla clics y solicitudes, ni mide llamadas como citas. No se afirma cumplimiento legal automático.

## Archivos principales

- `src/app/en/mental-health/page.tsx`, `src/app/es/salud-mental/page.tsx`: rutas gemelas.
- `src/app/en/layout.tsx`, `src/app/es/layout.tsx`: idioma HTML correcto por ruta.
- `src/components/Landing.tsx`: composición común.
- `src/components/Contact.tsx`: formulario y enlaces telefónicos.
- `src/app/globals.css`: diseño responsive, foco visible, reduced-motion y barra móvil.
- `src/lib/site.ts`, `copy.ts`: datos y copy por idioma.
- `src/lib/locations.ts`, `src/components/Locations.tsx`: directorio completo y filtros locales sin tracking de filtros.
- `src/app/api/appointment/route.ts`: contrato del receptor.
- `docs/BRIEF.md`: referencia local original, excluida del repositorio público.
- `docs/SOURCES.md`: fuentes y decisiones.
- `docs/QA.md`: verificaciones realizadas y límites.

Accesibilidad: etiquetas visibles, orden de encabezados, skip link, detalles nativos operables por teclado, estados anunciados, foco visible, contraste y controles de al menos 44 px. No es una certificación WCAG; revisar con tecnologías de asistencia antes de publicar.

## Actualización de contacto e imágenes

Confirmado por el usuario: línea principal de citas de EE. UU. 844-211-4325 (tel:+18442114325), que sustituye al número general en los CTA. WhatsApp: +1 872-308-0000, con el enlace y texto proporcionados, sin datos del formulario. WhatsApp secundario junto al formulario y en el cierre. La barra móvil prioriza solicitar cita y llamar. Se integra whatsapp_click como interacción separada y sin PII, sujeta al mismo consentimiento; nunca se contabiliza como solicitud recibida.

Las dos imágenes generadas están integradas en hero y Why Pilsen. Son escenas ilustrativas de IA, no personal, pacientes ni sedes reales. Se retiraron los rótulos de fotografías pendientes y se actualizaron los textos alternativos. Next Image sirve versiones optimizadas; PNG originales conservados. La recepción del formulario sigue pendiente. Esta actualización prevalece sobre notas anteriores de imágenes o teléfono pendientes.

## Intake revision — 2026-10-15
This revision supersedes the earlier five-field contract. Required: name (full name), phone, email, service (mental-health|other), location (allowed location|guidance), careFor (self|family), medicaid (yes only, explicit checkbox). Optional callbackTime: any|morning|afternoon, Chicago time; defaults to any. Contact information belongs to the person completing the form, including family inquiries. Receiver integration must accept all these fields before activation. No data is sent to analytics. Submission remains disabled in preview. The main phone uses accessible text 844-211-HEAL and visible numeric equivalent 844-211-4325, both within the same tel link.

## Medicaid messaging revision — 2026-10-16
Medicaid audience is communicated in the hero, form introduction and trust row. The checkbox and warning panel are removed. The API no longer collects or infers Medicaid status: remove medicaid from the receiver contract. Coverage is discussed with the team. This supersedes the October 15 confirmation requirement.

## Editorial structure — 2026-10-23
Hero with direct appointment anchor, trust row, benefits, Why Pilsen, next steps, FAQs, full intake, care topics, locations and closing CTA. One form only; mobile sticky request and call remain available. SEO titles and descriptions localized. Intake remains disabled pending approved receiver.

## Two-step intake
Care preferences (service, location, self/family, Medicaid yes/no with no default), followed by contact details and optional callback time. Both Medicaid answers accepted. Back retains values in mounted controls; no storage, tracking or network request on Continue/Back. Only final submission uses the approved receiver. Receiver contract again requires medicaid: yes|no. Preview allows navigation but disables final submission.

## Visual refresh — October 23, 2026
- Portrait hero: `public/images/counseling-portrait-v2.png`, an AI-generated fictional scene, not actual staff, patients, premises or a testimonial. Existing panoramic photo reused beside intake. Both languages share the layout.
- Six lightweight decorative SVG illustrations in `SupportArt.tsx`; meaning remains in visible headings. Motion honors reduced-motion preferences. Images use Next Image responsive loading.
- Joliet remains a regular card in the full location directory, without a separate promotional highlight. Official source still says Coming Soon. Since the October 27 approved revision, it is selectable as a preference labeled coming soon, not as a confirmed available appointment. Source checked: https://www.pilsenwellnesscenter.org/en/locations (2026-10-23).
- Design references: https://www.charliehealth.com/our-programs/adult-mental-health (visual variety only); https://www.nngroup.com/articles/photos-as-web-content/ (relevant imagery rather than decorative stock overload).

## Current intake contract — October 27, 2026
The final JSON now requires `privacyAccepted: true`. A missing, false or string value is rejected server-side. The receiver must support this additional field before intake activation. Joliet is a permitted location preference with a coming-soon label. Service IDs remain `mental-health` and `other`, with the approved Medicaid/other-insurance wording. Both Medicaid answers remain permitted. Supersedes earlier historical field descriptions.

The October 27 copy revision follows the supplied Lucia document in both languages, including four benefits, eight FAQs, Medicaid required, community history, medical disclaimer and expanded services. The user explicitly confirmed the next-business-days response statement and that some sites have no waiting list. No precise appointment or response date is promised.
