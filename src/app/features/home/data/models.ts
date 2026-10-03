// ESTUDIO: "contratos" de datos (TypeScript).
// - interface: forma que DEBE tener cada objeto (título, imagen...).
// - Centralizar los tipos evita errores: si falta un campo, el build falla.
// - Los *.data.ts exportan ARRAYS de estos tipos; las plantillas los recorren con @for.
export interface CatalogItem {
  image: string;
  title: string;
  subtitle: string;
}

export interface CurtainItem {
  image: string;
  name: string;
}

export interface HeroSlide {
  image: string;
  eyebrow: string;
  title: string;
  cta: string;
  ctaLink: string;
}

export interface ServiceItem {
  title: string;
  desc: string;
}

export interface ProcessStep {
  n: number;
  title: string;
  desc: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface GalleryItem {
  image: string;
  label: string;
}
