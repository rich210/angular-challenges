import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './ui/loading/loading.component';
import { TodoStore } from './data-access/todo.store';
import { By } from '@angular/platform-browser';

class MockTodoStore {
  todos = jest.fn().mockReturnValue([
    { id: 1, title: 'Todo 1' },
    { id: 2, title: 'Todo 2' },
  ]);
  update = jest.fn();
  delete = jest.fn();
}

describe('LoadingComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let todoStore: MockTodoStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, CommonModule, LoadingComponent],
      providers: [{ provide: TodoStore, useClass: MockTodoStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    todoStore = TestBed.inject(TodoStore) as unknown as MockTodoStore;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display todos', () => {
    const todoElements = fixture.debugElement.queryAll(By.css('div'));
    expect(todoElements.length).toBe(3); // Two todos and one for count
    expect(todoElements[0].nativeElement.textContent).toContain('Todo 1');
    expect(todoElements[1].nativeElement.textContent).toContain('Todo 2');
  });

  it('should call update method on update button click', () => {
    const updateButton = fixture.debugElement.query(
      By.css('button:first-child')
    );
    updateButton.triggerEventHandler('click', null);
    expect(todoStore.update).toHaveBeenCalledWith({ id: 1, title: 'Todo 1' });
  });
  it('should call delete method on delete button click', () => {
    const deleteButton = fixture.debugElement.query(
      By.css('button:last-child')
    );
    deleteButton.triggerEventHandler('click', null);
    expect(todoStore.delete).toHaveBeenCalledWith({ id: 1, title: 'Todo 1' });
  });

  it('should display the number of todos', () => {
    const countElement = fixture.debugElement.query(By.css('div:last-child'));
    expect(countElement.nativeElement.textContent).toContain('2 todos');
  });
});
