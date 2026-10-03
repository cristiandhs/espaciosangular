# PLAN 002 — Home Real

Origen: `specs/002-home-real/spec.md`. Estado base: SPEC 001 con shell + Tailwind + rutas lazy.

## 1. Arquitectura
`src/app/features/home/` pasa de placeholder a composición:
```
home/
  home.ts (imports secciones, sin lógica)
  home.html (9 <section id> en orden)
  data/
    catalog.data.ts (9 items)
    curtains.data.ts (6 items)
    content.data.ts (hero 3, servicios 3, proceso 4, testimonios 4, galería 3)
  sections/
    hero/hero.ts|hero.html
    about/about-section.ts
    catalog/catalog.ts + catalog-card.ts
    services/services.ts
    curtains/curtains.ts + curtain-card.ts
    offer/offer.ts
    process/process-steps.ts
    testimonials/testimonials.ts
    gallery/gallery.ts
```
Reutilizar `app-shared SectionTitle` (`src/app/shared/ui/section-title/section-title.ts`) en cada sección con `eyebrow` + `title`.

## 2. Datos tipados (fuente única, sin HTML repetido)
- `catalog.data.ts`: `CatalogItem[]` con `image: '/img/prod-N.png'`, títulos/subtítulos exactos origen.
- `curtains.data.ts`: `CurtainItem[]` `/img/cort-N.png`.
- `content.data.ts`: `HERO_SLIDES`, `SERVICES`, `PROCESS_STEPS`, `TESTIMONIALS`, `GALLERY` (strings literales origen).
- Interfaces exportadas en `src/app/features/home/data/models.ts`.

## 3. Decisiones técnicas
- **Imágenes**: origen no está local. Paso previo: `git clone https://github.com/cristiandhs/pruebaweb` a temp y copiar `img/*.png` → `public/img/`. En código referenciar `/img/...`. `loading="lazy"` en todo salvo hero slide 1 (`eager`, `fetchpriority="high"`). `alt` obligatorio. Sin `NgOptimizedImage` en este SPEC (evita config `provideCloudinaryLoader`; se evalúa en SPEC 004 performance).
- **Hero carousel**: `signal current = signal(0)`, `next()/prev()/go(i)`, `@if` o `@for` con `[class.hidden]`, botones `aria-label`, dots. Sin `setInterval` autoplay en v1 (evita flakiness tests); autoplay opcional v2 con `effect` + cleanup.
- **Cards**: `@Input() item = input.required<CatalogItem>()` en `catalog-card`, igual cortinas/testimonios. Listas con `@for (item of items(); track item.title)`.
- **IDs ancla**: `catalogo, servicios, cortineria, proceso, testimonios, galeria` en `<section id>`. Header no cambia en este SPEC (anclas solo internas Home).
- **Estilos**: solo Tailwind + tokens (`bg-brand-dark`, `text-brand-brown`, etc.). Grids: `grid gap-6 sm:grid-cols-2 lg:grid-cols-3`, proceso `lg:grid-cols-4`.

## 4. Archivos a crear / modificar
Crear: `data/models.ts`, `data/*.data.ts`, las 9 secciones + 3 cards, `home.spec.ts`, `sections/hero/hero.spec.ts`, `sections/catalog/catalog.spec.ts`.
Modificar: `features/home/home.ts` (imports), `home.html` (composición), nada en `app.routes.ts` ni layout.
Borrar: nada (placeholder home se reemplaza, no se borra archivo).

## 5. Tests (Vitest, lógica no snapshots)
- `catalog.spec.ts`: renderiza 9 cards desde datos.
- `hero.spec.ts`: `next()` avanza `0→1→2→0`, `prev()` retrocede.
- `home.spec.ts`: existen las 9 secciones por `id`.

## 6. Verificación
- `npm run build` ok; `npm test` 5+ tests ok.
- `grep -rn "#[0-9a-f]" src/app/features/home --include="*.html"` = 0.
- Manual `/`: 9 secciones en orden, carousel cambia, cero imágenes rotas (Network 200 o placeholder documentado en `public/img/README.txt`).

## 7. Riesgos
- `img/` origen con nombres distintos (`blog-11.png` vs `blog-1.png`): verificar con `ls` tras clone, mapear en datos.
- Carousel sin autoplay puede parecer estático vs origen: aceptado v1, documentar.
- Bundle CSS crece: vigilar `styles-*.css` <50kB.

---
Siguiente: `tasks.md` ejecutable T1-T10.
