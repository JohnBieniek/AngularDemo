import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  HostListener,
  signal,
} from '@angular/core';
import {
  BreadcrumbsComponent,
  BreadcrumbItem,
} from '../../shared/breadcrumbs/breadcrumbs-component';

@Component({
  selector: 'app-sophia',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './sophia.html',
  styleUrl: './sophia.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Sophia {
  readonly videoLoaded = signal(false);

  @HostListener('window:message', ['$event'])
  onYouTubeMessage(event: MessageEvent): void {
    if (!event.origin.endsWith('youtube.com') && !event.origin.endsWith('youtube-nocookie.com')) {
      return;
    }

    let message = event.data;
    if (typeof message === 'string') {
      try {
        message = JSON.parse(message);
      } catch {
        return;
      }
    }

    const playbackStarted =
      (message?.event === 'onStateChange' && message?.info === 1) ||
      (message?.event === 'infoDelivery' && message?.info?.playerState === 1);

    if (playbackStarted) {
      this.videoLoaded.set(true);
    }

    if (message?.event === 'onError') {
      this.videoLoaded.set(false);
    }
  }

  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'SOPHIA', route: '/projects/sophia' },
    { label: 'Overview' },
  ];
}
