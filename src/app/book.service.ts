import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Book } from './book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private booksUrl = 'https://openlibrary.org/search.json';

  constructor(private http: HttpClient) {}

  getBooks(q: string, sub: string): Observable<any> {
    console.log('getBooks')
    // const books: Observable<Book[]> = of([
    //   {id: 1,title: 'title1',author: 'author1',},
    //   {id: 2,title: 'title2',author: 'author2',},
    //   {id: 3,title: 'title3',author: 'author3',},
    //   {id: 4,title: 'title4',author: 'author4',},
    //   {id: 5,title: 'title5',author: 'author5',},
    // ]);
    // return books;

    let url = new URL(this.booksUrl);
    if (q) url.searchParams.append('q', q);
    if (sub) url.searchParams.append('subject', sub);
    console.log('url', url, typeof url, url.toString());
    return this.http.get<any>(url.toString()).pipe(map((e) => e.docs));
  }
}
