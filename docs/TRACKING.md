# Medición preparada, desactivada por defecto

`src/lib/analytics.ts` no carga red, cookies, storage ni proveedores. Emite `pilsen:measurement` solo tras `setMeasurementConsent(true)`. La autorización vive en memoria y se reinicia al recargar. `setMeasurementConsent(false)` revoca. Ninguna llamada de consentimiento está incluida por defecto y no hay banner innecesario mientras no hay tracking.

Contrato: `event.detail` contiene exclusivamente `{ event: "request_received" }` o `{ event: "phone_click" }`. Se aplica lista cerrada en tiempo de ejecución. No recibe ni transmite nombre, teléfono, Medicaid, síntomas, ubicación, idioma, URL, parámetros de campaña, GCLID, email ni identificadores. El formulario emite solicitud solo después de respuesta confirmada del servidor; el botón, errores y modo preview no lo hacen. Crisis no genera eventos de marketing.

Integración pendiente: después de revisión de privacidad y aprobación de proveedor, conectar un listener a un sistema de medición autorizado y a un mecanismo de consentimiento. No instalar un pixel predeterminado: incluso un evento sin campos personales puede enviar IP, URL de salud, referrer o identificadores al cargar SDKs. Desactivar captura automática de páginas/formularios, enhanced conversions, remarketing, personalización de anuncios y session replay; verificar solicitudes de red antes de activar. El código entregado no configura GA4/Ads ni garantiza que una futura integración sea adecuada.

Mapeo sugerido para un sistema autorizado:
- `request_received`: conversión principal (solicitud, no cita confirmada).
- `phone_click`: interacción secundaria separada, nunca sumada a formularios ni llamada completada.
- Llamada relevante: solo con validación del sistema telefónico, integración futura independiente.

Costo por solicitud = inversión / solicitudes recibidas. Sin WhatsApp porque no se solicita como canal de esta landing. No producir eventos ficticios ni importar datos identificables en Analytics/Ads.

## Actualización de contacto e imágenes

Confirmado por el usuario: línea principal de citas de EE. UU. 844-211-4325 (tel:+18442114325), que sustituye al número general en los CTA. WhatsApp: +1 872-308-0000, con el enlace y texto proporcionados, sin datos del formulario. Botón junto al formulario, en el cierre y en la barra móvil. Se integra whatsapp_click como interacción separada y sin PII, sujeta al mismo consentimiento; nunca se contabiliza como solicitud recibida.

Las dos imágenes generadas están integradas en hero y Why Pilsen. Son escenas ilustrativas de IA, no personal, pacientes ni sedes reales. Se retiraron los rótulos de fotografías pendientes y se actualizaron los textos alternativos. Next Image sirve versiones optimizadas; PNG originales conservados. La recepción del formulario sigue pendiente. Esta actualización prevalece sobre notas anteriores de imágenes o teléfono pendientes.
