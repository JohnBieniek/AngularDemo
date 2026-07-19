import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  javaDemoRunning = false;
  private readonly platformId = inject(PLATFORM_ID);

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.http
      .get(
        'https://java26demo-env.eba-tsngktpv.us-east-2.elasticbeanstalk.com/healthcheck',
        { responseType: 'text' }
      )
      .subscribe({
        next: () => {
          this.javaDemoRunning = true;
        },
        error: () => {
          this.javaDemoRunning = false;
        }
      });
  }
}
