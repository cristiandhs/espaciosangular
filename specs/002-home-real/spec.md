# SPEC 002 — Home Real (migración contenido)

> SSD flexible. Solo especificación, sin código. Requiere aprobación antes de `plan.md`.

## 1. Objetivo
Migrar el contenido real de `https://espaciosdfr.netlify.app/` (origen `https://github.com/cristiandhs/pruebaweb`) al `Home` Angular, con componentes reutilizables, Tailwind + tokens marca, y como guía de aprendizaje (`@for`, `@Input`, `signals`).

## 2. Secciones (orden origen)
1. **Hero carousel** — 3 slides: Espacios/Diseño-Fabricación-Restauración, Cortinería, Muebles RH. Cada slide: eyebrow, título, CTA `¡COTIZA YA!` → `https://wa.me/573014667781`, imagen `img/carousel-1..3.png`. Mejora: sin jQuery/Owl, carousel Angular con `signal index` + botones prev/next + dots, autoplay opcional.
2. **Quiénes somos** — imagen `img/about.png`, eyebrow, título `Hacemos realidad tus ideas`, texto origen, bullets (Precios Competitivos, Mejores Servicios, Gran variedad) + CTA.
3. **Catálogo** — eyebrow `CATALOGO`, 9 cards: Sofás a medida, Poltronas, Comedores y sillas, Sofacamas, Camas, Tocadores, Muebles para TV, Escritorios, Clósets. Cada card: `img/prod-1..9.png`, título, subtítulo origen. Grid responsive 1/2/3.
4. **Servicios** — 3 cards: Fabricación a Medida, Restauración y Retapizado, Cortinera (texto origen).
5. **Cortinería** — 6 cards: Enrollable, Sheer Elegance, Onda Serena, Panel Japonés, Toldos, Motorizada. `img/cort-1..6.png`.
6. **Oferta** — banner `Mega Oferta 10% OFF si vienes de la pagina web`, lista 3 items, CTA `Obten ya`.
7. **Proceso** — 4 pasos: Consulta Inicial, Diseño y planificación, Fabricación, Entrega y Soporte (texto origen). Grid 1/2/4 numerado.
8. **Testimonios** — 4 cards: Rodrigo Herrera, Maria Rodriguez, Angel Martínez, Luis García (texto origen).
9. **Galería** — 3 items `img/blog-11.png, blog-2.png, blog-3.png` + label proyecto 1..3.

## 3. Requisitos
### Funcionales
- RF1: Todo el texto visible en origen está en Home (no lorem).
- RF2: CTA WhatsApp en hero, about, oferta.
- RF3: Imágenes vía `/img/*.png` (copiadas de origen a `public/img/`). Si falta alguna, placeholder con `bg-brand-beige` + alt, sin romper build.
- RF4: Carousel funciona con teclado (prev/next) y mobile swipe nativo (scroll-snap o botones, sin lib externa).
- RF5: Nav anclas: `#catalogo`, `#servicios`, `#cortineria`, `#proceso`, `#testimonios`, `#galeria` desde Home.

### No funcionales
- RNF1: Componentes standalone por sección en `src/app/features/home/sections/`: `hero`, `about`, `catalog`, `services`, `curtains`, `offer`, `process`, `testimonials`, `gallery` + datos en `*.data.ts` (arrays tipados) para practicar `@for` + `@Input`.
- RNF2: Solo clases Tailwind + tokens `bg-brand-*`, `text-brand-*`. Cero hex en HTML.
- RNF3: Responsive 375px/768px/1280px, imágenes `loading="lazy"` excepto hero (eager), `alt` descriptivo.
- RNF4: Accesibilidad: `aria-label` carousel, contraste CTA, headings jerárquicos (un solo `h1` hero).
- RNF5: `npm run build` ok, sin aumento >200kB inicial vs SPEC 001 salvo imágenes.

## 4. Datos (contratos TS)
```ts
interface CatalogItem { image: string; title: string; subtitle: string; }
interface CurtainItem { image: string; name: string; }
interface Testimonial { quote: string; name: string; role: string; }
interface ProcessStep { n: number; title: string; desc: string; }
```
Datos reales extraídos del fetch origen (títulos listados en §2). No inventar productos.

## 5. Aprendizaje Angular (cada sección enseña)
- Hero: `signal` + `@if` + eventos `(click)`.
- Catálogo/Cortinería: `@for (track)` + `@Input` en `card`.
- SectionTitle reutilizable con `input.required`.
- `NgOptimizedImage` vs `img` clásico (decidir en PLAN).

## 6. Aceptación
- [ ] Home muestra las 9 secciones en orden, textos iguales a origen.
- [ ] 9 catálogo + 6 cortinería + 4 testimonios + 4 proceso renderizan por `@for` desde datos, no HTML repetido.
- [ ] Carousel cambia de slide con botones/dots, sin consola errors.
- [ ] `npm run build` + `npm test` ok. Nuevos tests: catalog renderiza 9, hero cambia index.
- [ ] Lighthouse/manual: sin imágenes rotas (o placeholder documentado), responsive ok.

## 7. Fuera de alcance
- About/Blog/Contact completos (SPEC 003), formulario contacto, SEO avanzado, animaciones Owl originales, optimización webp (SPEC 004).

---
Si apruebas, genero `plan.md` + `tasks.md`.
