import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookService } from '../../services/book.service';
import * as BookActions from './book.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookEffects {
  private bookService: BookService = inject(BookService);
  private actions$: Actions = inject(Actions);

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.loadBooks),
      mergeMap(() =>
        this.bookService.getBooks().pipe(
          map((books) => BookActions.loadBooksSuccess({ books })),
          catchError((error) =>
            of(BookActions.loadBooksFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
