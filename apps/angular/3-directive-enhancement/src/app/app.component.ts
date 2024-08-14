import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForEmpty } from './directives/ng-for-empty.directive';

interface Person {
  name: string;
}

@Component({
  standalone: true,
  imports: [NgForEmpty],
  selector: 'app-root',
  template: `
    <div *ngForEmpty="let person of persons; else: emptyList">
      {{ person.name }}
    </div>
    <ng-template #emptyList>The list is empty !!</ng-template>
    <button (click)="clear()">Clear</button>
    <button (click)="add()">Add</button>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  persons?: Person[] = [];
  clear() {
    this.persons = [];
  }
  add() {
    if (!this.persons) this.persons = [];
    this.persons?.push({ name: 'John' });
  }
}
