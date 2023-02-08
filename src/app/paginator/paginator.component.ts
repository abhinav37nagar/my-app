import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent {
  @Input() length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10];

  @Output() pageChangeEvent = new EventEmitter<PageEvent>();

  handlePageEvent(e: PageEvent) {
    this.pageChangeEvent.emit(e);
  }
}
