import { Injectable, Inject } from '@angular/core';
import { FindItemState } from './states/find-item.state';
declare const gapi: any;

@Injectable()
export class YoutubeApi {
  private apiKey: string = 'AIzaSyA_sHu63i4oCmRD7i1go_HKyrkePco1vXk';
  findItems: any[] = [];

  constructor( @Inject(FindItemState) private findItemState: FindItemState) { }
  authorizeClient() {
    gapi.client.setApiKey(this.apiKey);
    gapi.client.load('youtube', 'v3', () => {
      //api is ready
    });
  }

  searchItemByQuery(queryParams) {

    return new Promise((resolve, reject) => {
      gapi.client.youtube.search.list({
        part: 'snippet',
        type: 'video',
        q: queryParams,
        maxResults: 5,
        order: 'viewCount'
      }).execute(function(data) {
        if (data.error) {
          reject(data);
        } else {
          resolve(data.items);
        }
      });
    }).then(items => this.processFindItemByQuery(items))
      .then(votesPromises => this.receiveAllVotesByVideoId(votesPromises))
      .then(votesItem => this.findItemState.mergeWithVotesItems(votesItem));
  }

  private processFindItemByQuery(items: any) {
    let votesPromises = [];
    this.findItemState.clearItems();
    items.forEach((item: any) => {
      let videoId = item.id.videoId;
      let title = item.snippet.title;
      let thumb = item.snippet.thumbnails.medium.url;
      this.findItemState.addQueryItems({ videoId, title, thumb });
      votesPromises.push(this.createPromiseForVotes(videoId));
    });
    return votesPromises;
  }

  private createPromiseForVotes(videoID: string) {
    return new Promise((resolve, reject) => {
      gapi.client.youtube.videos.list({
        id: videoID,
        part: 'statistics',
      }).execute(function(data) {
        if (data.error) {
          reject(data);
        } else {
          resolve(data);
        }
      });
    });
  }

  private receiveAllVotesByVideoId(votesPromises: any[]) {
    return Promise.all(votesPromises);
  }

}
