// ESTUDIO: configuración global (sustituye al antiguo AppModule).
// - ApplicationConfig: lista de providers disponibles en toda la app.
// - provideRouter(routes): activa el router con nuestras rutas lazy.
// - provideBrowserGlobalErrorListeners(): reporta errores no capturados.
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
