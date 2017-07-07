import { Injectable } from '@angular/core';

@Injectable()
export class HistoryItemState {
  historyItems: any[] = [];

  clearItems(): void {
    this.historyItems = [];
  }

  addHistoryItems(item: any) {
    let isExist = this.historyItems.find(hisItem => hisItem.videoId === item.videoId);
    if (!isExist) {
      this.historyItems.push(item);
    }
  }

  removeHistoryItems(item: any) {
    this.historyItems = this.historyItems.filter(hisItem => hisItem.videoId !== item.videoId);
  }
}
