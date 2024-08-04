import { ApplicationConfig } from '@angular/core';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { errorHandlerrInterceptor } from './interceptors/error-handlerr.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withFetch(),
      withInterceptors([errorHandlerrInterceptor])
    ),
  ],
};
