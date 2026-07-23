import { Component, HostListener, signal } from '@angular/core';
import {
  BreadcrumbsComponent,
  BreadcrumbItem,
} from '../../shared/breadcrumbs/breadcrumbs-component';

@Component({
  selector: 'app-trial-by-rotation',
  imports: [BreadcrumbsComponent],
  standalone: true,
  templateUrl: './trial-by-rotation.html',
  styleUrl: './trial-by-rotation.css'
})
export class TrialByRotation {
   readonly trailerLoaded = signal(false);

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
       this.trailerLoaded.set(true);
     }

     if (message?.event === 'onError') {
       this.trailerLoaded.set(false);
     }
   }

   breadcrumbs: BreadcrumbItem[] = [
    { label: 'Trial by Rotation', route: 'projects/trial-by-rotation' },
    { label: 'Overview' },
  ];
}
