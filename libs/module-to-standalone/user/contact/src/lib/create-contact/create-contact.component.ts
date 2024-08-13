import { Component, NgModule } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';

@Component({
  selector: 'lib-create-contact',
  template: `Create Contact Form

    <button
      routerLink=".."
      class="border bg-gray-700 rounded-lg p-2 text-white ml-5">
      Back
    </button> `,
  standalone: true,
  imports: [RouterLink],
})
export class CreateContactComponent {}

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: CreateContactComponent }]),
    CreateContactComponent,
  ],
})
export class CreateContactModule {}
