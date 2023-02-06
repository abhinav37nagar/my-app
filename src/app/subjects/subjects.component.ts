import { Component } from '@angular/core';

import { Subject } from '../subject';
import { SUBJECTS } from '../mock-subjects';
import { SubjectService } from '../subject.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css'],
})
export class SubjectsComponent {
  selectedSubject?: Subject;

  subjects: Subject[] = [];

  constructor(private subjectService: SubjectService) {}

  ngOnInit(): void {
    this.getSubjects();
  }

  onSelect(subject: Subject): void {
    this.selectedSubject = subject;
  }

  getSubjects(): void {
    this.subjectService
      .getSubjects()
      .subscribe((subjects) => (this.subjects = subjects));
  }
}
