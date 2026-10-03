import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { Hero } from './hero';

describe('Hero', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ providers: [provideRouter([])] }).compileComponents();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should cycle 0 -> 1 -> 2 -> 0', () => {
    const fixture = TestBed.createComponent(Hero);
    const cmp = fixture.componentInstance as unknown as { current: () => number; next: () => void; prev: () => void };
    expect(cmp.current()).toBe(0);
    cmp.next();
    expect(cmp.current()).toBe(1);
    cmp.next();
    expect(cmp.current()).toBe(2);
    cmp.next();
    expect(cmp.current()).toBe(0);
    cmp.prev();
    expect(cmp.current()).toBe(2);
    fixture.destroy();
  });

  it('should autoplay every 6s and pause on hover', () => {
    vi.useFakeTimers();
    const fixture = TestBed.createComponent(Hero);
    fixture.detectChanges();
    const cmp = fixture.componentInstance as unknown as {
      current: () => number;
      pause: () => void;
      resume: () => void;
    };
    expect(cmp.current()).toBe(0);
    vi.advanceTimersByTime(6000);
    expect(cmp.current()).toBe(1);
    cmp.pause();
    vi.advanceTimersByTime(6000);
    expect(cmp.current()).toBe(1);
    cmp.resume();
    vi.advanceTimersByTime(6000);
    expect(cmp.current()).toBe(2);
    fixture.destroy();
  });
});
