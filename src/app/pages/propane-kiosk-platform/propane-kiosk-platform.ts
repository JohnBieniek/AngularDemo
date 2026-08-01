import { Component } from '@angular/core';
import {
  BreadcrumbItem,
  BreadcrumbsComponent,
} from '../../shared/breadcrumbs/breadcrumbs-component';

@Component({
  selector: 'app-propane-kiosk-platform',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './propane-kiosk-platform.html',
  styleUrl: './propane-kiosk-platform.css',
})
export class PropaneKioskPlatform {
  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Propane Kiosks', route: '/projects/propane-kiosk-platform' },
    { label: 'Overview' },
  ];
}
