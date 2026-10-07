# QA — revisión v2, 6 de octubre de 2026

- Build de producción Next.js 16.3.8 y TypeScript: aprobados.
- Cuatro pruebas existentes de validación, privacidad de medición y aceptación/error de API: aprobadas.
- Directorio en navegador: 19 entradas por defecto; filtro Suburbios devuelve 6; Residenciales devuelve 2; Todas restaura 19.
- Móvil inglés 390×844: primer campo termina aprox. en 578 px, barra empieza en 763 px. Español 320×667: campo termina en 548 px, barra empieza en 601 px. Sin desbordamiento horizontal en ambas vistas.
- Header: PNG original, sin filtro ni recoloración. La copia local preserva el original. Paleta observada en el CSS oficial.
- Contactos: número general correctamente etiquetado; teléfonos reales de cada sede. Crisis separado y enlaces de llamada/SMS 988.
- Color: azul sobre durazno, azul sobre beige y blanco sobre azul comprobados numéricamente en esta revisión. No constituye certificación completa WCAG.
- No se ha probado con un receptor real, lector de pantalla ni todos los navegadores. No hay despliegue remoto. El formulario sigue desactivado en preview; no se enviaron datos reales.
- Fotos reales pendientes. No se presenta stock como personal de Pilsen.

Texto pequeño sobre durazno usa #252E3D para contraste; títulos y logo conservan el azul de marca. Ambos logos coinciden por SHA256 con los originales aportados.

## Actualización de contacto e imágenes

Confirmado por el usuario: línea principal de citas de EE. UU. 844-211-4325 (tel:+18442114325), que sustituye al número general en los CTA. WhatsApp: +1 872-308-0000, con el enlace y texto proporcionados, sin datos del formulario. Botón junto al formulario, en el cierre y en la barra móvil. Se integra whatsapp_click como interacción separada y sin PII, sujeta al mismo consentimiento; nunca se contabiliza como solicitud recibida.

Las dos imágenes generadas están integradas en hero y Why Pilsen. Son escenas ilustrativas de IA, no personal, pacientes ni sedes reales. Se retiraron los rótulos de fotografías pendientes y se actualizaron los textos alternativos. Next Image sirve versiones optimizadas; PNG originales conservados. La recepción del formulario sigue pendiente. Esta actualización prevalece sobre notas anteriores de imágenes o teléfono pendientes.

## Ajustes UX posteriores
Build, TypeScript y las cuatro pruebas existentes aprobados. Navegador: tres sedes iniciales, Ver todas muestra 19; Suburbios reinicia a tres de seis. Se verificó ausencia de sección de crisis en ambos idiomas, orden de próximos pasos antes de servicios y texto de espera español conservado. Vista móvil 390px sin desbordamiento horizontal en español. Formulario aún desactivado por falta de receptor real. WhatsApp secundario fuera de la barra móvil.


Animación mínima: CSS sin dependencias ni JavaScript adicional; entrada de fotos 650 ms, transiciones de controles 180 ms y elevación de sedes 3 px solo con puntero preciso. Todo condicionado a prefers-reduced-motion: no-preference. Build y tipos aprobados; navegador confirma animación y formulario visible. No se simuló la preferencia de movimiento reducido en navegador.

