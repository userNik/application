import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { SearchItemComponent } from './search-item/search-item.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [SearchComponent, SearchItemComponent],
  exports: [SearchComponent]
})
export class SearchModule { }
