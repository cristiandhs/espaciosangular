// ESTUDIO: carousel del hero (3 slides con autoplay).
// - signal(current/autoplay): índice visible y pausa en hover (mouseenter/leave).
// - OnInit: crea un setInterval de 6s que avanza solo si autoplay() es true.
// - OnDestroy: limpia el intervalo (evita fugas al salir de la página).
// - La plantilla usa @for + @if(current()===i): solo el slide activo existe
//   en el DOM, así hay un único <h1> (bueno para SEO).
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HERO_SLIDES } from '../../data/content.data';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.html',
})
export class Hero implements OnInit, OnDestroy {
  protected readonly slides = HERO_SLIDES;
  protected readonly current = signal(0);
  protected readonly autoplay = signal(true);
  private timer: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.timer = setInterval(() => {
      if (this.autoplay()) this.next();
    }, 6000);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  // Avance circular con módulo: 2 -> 0.
  next(): void {
    this.current.update((i) => (i + 1) % this.slides.length);
  }

  prev(): void {
    this.current.update((i) => (i - 1 + this.slides.length) % this.slides.length);
  }

  go(i: number): void {
    this.current.set(i);
  }

  pause(): void {
    this.autoplay.set(false);
  }

  resume(): void {
    this.autoplay.set(true);
  }
}
