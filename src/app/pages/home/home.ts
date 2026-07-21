import {
  Component,
  inject,
  makeStateKey,
  OnInit,
  PLATFORM_ID,
  signal,
  TransferState,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  readonly javaDemoRunning = signal(false);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly transferState = inject(TransferState);
  private readonly javaDemoRunningKey = makeStateKey<boolean>('javaDemoRunning');

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.javaDemoRunning.set(this.transferState.get(this.javaDemoRunningKey, false));
      this.transferState.remove(this.javaDemoRunningKey);
      return;
    }

    this.http
      .get('http://java26demo-env.eba-tsngktpv.us-east-2.elasticbeanstalk.com/health', {
        responseType: 'text',
      })
      .subscribe({
        next: () => {
          this.javaDemoRunning.set(true);
          this.transferState.set(this.javaDemoRunningKey, true);
        },
        error: () => {
          this.javaDemoRunning.set(false);
          this.transferState.set(this.javaDemoRunningKey, false);
        },
      });
  }
}
