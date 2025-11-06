import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './api/auth.interceptor';
import { authReducer } from './store/authentication/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './store/authentication/auth.effects';
import { metaReducers } from '../app/store/metaReducers/localStorageAsync'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideStore({ authStore: authReducer }, { metaReducers }),
    provideEffects([AuthEffects])
  ]
};
