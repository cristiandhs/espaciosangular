# TASKS 003 — About / Blog / Contact + fixes

## T0 — Fix colores repo (bloqueante visual)

- [ ] `src/styles.css`: `--brand-dark #212121`, `--brand-brown #5aadfd`, `--brand-beige #f4faec`, `--brand-accent #5aadfd`, `--brand-accent-dark #3f8fd1`, `body bg #F3F3F3 color #656565`
- [ ] Verificación: `npm run build`, botón hero pipeta `#5aadfd` como `btn-primary` origen

## T0b — Fix carousel autoplay

- [ ] `hero.ts`: `autoplay = signal(true)`, `interval 6000` en `ngOnInit`, `clearInterval` en `ngOnDestroy`, `pause()/resume()` en hover; `hero.html`: overlay `bg-black/50`, botones visibles
- [ ] `hero.spec.ts`: con fake timers avanza solo
- [ ] Verificación: `/` rota solo cada 6s, click/dots siguen funcionando

## T1 — PageHeader reutilizable

- [ ] `shared/ui/page-header/page-header.ts`: `inputs eyebrow, title, crumb`, bg `/img/carousel-2.png` + overlay como `.page-header` origen
- [ ] Verificación: render en las 3 páginas

## T2 — About real

- [ ] `features/about/about.data.ts`: métricas 4, misión/visión, valores 3 (textos SPEC §2)
- [ ] `about.ts`: hero `about.png` + CTA WhatsApp + métricas grid + misión/visión + valores
- [ ] Verificación: 4 métricas en DOM

## T3 — Blog → Reciente real

- [ ] `blog.ts`: reutiliza `GALLERY`, grid 3 + CTA WhatsApp, título Reciente, texto sin lorem
- [ ] Verificación: `grep -ri "dolor justo|tours" src/app` = 0, 3 cards

## T4 — Contact funcional

- [ ] `contact.ts|contact.html`: `ReactiveFormsModule`, campos nombre/teléfono/tipo/mensaje, errores inline, `sent()` `@if`, info cards (email sin typo, WhatsApp, redes, Barranquilla)
- [ ] `contact.spec.ts`: inválido no llama `window.open`, válido sí con `wa.me.*text=`
- [ ] Verificación: submit manual abre WhatsApp encoded

## T5 — Build final

- [ ] `npm run build` + `npm test` ok; check responsive + un `h1` por página + nav sin `service.html` rotos
