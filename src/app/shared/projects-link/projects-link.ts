import { Directive } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appProjectsLink]',
  standalone: true,
  host: {
    '(click)': 'navigateToProjects($event)',
  },
})
export class ProjectsLink {
  constructor(private readonly router: Router) {}

  async navigateToProjects(event: Event): Promise<void> {
    event.preventDefault();
    await this.router.navigate(['/']);

    setTimeout(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const projects = document.getElementById('projects');
          const header = document.querySelector<HTMLElement>('.site-header');

          if (!projects || !header) {
            return;
          }

          const destination = window.scrollY
            + projects.getBoundingClientRect().top
            - header.getBoundingClientRect().height
            - 16;

          window.scrollTo({ top: Math.max(0, destination), left: 0, behavior: 'auto' });
        });
      });
    }, 0);
  }
}
