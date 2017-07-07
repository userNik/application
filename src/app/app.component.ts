import { Component, Inject } from '@angular/core';
import { DomReady } from './services/dom.ready.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor( @Inject(DomReady) private domReady: DomReady) { }
}
