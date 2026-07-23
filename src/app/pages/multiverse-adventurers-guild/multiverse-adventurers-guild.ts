import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  BreadcrumbsComponent,
  BreadcrumbItem,
} from '../../shared/breadcrumbs/breadcrumbs-component';

@Component({
  selector: 'app-multiverse-adventurers-guild',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './multiverse-adventurers-guild.html',
  styleUrl: './multiverse-adventurers-guild.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MultiverseAdventurersGuild {
  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'MAG', route: '/projects/multiverse-adventurers-guild' },
    { label: 'Overview' },
  ];
}
