// ESTUDIO: sección Servicios del home.
// - @for con "track s.title": renderiza una card por item y ayuda a Angular
//   a reutilizar el DOM al cambiar la lista (rendimiento).
// - "let i = $index": expone la posición para el número 01/02/03 y el icono.
// - linkFor(): construye el link de WhatsApp con mensaje prellenado
//   (encodeURIComponent evita romper la URL con tildes/espacios).
import { Component } from '@angular/core';
import { SectionTitle } from '../../../../shared/ui/section-title/section-title';
import { RevealDirective } from '../../../../shared/ui/reveal/reveal';
import { SERVICES, WHATSAPP } from '../../data/content.data';

@Component({
  selector: 'app-services',
  imports: [SectionTitle, RevealDirective],
  template: `
    <section id="servicios" class="bg-brand-beige/60">
      <div class="mx-auto max-w-7xl px-4 py-16">
        <div class="text-center"><app-section-title eyebrow="Servicios" title="¡Podemos ofrecerte los mejores servicios!" /></div>
        <div class="mt-8 grid gap-6 md:grid-cols-3">
          @for (s of items; track s.title; let i = $index) {
            <article appReveal class="group relative overflow-hidden rounded-2xl bg-white p-8 shadow transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <span class="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-accent to-brand-accent-dark"></span>
              <span class="font-display pointer-events-none absolute -right-2 -top-4 text-7xl font-bold text-brand-dark/5 transition group-hover:text-brand-accent/10">0{{ i + 1 }}</span>
              <span class="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-accent/10 text-brand-accent transition group-hover:bg-brand-accent group-hover:text-white">
                @if (i === 0) {
                  <svg viewBox="0 0 24 24" class="h-7 w-7 fill-none stroke-current stroke-2"><path d="M3 11 11 3l10 10-8 8-10-10Z"/><path d="M7 15l4 4"/></svg>
                } @else if (i === 1) {
                  <svg viewBox="0 0 24 24" class="h-7 w-7 fill-none stroke-current stroke-2"><path d="M4 12a8 8 0 0 1 14-5l2 2M20 12a8 8 0 0 1-14 5l-2-2"/><path d="M20 4v5h-5M4 20v-5h5"/></svg>
                } @else {
                  <svg viewBox="0 0 24 24" class="h-7 w-7 fill-none stroke-current stroke-2"><path d="M4 4h16M6 4v16M18 4v16M6 8c2 1.5 4-1.5 6 0s4-1.5 6 0M6 14c2 1.5 4-1.5 6 0s4-1.5 6 0"/></svg>
                }
              </span>
              <h3 class="font-display relative mt-5 text-lg font-bold text-brand-dark">{{ s.title }}</h3>
              <p class="relative mt-2 text-sm leading-relaxed text-brand-body">{{ s.desc }}</p>
              <a [href]="linkFor(s.title)" target="_blank" rel="noopener"
                class="relative mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-accent hover:gap-2 hover:text-brand-accent-dark">
                Cotizar <span aria-hidden="true">→</span>
              </a>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class Services {
  protected readonly items = SERVICES;

  linkFor(service: string): string {
    return `${WHATSAPP}?text=${encodeURIComponent(`Hola Espacios DFR, me interesa el servicio: ${service}`)}`;
  }
}
