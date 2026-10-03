# PLAN 003 — About / Blog / Contact + fixes color y carousel

Origen: `specs/003-about-blog-contact/spec.md`. Hallazgos pre-plan (responden a tu reporte):

## 0. Diagnóstico color (por qué no se ve igual)
- Repo real usa `--primary: #5aadfd` (azul), `--dark: #212121`, `--secondary: #f4faec`, `body-bg #F3F3F3`, `body-color #656565` (`css/style.css:22-29`, `btn-primary:2370-2373`).
- `scss/style.scss` tiene `$primary: #7AB730` (verde template) pero está desactualizado; el CSS compilado manda (azul).
- Nosotros inventamos marrón `#6b4a2f` / acento `#c67a2e` desde las fotos. Por eso no coincide.
- Fix: remapear tokens existentes a colores repo (sin renombrar clases para no refactorizar todo):
  `--brand-dark: #212121`, `--brand-brown: #5aadfd`, `--brand-beige: #f4faec`, `--brand-accent: #5aadfd`, `--brand-accent-dark: #3f8fd1`, body `bg #F3F3F3`, texto `#656565`. Clase `font-display/body` ya es Poppins (coincide con repo).

## 1. Diagnóstico carousel (por qué parece no funcionar)
- Origen: Bootstrap `data-ride="carousel"` + autoplay + `carousel-caption rgba(0,0,0,.5)` (`index.html:95-135`).
- Nuestro `hero.ts` solo cambia con click (`next/prev/go`), sin autoplay. Si no haces click, parece quieto. Lógica `signal` está bien, falta autoplay + overlay como origen.
- Fix: `autoplay signal (default on)` + `effect(interval 6000 → next)` con cleanup `OnDestroy`, pausa en hover (`mouseenter/leave`), overlay `bg-black/50` como `.carousel-caption`, botones prev/next visibles siempre. Tests: autoplay avanza con `vi.useFakeTimers`.

## 2. Arquitectura 003
```
shared/ui/page-header/ (eyebrow, title, breadcrumb Home/Página, bg carousel-2 como origen .page-header)
features/about/about.ts (hero + metrics + mission/vision + values, datos en about.data.ts)
features/blog/blog.ts (grid GALLERY 3 + CTA, cero lorem)
features/contact/contact.ts|contact.html (ReactiveForms, info cards, sent signal)
```
Modificar: `styles.css` (tokens fix), `hero.ts|hero.html` (autoplay fix), `about.ts`, `blog.ts`, `contact.ts` (reemplazan placeholders), `public/img/README.txt` (añadir about-1.jpg si se usa, no necesario).

## 3. Contact form detalle
- `FormGroup { nombre [required, minLength 3], telefono [required, pattern ^[+0-9 ]{7,15}$], tipo [required], mensaje [required, minLength 10] }`
- `submit()`: si inválido → `markAllAsTouched`, return. Si válido → `window.open('https://wa.me/573014667781?text='+encodeURIComponent(...), '_blank')`, `sent.set(true)`.
- Test con mock `window.open`.

## 4. Verificación
- `npm run build` + `npm test` ok.
- Visual: botón primario `#5aadfd` igual a repo (pipeta), header/footer dark `#212121`.
- Hero: cambia solo cada 6s, pausa en hover, botones/dots funcionan, un solo `h1`.
- `grep -ri "dolor justo\|tours & travel\|john doe" src/app` = 0.
- Rutas `/about`, `/blog`, `/contact` con `h1` único y `PageHeader`.

## 5. Riesgos
- Cambiar tokens altera Home ya aprobado: aceptado, es corrección a colores repo.
- Autoplay con `effect` + SSR futuro: usar `setInterval` en `ngOnInit` + `clearInterval` en `ngOnDestroy` (simple, testeable).
