import { Component } from '@angular/core';
import {
  BreadcrumbItem,
  BreadcrumbsComponent,
} from '../../shared/breadcrumbs/breadcrumbs-component';
import { ProjectsLink } from '../../shared/projects-link/projects-link';

@Component({
  selector: 'app-lakeland-cabaret',
  standalone: true,
  imports: [BreadcrumbsComponent, ProjectsLink],
  templateUrl: './lakeland-cabaret.html',
  styleUrl: './lakeland-cabaret.css',
})
export class LakelandCabaret {
  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Lakeland Cabaret', route: '/projects/lakeland-cabaret' },
    { label: 'Overview' },
  ];
}
