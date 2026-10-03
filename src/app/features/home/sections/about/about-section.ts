import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionTitle } from '../../../../shared/ui/section-title/section-title';
import { RevealDirective } from '../../../../shared/ui/reveal/reveal';
import { WHATSAPP } from '../../data/content.data';

@Component({
  selector: 'app-about-section',
  imports: [SectionTitle, RouterLink, RevealDirective],
  template: `
    <section class="mx-auto grid max-w-7xl items-center gap-6 px-4 py-10 md:grid-cols-2">
      <img src="/img/about.png" alt="Taller Espacios DFR" loading="lazy" class="h-56 w-full rounded-2xl object-cover shadow md:h-64" />
      <div appReveal>
        <app-section-title eyebrow="¿Quiénes somos?" title="Hacemos realidad tus ideas" />
        <p class="mt-3 text-sm leading-relaxed text-brand-body">Transformamos ideas en realidad a través del diseño, fabricación y restauración de mobiliarios.</p>
        <div class="mt-3 flex flex-wrap gap-2 text-xs font-medium">
          <span class="rounded-full bg-brand-beige px-3 py-1 text-brand-dark">Precios Competitivos</span>
          <span class="rounded-full bg-brand-beige px-3 py-1 text-brand-dark">Mejores Servicios</span>
          <span class="rounded-full bg-brand-beige px-3 py-1 text-brand-dark">Gran variedad</span>
        </div>
        <div class="mt-4 flex flex-wrap items-center gap-3">
          <a [href]="whatsapp" target="_blank" rel="noopener" class="rounded-full bg-brand-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-accent-dark">¡COTIZA YA!</a>
          <a routerLink="/about" class="text-sm font-semibold text-brand-accent hover:text-brand-accent-dark">Conócenos →</a>
        </div>
      </div>
    </section>
  `,
})
export class AboutSection {
  protected readonly whatsapp = WHATSAPP;
}
