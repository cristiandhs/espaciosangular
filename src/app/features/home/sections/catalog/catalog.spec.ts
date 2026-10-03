import { TestBed } from '@angular/core/testing';
import { Catalog } from './catalog';
import { CATALOG } from '../../data/catalog.data';

describe('Catalog', () => {
  it('should expose 9 items', () => {
    expect(CATALOG.length).toBe(9);
    const fixture = TestBed.createComponent(Catalog);
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('app-catalog-card');
    expect(cards.length).toBe(9);
  });
});
