// ESTUDIO: componente raíz = el "marco" de la web.
// - imports: al ser standalone, declara qué piezas usa su plantilla
//   (RouterOutlet pinta la página activa; Header/Footer van fijos).
// - showTop: signal booleana que muestra el botón "volver arriba".
// - @HostListener('window:scroll'): escucha el scroll global y actualiza el signal.
// - scrollTo({behavior:'smooth'}): API del navegador para subir con animación.
import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Signal: estado reactivo; al cambiar, la plantilla (@if) se re-renderiza sola.
  protected readonly showTop = signal(false);
  protected readonly whatsapp = 'https://wa.me/573014667781?text=Hola%20Espacios%20DFR%2C%20quiero%20cotizar';

  @HostListener('window:scroll')
  onScroll(): void {
    this.showTop.set(window.scrollY > 600);
  }

  scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
