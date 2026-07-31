import { Component } from '@angular/core';
import {
  BreadcrumbItem,
  BreadcrumbsComponent,
} from '../../shared/breadcrumbs/breadcrumbs-component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  readonly breadcrumbs: BreadcrumbItem[] = [{ label: 'Contact' }];
}
