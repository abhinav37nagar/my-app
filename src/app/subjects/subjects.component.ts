import { Component, Output, EventEmitter } from '@angular/core';

import { Subject } from '../subject';
import { SubjectService } from '../subject.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css'],
})
export class SubjectsComponent {
  selectedSubject?: Subject;

  subjects: Subject[] = [];

  @Output() redirectEvent = new EventEmitter<string>();

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

  redir(subject: string) {
    this.redirectEvent.emit(subject);
  }
}
