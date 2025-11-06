import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { bookReducer } from './store/books/book.reducer';
import { provideEffects } from '@ngrx/effects';
import { BookEffects } from './store/books/book.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ book: bookReducer }),
    provideEffects([BookEffects]),
  ],
};