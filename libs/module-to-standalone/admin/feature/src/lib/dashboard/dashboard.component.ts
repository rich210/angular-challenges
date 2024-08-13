import { Component, NgModule } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';

@Component({
  selector: 'lib-dashboard',
  template: `Dashboard

    <button
      routerLink="create-user"
      class="border bg-gray-700 rounded-lg p-2 text-white ml-10">
      Create User
    </button> `,
  standalone: true,
  imports: [RouterLink],
})
export class DashboardComponent {}

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: DashboardComponent }]),
    DashboardComponent,
  ],
})
export class DashboardModule {}
