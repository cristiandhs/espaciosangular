import { Component } from '@angular/core';
import { PageHeader } from '../../shared/ui/page-header/page-header';
import { SectionTitle } from '../../shared/ui/section-title/section-title';
import { Counter } from '../../shared/ui/counter/counter';
import { RevealDirective } from '../../shared/ui/reveal/reveal';
import { METRICS, MISSION, VALUES, VISION } from './about.data';
import { WHATSAPP } from '../home/data/content.data';

@Component({
  selector: 'app-about',
  imports: [PageHeader, SectionTitle, Counter, RevealDirective],
  template: `
    <app-page-header eyebrow="quienes somos" title="Hacemos realidad tus ideas" crumb="About" />
    <section class="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-2">
      <div class="grid grid-cols-2 gap-4">
        <img src="/img/carousel-1.png" alt="Proyecto mobiliario" loading="lazy" class="h-64 w-full rounded-2xl object-cover" />
        <img src="/img/carousel-3.png" alt="Proyecto muebles" loading="lazy" class="h-64 w-full rounded-2xl object-cover" />
      </div>
      <div>
        <p class="text-brand-body">Transformamos ideas en realidad a través del diseño, fabricación y restauración de mobiliarios. Ya sea que busques piezas únicas, renovar muebles antiguos o desarrollar proyectos personalizados, nos encargamos de cada detalle para ofrecerte calidad y estilo</p>
        <a [href]="whatsapp" target="_blank" rel="noopener" class="mt-4 inline-block rounded-full bg-brand-accent px-8 py-3 font-semibold text-white hover:bg-brand-accent-dark">!COTIZA TU PROYECTO!</a>
      </div>
    </section>
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-12">
        <div class="text-center"><app-section-title eyebrow="Nuestros Resultados" title="Métricas que respaldan nuestro trabajo" /></div>
        <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          @for (m of metrics; track m.label) {
            <article appReveal class="rounded-2xl bg-brand-beige p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
              <p class="font-display text-3xl font-bold text-brand-dark"><app-counter [value]="m.value" /></p>
              <p class="mt-1 font-semibold text-brand-dark">{{ m.label }}</p>
              <p class="mt-1 text-sm text-brand-body">{{ m.desc }}</p>
            </article>
          }
        </div>
      </div>
    </section>
    <section class="relative overflow-hidden bg-brand-dark py-16">
      <img src="/img/about.png" alt="" aria-hidden="true" loading="lazy" class="absolute inset-0 h-full w-full object-cover opacity-10" />
      <div class="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/80 to-brand-dark"></div>
      <div class="relative mx-auto max-w-7xl px-4">
        <div class="text-center">
          <p class="text-sm font-semibold uppercase tracking-widest text-brand-accent">Nuestra Esencia</p>
          <h2 class="font-display mt-1 text-3xl font-bold text-white">Misión & Visión</h2>
        </div>
        <div class="mt-8 grid gap-6 md:grid-cols-2">
          <article appReveal class="relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl transition hover:-translate-y-1">
            <span class="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-accent to-brand-accent-dark"></span>
            <span class="flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent">
              <svg viewBox="0 0 24 24" class="h-6 w-6 fill-none stroke-current stroke-2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" class="fill-current stroke-none"/></svg>
            </span>
            <h3 class="font-display mt-4 text-xl font-bold text-brand-dark">Misión</h3>
            <p class="mt-2 leading-relaxed text-brand-body">{{ mission }}</p>
          </article>
          <article appReveal class="relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl transition hover:-translate-y-1">
            <span class="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-accent-dark to-brand-accent"></span>
            <span class="flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent">
              <svg viewBox="0 0 24 24" class="h-6 w-6 fill-none stroke-current stroke-2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            </span>
            <h3 class="font-display mt-4 text-xl font-bold text-brand-dark">Visión</h3>
            <p class="mt-2 leading-relaxed text-brand-body">{{ vision }}</p>
          </article>
        </div>
        <div class="mt-6 grid gap-6 md:grid-cols-3">
          @for (v of values; track v.title) {
            <article appReveal class="rounded-2xl border border-white/15 bg-white/10 p-6 text-white backdrop-blur transition hover:bg-white/15">
              <h3 class="font-display font-semibold">{{ v.title }}</h3>
              <p class="mt-2 text-sm text-white/75">{{ v.desc }}</p>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class About {
  protected readonly metrics = METRICS;
  protected readonly mission = MISSION;
  protected readonly vision = VISION;
  protected readonly values = VALUES;
  protected readonly whatsapp = WHATSAPP;
}
