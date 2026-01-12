import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule} from '@angular/router';
import  routes  from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { loadingInterceptor } from './interceptors/loading.interceptor';
import { LocationStrategy,HashLocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([loadingInterceptor])),
    importProvidersFrom([BrowserAnimationsModule,RouterModule.forRoot(routes)]),
    {provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
}
