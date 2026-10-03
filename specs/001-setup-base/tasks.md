# TASKS 001 — Setup Base (checklist SSD)

> Ejecutar en orden. Marcar `[x]` solo si verificación pasa. No pasar a SPEC 002 sin `ng build` ok.

## T1 — Deps Tailwind
- [ ] `npm i -D tailwindcss@4 @tailwindcss/postcss postcss`
- [ ] Crear `.postcssrc.json` con plugin `@tailwindcss/postcss`
- [ ] Verificación: `npx tailwindcss --version` responde v4

## T2 — Estilos globales + tokens
- [ ] `src/styles.css`: `@import "tailwindcss";` + `@theme` con `brand-dark/brown/beige/accent` + fonts
- [ ] Import fonts Poppins/Jost en `src/index.html`
- [ ] Verificación: `npm run build` compila estilos sin error PostCSS

## T3 — index.html ES + SEO base
- [ ] `lang="es"`, `<title>Espacios DFR | Diseño, Fabricación y Restauración</title>`, meta description, favicon sigue
- [ ] Verificación: `ng serve` → view-source muestra es/title

## T4 — Estructura carpetas
- [ ] Crear `src/app/layout/header/`, `footer/`, `src/app/features/home|about|blog|contact/`, `src/app/shared/ui/section-title/`, `src/app/core/`
- [ ] Verificación: `tree src/app` coincide con PLAN §3

## T5 — Header
- [ ] `header.ts` standalone + `header.html` Tailwind: logo ESPACIOSDFR, nav Home/About/Reciente/Contact (`routerLink`), CTA WhatsApp `https://wa.me/573014667781`, mobile `@if(menuOpen)` hamburguesa con `signal`
- [ ] Aprendizaje: `RouterLink`, `signal`, `@if`
- [ ] Verificación: click nav cambia ruta, mobile <640px muestra menú

## T6 — Footer
- [ ] `footer.ts` + `footer.html`: 4 col (marca, recursos, empresa, redes con links Facebook/Instagram origen), copyright
- [ ] Verificación: visible en todas las rutas

## T7 — Shell + rutas lazy
- [ ] Reemplazar `src/app/app.html:1-342` demo por `<app-header/><router-outlet/><app-footer/>`
- [ ] `src/app/app.ts`: imports Header, Footer, RouterOutlet
- [ ] `src/app/app.routes.ts`: 4 lazy + wildcard (ver PLAN §4)
- [ ] Placeholders home/about/blog/contact mínimos con `<h1>` + `<p>`
- [ ] Verificación: `/`, `/about`, `/blog`, `/contact` 200, cero `pill-group`/`angular-logo`

## T8 — Assets
- [ ] Copiar `img/carousel-*.png`, `img/about.png`, `logo` origen → `public/img/` (Angular 21 usa `public/`, ya configurado en `angular.json:21-26`)
- [ ] Verificación: `http://localhost:4200/img/about.png` carga

## T9 — Limpieza y build final
- [ ] Vaciar `src/app/app.css`, borrar demo `app.spec.ts` si falla
- [ ] `npm run build` + `npm start` ok, sin hex hardcodeado (`grep` PLAN §6)
- [ ] Responsive check 375px / 1280px

---
Con todo `[x]`, SPEC 001 done. Siguiente SPEC 002: Home real (hero + catálogo 9 + servicios 3 + cortinería 6...).
