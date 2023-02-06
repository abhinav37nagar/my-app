import { Component } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';

import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
  books: Book[] = [];

  constructor(private bookService: BookService) {}
  displayedColumns: string[] = ['id','title', 'author', 'latest_publish_year', 'first_publish_year'];
  dataToDisplay = [...this.books];
  dataSource = new BooksDataSource(this.dataToDisplay);

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe((books) => {
      for (let i = 0; i < books.length; i++) {
        if (i >= 10) break;
        let book: Book = {
          id: i+1,
          title:
            books[i].title +
            (books[i].subtitle ? `: ${books[i].subtitle}` : ''),
          author: books[i].author_name ? books[i].author_name[0] : '',
          latest_publish_year: Math.max(...books[i].publish_year),
          first_publish_year: books[i].first_publish_year,
        };
        this.books.push(book);
      }
      this.dataSource.setData(this.books);
    });
  }
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
