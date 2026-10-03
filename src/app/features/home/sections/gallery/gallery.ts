// ESTUDIO: galería con lightbox (imagen ampliada).
// - selected = signal<number|null>: índice abierto o null (cerrado); @if lo muestra.
// - open/close/prev/next actualizan el signal; el template reacciona solo.
// - @HostListener('window:keydown'): ESC cierra, flechas navegan (UX de lightbox).
import { Component, HostListener, signal } from '@angular/core';
import { SectionTitle } from '../../../../shared/ui/section-title/section-title';
import { RevealDirective } from '../../../../shared/ui/reveal/reveal';
import { GALLERY } from '../../data/content.data';

@Component({
  selector: 'app-gallery',
  imports: [SectionTitle, RevealDirective],
  template: `
    <section id="galeria" class="mx-auto max-w-7xl px-4 py-16">
      <div class="text-center"><app-section-title eyebrow="Galeria" title="Mira nuestros trabajos mas recientes" /></div>
      <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        @for (g of items; track g.label; let i = $index) {
          <button type="button" appReveal (click)="open(i)" class="group overflow-hidden rounded-2xl bg-white text-left shadow transition hover:-translate-y-1 hover:shadow-xl">
            <div class="overflow-hidden">
              <img [src]="g.image" [alt]="g.label" loading="lazy" class="h-64 w-full object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <span class="block p-4 text-center text-sm font-medium text-brand-dark">Admin | Espacios — {{ g.label }}</span>
          </button>
        }
      </div>
    </section>
    @if (selected() !== null) {
      <div class="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4" (click)="close()" role="dialog" aria-label="Vista de proyecto">
        <button type="button" (click)="close()" aria-label="Cerrar" class="absolute right-4 top-4 rounded-full bg-white/20 px-4 py-2 text-white hover:bg-white/40">✕</button>
        <button type="button" (click)="prev($event)" aria-label="Anterior" class="absolute left-3 rounded-full bg-white/20 px-4 py-2 text-white hover:bg-white/40">‹</button>
        <figure (click)="$event.stopPropagation()" class="max-w-3xl">
          <img [src]="items[selected()!].image" [alt]="items[selected()!].label" class="max-h-[80vh] w-full rounded-2xl object-contain" />
          <figcaption class="mt-3 text-center text-sm text-white">{{ items[selected()!].label }}</figcaption>
        </figure>
        <button type="button" (click)="next($event)" aria-label="Siguiente" class="absolute right-3 rounded-full bg-white/20 px-4 py-2 text-white hover:bg-white/40">›</button>
      </div>
    }
  `,
})
export class Gallery {
  protected readonly items = GALLERY;
  protected readonly selected = signal<number | null>(null);

  open(i: number): void {
    this.selected.set(i);
  }

  close(): void {
    this.selected.set(null);
  }

  prev(e: Event): void {
    e.stopPropagation();
    this.selected.update((v) => (v === null ? v : (v - 1 + this.items.length) % this.items.length));
  }

  next(e: Event): void {
    e.stopPropagation();
    this.selected.update((v) => (v === null ? v : (v + 1) % this.items.length));
  }

  @HostListener('window:keydown', ['$event'])
  onKey(e: KeyboardEvent): void {
    if (this.selected() === null) return;
    if (e.key === 'Escape') this.close();
    if (e.key === 'ArrowLeft') this.selected.update((v) => (v === null ? v : (v - 1 + this.items.length) % this.items.length));
    if (e.key === 'ArrowRight') this.selected.update((v) => (v === null ? v : (v + 1) % this.items.length));
  }
}
