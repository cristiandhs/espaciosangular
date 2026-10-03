import { Component } from '@angular/core';
import { OFFER_ITEMS, WHATSAPP } from '../../data/content.data';

@Component({
  selector: 'app-offer',
  template: `
    <section class="bg-brand-dark text-white">
      <div class="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 md:grid-cols-2">
        <div>
          <p class="text-sm font-semibold uppercase tracking-widest text-brand-beige">Mega Oferta</p>
          <h2 class="font-display mt-1 text-3xl font-bold">10% OFF si vienes de la pagina web</h2>
          <p class="mt-2 text-white/70">este mes tenemos una gran oferta para nuestros clientes</p>
          <ul class="mt-4 list-disc space-y-1 pl-5 text-sm text-white/80">
            @for (item of items; track item) {
              <li>{{ item }}</li>
            }
          </ul>
        </div>
        <div class="rounded-2xl bg-white p-6 text-center text-brand-dark">
          <p class="font-display text-xl font-bold">Obten ya</p>
          <p class="mt-1 text-sm text-brand-dark/70">obtener oferta</p>
          <a [href]="whatsapp" target="_blank" rel="noopener" class="mt-4 inline-block rounded-full bg-brand-accent px-8 py-3 font-semibold text-white hover:bg-brand-accent-dark">¡COTIZA YA!</a>
        </div>
      </div>
    </section>
  `,
})
export class Offer {
  protected readonly items = OFFER_ITEMS;
  protected readonly whatsapp = WHATSAPP;
}
