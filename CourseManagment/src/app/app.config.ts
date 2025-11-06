import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { authReducer } from './store/authentication/auth.reducer';
import { userReducer } from './store/user/user.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './store/authentication/auth.effects';
import { UserEffects } from './store/user/user.effect';
import { localStorageSyncReducer } from './store/localStroageSync.reducer';
import { AuthInterceptor } from './api/auth.interceptor';
import { routes } from './app.routes';
import { courseReducer } from './store/course/course.reducer';
import { CourseEffects } from './store/course/course.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor])),

    provideStore(
      {
        auth: authReducer,
        users: userReducer,
        course: courseReducer,
      },
      {
        metaReducers: [localStorageSyncReducer],
      }
    ),

    provideEffects([AuthEffects, UserEffects, CourseEffects]),
  ],
};
