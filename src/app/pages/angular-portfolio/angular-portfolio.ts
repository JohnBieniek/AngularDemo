import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  BreadcrumbItem,
  BreadcrumbsComponent,
} from '../../shared/breadcrumbs/breadcrumbs-component';

@Component({
  selector: 'app-angular-portfolio',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './angular-portfolio.html',
  styleUrl: './angular-portfolio.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AngularPortfolio {
  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Portfolio', route: '/projects/angular-portfolio' },
    { label: 'Overview' },
  ];
}
