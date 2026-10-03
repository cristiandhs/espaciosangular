// ESTUDIO: contador animado (+600, 4.4/5...).
// - value = input.required: el padre pasa el texto final ("+600").
// - display = signal: lo que se ve; la plantilla muestra {{ display() }}.
// - Al entrar en pantalla (IntersectionObserver) se anima con
//   requestAnimationFrame durante 1200ms (easing cúbico).
// - Soporta prefijo "+" y sufijo ("/5"), y decimales con toFixed(1).
import { Component, ElementRef, OnDestroy, OnInit, inject, input, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `<span>{{ display() }}</span>`,
})
export class Counter implements OnInit, OnDestroy {
  readonly value = input.required<string>();
  private readonly el = inject(ElementRef<HTMLElement>);
  private observer: IntersectionObserver | null = null;
  private raf = 0;
  protected readonly display = signal('');

  ngOnInit(): void {
    this.display.set(this.value());
    if (typeof IntersectionObserver === 'undefined') return;
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          this.animate();
          this.observer?.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    cancelAnimationFrame(this.raf);
  }

  private animate(): void {
    const raw = this.value();
    const match = raw.match(/([+-]?[\d.,]+)(.*)/);
    if (!match) return;
    const target = parseFloat(match[1].replace(',', '.'));
    const suffix = match[2] ?? '';
    const prefix = raw.startsWith('+') ? '+' : '';
    if (Number.isNaN(target)) return;
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = target * eased;
      this.display.set(`${prefix}${Number.isInteger(target) ? Math.round(current).toString() : current.toFixed(1)}${suffix}`);
      if (p < 1) this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }
}
