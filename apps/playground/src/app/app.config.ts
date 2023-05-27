import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';

const ANGULAR_MODULES = [
  BrowserModule,
  BrowserAnimationsModule,
  RouterModule.forRoot(appRoutes, {
    useHash: true,
    onSameUrlNavigation: 'reload',
  }),
];

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(ANGULAR_MODULES)],
};
