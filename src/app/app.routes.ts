// ESTUDIO: mapa de URLs de la SPA.
// - Routes: cada path pinta un componente en <router-outlet>.
// - loadComponent + import() dinámico = lazy loading: el JS de cada página
//   se descarga solo al visitarla (ver chunks home/about/blog en el build).
// - '**' es el comodín 404: redirige al home.
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home').then((m) => m.Home) },
  { path: 'about', loadComponent: () => import('./features/about/about').then((m) => m.About) },
  { path: 'blog', loadComponent: () => import('./features/blog/blog').then((m) => m.Blog) },
  { path: 'contact', loadComponent: () => import('./features/contact/contact').then((m) => m.Contact) },
  { path: '**', redirectTo: '' },
];
