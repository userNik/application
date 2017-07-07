import { Component, Inject } from '@angular/core';
import { HistoryItemState } from '../../services/states/history-item.state';
import { HistoryList } from '../../services/history-list.service';
import { YoutubePlayer } from '../../services/youtube-player.service';

@Component({
  selector: 'history-list',
  templateUrl: './history-list.component.html'
})
export class HistoryListComponent {
  constructor(
    @Inject(HistoryItemState) private historyItemState: HistoryItemState,
    @Inject(HistoryList) private historyList: HistoryList,
    @Inject(YoutubePlayer) private ybPlayer: YoutubePlayer
  ) { }

  onRemoveItem(e: any): void {
    this.historyList.removeVideo(e);
  }

  onSelectItem(e: any): void {
    this.ybPlayer.changeVideo(e.videoId);
  }
}
