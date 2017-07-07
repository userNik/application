import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'search-item',
  templateUrl: './search-item.component.html'
})
export class SearchItemComponent {
  @Input() findItem: any;
  @Output() playData: EventEmitter<any> = new EventEmitter();

  onPlay(e: Event) {
    e.preventDefault();
    this.playData.emit(this.findItem);
  }
}
