// ESTUDIO: navbar principal (layout fijo en todas las páginas).
// - RouterLink/RouterLinkActive: navegan sin recargar y marcan el link activo.
// - menuOpen = signal(false): controla el menú móvil con @if en la plantilla.
// - update/set: formas de cambiar un signal (toggle vs asignar).
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
})
export class Header {
  protected readonly menuOpen = signal(false);
  protected readonly whatsapp = 'https://wa.me/573014667781';

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
