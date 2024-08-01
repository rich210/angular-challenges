import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `<app-card
    [list]="students()"
    (addNewItem)="addStudent()"
    [listItemTemplate]="studentListItemTemplate">
    <img ngProjectAs="card-image" src="assets/img/student.webp" width="200px" />
    <ng-template #studentListItemTemplate let-item>
      <app-list-item (deleteItem)="deleteStudent(item.id)">
        {{ item.firstname }}
      </app-list-item>
    </ng-template>
  </app-card>`,
  standalone: true,
  styles: [
    `
      app-card {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);
  students: WritableSignal<Student[]> = this.store.students;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addStudent() {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }
}
