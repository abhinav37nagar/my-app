import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchQuery = '';
  subject = '';
  @Output() searchEvent = new EventEmitter<string>();

  ngOnInit(): void {
    console.log('pp', window.location.pathname);
  }

  handleSearchEvent() {
    this.searchEvent.emit(this.searchQuery);
  }
}
