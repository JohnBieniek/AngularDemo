import { Component } from '@angular/core';
import {
  BreadcrumbItem,
  BreadcrumbsComponent,
} from '../../shared/breadcrumbs/breadcrumbs-component';

@Component({
  selector: 'app-retail-robotics',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './retail-robotics.html',
  styleUrl: './retail-robotics.css',
})
export class RetailRobotics {
  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Retail Robotics', route: '/projects/retail-robotics' },
    { label: 'Overview' },
  ];
}
