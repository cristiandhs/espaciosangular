import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';

describe('Home', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ providers: [provideRouter([])] }).compileComponents();
  });

  it('should render 9 sections', async () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    for (const sel of ['app-hero', 'app-about-section', 'app-catalog', 'app-services', 'app-curtains', 'app-offer', 'app-process-steps', 'app-testimonials', 'app-gallery']) {
      expect(el.querySelector(sel), sel).toBeTruthy();
    }
  });
});
