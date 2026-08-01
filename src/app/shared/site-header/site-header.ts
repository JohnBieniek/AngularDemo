import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-header.html',
  styleUrl: './site-header.css'
})
export class SiteHeader {
  constructor(private readonly router: Router) {}

  scrollHomeToTop(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }

  async scrollToProjects(event: Event): Promise<void> {
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
