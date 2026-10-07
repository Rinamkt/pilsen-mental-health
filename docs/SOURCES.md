# Fuentes y decisiones — revisión v2, 6 de octubre de 2026

La instrucción posterior del usuario reemplaza el límite de cuatro ubicaciones y la reinterpretación de color del primer entregable. El resto del brief (Mental Health, formulario, dos idiomas, privacidad, sin navegación institucional) se conserva.

## Identidad

- Referencia principal visual: screenshot entregado por el usuario y los dos PNG originales en Desktop/Rina Marketing/pilsen.
- `public/images/pilsen-logo.png`: copia exacta de PWC-BlueNavyandWhiteLogo.png.
- `public/images/pilsen-square.png`: copia exacta de PWC Logo 256x256 px.png.
- Originales sin cambios. Sin filtros de color. El PNG horizontal conserva sus partes blancas sobre el header durazno.
- CSS visible del sitio oficial inspeccionado en navegador: pwc_blue rgb(58,69,89), pwc_sierra rgb(206,144,114), pwc_gray rgb(227,222,216), pwc_cedar rgb(208,177,149), pwc_white rgb(245,245,245). La fuente serif oficial es Lora; esta entrega usa Georgia local con peso y cursiva similares, sin descargas externas de fuentes.

## Ubicaciones

Fuente: https://www.pilsenwellnesscenter.org/en/locations

Se revisaron las 19 fichas y sus desplegables SERVICES. El archivo `src/lib/locations.ts` incluye direcciones, teléfonos y horarios de cada ficha. Hay 16 fichas con Mental Health Counseling (incluyendo Administración y Joliet futura), 2 residenciales y la escuela. La escuela no publica Counseling en su ficha, por lo que no se presenta como centro de terapia.

Counseling: Administration Office, On Damen, On Cermak, California Pink Line, Chicago Lawn, Little Village, McKinley Park, Brighton Park, Gage Park, South Chicago, Cicero, Cicero / On Roosevelt, Berwyn, Melrose Park, Stone Park, Joliet (coming soon).

Residencial: Wellness Inn y Pilsen Inn Residential; su atención es de 24 horas según la página de Mental Health. Los horarios que aparecen al desplegar la ficha se identifican como horarios de oficina.

Educativa: Latino Youth High School, piso 2; distinta de California Pink Line en piso 3. Horarios sin publicar.

Joliet: 971 Collins St, 779-242-4022. Próxima apertura y lista de espera; sin fecha ni disponibilidad inventada. Sus horas se rotulan como horario anunciado, no atención ya abierta.

## Mental Health y contacto

Fuente: https://www.pilsenwellnesscenter.org/en/services/mentalHealth

Verificados counseling para niños/adolescentes/adultos, equipo bilingüe, programas comunitarios y residenciales. Seguro privado: BCBS PPO, United Healthcare PPO y Cigna PPO en On Damen, Berwyn y Melrose Park; se pide confirmar cobertura individual. No se transcriben los servicios ajenos a salud mental del directorio.

Fuente: https://www.pilsenwellnesscenter.org/en

773-579-0832 se publica como Services & Information: se muestra con esa etiqueta. Sigue pendiente una línea dedicada de citas, configurable. No se promete que una solicitud en línea sea una reserva.

Crisis: 773-820-9003, verificado en página Mental Health. 988: https://988lifeline.org/; enlaces separados tel:988 y sms:988. No se mide crisis como conversión.

## Fotografía

No se aportaron fotografías verificadas de personal o sedes. Se mantienen dos espacios editoriales explícitos para fotos reales; no se usan fotografías de banco ni se describe a una modelo del sitio como terapeuta real. Las fotos futuras se configuran en site.images y se ajustan sus alt en ambos idiomas.

## Brief y límites

`BRIEF.md` conserva el archivo original como antecedente. En caso de contradicción, la corrección posterior del usuario y estas decisiones v2 prevalecen sobre las cuatro sedes y la paleta del primer entregable. No hay publicación remota ni integración de receptor activa.

## Actualización de contacto e imágenes

Confirmado por el usuario: línea principal de citas de EE. UU. 844-211-4325 (tel:+18442114325), que sustituye al número general en los CTA. WhatsApp: +1 872-308-0000, con el enlace y texto proporcionados, sin datos del formulario. Botón junto al formulario, en el cierre y en la barra móvil. Se integra whatsapp_click como interacción separada y sin PII, sujeta al mismo consentimiento; nunca se contabiliza como solicitud recibida.

Las dos imágenes generadas están integradas en hero y Why Pilsen. Son escenas ilustrativas de IA, no personal, pacientes ni sedes reales. Se retiraron los rótulos de fotografías pendientes y se actualizaron los textos alternativos. Next Image sirve versiones optimizadas; PNG originales conservados. La recepción del formulario sigue pendiente. Esta actualización prevalece sobre notas anteriores de imágenes o teléfono pendientes.

## Ajustes UX autorizados
Se retira la sección completa de crisis y su teléfono local: el usuario informa que Pilsen no presta ese servicio actualmente. Esta indicación prevalece sobre las fuentes anteriores. Los tiempos de espera permanecen sin cambios por indicación expresa. Se conservan las 19 ubicaciones con tres visibles inicialmente; los filtros reinician la vista compacta. Próximos pasos precede a servicios. WhatsApp queda secundario en formulario y cierre. No se dispone de receptor ni credenciales INTAKE: el formulario continúa desactivado, sin éxito simulado.
