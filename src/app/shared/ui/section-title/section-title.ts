// ESTUDIO: título de sección reutilizable (evita repetir HTML).
// - input(): dato de entrada con valor por defecto; input.required(): obligatorio.
// - Uso: <app-section-title eyebrow="..." title="..." /> en Home y About.
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  template: `
    <p class="text-sm font-semibold uppercase tracking-widest text-brand-brown">{{ eyebrow() }}</p>
    <h2 class="font-display mt-1 text-3xl font-bold text-brand-dark">{{ title() }}</h2>
  `,
})
export class SectionTitle {
  readonly eyebrow = input('');
  readonly title = input.required<string>();
}
