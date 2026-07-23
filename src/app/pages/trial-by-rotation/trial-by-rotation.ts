import {
  AfterViewInit,
  Component,
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
  selector: 'app-trial-by-rotation',
  imports: [BreadcrumbsComponent],
  standalone: true,
  templateUrl: './trial-by-rotation.html',
  styleUrl: './trial-by-rotation.css'
})
export class TrialByRotation implements AfterViewInit, OnDestroy {
   @ViewChild('trialPlayer')
   private playerFrame?: ElementRef<HTMLIFrameElement>;

   readonly trailerLoaded = signal(false);
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

     this.player = new window.YT.Player('trial-youtube-player', {
       events: {
         onReady: ({ target }) => {
           target.mute();
           target.playVideo();
           this.waitForPlayback(target);
         },
         onStateChange: ({ data }) => {
           if (data === 1) {
             this.trailerLoaded.set(true);
             this.stopPlaybackCheck();
           }
         },
         onError: () => {
           this.trailerLoaded.set(false);
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
         this.trailerLoaded.set(true);
         this.stopPlaybackCheck();
       } else if (attempts >= 32) {
         this.trailerLoaded.set(false);
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

   breadcrumbs: BreadcrumbItem[] = [
    { label: 'Trial by Rotation', route: 'projects/trial-by-rotation' },
    { label: 'Overview' },
  ];
}
