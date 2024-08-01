import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { City } from '../../model/city.model';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';

@Component({
  selector: 'app-city-card',
  template: `<app-card
    [list]="cities()"
    (addNewItem)="addCity()"
    [listItemTemplate]="cityListItemTemplate">
    <img ngProjectAs="card-image" src="assets/img/student.webp" width="200px" />
    <ng-template #cityListItemTemplate let-item>
      <app-list-item (deleteItem)="deleteCity(item.id)">
        {{ item.name }}
      </app-list-item>
    </ng-template>
  </app-card>`,
  styles: [
    `
      app-card {
        background-color: rgba(4, 0, 255, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  cityStore = inject(CityStore);
  http = inject(FakeHttpService);
  cities: WritableSignal<City[]> = this.cityStore.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.cityStore.addAll(c));
  }

  addCity() {
    this.cityStore.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.cityStore.deleteOne(id);
  }
}
