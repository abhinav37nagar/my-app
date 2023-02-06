import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Subject } from './subject';
import { SUBJECTS } from './mock-subjects';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  constructor() {}

  getSubjects(): Observable<Subject[]> {
    const subjects = of(SUBJECTS);
    return subjects;
  }
}
