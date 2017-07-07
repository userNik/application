import { Injectable } from '@angular/core';
declare const YT: any;

@Injectable()

export class YoutubePlayer {

  private playerSource: string = 'https://www.youtube.com/iframe_api';
  private elementId: string = 'ui-player';

  private playerState: any;

  createScriptElement() {
    let tag = document.createElement('script');
    tag.src = this.playerSource;
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  onYouTubeIframeAPIReady() {
    let id = this.elementId;
    let self = this;
    this.playerState = new YT.Player(id, {
      height: '100%',
      width: '100%',
      videoId: 'AaEH4AgPb2A',
      events: {
        'onReady': self.onPlayerReady.bind(self),
        'onStateChange': self.onPlayerStateChange.bind(self)
      }
    });
  }

  onPlayerReady(e) {

  }

  onPlayerStateChange(e) {

  }

  changeVideo(videoId) {
    this.playerState.loadVideoById(videoId, 0, "default");
  }
}
