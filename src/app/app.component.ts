import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Book Library';

  location: Location;
  pathname: string;

  constructor(location: Location) {
    this.location = location;
    this.pathname = window.location.pathname.slice(1);
  }

  refreshURL(pathname: string) {
    this.location.go(pathname);
    this.pathname= pathname
  }
}
