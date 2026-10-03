import { Component } from '@angular/core';
import { SectionTitle } from '../../../../shared/ui/section-title/section-title';
import { RevealDirective } from '../../../../shared/ui/reveal/reveal';
import { CATALOG } from '../../data/catalog.data';
import { CatalogCard } from './catalog-card';

@Component({
  selector: 'app-catalog',
  imports: [SectionTitle, CatalogCard, RevealDirective],
  template: `
    <section id="catalogo" class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-16">
        <div class="text-center"><app-section-title eyebrow="CATALOGO" title="Nuestro catálogo" /></div>
        <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          @for (item of items; track item.title) {
            <app-catalog-card appReveal [item]="item" class="block transition hover:-translate-y-1" />
          }
        </div>
      </div>
    </section>
  `,
})
export class Catalog {
  protected readonly items = CATALOG;
}
