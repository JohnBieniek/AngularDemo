import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  BreadcrumbsComponent,
  BreadcrumbItem,
} from '../../shared/breadcrumbs/breadcrumbs-component';

@Component({
  selector: 'app-sophia',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './sophia.html',
  styleUrl: './sophia.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Sophia {
  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'SOPHIA', route: '/projects/sophia' },
    { label: 'Overview' },
  ];
}
