import { Component } from '@angular/core';
import {
  BreadcrumbsComponent,
  BreadcrumbItem,
} from '../../shared/breadcrumbs/breadcrumbs-component';

@Component({
  selector: 'app-trial-by-rotation',
  imports: [BreadcrumbsComponent],
  standalone: true,
  templateUrl: './trial-by-rotation.html',
  styleUrl: './trial-by-rotation.css'
})
export class TrialByRotation {
   breadcrumbs: BreadcrumbItem[] = [
    { label: 'Trial by Rotation', route: 'projects/trial-by-rotation' },
    { label: 'Overview' },
  ];
}
