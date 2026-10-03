// ESTUDIO: página Home = COMPOSICIÓN de 9 secciones.
// - Cada sección es un componente independiente (hero, catálogo...).
// - Home solo los importa y los ordena en home.html: no tiene lógica.
// - Este patrón (página = suma de piezas) es la base de Angular:
//   piezas pequeñas, reutilizables y fáciles de probar por separado.
import { Component } from '@angular/core';
import { Hero } from './sections/hero/hero';
import { AboutSection } from './sections/about/about-section';
import { Catalog } from './sections/catalog/catalog';
import { Services } from './sections/services/services';
import { Curtains } from './sections/curtains/curtains';
import { Offer } from './sections/offer/offer';
import { ProcessSteps } from './sections/process/process-steps';
import { Testimonials } from './sections/testimonials/testimonials';
import { Gallery } from './sections/gallery/gallery';

@Component({
  selector: 'app-home',
  imports: [Hero, AboutSection, Catalog, Services, Curtains, Offer, ProcessSteps, Testimonials, Gallery],
  templateUrl: './home.html',
})
export class Home {}
