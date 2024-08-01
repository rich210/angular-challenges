import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Teacher } from '../model/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore {
  teachers = signal<Teacher[]>([]);

  addAll(teachers: Teacher[]) {
    this.teachers.set(teachers);
  }

  addOne(teacher: Teacher) {
    this.teachers.update((teachers) => [...teachers, teacher]);
  }

  deleteOne(id: number) {
    this.teachers.update((teachers) => teachers.filter((t) => t.id !== id));
  }
}
