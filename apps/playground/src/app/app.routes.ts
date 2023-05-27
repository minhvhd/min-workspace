import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./app.component').then(m => m.AppComponent),
    loadChildren: () => import('./feature/feature.routes').then(m => m.featureRoutes),
  },
];
