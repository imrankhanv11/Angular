import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookState } from './book.reducer';

export const selectBookState = createFeatureSelector<BookState>('book');

export const selectAllBooks = createSelector(selectBookState, state => state.books);
export const selectLoading = createSelector(selectBookState, state => state.loading);