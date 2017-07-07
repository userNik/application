import { Injectable } from '@angular/core';

@Injectable()
export class FindItemState {
  items: any[] = [];

  clearItems(): void {
    this.items = [];
  }

  addQueryItems(item): void {
    this.items.push(item);
  }

  mergeWithVotesItems(votes: any) {
    votes.forEach((votesItem: any) => {
      votesItem = votesItem.items[0];
      let currentItem = this.items.find(item => item.videoId === votesItem.id);
      if (currentItem) {
        currentItem.likeCount = votesItem.statistics.likeCount;
      }
    });
  }
}
