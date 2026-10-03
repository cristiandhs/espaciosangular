// ESTUDIO: cabecera de páginas internas (About/Blog/Contact).
// - Recibe eyebrow/title/crumb por inputs y pinta el <h1> + breadcrumb.
// - El breadcrumb usa RouterLink a "/" (navegación SPA sin recarga).
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-header',
  imports: [RouterLink],
  template: `
    <section class="relative overflow-hidden bg-brand-dark text-white">
      <img src="/img/carousel-2.png" alt="" aria-hidden="true" loading="lazy" class="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div class="absolute inset-0 bg-black/50"></div>
      <div class="relative mx-auto max-w-7xl px-4 py-16 text-center">
        <p class="text-sm font-semibold uppercase tracking-widest text-white/80">{{ eyebrow() }}</p>
        <h1 class="font-display mt-2 text-4xl font-bold">{{ title() }}</h1>
        <p class="mt-2 text-sm text-white/70"><a routerLink="/" class="hover:text-white">Home</a> / {{ crumb() }}</p>
      </div>
    </section>
  `,
})
export class PageHeader {
  readonly eyebrow = input('');
  readonly title = input.required<string>();
  readonly crumb = input('');
}
