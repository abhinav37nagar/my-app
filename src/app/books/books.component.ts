import { Component, Input } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Location } from '@angular/common';

import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
  books: Book[] = [];
  length = this.books.length;
  index = 0;
  pageSize = 10;
  searchQuery = 'JavaScript';
  init = true;
  @Input() pathname: string = window.location.pathname.slice(1);

  constructor(private bookService: BookService) {}

  displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'latest_publish_year',
    'first_publish_year',
  ];
  dataToDisplay = [...this.books];
  dataSource = new BooksDataSource(this.dataToDisplay);

  ngOnInit(): void {
    this.init = true;
    if (window.location.pathname !== '/') {
      this.getBooks('', window.location.pathname.slice(1));
    }
  }

  ngOnChanges() {
    this.init = false;
    if (window.location.pathname !== '/') {
      this.getBooks('', window.location.pathname.slice(1));
    }
    console.log('pp');
  }

  updateDataSource() {
    console.log('updateDataSource start');
    this.dataSource.setData(
      this.books.slice(
        this.index * this.pageSize,
        (this.index + 1) * this.pageSize
      )
    );
  }

  getBooks(q: string, sub = ''): void {
    let init = false;
    let bookCache: Book[] = [];
    let index = 0;
    let length = 0;
    let pageSize = 10;
    // this.init = false;
    // this.books = [];
    // this.index = 0;
    // this.length = 0;
    // this.pageSize = 10;
    this.updateDataSource();
    this.bookService.getBooks(q, sub).subscribe((books) => {
      for (let i = 0; i < books.length; i++) {
        let book: Book = {
          id: i + 1,
          title:
            books[i].title +
            (books[i].subtitle ? `: ${books[i].subtitle}` : ''),
          author: books[i].author_name
            ? books[i].author_name[0]
            : 'No author info.',
          latest_publish_year: books[i].publish_year
            ? Math.max(...books[i].publish_year)
            : books[i].first_publish_year,
          first_publish_year: books[i].first_publish_year,
        };
        bookCache.push(book);
        length = bookCache.length;
      }
      this.init = init;
      this.books = bookCache;
      this.index = index;
      this.length = length;
      this.pageSize = pageSize;
      this.updateDataSource();
    });
  }

  changePage(e: PageEvent) {
    this.index = e.pageIndex;
    this.pageSize = e.pageSize;
    this.updateDataSource();
  }

  changeURL() {}
}

class BooksDataSource extends DataSource<Book> {
  private _dataStream = new ReplaySubject<Book[]>();

  constructor(initialData: Book[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Book[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: Book[]) {
    this._dataStream.next(data);
  }
}
