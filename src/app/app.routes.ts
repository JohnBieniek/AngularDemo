import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { TrialByRotation } from './pages/trial-by-rotation/trial-by-rotation';
import { JavaDemoOverviewComponent } from './pages/java-demo/java-demo-overview-component';
import { AccessibleScheduling } from './pages/accessible-scheduling/accessible-scheduling';
import { Sophia } from './pages/sophia/sophia';
import { MultiverseAdventurersGuild } from './pages/multiverse-adventurers-guild/multiverse-adventurers-guild';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: Home
  },
  {
    path: 'projects/accessible-scheduling',
    component: AccessibleScheduling,
  },
  {
    path: 'projects/sophia',
    component: Sophia,
  },
  {
    path: 'projects/multiverse-adventurers-guild',
    component: MultiverseAdventurersGuild,
  },
  {
    path: 'projects/trial-by-rotation',
    component: TrialByRotation
  },
  {
    path: 'java-demo',
    component: JavaDemoOverviewComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];
