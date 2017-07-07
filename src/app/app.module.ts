import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchModule } from './components/search/search.module';
import { PlayerModule } from './components/player/player.module';
import { HistoryListModule } from './components/history-list/history-list.module';
import { YoutubeApi } from './services/youtube-api.service';
import { YoutubePlayer } from './services/youtube-player.service';
import { DomReady } from './services/dom.ready.service';
import { FindItemState } from './services/states/find-item.state';
import { HistoryItemState } from './services/states/history-item.state';
import { HistoryList } from './services/history-list.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SearchModule,
    PlayerModule,
    HistoryListModule
  ],
  providers: [
    DomReady,
    YoutubeApi,
    YoutubePlayer,
    FindItemState,
    HistoryList,
    HistoryItemState
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
