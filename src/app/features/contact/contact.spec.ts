import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { Contact } from './contact';

describe('Contact', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ providers: [provideRouter([])] }).compileComponents();
  });

  it('should block invalid submit', () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null);
    const fixture = TestBed.createComponent(Contact);
    const cmp = fixture.componentInstance;
    cmp.submit();
    expect(open).not.toHaveBeenCalled();
    open.mockRestore();
  });

  it('should open WhatsApp on valid submit', () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null);
    const fixture = TestBed.createComponent(Contact);
    const cmp = fixture.componentInstance as unknown as {
      submit: () => void;
      form: { setValue: (v: object) => void };
    };
    cmp.form.setValue({ nombre: 'Ana Ruiz', telefono: '+573001112233', tipo: 'Cortinería', mensaje: 'Quiero cortina enrollable para sala' });
    cmp.submit();
    expect(open).toHaveBeenCalled();
    const url = (open.mock.calls[0]?.[0] ?? '') as string;
    expect(url).toContain('wa.me/573014667781?text=');
    open.mockRestore();
  });
});
