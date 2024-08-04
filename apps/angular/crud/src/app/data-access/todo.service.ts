import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { randText } from '@ngneat/falso';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private url = 'https://jsonplaceholder.typicode.com/todos';
  private http = inject(HttpClient);

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url);
  }

  update(updatedTodo: Todo) {
    return this.http.put<Todo>(`${this.url}/${updatedTodo.id}`, updatedTodo);
  }

  delete(todo: Todo) {
    return this.http.delete(`${this.url}/${todo.id}`);
  }

  addRandomTitle(todo: Todo): Todo {
    return { ...todo, title: randText() };
  }
}
