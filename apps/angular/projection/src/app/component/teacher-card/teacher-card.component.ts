import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { randTeacher } from '../../data-access/fake-http.service';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card
    [list]="teachers()"
    (addNewItem)="addTeacher()"
    [listItemTemplate]="teacherListItemTemplate">
    <img ngProjectAs="card-image" src="assets/img/teacher.png" width="200px" />
    <ng-template #teacherListItemTemplate let-item>
      <app-list-item (deleteItem)="deleteTeacher(item.id)">
        {{ item.firstname }}
      </app-list-item>
    </ng-template>
  </app-card>`,
  styles: [
    `
      app-card {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,

  imports: [CardComponent, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);
  teachers: WritableSignal<Teacher[]> = this.store.teachers;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addTeacher() {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
