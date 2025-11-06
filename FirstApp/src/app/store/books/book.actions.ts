import { createAction, props} from '@ngrx/store';
import { BookType } from '../../types/bookType';

// Load Books
export const loadBooks = createAction('[Book] Load Books');
export const loadBooksSuccess = createAction('[Book] Load Books Success', props<{ books: BookType[] }>());
export const loadBooksFailure = createAction('[Book] Load Books Failure', props<{ error: string }>());