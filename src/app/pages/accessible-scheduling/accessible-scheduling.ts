import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  BreadcrumbsComponent,
  BreadcrumbItem,
} from '../../shared/breadcrumbs/breadcrumbs-component';

@Component({
  selector: 'app-accessible-scheduling',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './accessible-scheduling.html',
  styleUrl: './accessible-scheduling.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccessibleScheduling {
  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Accessible Scheduling', route: '/projects/accessible-scheduling' },
    { label: 'Overview' },
  ];
}
