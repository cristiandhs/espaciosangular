// ESTUDIO: testimonios como carousel (1 destacado, rota cada 7s).
// - Mismo patrón que el hero: signal index + setInterval + pausa en hover.
// - current(): getter que devuelve el testimonio visible según index().
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { SectionTitle } from '../../../../shared/ui/section-title/section-title';
import { RevealDirective } from '../../../../shared/ui/reveal/reveal';
import { TESTIMONIALS } from '../../data/content.data';

@Component({
  selector: 'app-testimonials',
  imports: [SectionTitle, RevealDirective],
  template: `
    <section id="testimonios" class="bg-white">
      <div class="mx-auto max-w-4xl px-4 py-16 text-center">
        <app-section-title eyebrow="Testimonios" title="Qué dicen nuestros clientes" />
        <div appReveal class="relative mt-8 rounded-2xl bg-brand-beige p-8 shadow" (mouseenter)="pause()" (mouseleave)="resume()">
          <p class="text-lg text-brand-dark/80">“{{ current().quote }}”</p>
          <div class="mt-4 flex items-center justify-center gap-1 text-brand-accent" aria-label="5 de 5 estrellas">★★★★★</div>
          <p class="font-display mt-2 font-semibold text-brand-dark">{{ current().name }}</p>
          <p class="text-xs text-brand-dark/60">{{ current().role }}</p>
          <div class="mt-6 flex items-center justify-center gap-3">
            <button type="button" (click)="prev()" aria-label="Anterior" class="rounded-full bg-brand-dark/10 px-3 py-1 hover:bg-brand-dark/20">‹</button>
            @for (t of items; track t.name; let i = $index) {
              <button type="button" (click)="go(i)" [attr.aria-label]="'Ir a testimonio ' + (i + 1)"
                class="h-2 rounded-full transition-all" [class.w-6]="index() === i" [class.w-2]="index() !== i"
                [class.bg-brand-accent]="index() === i" [class.bg-brand-dark/20]="index() !== i"></button>
            }
            <button type="button" (click)="next()" aria-label="Siguiente" class="rounded-full bg-brand-dark/10 px-3 py-1 hover:bg-brand-dark/20">›</button>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Testimonials implements OnInit, OnDestroy {
  protected readonly items = TESTIMONIALS;
  protected readonly index = signal(0);
  protected readonly autoplay = signal(true);
  private timer: ReturnType<typeof setInterval> | null = null;

  current = () => this.items[this.index() % this.items.length];

  ngOnInit(): void {
    this.timer = setInterval(() => {
      if (this.autoplay()) this.next();
    }, 7000);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  next(): void {
    this.index.update((i) => (i + 1) % this.items.length);
  }

  prev(): void {
    this.index.update((i) => (i - 1 + this.items.length) % this.items.length);
  }

  go(i: number): void {
    this.index.set(i);
  }

  pause(): void {
    this.autoplay.set(false);
  }

  resume(): void {
    this.autoplay.set(true);
  }
}
