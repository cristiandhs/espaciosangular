import { Component } from '@angular/core';
import { SectionTitle } from '../../../../shared/ui/section-title/section-title';
import { PROCESS_STEPS } from '../../data/content.data';

@Component({
  selector: 'app-process-steps',
  imports: [SectionTitle],
  template: `
    <section id="proceso" class="mx-auto max-w-7xl px-4 py-16">
      <div class="text-center"><app-section-title eyebrow="Nuestro proceso" title="Cómo trabajamos para garantizar la excelencia en cada proyecto" /></div>
      <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        @for (s of items; track s.n) {
          <article class="rounded-2xl bg-white p-6 text-center shadow">
            <p class="font-display mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent text-xl font-bold text-white">{{ s.n }}</p>
            <h3 class="font-display mt-3 font-semibold text-brand-dark">{{ s.title }}</h3>
            <p class="mt-2 text-sm text-brand-dark/70">{{ s.desc }}</p>
          </article>
        }
      </div>
    </section>
  `,
})
export class ProcessSteps {
  protected readonly items = PROCESS_STEPS;
}
