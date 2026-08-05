import { Component } from '@angular/core';
import {
  BreadcrumbItem,
  BreadcrumbsComponent,
} from '../../shared/breadcrumbs/breadcrumbs-component';

@Component({
  selector: 'app-paint-reorder-platform',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './paint-reorder-platform.html',
  styleUrl: './paint-reorder-platform.css',
})
export class PaintReorderPlatform {
  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Paint Reorder Platform', route: '/projects/paint-reorder-platform' },
    { label: 'Overview' },
  ];
}
