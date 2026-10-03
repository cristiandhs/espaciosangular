// ESTUDIO: punto de entrada de la app.
// bootstrapApplication() arranca el componente raíz App sin NgModule
// (modelo standalone de Angular moderno) usando los providers de appConfig.
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
