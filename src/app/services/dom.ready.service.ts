import { Injectable, Inject } from '@angular/core';
import { YoutubePlayer } from './youtube-player.service';
import { YoutubeApi } from './youtube-api.service';

@Injectable()
export class DomReady {
  constructor(
    @Inject(YoutubeApi) private ybApi: YoutubeApi,
    @Inject(YoutubePlayer) private ybPlayer: YoutubePlayer,
  ) {
    this.init();
  }

  init() {
    this.ybPlayer.createScriptElement();
    window.onload = () => {
      this.ybApi.authorizeClient();
      this.ybPlayer.onYouTubeIframeAPIReady();
    }
  }
}
