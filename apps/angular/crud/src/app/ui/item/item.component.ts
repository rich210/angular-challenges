import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../data-access/todo.service';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
  todo = input.required<Todo>();
  @Input() isLoading = false;
  @Output() update = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<Todo>();

  onUpdate(todo: Todo) {
    this.update.emit(todo);
  }

  onDelete(todo: Todo) {
    this.delete.emit(todo);
  }
}
