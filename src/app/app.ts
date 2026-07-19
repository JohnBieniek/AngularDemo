import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteHeader } from "./shared/site-header/site-header";
import { APP_VERSION } from './generated-version';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('John Bienieks Portfolio');
  protected readonly version = APP_VERSION;
}
