import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Book } from './book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private booksUrl =
    'https://openlibrary.org/search.json?q=javascript';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any> {
    return this.http.get<any>(this.booksUrl).pipe(
      map((e) => e.docs)
    );
  }
}
