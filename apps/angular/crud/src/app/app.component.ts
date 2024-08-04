import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TodoStore } from './data-access/todo.store';
import { LoadingComponent } from './ui/loading/loading.component';
import { ItemComponent } from './ui/item/item.component';

@Component({
  standalone: true,
  imports: [CommonModule, LoadingComponent, ItemComponent],
  selector: 'app-root',
  template: `
    <app-loading></app-loading>
    @for(todo of todoStore.todos(); track todo.id){
    <app-item
      [todo]="todo"
      [isLoading]="todoStore.loading()"
      (update)="todoStore.updateTodo(todo)"
      (delete)="todoStore.deleteTodo(todo)"></app-item>
    }
    <div>{{ this.todoStore.todos().length }} todos</div>
  `,
  styles: [],
})
export class AppComponent {
  public todoStore = inject(TodoStore);
}
