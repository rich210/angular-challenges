import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(HttpClientModule)],
};
