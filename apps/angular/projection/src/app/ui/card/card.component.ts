import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="card-image"></ng-content>
    <section>
      @for(item of list; track item.id) {
      <ng-container
        [ngTemplateOutlet]="listItemTemplate"
        [ngTemplateOutletContext]="{ $implicit: item }"></ng-container>
      }
    </section>
    <button
      class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
      (click)="addNewItem.emit()">
      Add
    </button>
  `,
  standalone: true,
  imports: [NgTemplateOutlet],
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() listItemTemplate!: TemplateRef<any>;

  @Output() addNewItem = new EventEmitter<void>();
}
