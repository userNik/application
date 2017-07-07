import { Component, Inject, Input } from '@angular/core';
import { YoutubeApi } from '../../services/youtube-api.service';
import { YoutubePlayer } from '../../services/youtube-player.service';
import { FindItemState } from '../../services/states/find-item.state';
import { HistoryList } from '../../services/history-list.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  searchFieldValue: string;
  constructor(
    @Inject(YoutubeApi) private ytApi: YoutubeApi,
    @Inject(FindItemState) private findItemState: FindItemState,
    @Inject(YoutubePlayer) private ytPlayer: YoutubePlayer,
    @Inject(HistoryList) private historyList: HistoryList
  ) { }

  changeFieldValue(fieldValue: string): void {
    if (fieldValue) {
      this.ytApi.searchItemByQuery(fieldValue);
    } else {
      this.findItemState.clearItems();
    }
  }

  onPlayVideo(item: any): void {
    this.findItemState.clearItems();
    this.searchFieldValue = '';
    this.ytPlayer.changeVideo(item.videoId);
    this.historyList.addVideo(item);
  }
}
