# SPEC 001 — Setup Base: Tailwind + Layout + Tokens de Marca

> Metodología SSD flexible. Este archivo es la especificación. No contiene código. Requiere aprobación antes de `plan.md` y `tasks.md`.

## 1. Objetivo
Migrar la landing actual (https://espaciosdfr.netlify.app/, origen https://github.com/cristiandhs/pruebaweb) a Angular 21 con Tailwind, creando la base reutilizable para el resto de la migración y sirviendo como guía de aprendizaje de Angular moderno.

## 2. Contexto
- Origen: HTML estático multipágina (`index.html`, `about.html`, `blog.html`, `contact.html` + `css/`, `js/`, `img/`, `lib/`, template HTML Codex).
- Destino: `webespaciosdfr` Angular 21 standalone (`src/app/app.ts`, `src/app/app.routes.ts` vacío, `src/styles.css` vacío, `src/index.html` base).
- Secciones origen a migrar después: hero carousel (3 slides), quiénes somos, catálogo (9 productos), servicios (3), cortinería (6 tipos), oferta 10% OFF, proceso (4 pasos), testimonios (4), galería (3), footer + páginas About / Reciente-Blog / Contact.

## 3. Alcance de este SPEC (solo base)
Incluye:
- Instalación y configuración Tailwind v4 (`@tailwindcss/vite` + `@tailwindcss/postcss` o plugin Vite según Angular 21) en `src/styles.css`.
- Definición de tokens de marca en CSS (colores, tipografía, spacing) extraídos del sitio actual. No rediseño todavía, solo preservar colores.
- Estructura de carpetas base según buenas prácticas:
  ```
  src/app/core/
  src/app/shared/ui/
  src/app/layout/ (header, footer, layout-root)
  src/app/features/home/
  src/assets/ (migración de img/ origen)
  ```
- `app.routes.ts` con lazy loading mínimo: `'' -> home`, placeholders `about`, `blog`, `contact`.
- `app.html` como shell layout: `<app-header> + <router-outlet> + <app-footer>`.
- Verificación: `ng build` y `ng serve` ok, responsive base.

Fuera de alcance:
- Migrar contenido completo de catálogo, cortinería, testimonios, etc. (serán SPEC 002+).
- Formularios, SEO avanzado, animaciones del carousel original (`lib/` jQuery/Owl).
- Nuevos features (cotizador, CMS, etc.) — se evalúan post-migración.

## 4. Requisitos
### Funcionales
- RF1: Tailwind disponible en cualquier componente vía utilidades.
- RF2: Header con logo ESPACIOSDFR + nav Home/About/Reciente/Contact + CTA WhatsApp `https://wa.me/573014667781`.
- RF3: Footer con 4 columnas origen (marca, recursos, empresa, redes) + copyright.
- RF4: Home placeholder renderiza sin errores vía router.
- RF5: Assets `img/*.png` origen copiados a `src/assets/img/` y referenciables.

### No funcionales
- RNF1: Angular moderno: standalone components, `signals` donde aplique, `inject()`, control flow `@if/@for`.
- RNF2: Sin jQuery / sin `lib/` origen. Solo Angular + Tailwind.
- RNF3: Preservar colores de marca. Mejoras de diseño permitidas solo en spacing/tipografía/consistencia.
- RNF4: `ng build --configuration production` sin errores, budgets por defecto `angular.json:32-46`.
- RNF5: `index.html` en español (`lang="es"`), título y meta description reales.

## 5. Tokens de marca (a confirmar en PLAN)
Extraer de `css/style.css` origen y capturas:
- `--brand-brown`, `--brand-beige`, `--brand-dark`, `--brand-accent` (CTA).
- Tipografías: heading vs body (origen usa Poppins/Jost aprox — confirmar).
- Regla: ningún componente hardcodea hex; usa `bg-brand-*`, `text-brand-*`.

## 6. Guía de aprendizaje (este SPEC enseña)
- Qué es standalone vs NgModule.
- Cómo Tailwind se integra vía `styles.css` + Vite.
- Cómo `app.routes.ts` + `RouterOutlet` reemplaza multipágina HTML.
- Cómo `layout/` evita duplicar header/footer (vs repetir HTML en cada `.html` origen).
- Ejercicio: modificar un token y ver propagación; agregar una ruta lazy.

## 7. Criterios de aceptación
- [ ] `npm run build` ok.
- [ ] `ng serve` muestra shell con header/nav/footer y home vacío responsive (mobile/desktop).
- [ ] Inspección: cero `style="color:#..."` hardcodeado fuera de `styles.css`.
- [ ] Rutas `/about`, `/blog`, `/contact` existen aunque sean placeholder (para no romper nav).
- [ ] README de SPEC con cómo validar.

## 8. Riesgos / Preguntas abiertas
- Tailwind v4 vs v3: confirmar versión compatible con `@angular/build:application` 21.1.
- Imágenes pesadas `img/*.png`: decidir optimizar a `webp` en SPEC 002, no aquí.
- Licencia HTML Codex: mantener atribución si se reutiliza CSS/texto (ver `LICENSE.txt` origen).

---
Siguiente paso SSD: si apruebas este `spec.md`, genero `plan.md` (pasos técnicos + archivos a tocar) y luego `tasks.md` (checklist ejecutable).
