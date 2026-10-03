import { Component } from '@angular/core';
import { SectionTitle } from '../../../../shared/ui/section-title/section-title';
import { CURTAINS } from '../../data/curtains.data';
import { CurtainCard } from './curtain-card';

@Component({
  selector: 'app-curtains',
  imports: [SectionTitle, CurtainCard],
  template: `
    <section id="cortineria" class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-16">
        <div class="text-center"><app-section-title eyebrow="Cortinería" title="Mira los tipos de cortinas que tenemos para ti" /></div>
        <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          @for (item of items; track item.name) {
            <app-curtain-card [item]="item" />
          }
        </div>
      </div>
    </section>
  `,
})
export class Curtains {
  protected readonly items = CURTAINS;
}
