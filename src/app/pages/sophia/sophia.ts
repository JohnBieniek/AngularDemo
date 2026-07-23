import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  OnDestroy,
  PLATFORM_ID,
  signal,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  BreadcrumbsComponent,
  BreadcrumbItem,
} from '../../shared/breadcrumbs/breadcrumbs-component';

interface YouTubePlayer {
  mute(): void;
  playVideo(): void;
  destroy(): void;
}

interface YouTubePlayerEvent {
  target: YouTubePlayer;
  data: number;
}

interface YouTubeApi {
  Player: new (
    elementId: string,
    options: {
      events: {
        onReady: (event: YouTubePlayerEvent) => void;
        onStateChange: (event: YouTubePlayerEvent) => void;
        onError: () => void;
      };
    },
  ) => YouTubePlayer;
}

declare global {
  interface Window {
    YT?: YouTubeApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

@Component({
  selector: 'app-sophia',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './sophia.html',
  styleUrl: './sophia.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Sophia implements AfterViewInit, OnDestroy {
  @ViewChild('sophiaPlayer')
  private playerFrame?: ElementRef<HTMLIFrameElement>;

  readonly videoLoaded = signal(false);
  private readonly platformId = inject(PLATFORM_ID);
  private player?: YouTubePlayer;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (window.YT?.Player) {
      this.initializePlayer();
      return;
    }

    window.onYouTubeIframeAPIReady = () => this.initializePlayer();

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.head.appendChild(script);
    }
  }

  ngOnDestroy(): void {
    this.player?.destroy();
  }

  private initializePlayer(): void {
    if (!window.YT?.Player || !this.playerFrame || this.player) {
      return;
    }

    this.player = new window.YT.Player('sophia-youtube-player', {
      events: {
        onReady: ({ target }) => {
          target.mute();
          target.playVideo();
          this.videoLoaded.set(true);
        },
        onStateChange: ({ data }) => {
          if (data === 1) {
            this.videoLoaded.set(true);
          }
        },
        onError: () => this.videoLoaded.set(false),
      },
    });
  }

  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'SOPHIA', route: '/projects/sophia' },
    { label: 'Overview' },
  ];
}
