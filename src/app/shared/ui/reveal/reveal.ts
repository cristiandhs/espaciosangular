// ESTUDIO: directiva de animación al hacer scroll.
// - Directiva = clase que AÑADE comportamiento a un elemento ([appReveal]).
// - inject(ElementRef): acceso al elemento DOM donde se aplicó.
// - IntersectionObserver (API del navegador): avisa cuando el elemento entra
//   en pantalla; ahí se añade .reveal-visible y se deja de observar.
// - ngOnDestroy: desconecta el observer para no fugar memoria.
import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[appReveal]',
})
export class RevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    const native = this.el.nativeElement;
    native.classList.add('reveal');
    if (typeof IntersectionObserver === 'undefined') {
      native.classList.add('reveal-visible');
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            native.classList.add('reveal-visible');
            this.observer?.disconnect();
          }
        }
      },
      { threshold: 0.15 },
    );
    this.observer.observe(native);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
