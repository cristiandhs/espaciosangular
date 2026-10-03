import { Component } from '@angular/core';
import { PageHeader } from '../../shared/ui/page-header/page-header';
import { SectionTitle } from '../../shared/ui/section-title/section-title';
import { GALLERY, WHATSAPP } from '../home/data/content.data';

@Component({
  selector: 'app-blog',
  imports: [PageHeader, SectionTitle],
  template: `
    <app-page-header eyebrow="Proyectos" title="Reciente" crumb="Reciente" />
    <section class="mx-auto max-w-7xl px-4 py-12">
      <div class="text-center"><app-section-title eyebrow="Trabajos reales" title="Mira nuestros trabajos mas recientes" /></div>
      <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        @for (g of items; track g.label) {
          <article class="overflow-hidden rounded-2xl bg-white shadow">
            <img [src]="g.image" [alt]="g.label" loading="lazy" class="h-64 w-full object-cover" />
            <div class="p-4 text-center">
              <p class="text-xs text-brand-body">Admin | Espacios</p>
              <h3 class="font-display font-semibold text-brand-dark">{{ g.label }}</h3>
              <a [href]="whatsapp" target="_blank" rel="noopener" class="mt-3 inline-block rounded-full bg-brand-accent px-6 py-2 text-sm font-semibold text-white hover:bg-brand-accent-dark">Cotizar similar</a>
            </div>
          </article>
        }
      </div>
    </section>
  `,
})
export class Blog {
  protected readonly items = GALLERY;
  protected readonly whatsapp = WHATSAPP;
}
