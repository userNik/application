import { Injectable, Inject } from '@angular/core';
import { HistoryItemState } from './states/history-item.state';

@Injectable()

export class HistoryList {
  private localStorage: any;
  private storageName: string = 'wxVideos';
  constructor(
    @Inject(HistoryItemState) private historyItemState: HistoryItemState
  ) {
    this.localStorage = localStorage;
    this.initStorage();
  }

  addVideo(item: any): void {
    this.historyItemState.addHistoryItems(item);
    this.setDataToStorage(item.videoId, item);
  }

  removeVideo(item: any): void {
    this.historyItemState.removeHistoryItems(item);
    this.removeFromStorage(item.videoId);
  }

  private initStorage(): void {
    if (!this.localStorage.getItem(this.storageName)) {
      this.localStorage.setItem(this.storageName, JSON.stringify([]));
      return;
    }

    this.getDataFromStorage();
  }

  private setDataToStorage(key: string, data: any): void {
    if (!this.includesInStorage(key)) {
      let storageData = JSON.parse(this.localStorage.getItem(this.storageName));
      storageData.push(data);
      this.localStorage.setItem(this.storageName, JSON.stringify(storageData));
    }
  }

  private includesInStorage(key: string): boolean {
    let storageData = this.localStorage.getItem(this.storageName);
    try {
      let data = JSON.parse(storageData);
      return !!data.find(item => item.videoId === key);

    } catch (e) {
      return false;
    }
  }

  private removeFromStorage(key: string): void {
    let storageData = JSON.parse(this.localStorage.getItem(this.storageName));
    storageData = storageData.filter(item => item.videoId !== key);
    this.localStorage.setItem(this.storageName, JSON.stringify(storageData));
  }

  private getDataFromStorage(): void {
    let storageData = JSON.parse(this.localStorage.getItem(this.storageName));
    storageData.forEach(item => {
      this.historyItemState.addHistoryItems(item);
    });
  }

}
