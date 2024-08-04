import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withMethods,
  withState,
  withHooks,
} from '@ngrx/signals';
import { map, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Todo, TodoService } from './todo.service';

export interface TodoState {
  todos: Todo[];
  loading: boolean;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
};

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(({ todos, ...store }, todoService = inject(TodoService)) => ({
    getAllTodos: rxMethod<void>(
      pipe(
        switchMap(() => {
          patchState(store, { loading: true });
          return todoService.getAllTodos().pipe(
            map((todos: Todo[]) =>
              todos.map((t: Todo) => todoService.addRandomTitle(t))
            ),
            tap((t: Todo[]) => patchState(store, { todos: t, loading: false }))
          );
        })
      )
    ),
    updateTodo: rxMethod<Todo>(
      pipe(
        switchMap((todo: Todo) => {
          patchState(store, { loading: true });
          const updatedTodo = todoService.addRandomTitle(todo);
          return todoService.update(updatedTodo).pipe(
            tap(() =>
              patchState(store, {
                todos: [
                  ...todos().filter((t: Todo) => t.id !== updatedTodo.id),
                  updatedTodo,
                ],
                loading: false,
              })
            )
          );
        })
      )
    ),
    deleteTodo: rxMethod<Todo>(
      pipe(
        switchMap((todo: Todo) => {
          patchState(store, { loading: true });
          return todoService.delete(todo).pipe(
            tap(() =>
              patchState(store, {
                todos: todos().filter((t: Todo) => t.id !== todo.id),
                loading: false,
              })
            )
          );
        })
      )
    ),
  })),
  withHooks({
    onInit: ({ loading, todos, getAllTodos }) => {
      console.log('onInit store');
      console.log(loading());
      getAllTodos();
    },
  })
);
