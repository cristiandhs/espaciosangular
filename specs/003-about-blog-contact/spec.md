# SPEC 003 — About / Reciente / Contact completos

> SSD flexible. Solo especificación. Requiere aprobación antes de `plan.md`.

## 1. Objetivo
Completar las 3 rutas placeholder de SPEC 001 con contenido real origen, eliminando lorem del template y dejando Contact funcional sin backend (vía WhatsApp). Mantener colores marca y aprender `ReactiveForms`, `router`, reutilización.

## 2. Contenido origen verificado
### About (`/about`)
- Hero: `img/about.png`, eyebrow `quienes somos`, H1 `Hacemos realidad tus ideas`, texto Transformamos ideas... + CTA `!COTIZA TU PROYECTO!` (apunta a WhatsApp, en origen `href=""` roto — corregir).
- Métricas `Nuestros Resultados / Métricas que respaldan nuestro trabajo`: +600 Proyectos realizados, +90 Clientes satisfechos, +7 Años experiencia, 4.4/5 Calificación promedio (con sus descripciones).
- `Nuestra Esencia / Misión & Visión`: Misión y Visión literales origen + 3 valores: Calidad, Pasión, Compromiso (textos literales).

### Blog (`/blog`, hoy lorem)
Origen tiene filler template: `Dolor justo sea kasd...`, `Tours & Travel`, `John Doe`, `Categories Web Design 150...`, `Tag Cloud`. **Decisión: no migrar lorem.** Reconversión a `Reciente / Proyectos` real:
- Reutilizar `GALLERY` (proyecto 1..3, `blog-11.png, blog-2.png, blog-3.png`) + CTA WhatsApp por proyecto.
- BannerVacío explica que el blog template se reemplaza por trabajos recientes (evita contenido falso y mejora SEO).
- Fuera: paginación Previous/1/2/3, sidebar categorías/tags, buscador Destination/Duration (era de travel template, sin sentido aquí).

### Contact (`/contact`)
Origen casi vacío: `Contact / Cuentanos que duda tienes` + `Enviar Mensaje` (form POST a `mail/` PHP que no funcionará en Netlify/Angular). Reconstrucción:
- Info cards: email `espaciosdfr@gmail.com` (origen tiene typo `esapaciosdfr@` en contact — corregir), WhatsApp `https://wa.me/573014667781`, Instagram/Facebook origen, ubicación Barranquilla.
- Formulario Angular `ReactiveForms`: nombre, teléfono, tipo proyecto (select: Fabricación, Restauración, Cortinería, Otro), mensaje. Validación required + teléfono pattern. Submit construye `https://wa.me/573014667781?text=...` encoded y abre en nueva pestaña. Sin backend.
- Mensaje éxito con `@if(sent())`.

## 3. Requisitos
### Funcionales
- RF1 About: las 3 bloques (hero, métricas 4, misión/visión + 3 valores) con textos literales.
- RF2 Blog: título `Reciente`, subtítulo trabajos, grid 3 proyectos con imagen/título/CTA; cero lorem (`grep -i "dolor justo\|tours & travel\|john doe" src/app = 0`).
- RF3 Contact: form válido → abre WhatsApp con texto; inválido → errores inline, sin abrir.
- RF4 CTA rotos origen (`href=""`, `service.html`) → `routerLink` o WhatsApp reales.
- RF5 `page-header` reutilizable (eyebrow + H1 + breadcrumb Home / Página) para las 3 páginas.

### No funcionales
- RNF1 Standalone + lazy existentes (no tocar `app.routes.ts` salvo títulos). `signals` para `sent`, `errors`.
- RNF2 `ReactiveFormsModule` solo en Contact (import local, no global).
- RNF3 Tokens marca, grids responsive, `alt` + `loading=lazy` (salvo about hero eager).
- RNF4 Accesibilidad: `label for`, `aria-invalid`, un `h1` por página.
- RNF5 Tests: contact form inválido no abre, válido sí; about render métricas 4; blog render 3 sin lorem.

## 4. Aprendizaje
- `ReactiveForms`: `FormGroup`, `Validators`, `formControlName`.
- `RouterLink` vs `href` externo; por qué el form PHP origen no sirve en SPA.
- Reutilizar `SectionTitle` + nuevo `PageHeader`; no duplicar headers.

## 5. Aceptación
- [ ] `/about` muestra hero + 4 métricas + misión/visión + 3 valores.
- [ ] `/blog` muestra 3 proyectos reales, cero lorem.
- [ ] `/contact` form vacío bloquea submit; completo abre `wa.me` con texto encoded (mock `window.open` en test).
- [ ] `npm run build` + `npm test` ok.

## 6. Fuera
- Envío email real, backend, mapa Google, captcha, i18n (SPEC 004+).

---
Si apruebas, genero `plan.md` + `tasks.md`.
