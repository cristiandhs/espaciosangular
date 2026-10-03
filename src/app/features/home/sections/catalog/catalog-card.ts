// ESTUDIO: card reutilizable de catálogo.
// - input.required<CatalogItem>(): el padre LE PASA el dato (flujo padre→hijo).
// - computed(): valor derivado que se recalcula solo si item() cambia
//   (aquí, el link de WhatsApp específico de cada producto).
import { Component, computed, input } from '@angular/core';
import type { CatalogItem } from '../../data/models';

@Component({
  selector: 'app-catalog-card',
  template: `
    <article class="group overflow-hidden rounded-2xl bg-white shadow transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div class="relative overflow-hidden">
        <img [src]="item().image" [alt]="item().title" loading="lazy" class="h-56 w-full object-cover transition duration-500 group-hover:scale-105" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100"></div>
        <a [href]="link()" target="_blank" rel="noopener"
          class="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-3 whitespace-nowrap rounded-full bg-brand-accent px-5 py-2 text-xs font-semibold text-white opacity-0 shadow transition group-hover:translate-y-0 group-hover:opacity-100">
          Cotizar similar
        </a>
      </div>
      <div class="p-4">
        <h3 class="font-display text-lg font-semibold text-brand-dark">{{ item().title }}</h3>
        <p class="mt-1 text-sm text-brand-dark/70">{{ item().subtitle }}</p>
      </div>
    </article>
  `,
})
export class CatalogCard {
  readonly item = input.required<CatalogItem>();
  protected readonly link = computed(() => {
    const t = this.item();
    return `https://wa.me/573014667781?text=${encodeURIComponent(`Hola Espacios DFR, me interesa: ${t.title} (${t.subtitle})`)}`;
  });
}
