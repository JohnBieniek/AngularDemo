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
  getPlayerState(): number;
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
  private playbackCheck?: ReturnType<typeof setInterval>;

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
    this.stopPlaybackCheck();
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
          this.waitForPlayback(target);
        },
        onStateChange: ({ data }) => {
          if (data === 1) {
            this.videoLoaded.set(true);
            this.stopPlaybackCheck();
          }
        },
        onError: () => {
          this.videoLoaded.set(false);
          this.stopPlaybackCheck();
        },
      },
    });
  }

  private waitForPlayback(player: YouTubePlayer): void {
    this.stopPlaybackCheck();

    let attempts = 0;
    this.playbackCheck = setInterval(() => {
      attempts++;

      if (player.getPlayerState() === 1) {
        this.videoLoaded.set(true);
        this.stopPlaybackCheck();
      } else if (attempts >= 32) {
        this.videoLoaded.set(false);
        this.stopPlaybackCheck();
      }
    }, 250);
  }

  private stopPlaybackCheck(): void {
    if (this.playbackCheck) {
      clearInterval(this.playbackCheck);
      this.playbackCheck = undefined;
    }
  }

  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'SOPHIA', route: '/projects/sophia' },
    { label: 'Overview' },
  ];
}
