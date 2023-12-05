import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'counter',
    loadComponent: () =>
      import('./components/counter/counter.component').then(
        (m) => m.CounterComponent
      ),
  },
  {
    path: 'text',
    loadComponent: () =>
      import('./components/text-field/text.component').then(
        (m) => m.TextComponent
      ),
  },
  {
    path: 'dash',
    loadComponent: () =>
      import('./components/custom-app/dash.component').then(
        (m) => m.DashComponent
      ),
  },
];
