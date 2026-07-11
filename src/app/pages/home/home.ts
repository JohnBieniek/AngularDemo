import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  javaDemoRunning = false;

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
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