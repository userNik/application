import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryListComponent } from './history-list.component';
import { HistoryItemComponent } from './history-item/history-item.component';

@NgModule({
  imports: [CommonModule],
  declarations: [HistoryListComponent, HistoryItemComponent],
  exports: [HistoryListComponent]
})
export class HistoryListModule { }
