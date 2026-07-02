import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { TrialByRotation } from './pages/trial-by-rotation/trial-by-rotation';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: Home
  },
  {
    path: 'projects/trial-by-rotation',
    component: TrialByRotation
  },
  {
    path: '**',
    redirectTo: ''
  }
];