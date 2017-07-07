import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'history-item',
  templateUrl: './history-item.component.html'
})
export class HistoryItemComponent {
  @Input() historyData: any;
  @Output() removeItem: EventEmitter<any> = new EventEmitter();
  @Output() selectItem: EventEmitter<any> = new EventEmitter();

  onRemoveItem(e: Event): void {
    e.preventDefault();
    this.removeItem.emit(this.historyData);
  }

  onSelectItem(e: Event): void {
    e.preventDefault();
    this.selectItem.emit(this.historyData);
  }
}
