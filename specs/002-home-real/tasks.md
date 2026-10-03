# TASKS 002 — Home Real

> Orden estricto. Marcar `[x]` solo con verificación. No implementar fuera de `features/home/` + `public/img/`.

## T1 — Assets origen
- [ ] Clonar origen a temp y copiar: `carousel-1..3.png`, `about.png`, `prod-1..9.png`, `cort-1..6.png`, `blog-11.png`, `blog-2.png`, `blog-3.png` → `public/img/`
- [ ] Comando sugerido (PowerShell): `git clone https://github.com/cristiandhs/pruebaweb $env:TEMP\pruebaweb; Copy-Item $env:TEMP\pruebaweb\img\*.png public\img\ -Force; Get-ChildItem public\img`
- [ ] Verificación: `dir public\img` lista ≥20 png; documentar faltantes en `public/img/README.txt`

## T2 — Modelos + datos
- [ ] `data/models.ts`: `CatalogItem`, `CurtainItem`, `Testimonial`, `ProcessStep`, `HeroSlide`, `ServiceItem`, `GalleryItem`
- [ ] `data/catalog.data.ts` (9), `curtains.data.ts` (6), `content.data.ts` (hero 3, servicios 3, proceso 4, testimonios 4, galería 3) con textos exactos SPEC §2
- [ ] Verificación: `tsc --noEmit` implícito vía `npm run build`

## T3 — Hero carousel
- [ ] `sections/hero/hero.ts|hero.html`: `signal current`, `next/prev/go`, 3 slides `@for`, CTA WhatsApp, dots + botones `aria-label`, `id="hero"`
- [ ] Verificación: `hero.spec.ts`循環 0→1→2→0

## T4 — About + SectionTitle
- [ ] `sections/about/about-section.ts`: `SectionTitle` + `img/about.png` + 3 bullets + CTA
- [ ] Verificación: render texto `Hacemos realidad tus ideas`

## T5 — Catálogo
- [ ] `catalog-card.ts` (`input.required<CatalogItem>`) + `catalog.ts` grid `id="catalogo"` con `@for track title`
- [ ] Verificación: `catalog.spec.ts` cuenta 9

## T6 — Servicios + Cortinería
- [ ] `services.ts` 3 cards `id="servicios"`; `curtain-card.ts` + `curtains.ts` 6 cards `id="cortineria"`
- [ ] Verificación: 3 + 6 nodos en DOM

## T7 — Oferta + Proceso
- [ ] `offer.ts` banner `10% OFF` + 3 items + CTA; `process-steps.ts` 4 pasos numerados `id="proceso"`
- [ ] Verificación: texto `Mega Oferta` presente

## T8 — Testimonios + Galería
- [ ] `testimonials.ts` 4 cards `id="testimonios"`; `gallery.ts` 3 imgs `id="galeria"` con `loading="lazy"`
- [ ] Verificación: 4 + 3 nodos

## T9 — Composición Home
- [ ] `home.ts` importa 9 secciones + `home.html` las ordena con `<section id>`; un solo `h1` (hero)
- [ ] Verificación: `home.spec.ts` encuentra 9 ids

## T10 — Build final
- [ ] `npm run build` + `npm test` ok; grep hex en `features/home/*.html` = 0; check responsive 375/768/1280
- [ ] Verificación: `/` muestra 9 secciones sin 404 imágenes

---
Done = SPEC 002 completa. Siguiente SPEC 003: About/Blog/Contact completos.
