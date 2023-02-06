import { Component } from '@angular/core';

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

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe((books) => {
      for (let i = 0; i < books.length; i++) {
        if (i >= 10) break;
        let book: Book = {
          id: i,
          title:
            books[i].title +
            (books[i].subtitle ? `: ${books[i].subtitle}` : ''),
          author: books[i].author_name ? books[i].author_name[0] : '',
          latest_publish_year: Math.max(...books[i].publish_year),
          first_publish_year: books[i].first_publish_year,
        };
        // console.log(books[i], book);
        this.books.push(book);
      }
    });
  }
}
