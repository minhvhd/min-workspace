import { Routes } from '@angular/router';

export const featureRoutes: Routes = [
  {
    path: '',
    redirectTo: 'reactive-form',
    pathMatch: 'full'
  },
  {
    path: 'reactive-form',
    loadComponent: () =>
      import('./reactive-form/reactive-form.component').then(
        (m) => m.ReactiveFormComponent
      ),
  },
  {
    path: 'dynamic-form',
    loadComponent: () =>
      import('./dynamic-form/dynamic-form.component').then(
        (m) => m.DynamicFormComponent
      ),
  },
];
