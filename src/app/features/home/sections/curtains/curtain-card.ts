import { Component, computed, input } from '@angular/core';
import type { CurtainItem } from '../../data/models';

@Component({
  selector: 'app-curtain-card',
  template: `
    <article class="group overflow-hidden rounded-2xl bg-white shadow transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div class="relative overflow-hidden">
        <img [src]="item().image" [alt]="item().name" loading="lazy" class="h-56 w-full object-cover transition duration-500 group-hover:scale-105" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100"></div>
        <a [href]="link()" target="_blank" rel="noopener"
          class="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-3 whitespace-nowrap rounded-full bg-brand-accent px-5 py-2 text-xs font-semibold text-white opacity-0 shadow transition group-hover:translate-y-0 group-hover:opacity-100">
          Cotizar
        </a>
      </div>
      <div class="p-4 text-center"><h3 class="font-display text-base font-semibold text-brand-dark">{{ item().name }}</h3></div>
    </article>
  `,
})
export class CurtainCard {
  readonly item = input.required<CurtainItem>();
  protected readonly link = computed(
    () => `https://wa.me/573014667781?text=${encodeURIComponent(`Hola Espacios DFR, me interesa cortina: ${this.item().name}`)}`,
  );
}
