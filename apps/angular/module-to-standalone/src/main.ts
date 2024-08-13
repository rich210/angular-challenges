import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { MainShellModule } from '@angular-challenges/module-to-standalone/shell';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(BrowserModule, MainShellModule)],
}).catch((err) => console.error(err));
